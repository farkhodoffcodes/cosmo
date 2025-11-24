import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const EarthMesh = () => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  
  // Using reliable textures from standard sources
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    earthRef.current.rotation.y = t * 0.05;
    cloudsRef.current.rotation.y = t * 0.07;
  });

  return (
    <group scale={2.5}>
      {/* Earth Sphere */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={5}
        />
      </Sphere>
      
      {/* Clouds Sphere */}
      <Sphere ref={cloudsRef} args={[1.02, 64, 64]}>
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[1.2, 64, 64]}>
        <meshPhongMaterial
          color="#4b96f3"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

export const EarthViewer: React.FC = () => {
  return (
    <div className="w-full h-full relative min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffeedd" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4444ff" />
        
        <React.Suspense fallback={null}>
            <EarthMesh />
        </React.Suspense>
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      {/* UI Overlays */}
      <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/80 font-mono tracking-widest uppercase">
          Global Monitoring
        </span>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur border border-white/10 rounded-full">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs text-white/80 font-bold tracking-wider">ONLINE</span>
        </div>
      </div>

       {/* Framing grid lines */}
       <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl">
        <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-white/5"></div>
        <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-white/5"></div>
      </div>
    </div>
  );
};