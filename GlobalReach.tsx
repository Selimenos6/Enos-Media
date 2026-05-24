import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const offices = [
  { city: 'London', region: 'Europe', lat: '51.5', lng: '-0.1' },
  { city: 'Los Angeles', region: 'North America', lat: '34.0', lng: '-118.2' },
  { city: 'Tokyo', region: 'Asia Pacific', lat: '35.7', lng: '139.7' },
  { city: 'Dubai', region: 'Middle East', lat: '25.2', lng: '55.3' },
  { city: 'São Paulo', region: 'South America', lat: '-23.5', lng: '-46.6' },
  { city: 'Sydney', region: 'Oceania', lat: '-33.9', lng: '151.2' },
];

export default function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#08080c]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-violet-400/50" />
          <span className="text-violet-400/60 text-xs tracking-[0.4em] uppercase">Global Presence</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white text-3xl md:text-5xl font-extralight mb-20"
        >
          Worldwide <span className="text-white/30">reach</span>
        </motion.h2>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl p-8 md:p-12 mb-16"
        >
          {/* SVG World Map Abstract */}
          <div className="relative w-full aspect-[2/1] flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-white/20"
                  style={{ top: `${20 + i * 15}%` }}
                />
              ))}
              {[...Array(9)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-white/20"
                  style={{ left: `${10 + i * 10}%` }}
                />
              ))}
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
              {/* Curved connection lines between offices */}
              <motion.path
                d="M 350 180 Q 500 100 650 200"
                stroke="url(#lineGrad)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 650 200 Q 750 150 800 180"
                stroke="url(#lineGrad2)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.8 }}
              />
              <motion.path
                d="M 350 180 Q 300 250 350 320"
                stroke="url(#lineGrad)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 1.1 }}
              />
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.4)" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0.4)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Office Points */}
            {offices.map((office, i) => {
              const positions = [
                { left: '35%', top: '36%' },
                { left: '15%', top: '38%' },
                { left: '80%', top: '36%' },
                { left: '58%', top: '42%' },
                { left: '28%', top: '66%' },
                { left: '85%', top: '72%' },
              ];
              return (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                  className="absolute group cursor-default"
                  style={{ left: positions[i].left, top: positions[i].top }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors duration-300" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400/30 animate-ping" />
                    <div className="absolute -inset-4 rounded-full bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors duration-300" />
                  </div>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2">
                      <div className="text-white text-xs font-light">{office.city}</div>
                      <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase">{office.region}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {offices.slice(0, 3).map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:border-white/10 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-light tracking-wide">{office.city}</h3>
                <div className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400/80 transition-colors duration-300" />
              </div>
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase">{office.region} Headquarters</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
