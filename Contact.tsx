import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', company: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-40">
      <div className="absolute inset-0 bg-[#040406]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/[0.02] rounded-full blur-[200px]" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-px bg-cyan-400/30" />
              <span className="text-cyan-400/40 text-[9px] tracking-[0.5em] uppercase font-medium">Contact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-2xl md:text-4xl font-extralight tracking-tight leading-tight"
            >
              Let's work
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/18 text-sm font-light leading-relaxed mt-6 max-w-sm"
            >
              Whether you're a creator looking for a growth partner or a studio with a major production — let's talk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 space-y-5"
            >
              <div>
                <div className="text-white/10 text-[9px] tracking-[0.3em] uppercase mb-1">General</div>
                <div className="text-white/35 text-[13px] font-light">info@enosmedia.com</div>
              </div>
              <div>
                <div className="text-white/10 text-[9px] tracking-[0.3em] uppercase mb-1">Partnerships</div>
                <div className="text-white/35 text-[13px] font-light">partnerships@enosmedia.com</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <div className="bg-white/[0.015] border border-white/[0.03] rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[380px]">
                <CheckCircle size={36} strokeWidth={1.2} className="text-cyan-400/40 mb-4" />
                <h3 className="text-white/70 text-lg font-light mb-2">Message received</h3>
                <p className="text-white/18 text-sm font-light">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/[0.012] backdrop-blur-xl border border-white/[0.03] rounded-2xl p-6 md:p-8 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/10 text-[9px] tracking-[0.3em] uppercase block mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.015] border border-white/[0.04] rounded-lg px-3.5 py-2.5 text-white text-[13px] font-light focus:outline-none focus:border-cyan-400/20 transition-colors duration-500 placeholder:text-white/[0.06]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-white/10 text-[9px] tracking-[0.3em] uppercase block mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.015] border border-white/[0.04] rounded-lg px-3.5 py-2.5 text-white text-[13px] font-light focus:outline-none focus:border-cyan-400/20 transition-colors duration-500 placeholder:text-white/[0.06]"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/10 text-[9px] tracking-[0.3em] uppercase block mb-1.5">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-white/[0.015] border border-white/[0.04] rounded-lg px-3.5 py-2.5 text-white text-[13px] font-light focus:outline-none focus:border-cyan-400/20 transition-colors duration-500 placeholder:text-white/[0.06]"
                    placeholder="If applicable"
                  />
                </div>
                <div>
                  <label className="text-white/10 text-[9px] tracking-[0.3em] uppercase block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/[0.015] border border-white/[0.04] rounded-lg px-3.5 py-2.5 text-white text-[13px] font-light focus:outline-none focus:border-cyan-400/20 transition-colors duration-500 placeholder:text-white/[0.06] resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-white/[0.02] border border-white/[0.04] hover:border-cyan-400/15 rounded-xl text-white/40 hover:text-white/70 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-700 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] disabled:opacity-40"
                >
                  {submitting ? (
                    <div className="w-3.5 h-3.5 border border-white/15 border-t-white/50 rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={11} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
