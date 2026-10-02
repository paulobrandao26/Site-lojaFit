import { Float, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';

function Pote() {
  const grupo = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!grupo.current) return;
    const { x, y } = state.pointer;
    const scroll = Math.min(window.scrollY / 600, 1);
    grupo.current.rotation.y += (x * 0.8 + scroll * 2.2 - grupo.current.rotation.y) * 0.06;
    grupo.current.rotation.x += (0.15 + -y * 0.4 + scroll * 0.6 - grupo.current.rotation.x) * 0.06;
    grupo.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });

  return (
    <group ref={grupo}>
      {/* corpo */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.15, 2.2, 48]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.32} metalness={0.15} />
      </mesh>
      {/* ombro */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.82, 1.18, 0.45, 48]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.32} metalness={0.15} />
      </mesh>
      {/* tampa */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.42, 48]} />
        <meshStandardMaterial color="#1d1d22" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* faixas douradas */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[1.215, 1.215, 0.09, 48]} />
        <meshStandardMaterial color="#d9a322" roughness={0.25} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[1.17, 1.17, 0.16, 48]} />
        <meshStandardMaterial color="#d9a322" roughness={0.25} metalness={0.8} />
      </mesh>
      {/* texto */}
      <Text position={[0, -0.05, 1.22]} fontSize={0.32} fontWeight={800} color="white" anchorX="center" anchorY="middle">
        PROTEIN
      </Text>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="h-[320px] w-full sm:h-[420px] lg:h-[520px]">
      <Canvas camera={{ position: [0, 0.3, 5], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <spotLight position={[4, 5, 4]} intensity={1.4} />
        <pointLight position={[-4, 1, 3]} intensity={0.5} color="#a3ff5e" />
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
          <Pote />
        </Float>
      </Canvas>
    </div>
  );
}