import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated gradient sphere that responds subtly to time
 */
const GradientSphere = ({ position, scale, speed }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#6366F1') },
      uColorB: { value: new THREE.Color('#8B5CF6') },
      uColorC: { value: new THREE.Color('#EC4899') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vPosition = position;

      vec3 pos = position;
      float noise = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.1;
      pos += normal * noise;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      float mixValue = sin(vUv.x * 3.14159 + uTime * 0.5) * 0.5 + 0.5;
      vec3 color1 = mix(uColorA, uColorB, mixValue);
      vec3 color2 = mix(uColorB, uColorC, vUv.y);
      vec3 finalColor = mix(color1, color2, sin(uTime * 0.3) * 0.5 + 0.5);

      float alpha = 0.6 - length(vUv - 0.5) * 0.8;
      gl_FragColor = vec4(finalColor, alpha * 0.4);
    }
  `;

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/**
 * Floating particles
 */
const Particles = ({ count = 100 }) => {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/**
 * Scene containing all 3D elements
 */
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <GradientSphere position={[-3, 1, -2]} scale={2.5} speed={0.3} />
      <GradientSphere position={[4, -1, -3]} scale={1.8} speed={0.4} />
      <GradientSphere position={[0, 2, -4]} scale={1.2} speed={0.5} />
      <Particles count={150} />
    </>
  );
};

/**
 * HeroCanvas - WebGL background with animated gradient meshes
 */
const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-primary)]" />
    </div>
  );
};

export default HeroCanvas;
