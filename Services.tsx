import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Film, Scissors, Palette, Mic, Video, BarChart3 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  film: <Film size={22} strokeWidth={1.2} />,
  scissors: <Scissors size={22} strokeWidth={1.2} />,
  palette: <Palette size={22} strokeWidth={1.2} />,
  mic: <Mic size={22} strokeWidth={1.2} />,
  video: <Video size={22} strokeWidth={1.2} />,
  chart: <BarChart3 size={22} strokeWidth={1.2} />,
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="relative py-28 lg:py-40">
      <div className="absolute inset-0 bg-[#030305]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-px bg-violet-400/30" />
              <span className="text-violet-400/40 text-[9px] tracking-[0.5em] uppercase font-medium">Capabilities</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-2xl md:text-4xl font-extralight tracking-tight"
            >
              End-to-end production
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/20 text-sm font-light max-w-sm"
          >
            From shoot to final delivery — every stage handled with precision.
          </motion.p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/[0.02] rounded-xl p-6 animate-pulse h-36" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
                className="group relative bg-white/[0.012] hover:bg-white/[0.025] border border-white/[0.03] hover:border-white/[0.07] rounded-xl p-5 md:p-6 transition-all duration-700 cursor-default"
              >
                <div className="text-white/15 group-hover:text-cyan-400/40 transition-colors duration-700 mb-4">
                  {iconMap[s.icon_name] || <Film size={22} />}
                </div>
                <h3 className="text-white/70 text-[13px] font-medium tracking-wide mb-1.5">{s.title}</h3>
                <p className="text-white/20 text-xs leading-relaxed font-light">{s.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
