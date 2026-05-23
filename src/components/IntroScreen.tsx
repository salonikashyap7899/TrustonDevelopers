import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Faster intro timing for better UX
    const t1 = setTimeout(() => setPhase("text"), 250);
    const t2 = setTimeout(() => setPhase("exit"), 700);
    const t3 = setTimeout(() => setVisible(false), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Gradient background instead of video for performance */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
          
          {/* Subtle animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--luxe-cyan), transparent 70%)",
                opacity: 0.1,
                top: "-15%",
                right: "10%",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--luxe-blue), transparent 70%)",
                opacity: 0.08,
                bottom: "10%",
                left: "15%",
              }}
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Grid lines - reduced count */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${(i + 1) * (100 / 7)}%`, background: "rgba(0,191,255,0.03)" }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* Exit curtain */}
          <motion.div
            className="absolute inset-0 origin-bottom z-[10] bg-background"
            initial={{ scaleY: 0 }}
            animate={phase === "exit" ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <div className="relative z-[5] flex flex-col items-center gap-6 px-4">
            {/* Logo with subtle rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {[1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full"
                  style={{
                    width: 80 + ring * 50,
                    height: 80 + ring * 50,
                    border: "1px solid var(--luxe-cyan)",
                    opacity: 0.15,
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.05, 0.15] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: ring * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <img
                src="/logo.png"
                alt="TrustOn"
                className="h-16 w-16 md:h-20 md:w-20 object-contain brightness-125 relative z-10"
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display tracking-tight text-white leading-none text-4xl md:text-5xl lg:text-6xl">
                TRUST<span className="text-luxe-cyan">ON</span>
              </h1>
              <div className="flex items-center gap-4">
                <motion.div
                  className="h-px bg-luxe-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
                  Billion Dollar Legacy
                </span>
                <motion.div
                  className="h-px bg-luxe-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Loading Progress */}
            <div className="w-32 md:w-40 h-px relative overflow-hidden mt-2 bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 bg-luxe-cyan"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
