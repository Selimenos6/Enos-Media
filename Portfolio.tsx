import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  year: string;
  client: string;
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="work" className="relative py-28 lg:py-40">
      <div className="absolute inset-0 bg-[#050507]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute right-0 top-1/3 w-[700px] h-[700px] bg-cyan-500/[0.02] rounded-full blur-[250px]" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-6 h-px bg-cyan-400/30" />
          <span className="text-cyan-400/40 text-[9px] tracking-[0.5em] uppercase font-medium">Selected Work</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-2xl md:text-4xl font-extralight tracking-tight mb-16"
        >
          Recent projects
        </motion.h2>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[16/9] bg-white/[0.01] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-20 text-center"
          >
            <p className="text-white/15 text-sm font-light">Projects will appear here.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.image_url}')` }}
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Border on hover */}
                <div className="absolute inset-0 rounded-xl border border-white/[0.03] group-hover:border-cyan-400/10 transition-all duration-700" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-cyan-400/40 text-[9px] tracking-[0.3em] uppercase font-medium">{p.category}</span>
                    {p.year && (
                      <>
                        <span className="text-white/10 text-[8px]">●</span>
                        <span className="text-white/15 text-[9px] tracking-[0.15em]">{p.year}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-white/90 text-lg md:text-xl font-light tracking-wide">{p.title}</h3>
                  {p.description && (
                    <p className="text-white/25 text-xs font-light mt-1.5 max-w-md leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  {p.client && (
                    <p className="text-white/12 text-[10px] tracking-[0.15em] uppercase mt-3">{p.client}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
