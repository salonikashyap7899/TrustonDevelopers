import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const floatingMetrics = [
    { value: "150+", label: "Acres Developed", top: "20%", left: "15%", delay: 0 },
    { value: "4.8k", label: "Families Served", bottom: "25%", left: "20%", delay: -2 },
    { value: "$2.4B+", label: "Asset Value", top: "30%", right: "15%", delay: -5 },
    { value: "20+", label: "Global Awards", bottom: "35%", right: "20%", delay: -8 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0b0e12" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Architectural grid overlay */}
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />

          {/* Floating Luxury Brand Metrics */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {floatingMetrics.map((metric, i) => (
              <motion.div
                key={i}
                className="floating-metric absolute glass-panel px-8 py-4 rounded-xl"
                style={{
                  top: metric.top,
                  bottom: metric.bottom,
                  left: metric.left,
                  right: metric.right,
                  animationDelay: `${metric.delay}s`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-display text-4xl text-primary mb-1">{metric.value}</span>
                <span className="text-label-md text-on-surface/60 uppercase tracking-[0.2em]">{metric.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Dark exit curtain */}
          <motion.div
            className="absolute inset-0 origin-bottom z-10"
            style={{ backgroundColor: "#0b0e12" }}
            initial={{ scaleY: 0 }}
            animate={phase === "exit" ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <div className="relative z-[5] text-center">
            {/* Logo with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 flex justify-center"
            >
              <img
                src="/logo.png"
                alt="Truston Logo"
                className="h-32 w-auto animate-pulse opacity-90"
                style={{ filter: "drop-shadow(0 0 30px rgba(169, 199, 255, 0.3))" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl text-on-surface mb-8 tracking-tighter"
            >
              The Standard of <span className="text-primary italic">Permanence</span>
            </motion.h2>

            {/* CTA Button */}
            <AnimatePresence>
              {phase !== "logo" && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-button uppercase tracking-[0.4em] text-primary border border-primary/30 px-12 py-5 hover:bg-primary hover:text-on-primary transition-all duration-700"
                  onClick={() => {
                    setPhase("exit");
                    setTimeout(() => setVisible(false), 600);
                  }}
                >
                  Enter The Legacy
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-label-md uppercase tracking-widest text-[10px] text-on-surface/40">Scroll to Begin</span>
            <motion.div
              className="w-px h-12 bg-primary/40"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
