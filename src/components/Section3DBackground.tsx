import { motion } from "framer-motion";

/**
 * Lightweight CSS-based 3D background effect
 * Replaces heavy Three.js Canvas for better performance
 */
export function Section3DBackground({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated gradient sphere simulation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Core glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, var(--luxe-cyan) 0%, transparent 60%)",
            opacity: 0.3,
            filter: "blur(40px)",
          }}
        />
        {/* Secondary glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 70% 70%, var(--luxe-blue) 0%, transparent 60%)",
            opacity: 0.4,
            filter: "blur(50px)",
          }}
        />
        {/* Inner highlight */}
        <div 
          className="absolute inset-[15%] rounded-full border border-white/5"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </motion.div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--luxe-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--luxe-cyan) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
