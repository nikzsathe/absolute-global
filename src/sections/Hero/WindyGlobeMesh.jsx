import {useMemo, useRef} from 'react';
import {useFrame, useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute float aFrame;
  uniform float uFrame;
  uniform float uFrameCount;
  varying vec3 vColor;
  void main() {
    // each vertex belongs to one baked simulation frame; show only the
    // currently active frame (points of other frames exit the clip volume)
    float active = 1.0 - step(0.5, abs(aFrame - uFrame));
    vec3 pos = position * active + vec3(999.0) * (1.0 - active);
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 1.6 * (300.0 / max(0.1, -mv.z));
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * uOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

/**
 * "A Windy Day" — global wind particle visualization (Loïc Norgeot, CC-BY-4.0).
 * The GLB holds 50 baked simulation frames as one point cloud with a per-vertex
 * frame index; the shader replays them. 1 draw call total.
 */
const WindyGlobeMesh = ({url, opacity = 0.75, fps = 25}) => {
  const gltf = useLoader(GLTFLoader, url);

  const geometry = useMemo(() => {
    let points = null;
    gltf.scene.traverse((obj) => {
      if (obj.isPoints && !points) points = obj;
    });
    if (!points) return null;
    const src = points.geometry;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', src.getAttribute('position'));
    geo.setAttribute('color', src.getAttribute('color'));
    const frameAttr = src.getAttribute('aFrame') || src.getAttribute('_frame') || src.getAttribute('_FRAME');
    if (!frameAttr) {
      console.warn('windy-day: missing frame attribute');
      return null;
    }
    geo.setAttribute('aFrame', frameAttr);
    geo.computeBoundingSphere();
    return geo;
  }, [gltf]);

  const uniforms = useMemo(
    () => ({
      uFrame: {value: 0},
      uFrameCount: {value: 50},
      uOpacity: {value: opacity},
    }),
    []
  );

  const frameRef = useRef(0);
  useFrame((_, delta) => {
    if (!geometry) return;
    frameRef.current = (frameRef.current + delta * fps) % 50;
    uniforms.uFrame.value = Math.floor(frameRef.current);
  });

  if (!geometry) return null;
  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default WindyGlobeMesh;
