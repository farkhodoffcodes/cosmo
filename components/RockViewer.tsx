import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedRockProps {
    color?: string;
    distort?: number;
    speed?: number;
}

const AnimatedRock = ({ color = "#8c735a", distort = 0.4, speed = 1.5 }: AnimatedRockProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.6}
        metalness={0.8}
        bumpScale={0.02}
      />
    </Sphere>
  );
};

const ScanLight = () => {
  const lightRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lightRef.current.position.y = Math.sin(t) * 2.5;
  });

  return (
    <group ref={lightRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial 
            color="#fb923c" 
            transparent 
            opacity={0.05} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color="#fb923c" intensity={2} distance={3} decay={2} />
    </group>
  );
}

interface RockViewerProps {
    color?: string;
    distort?: number;
}

export const RockViewer: React.FC<RockViewerProps> = ({ color, distort }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffdcb4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
        
        <AnimatedRock color={color} distort={distort} />
        <ScanLight />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};