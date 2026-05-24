import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function Loader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <img src="/images/logo.png" alt="" className="w-12 h-12 mx-auto mb-5 object-contain opacity-60" />
        <div className="text-white/15 text-[9px] tracking-[0.5em] uppercase font-medium">Enos Media</div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-cyan-400/30 to-violet-500/30 mx-auto mt-4"
        />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-black min-h-screen"
        >
          <ScrollProgress />
          <Navbar />
          <Hero />
          <Services />
          <Portfolio />
          <Pricing />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
