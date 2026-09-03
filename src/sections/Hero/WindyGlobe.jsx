import {useMemo, useRef, useEffect, useState} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';

const isMobileDevice = () =>
  window.matchMedia('(max-width: 768px)').matches ||
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// even point distribution on a unit sphere
function fibSphere(n) {
  const pts = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    pts[i * 3] = Math.cos(th) * r;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = Math.sin(th) * r;
  }
  return pts;
}

// per-particle: orbit axis (vec3), orbit start (vec3), meta (speed, size, tint)
function flowAttrs(n) {
  const axis = new Float32Array(n * 3);
  const base = new Float32Array(n * 3);
  const meta = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = new THREE.Vector3().randomDirection();
    const ref = Math.abs(a.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const b = new THREE.Vector3().crossVectors(a, ref).normalize();
    axis.set([a.x, a.y, a.z], i * 3);
    base.set([b.x, b.y, b.z], i * 3);
    meta.set([0.25 + Math.random() * 0.45, 0.7 + Math.random() * 0.9, Math.random()], i * 3);
  }
  return {axis, base, meta};
}

// LineSegments vertex shader: head vertex samples the orbit at uTime, tail at uTime - TAIL.
// Stateless GPU animation - particles flow along great circles forever.
const streakVertex = /* glsl */ `
  attribute vec3 aAxis;
  attribute vec3 aBase;
  attribute vec3 aMeta; // speed, size, tint
  attribute float aEnd; // 0 = head, 1 = tail
  uniform float uTime;
  varying float vTint;
  varying float vFade;
  void main() {
    float ang = uTime * aMeta.x;
    vec3 p0 = aBase * cos(ang) + cross(aAxis, aBase) * sin(ang);
    float angT = (uTime - aEnd * 0.28 / max(0.05, aMeta.x)) * aMeta.x;
    vec3 p1 = aBase * cos(angT) + cross(aAxis, aBase) * sin(angT);
    vec3 pos = mix(p0, p1, aEnd) * (1.0 + 0.02 * sin(uTime * 0.5 + aMeta.y * 12.0));
    vTint = aMeta.z;
    vFade = 1.0 - aEnd;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const streakFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vTint;
  varying float vFade;
  void main() {
    vec3 teal = vec3(0.13, 0.83, 0.78);
    vec3 cyan = vec3(0.25, 0.62, 1.0);
    vec3 white = vec3(0.92, 1.0, 1.0);
    vec3 col = mix(teal, cyan, vTint * 0.7);
    col = mix(col, white, vTint * vTint * 0.55);
    gl_FragColor = vec4(col, uOpacity * (0.3 + 0.7 * vFade));
  }
`;

const headVertex = /* glsl */ `
  attribute vec3 aAxis;
  attribute vec3 aBase;
  attribute vec3 aMeta;
  uniform float uTime;
  uniform float uDpr;
  varying float vTint;
  void main() {
    float ang = uTime * aMeta.x;
    vec3 pos = aBase * cos(ang) + cross(aAxis, aBase) * sin(ang);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aMeta.y * uDpr * (3.4 / max(0.1, -mv.z)), 1.0, 4.5);
    vTint = aMeta.z;
  }
`;

const headFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vTint;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = mix(vec3(0.4, 0.95, 0.85), vec3(1.0), vTint * 0.6);
    float alpha = smoothstep(0.5, 0.1, d) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

const shellVertex = /* glsl */ `
  uniform float uDpr;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(1.1 * uDpr * (3.4 / max(0.1, -mv.z)), 1.0, 2.6);
  }
`;

const shellFragment = /* glsl */ `
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, d) * uOpacity;
    gl_FragColor = vec4(vec3(0.35, 0.85, 0.9), alpha);
  }
`;

const rimVertex = /* glsl */ `
  varying float vRim;
  void main() {
    vec3 n = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vRim = pow(1.0 - abs(dot(n, normalize(-mv.xyz))), 2.6);
    gl_Position = projectionMatrix * mv;
  }
`;

const rimFragment = /* glsl */ `
  varying float vRim;
  void main() {
    gl_FragColor = vec4(vec3(0.024, 0.84, 0.63), vRim * 0.4);
  }
`;

// Imperceptible drift + damped mouse parallax on desktop.
const GlobeRig = ({children}) => {
  const group = useRef();
  const {size} = useThree();
  const target = useRef({x: 0, y: 0});
  const current = useRef({x: 0, y: 0});
  const mobile = size.width <= 768;

  useEffect(() => {
    if (mobile) return undefined;
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.12;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.08;
    };
    window.addEventListener('mousemove', onMove, {passive: true});
    return () => window.removeEventListener('mousemove', onMove);
  }, [mobile]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.018;
    const damp = 1 - Math.pow(0.001, delta);
    current.current.x += (target.current.x - current.current.x) * damp;
    current.current.y += (target.current.y - current.current.y) * damp;
    group.current.rotation.x = current.current.y;
    group.current.rotation.z = current.current.x * 0.4;
  });

  return <group ref={group}>{children}</group>;
};

const Scene = ({mobile}) => {
  const {gl} = useThree();
  const dpr = gl.getPixelRatio();
  const N = mobile ? 900 : 2600;

  const flow = useMemo(() => flowAttrs(N), []);

  const streakGeo = useMemo(() => {
    // 2 verts per particle: [head, tail] pairs
    const position = new Float32Array(N * 2 * 3); // dummy (real pos computed in shader)
    const aAxis = new Float32Array(N * 2 * 3);
    const aBase = new Float32Array(N * 2 * 3);
    const aMeta = new Float32Array(N * 2 * 3);
    const aEnd = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) {
      for (let e = 0; e < 2; e++) {
        const v = i * 2 + e;
        aAxis.set([flow.axis[i * 3], flow.axis[i * 3 + 1], flow.axis[i * 3 + 2]], v * 3);
        aBase.set([flow.base[i * 3], flow.base[i * 3 + 1], flow.base[i * 3 + 2]], v * 3);
        aMeta.set([flow.meta[i * 3], flow.meta[i * 3 + 1], flow.meta[i * 3 + 2]], v * 3);
        aEnd[v] = e;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geo.setAttribute('aAxis', new THREE.BufferAttribute(aAxis, 3));
    geo.setAttribute('aBase', new THREE.BufferAttribute(aBase, 3));
    geo.setAttribute('aMeta', new THREE.BufferAttribute(aMeta, 3));
    geo.setAttribute('aEnd', new THREE.BufferAttribute(aEnd, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1.3);
    return geo;
  }, [flow]);

  const headGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(flow.base.slice(), 3));
    geo.setAttribute('aAxis', new THREE.BufferAttribute(flow.axis.slice(), 3));
    geo.setAttribute('aBase', new THREE.BufferAttribute(flow.base.slice(), 3));
    geo.setAttribute('aMeta', new THREE.BufferAttribute(flow.meta.slice(), 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1.3);
    return geo;
  }, [flow]);

  const shell = useMemo(() => fibSphere(mobile ? 1000 : 2400), []);
  const shellGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(shell, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1.1);
    return geo;
  }, [shell]);

  const uniforms = useMemo(
    () => ({
      uTime: {value: 0},
      uDpr: {value: dpr},
      uOpacity: {value: mobile ? 0.55 : 0.95},
    }),
    []
  );
  const headUniforms = useMemo(
    () => ({uTime: uniforms.uTime, uDpr: uniforms.uDpr, uOpacity: {value: mobile ? 0.6 : 1}}),
    []
  );
  const shellUniforms = useMemo(
    () => ({uDpr: {value: dpr}, uOpacity: {value: mobile ? 0.4 : 0.55}}),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <GlobeRig>
      {/* planet body: occludes back-side streaks */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[0.985, 48, 48]} />
        <meshBasicMaterial color="#0a1626" />
      </mesh>
      {/* atmosphere rim */}
      <mesh renderOrder={3} scale={1.12}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial vertexShader={rimVertex} fragmentShader={rimFragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>
      {/* shell silhouette */}
      <points renderOrder={1} geometry={shellGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={shellVertex} fragmentShader={shellFragment} uniforms={shellUniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {/* wind streaks */}
      <lineSegments renderOrder={2} geometry={streakGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={streakVertex} fragmentShader={streakFragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {/* particle heads */}
      <points renderOrder={2} geometry={headGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={headVertex} fragmentShader={headFragment} uniforms={headUniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </GlobeRig>
  );
};

const GlobeCanvas = ({mobile}) => (
  <Canvas
    camera={{position: [0, 0, 3.1], fov: 42}}
    dpr={mobile ? [1, 1.25] : [1, 1.75]}
    gl={{alpha: true, antialias: false, powerPreference: 'high-performance'}}
    style={{pointerEvents: 'none'}}
    onCreated={(state) => { window.__r3f = state; }}
  >
    <Scene mobile={mobile} />
  </Canvas>
);

const WindyGlobe = () => {
  const [supported, setSupported] = useState(null);
  const mobile = useMemo(() => isMobileDevice(), []);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (supported === null || !supported) return null;
  return (
    <div className={`ag-hero__globe${mobile ? ' ag-hero__globe--mobile' : ''}`} aria-hidden="true">
      <GlobeCanvas mobile={mobile} />
    </div>
  );
};

export default WindyGlobe;
