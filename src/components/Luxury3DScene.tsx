import { motion } from "framer-motion";

/**
 * Lightweight CSS-based luxury scene
 * Replaces heavy Three.js Canvas for better performance
 */
export function Luxury3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden">
      {/* Animated floating rings using CSS */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border"
            style={{
              width: `${200 + ring * 100}px`,
              height: `${200 + ring * 100}px`,
              borderColor: ring === 2 ? "var(--luxe-cyan)" : "var(--luxe-blue)",
              borderWidth: "1px",
              opacity: 0.2,
            }}
            animate={{ 
              rotate: ring % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 30 + ring * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4 + ring, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {/* Floating architectural shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-24 h-1 bg-luxe-blue/30 rounded-full blur-sm" />
        <div className="w-1 h-20 bg-luxe-blue/20 rounded-full blur-sm -mt-10 ml-2" />
        <div className="w-1 h-20 bg-luxe-blue/20 rounded-full blur-sm -mt-10 ml-20" />
        <div className="w-20 h-1 bg-luxe-blue/30 rounded-full blur-sm ml-2" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-32 h-1 bg-luxe-cyan/30 rounded-full blur-sm" />
        <div className="w-1 h-24 bg-luxe-cyan/20 rounded-full blur-sm -mt-12 ml-4" />
        <div className="w-1 h-24 bg-luxe-cyan/20 rounded-full blur-sm -mt-12 ml-24" />
        <div className="w-28 h-1 bg-luxe-cyan/30 rounded-full blur-sm ml-4" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 11) % 70}%`,
            background: i % 2 === 0 ? "var(--luxe-cyan)" : "var(--luxe-blue)",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--luxe-blue) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.3,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--luxe-cyan) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.2,
        }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
