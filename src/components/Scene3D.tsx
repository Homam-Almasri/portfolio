import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 2 + 0.5;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4a8fff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape({
  position,
  color,
  speed,
  shape,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  shape: "torus" | "icosa" | "octa" | "box";
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
      ref.current.rotation.z = clock.getElapsedTime() * speed * 0.2;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "torus":
        return <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />;
      case "icosa":
        return <icosahedronGeometry args={[0.5, 0]} />;
      case "octa":
        return <octahedronGeometry args={[0.4, 0]} />;
      case "box":
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="canvas-bg">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[-10, -5, 5]} intensity={0.3} color="#7c3aed" />

        <Particles />

        <FloatingShape position={[-4, 2, -3]} color="#00d4ff" speed={0.5} shape="torus" />
        <FloatingShape position={[4, -1, -4]} color="#7c3aed" speed={0.7} shape="icosa" />
        <FloatingShape position={[-3, -3, -2]} color="#ec4899" speed={0.4} shape="octa" />
        <FloatingShape position={[3, 3, -5]} color="#f59e0b" speed={0.6} shape="box" />
        <FloatingShape position={[0, -4, -6]} color="#10b981" speed={0.3} shape="torus" />
      </Canvas>
    </div>
  );
}
