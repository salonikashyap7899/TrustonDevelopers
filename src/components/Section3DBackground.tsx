import { motion } from "framer-motion";

export function Section3DBackground({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Large ambient glow — top right */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,191,255,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow — bottom left */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,80,200,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
