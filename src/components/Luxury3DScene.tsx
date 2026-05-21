import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.cos(t / 4) / 8;
      sphereRef.current.rotation.y = Math.sin(t / 2) / 8;
      sphereRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1, 100, 100]} scale={1.8}>
          <MeshDistortMaterial
            color="oklch(0.50 0.155 245)"
            speed={2}
            distort={0.5}
            radius={1}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1} position={[3, 2, -2]}>
        <Torus ref={torusRef} args={[0.5, 0.2, 16, 100]} scale={1.2}>
          <MeshDistortMaterial
            color="#3b89e8"
            speed={3}
            distort={0.3}
            radius={1}
            metalness={0.8}
            roughness={0.2}
          />
        </Torus>
      </Float>
    </>
  );
}

function Particles({ count = 80 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="oklch(0.50 0.155 245)"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function Luxury3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="oklch(0.50 0.155 245)" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#2d6bc4" />
        <AnimatedShape />
        <Particles count={80} />
      </Canvas>
    </div>
  );
}
