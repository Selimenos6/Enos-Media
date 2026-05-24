import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-10">
      <div className="absolute inset-0 bg-[#020204]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="" className="h-5 w-5 object-contain opacity-50" />
            <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase font-medium">Enos Media</span>
          </div>

          <div className="flex items-center gap-6">
            {['Services', 'Work', 'Pricing', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/10 hover:text-white/30 text-[9px] tracking-[0.2em] uppercase transition-colors duration-500"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="text-white/[0.06] text-[9px] tracking-[0.12em]">
            © 2025 Enos Media
          </div>
        </div>
      </div>
    </footer>
  );
}
