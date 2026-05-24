import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Crown } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  slug: string;
  price: string;
  period: string;
  description: string;
  features: string;
  is_popular: boolean;
  cta_text: string;
  sort_order: number;
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pricing')
      .then((r) => r.json())
      .then(setPlans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const regularPlans = plans.filter(p => p.slug !== 'enterprise');
  const enterprisePlan = plans.find(p => p.slug === 'enterprise');

  return (
    <section id="pricing" className="relative py-28 lg:py-40">
      <div className="absolute inset-0 bg-[#030305]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.015] rounded-full blur-[300px]" />
      <div className="absolute right-1/3 top-1/3 w-[600px] h-[600px] bg-violet-600/[0.02] rounded-full blur-[250px]" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-6 h-px bg-cyan-400/30" />
            <span className="text-cyan-400/40 text-[9px] tracking-[0.5em] uppercase font-medium">Pricing</span>
            <div className="w-6 h-px bg-cyan-400/30" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white text-2xl md:text-4xl font-extralight tracking-tight mb-4"
          >
            Choose your plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/20 text-sm font-light max-w-md mx-auto"
          >
            From solo creators to production studios — scalable solutions for every stage.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/[0.02] rounded-2xl p-8 animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <>
            {/* 3 Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {regularPlans.map((plan, i) => {
                const features: string[] = JSON.parse(plan.features || '[]');
                const isPopular = plan.is_popular;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                    className={`relative rounded-2xl p-6 md:p-7 transition-all duration-700 ${
                      isPopular
                        ? 'bg-white/[0.035] border border-cyan-400/15 shadow-[0_0_80px_-20px_rgba(34,211,238,0.08)] md:scale-[1.03] md:-my-2'
                        : 'bg-white/[0.012] border border-white/[0.03] hover:border-white/[0.06]'
                    }`}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1.5 px-3.5 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                          <Sparkles size={9} className="text-cyan-400/70" />
                          <span className="text-cyan-400/80 text-[8px] tracking-[0.25em] uppercase font-medium">Most Popular</span>
                        </div>
                      </div>
                    )}

                    {/* Top glow for popular */}
                    {isPopular && (
                      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                    )}

                    <div className="relative z-10">
                      {/* Plan name */}
                      <h3 className="text-white/60 text-[13px] font-medium tracking-wide mb-1">{plan.name}</h3>
                      <p className="text-white/18 text-[11px] font-light mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-7">
                        <span className={`text-3xl md:text-4xl font-extralight tracking-tight ${isPopular ? 'text-white' : 'text-white/80'}`}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-white/15 text-[11px] tracking-wider font-light">/ {plan.period}</span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-2.5 mb-8">
                        {features.map((f, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <Check size={12} strokeWidth={2} className={`mt-[3px] shrink-0 ${isPopular ? 'text-cyan-400/40' : 'text-white/10'}`} />
                            <span className="text-white/30 text-[12px] font-light leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={scrollToContact}
                        className={`w-full py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-700 flex items-center justify-center gap-1.5 ${
                          isPopular
                          ? 'bg-gradient-to-r from-cyan-400/12 to-violet-500/12 border border-cyan-400/20 text-white/80 hover:text-white hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]'
                          : 'bg-white/[0.02] border border-white/[0.04] text-white/35 hover:text-white/70 hover:border-white/[0.1] hover:bg-white/[0.04]'
                        }`
                      }
                      >
                        {plan.cta_text}
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enterprise / Studio & Production */}
            {enterprisePlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-6 max-w-4xl mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-black to-cyan-950/20" />
                  <div className="absolute inset-0 bg-white/[0.008]" />
                  <div className="absolute inset-0 border border-violet-400/[0.06] rounded-2xl" />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-violet-400/[0.06] border border-violet-400/[0.08] flex items-center justify-center shrink-0">
                        <Crown size={18} strokeWidth={1.2} className="text-violet-400/40" />
                      </div>
                      <div>
                        <h3 className="text-white/70 text-[14px] font-medium tracking-wide">{enterprisePlan.name}</h3>
                        <p className="text-white/18 text-[11px] font-light mt-0.5">{enterprisePlan.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={scrollToContact}
                      className="group px-6 py-2.5 bg-violet-400/[0.06] border border-violet-400/[0.12] hover:border-violet-400/25 text-white/50 hover:text-white/80 text-[10px] tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-700 flex items-center gap-1.5 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] shrink-0"
                    >
                      {enterprisePlan.cta_text}
                      <ArrowRight size={10} className="opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
