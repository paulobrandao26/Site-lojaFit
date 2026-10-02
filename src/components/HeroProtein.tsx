import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function HeroProtein() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="w-full [perspective:1000px]">
      <motion.img
        src="/whaypng.png"
        alt="Pote de whey"
        style={{ rotateX: rx, rotateY: ry }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto max-h-[420px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}