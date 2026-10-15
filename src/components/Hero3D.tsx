import { Float, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
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
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.15, 2.2, 48]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.82, 1.18, 0.45, 48]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.42, 48]} />
        <meshStandardMaterial color="#1d1d22" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[1.215, 1.215, 0.09, 48]} />
        <meshStandardMaterial color="#d9a322" roughness={0.25} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[1.17, 1.17, 0.16, 48]} />
        <meshStandardMaterial color="#d9a322" roughness={0.25} metalness={0.8} />
      </mesh>
      <Text position={[0, -0.05, 1.22]} fontSize={0.32} fontWeight={800} color="white" anchorX="center" anchorY="middle">
        PROTEIN
      </Text>
    </group>
  );
}

function AnimatedText({ children, delay = 0, direction = 'right' }: { children: string; delay?: number; direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!ref.current || !isInView) return;

    const xStart = direction === 'right' ? 100 : -100;
    
    gsap.fromTo(
      ref.current,
      {
        x: xStart,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        ease: 'power3.out',
      }
    );
  }, [isInView, delay, direction]);

  const isGradient = children.includes('Força');

  return (
    <h1 
      ref={ref} 
      style={{ opacity: 0 }}
      className={isGradient 
        ? "bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] bg-clip-text text-5xl font-bold leading-[1.1] text-transparent sm:text-6xl lg:text-7xl xl:text-8xl"
        : "text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
      }
    >
      {children}
    </h1>
  );
}

export function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gsap.fromTo(
      canvasRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !canvasRef.current || !textRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      gsap.to(canvasRef.current, {
        x: xPos * 30,
        y: yPos * 30,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(textRef.current, {
        x: xPos * -15,
        y: yPos * -15,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-[#d9a322]/10 blur-3xl" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-[#a3ff5e]/10 blur-3xl" style={{ transform: 'translateZ(0)' }} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          <div ref={textRef} className="space-y-6 lg:space-y-8 will-change-transform">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d9a322]"
            >
              Fitness Premium
            </motion.div>

            <div className="space-y-2 overflow-hidden lg:space-y-4">
              <AnimatedText direction="right" delay={0.1}>
                Potencialize
              </AnimatedText>
              
              <AnimatedText direction="left" delay={0.3}>
                Seu Treino
              </AnimatedText>
              
              <AnimatedText direction="right" delay={0.5}>
                com Força
              </AnimatedText>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="max-w-xl text-lg leading-relaxed text-gray-400 lg:text-xl"
            >
              Suplementos premium desenvolvidos para quem busca resultados reais. 
              Qualidade superior em cada pote.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <button className="group relative overflow-hidden bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:scale-105">
                <span className="relative z-10">Explorar Produtos</span>
                <div className="absolute inset-0 -translate-x-full bg-[#d9a322] transition-transform duration-300 group-hover:translate-x-0" />
                <span className="absolute inset-0 z-10 flex items-center justify-center translate-x-full text-black transition-transform duration-300 group-hover:translate-x-0">
                  Explorar Produtos
                </span>
              </button>
              
              <button className="border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-[#d9a322] hover:bg-[#d9a322]/10">
                Ver Mais
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">25g</div>
                <div className="text-sm text-gray-500">Proteína</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">0g</div>
                <div className="text-sm text-gray-500">Açúcar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-500">Qualidade</div>
              </div>
            </motion.div>
          </div>

          <div ref={canvasRef} className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px] will-change-transform" style={{ opacity: 0 }}>
            <Canvas camera={{ position: [0, 0.3, 5], fov: 42 }} dpr={[1, 2]}>
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <spotLight position={[4, 5, 4]} intensity={4} />
              <spotLight position={[-4, 5, -4]} intensity={3} />
              <pointLight position={[-4, 1, 3]} intensity={2} color="#a3ff5e" />
              <pointLight position={[2, -2, 2]} intensity={2} color="#ffffff" />
              <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
              <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
                <Pote />
              </Float>
            </Canvas>
            
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_#d9a322_0%,_transparent_70%)] opacity-20" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-gray-600">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-12 w-6 rounded-full border-2 border-white/20"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mt-2 h-2 w-1 rounded-full bg-[#d9a322]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}