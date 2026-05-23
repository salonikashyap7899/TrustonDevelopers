import { useRef } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";

// Lightweight animated building visualization
function BuildingVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxe-cyan/5 to-transparent rounded-3xl" />
      
      {/* Grid base */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          backgroundImage: `
            linear-gradient(var(--luxe-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--luxe-cyan) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.1,
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Animated building blocks */}
      <div className="relative flex items-end justify-center gap-3 md:gap-4">
        {/* Building 1 */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 120, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-12 md:w-16 bg-gradient-to-t from-[#1a3a4a] to-[#0d2a3a] rounded-t-lg relative overflow-hidden"
        >
          {/* Windows */}
          <div className="absolute inset-2 grid grid-cols-2 gap-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-luxe-cyan/20 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Tower */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 200, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          className="w-16 md:w-20 bg-gradient-to-t from-[#1a3a4a] to-[#153040] rounded-t-lg relative overflow-hidden"
        >
          {/* Windows */}
          <div className="absolute inset-3 grid grid-cols-3 gap-1">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-luxe-cyan/30 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
              />
            ))}
          </div>
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-luxe-cyan/50" />
        </motion.div>

        {/* Building 2 */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 150, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="w-14 md:w-16 bg-gradient-to-t from-[#0d2a3a] to-[#1a3a4a] rounded-t-lg relative overflow-hidden"
        >
          {/* Windows */}
          <div className="absolute inset-2 grid grid-cols-2 gap-1">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-luxe-cyan/25 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Small accent building */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 80, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-10 md:w-12 bg-luxe-cyan/20 rounded-t-lg border border-luxe-cyan/30"
        />
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-luxe-cyan/40 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function PlotsAndStructures() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-luxe-blue rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-luxe-cyan rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            <Reveal>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mt-4 mb-6 md:mb-8">
                Building <em className="text-luxe-cyan italic">Plots & Structures</em>
              </h2>
            </Reveal>

            <div className="space-y-6 md:space-y-8 text-white/50 text-base md:text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>
                  Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow&apos;s most promising corridors, offering 100% legal clearance and Jila Panchayat approval.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-8 md:gap-12 pt-6 md:pt-8">
                  <div className="border-l-2 border-luxe-cyan/30 pl-4 md:pl-6">
                    <p className="text-2xl md:text-3xl font-display text-white mb-1 md:mb-2">150+</p>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/40">Premium Plots</p>
                  </div>
                  <div className="border-l-2 border-luxe-cyan/30 pl-4 md:pl-6">
                    <p className="text-2xl md:text-3xl font-display text-white mb-1 md:mb-2">Elite</p>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/40">Architectural Support</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Visual Side */}
          <div className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px] relative rounded-3xl border border-white/5 overflow-hidden">
            <BuildingVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
