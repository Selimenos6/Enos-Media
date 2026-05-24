import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            transform: `translate(${mouse.x * 0.2}px, ${mouse.y * 0.2}px) scale(1.08)`,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div className="absolute inset-0 bg-[#000000]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-violet-950/10" />
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-[15%] w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-[15%] w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[180px]" />

      {/* Content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-flex items-center gap-2.5 mb-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-subtle-glow" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-medium">
            Growth Partner & Production Studio
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-extralight tracking-[0.08em] leading-[0.9] text-white"
          >
            ENOS
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-extralight tracking-[0.08em] leading-[0.9]"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              MEDIA
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-white/25 text-[15px] md:text-base tracking-[0.08em] mt-10 font-light max-w-lg mx-auto leading-relaxed"
        >
          Content creators' growth partner, production studios' creative engine
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-7 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.16] text-white/80 hover:text-white text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-700 flex items-center gap-2"
          >
            View Plans
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-500"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 text-white/30 hover:text-white/60 text-[11px] tracking-[0.2em] uppercase transition-colors duration-500"
          >
            See Work
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/10 text-[8px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
