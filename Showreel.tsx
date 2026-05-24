import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';

export default function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[#060609]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setPlaying(true)}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('/images/showreel-bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" style={{ animationDuration: '2s' }} />
              <Play className="text-white/70 ml-1" size={28} />
            </motion.div>
          </div>

          {/* Label */}
          <div className="absolute bottom-8 left-8">
            <div className="text-cyan-400/60 text-[10px] tracking-[0.4em] uppercase mb-2">2025</div>
            <div className="text-white text-xl md:text-2xl font-light tracking-wide">Showreel</div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-8 right-8 text-white/30 text-xs tracking-[0.2em]">
            02:34
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setPlaying(false)}
        >
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
          <div className="max-w-5xl w-full aspect-video bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Play className="text-white/20 mx-auto mb-4" size={48} />
              <p className="text-white/20 text-sm tracking-[0.2em] uppercase">Showreel Playing</p>
              <p className="text-white/10 text-xs mt-2">Click anywhere to close</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
