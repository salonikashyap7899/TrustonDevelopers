import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const t1 = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t1);
  }, []);

  const enterSite = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--ink, #080807)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Video Background with Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Cinematic fallback background */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 30%, rgba(45,107,196,0.08) 0%, transparent 70%),
                  linear-gradient(160deg, #0F0D08 0%, #080807 40%, #0A0A08 100%)
                `
              }}
            />
            
            {/* Animated grid lines */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(45,107,196,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(45,107,196,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                animation: 'gridDrift 20s ease-in-out infinite alternate'
              }}
            />

            {/* Video (uncomment when you have a real video) */}
            {/* <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/intro-video.mp4" type="video/mp4" />
            </video> */}
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom,
                  rgba(8,8,7,0.55) 0%,
                  rgba(8,8,7,0.3) 40%,
                  rgba(8,8,7,0.7) 100%)`
              }}
            />
          </div>

          {/* Corner Details */}
          <motion.div 
            className="absolute top-8 left-8 md:left-12 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Lucknow &middot; Uttar Pradesh
          </motion.div>
          <motion.div 
            className="absolute top-8 right-8 md:right-12 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.6 }}
          >
            Est. 2025
          </motion.div>
          <motion.div 
            className="absolute bottom-8 left-8 md:left-12 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/30 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.7 }}
          >
            Prime Estate
          </motion.div>
          <motion.div 
            className="absolute bottom-8 right-8 md:right-12 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/30 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            Residential Plots &middot; Construction &middot; Architecture
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="relative z-10 text-center flex flex-col items-center px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 40 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-[var(--accent,#2D6BC4)]/30" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[var(--accent,#2D6BC4)]">
                Lucknow&apos;s Trusted Property Developers
              </span>
              <div className="w-10 h-px bg-[var(--accent,#2D6BC4)]/30" />
            </div>

            {/* Logo Text */}
            <h1 
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.06em] text-white/90 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              TRUST<span className="text-[var(--accent,#2D6BC4)]">ON</span>
              <em 
                className="block text-lg md:text-xl tracking-[0.3em] text-white/40 mt-2 font-light not-italic uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200 }}
              >
                Developers
              </em>
            </h1>

            {/* Animated Line */}
            <motion.div 
              className="w-px h-0 bg-[var(--accent,#2D6BC4)]/30 my-10"
              animate={{ height: showContent ? 60 : 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            />

            {/* Tagline */}
            <motion.p 
              className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/40 mb-12 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ delay: 1.2 }}
            >
              Build Your Future On Solid Ground
            </motion.p>

            {/* Enter Button */}
            <motion.button
              onClick={enterSite}
              className="group relative inline-flex items-center gap-4 border border-[var(--accent,#2D6BC4)] px-10 py-4 text-[var(--accent,#2D6BC4)] text-[11px] md:text-xs uppercase tracking-[0.22em] bg-transparent cursor-pointer overflow-hidden transition-colors duration-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover fill background */}
              <motion.div 
                className="absolute inset-0 bg-[var(--accent,#2D6BC4)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 group-hover:text-[var(--ink,#080807)] transition-colors duration-300">
                Explore Website
              </span>
              <span className="relative z-10 text-base group-hover:text-[var(--ink,#080807)] group-hover:translate-x-1.5 transition-all duration-300">
                &rarr;
              </span>
            </motion.button>
          </motion.div>

          {/* Floating ambient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(45,107,196,0.06) 0%, transparent 70%)",
              top: "5%",
              left: "15%",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(45,107,196,0.04) 0%, transparent 70%)",
              bottom: "10%",
              right: "10%",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
