import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Pricing', id: 'pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-3xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="h-[72px] flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group"
            >
              <img src="/images/logo.png" alt="" className="h-8 w-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-[13px] tracking-[0.35em] font-medium text-white/80 group-hover:text-white transition-colors duration-500">
                ENOS MEDIA
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-white/35 hover:text-white/80 transition-colors duration-500 rounded-lg hover:bg-white/[0.03]"
                >
                  {link.label}
                </button>
              ))}
              <div className="w-px h-4 bg-white/[0.06] mx-3" />
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2 text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-full transition-all duration-500 hover:bg-white/[0.03]"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white/50 hover:text-white p-2"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <motion.div animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="w-full h-[1px] bg-current origin-center" />
                <motion.div animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="w-full h-[1px] bg-current" />
                <motion.div animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="w-full h-[1px] bg-current origin-center" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/[0.97] backdrop-blur-3xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {[...navLinks, { label: 'Contact', id: 'contact' }].map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-white/60 hover:text-white text-lg tracking-[0.25em] uppercase font-light transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
