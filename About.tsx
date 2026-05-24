import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px]" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px bg-cyan-400/50" />
          <span className="text-cyan-400/60 text-xs tracking-[0.4em] uppercase">Hakkımızda</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white text-3xl md:text-5xl font-extralight leading-tight"
            >
              Hikayeyi iyi
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                anlatmak işimiz
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/40 text-base md:text-lg leading-relaxed mt-8 font-light"
            >
              Enos Media, Antalya'da kurulmuş bir video prodüksiyon ve kurgu ekibi.
              Her kareye özen göstererek, markaların ve hikayelerin en iyi haliyle
              izleyiciye ulaşması için çalışıyoruz.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/30 text-base leading-relaxed mt-6 font-light"
            >
              Çekimden kurguya, renk düzeltmeden son teslime kadar sürecin her
              aşamasında yanınızdayız. Büyük sözler yerine iyi işler üretmeye
              odaklanıyoruz.
            </motion.p>
          </div>

          {/* Glassmorphism Card - Simple & Honest */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 md:p-10"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 mt-2 shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm font-light">Video Prodüksiyon</div>
                    <div className="text-white/30 text-xs mt-1">Çekim planlaması ve prodüksiyon yönetimi</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-violet-400/60 mt-2 shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm font-light">Video Kurgu</div>
                    <div className="text-white/30 text-xs mt-1">Kurgu, renk düzeltme ve ses tasarımı</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 mt-2 shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm font-light">İçerik Üretimi</div>
                    <div className="text-white/30 text-xs mt-1">Sosyal medya ve dijital platformlar için</div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" />
                <span className="text-white/30 text-xs tracking-[0.15em]">
                  Antalya merkezli · Yeni yolculuğumuza başladık
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
