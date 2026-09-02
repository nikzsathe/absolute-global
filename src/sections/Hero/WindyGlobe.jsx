import {Suspense, useMemo, useRef, useEffect, useState} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import WindyGlobeMesh from './WindyGlobeMesh';

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

// Imperceptible drift (0.018 rad/s) + damped mouse parallax on desktop.
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

const GlobeCanvas = ({mobile}) => (
  <Canvas
    camera={{position: [0, 0, 3.1], fov: 42}}
    dpr={mobile ? [1, 1.25] : [1, 1.75]}
    gl={{alpha: true, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: true}}
    style={{pointerEvents: 'none'}}
  >
    <GlobeRig>
      <Suspense fallback={null}>
        <WindyGlobeMesh
          url={mobile ? '/models/windy-day-mobile.glb' : '/models/windy-day.glb'}
          opacity={mobile ? 0.4 : 0.7}
          fps={mobile ? 20 : 25}
        />
      </Suspense>
    </GlobeRig>
  </Canvas>
);

const WindyGlobe = () => {
  const [supported, setSupported] = useState(null);
  const mobile = useMemo(() => isMobileDevice(), []);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (supported === null) return null; // decide after mount; Hero renders meanwhile
  if (!supported) {
    return (
      <div className="ag-hero__globe-fallback" aria-hidden="true">
        <img src="/assets/img/hero-background.webp" alt="" loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`ag-hero__globe${mobile ? ' ag-hero__globe--mobile' : ''}`} aria-hidden="true">
      <GlobeCanvas mobile={mobile} />
    </div>
  );
};

export default WindyGlobe;
