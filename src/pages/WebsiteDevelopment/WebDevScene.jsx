import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// deterministic pseudo-random (stable layout across renders/builds)
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Camera journey keyframes: one [x, y, z] per chapter (9 chapters -> 9 stops).
 * scroll progress 0..1 maps along the path with smooth damping in useFrame.
 */
export const CAMERA_PATH = [
  [0, 0.2, 9],
  [0.8, 0.1, 4.5],
  [-1.4, 0, 0.5],
  [1.5, -0.3, -3.5],
  [0.9, 0.6, -7.5],
  [-1.1, 0.2, -11.5],
  [0, -0.5, -15.5],
  [0.7, 0.9, -19.5],
  [0, 0.15, -23.5],
];

export const WORLD_END_Z = -30;

const lerpPath = (p) => {
  const seg = Math.min(Math.floor(p * (CAMERA_PATH.length - 1)), CAMERA_PATH.length - 2);
  const t = p * (CAMERA_PATH.length - 1) - seg;
  const a = CAMERA_PATH[seg];
  const b = CAMERA_PATH[seg + 1];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
};

// digital architecture: instanced wireframe boxes scattered along the corridor
function Structures({ mobile }) {
  const count = mobile ? 90 : 200;
  const inst = useRef();
  const matrices = useMemo(() => {
    const rand = seeded(42);
    const arr = [];
    for (let i = 0; i < count; i++) {
      const z = 4 - (i / count) * 38 - rand() * 1.5;
      const lane = rand() > 0.5 ? 1 : -1;
      const x = lane * (2.2 + rand() * 3.4);
      const y = -1.6 + rand() * 4.2;
      const s = 0.25 + rand() * 1.1;
      arr.push({ x, y, z, s, ry: rand() * Math.PI });
    }
    return arr;
  }, [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    if (!inst.current) return;
    const t = clock.elapsedTime;
    matrices.forEach((m, i) => {
      dummy.position.set(m.x, m.y + Math.sin(t * 0.4 + i) * 0.08, m.z);
      dummy.rotation.set(0, m.ry + t * 0.03, 0);
      dummy.scale.setScalar(m.s);
      dummy.updateMatrix();
      inst.current.setMatrixAt(i, dummy.matrix);
    });
    inst.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <Instances limit={count} range={count}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0f2740" emissive="#0a3d4d" emissiveIntensity={0.55} metalness={0.6} roughness={0.35} />
      <instancedMesh ref={inst} args={[undefined, undefined, count]} instanceMatrix={undefined} matrixAutoUpdate={false}>
        <instancedBufferAttribute attach="instanceMatrix" args={[new Float32Array(count * 16), 16]} />
      </instancedMesh>
    </Instances>
  );
}

// drifting data particles
function Particles({ mobile }) {
  const count = mobile ? 500 : 1400;
  const ref = useRef();
  const geo = useMemo(() => {
    const rand = seeded(7);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 16;
      pos[i * 3 + 1] = (rand() - 0.5) * 8;
      pos[i * 3 + 2] = 6 - rand() * 44;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime;
      ref.current.rotation.y = t * 0.008;
      ref.current.position.y = Math.sin(t * 0.15) * 0.2;
    }
  });
  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      <pointsMaterial size={0.035} color="#38bdf8" transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// gates the camera passes through
function Rings() {
  const rings = useMemo(() => {
    const rand = seeded(99);
    return Array.from({ length: 13 }, (_, i) => ({
      z: 2 - i * 3,
      r: 2.2 + rand() * 0.5,
      ry: rand() * 0.4 - 0.2,
    }));
  }, []);
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.05;
  });
  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 0, r.z]} rotation={[0, r.ry, 0]}>
          <torusGeometry args={[r.r, 0.012, 8, 64]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#22d3ee' : '#0e7490'} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Monolith() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.25;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.15;
    }
  });
  return (
    <group position={[0, 0.4, WORLD_END_Z]} ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial color="#0e2f3f" emissive="#0e7490" emissiveIntensity={0.9} metalness={0.7} roughness={0.25} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#062a33" emissive="#22d3ee" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      <pointLight color="#22d3ee" intensity={6} distance={9} />
    </group>
  );
}

/**
 * The persistent 3D world. Scroll progress (0..1) arrives via progressRef
 * (a MotionValue from the page) and drives the camera along CAMERA_PATH.
 */
const WebDevScene = ({ progressRef, mobile, reducedMotion }) => {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0.2, z: 9 });

  useFrame((state, delta) => {
    const p = Math.min(Math.max(progressRef.current, 0), 1);
    const [x, y, z] = lerpPath(reducedMotion ? Math.round(p * 8) / 8 : p);
    const sway = reducedMotion ? 0 : 1;
    // gentle lateral sway tied to scroll for a cinematic feel
    target.current.x = x + Math.sin(p * Math.PI * 2) * 0.15 * sway;
    target.current.y = y + Math.cos(p * Math.PI * 3) * 0.08 * sway;
    target.current.z = z;
    const damp = 1 - Math.pow(0.0015, delta);
    camera.position.x += (target.current.x - camera.position.x) * damp;
    camera.position.y += (target.current.y - camera.position.y) * damp;
    camera.position.z += (target.current.z - camera.position.z) * damp;
    // subtle look-ahead
    camera.lookAt(camera.position.x * 0.6, camera.position.y * 0.5, camera.position.z - 6);
  });

  return (
    <>
      <color attach="background" args={['#070d18']} />
      <fog attach="fog" args={['#070d18', 9, 26]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 2]} intensity={0.8} color="#7dd3fc" />
      <pointLight position={[0, 1, -12]} intensity={4} color="#22d3ee" distance={18} />
      <gridHelper args={[80, 60, '#12314a', '#0c1f33']} position={[0, -2.3, -12]} />
      {!reducedMotion && <Particles mobile={mobile} />}
      <Rings />
      <Structures mobile={mobile} />
      <Monolith />
    </>
  );
};

export default WebDevScene;
