import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * WhoWeAreSection Component
 * Sobha Realty-inspired parallax floating effect with multi-layer depth
 * Features:
 * - Background image with 40-60% parallax speed
 * - Large decorative letter with slower scroll speed
 * - Foreground card with smooth easing and momentum effect
 * - Container-based parallax for image cards
 */

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Background image parallax: moves at 45% of scroll speed for depth effect
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  
  // Large decorative letter parallax: moves at 50% of scroll speed
  const decorativeLetterY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Card parallax with momentum effect: smooth easing
  const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);

  return (
    <section ref={ref} className="relative py-0 px-6 overflow-hidden bg-white">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
          alt="Prime Estate aerial view"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10" />
      </motion.div>

      {/* Large Decorative Letter 'S' - Sobha Style */}
      <motion.div
        style={{ y: decorativeLetterY }}
        className="absolute top-1/2 -right-32 md:-right-24 transform -translate-y-1/2 opacity-10 pointer-events-none"
      >
        <div className="text-9xl md:text-[500px] font-serif font-light text-white">
          T
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl py-24 md:py-32">
        {/* Large Curved White Card with Enhanced Floating Effect */}
        <motion.div
          ref={containerRef}
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            damping: 20,
            stiffness: 100
          }}
          className="relative ml-0 md:ml-12 max-w-2xl bg-white rounded-[80px] md:rounded-[120px] shadow-2xl overflow-hidden floating-card"
        >
          <div className="px-8 md:px-16 py-16 md:py-24">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span 
                className="inline-block w-8 h-px bg-[var(--bronze)]"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <p className="text-xs tracking-widest uppercase text-[var(--bronze)] font-light">
                Who We Are
              </p>
            </motion.div>

            {/* Main Heading with Staggered Animation */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl font-light leading-tight text-[var(--ink)] mb-8"
            >
              The Art <br />
              <em className="italic text-[var(--bronze)] not-italic">of Detail</em>
            </motion.h2>

            {/* Description Text with Staggered Reveals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="space-y-5 mb-10"
            >
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed"
              >
                At TrustOn Developers, we understand that true excellence lies in the meticulous attention to detail and the artistry of craftsmanship.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-sm md:text-base text-gray-600 leading-relaxed font-light"
              >
                Guided by a commitment to perfection, we believe in crafting not just properties but immersive experiences where every nuance is thoughtfully considered. From transparent documentation to high-growth locations, we ensure your investment is secure, appreciated, and built to last.
              </motion.p>
            </motion.div>

            {/* Key Points / Pillars with Container Parallax Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="space-y-4 border-t border-gray-200 pt-8"
            >
              {[
                {
                  num: "01",
                  title: "Transparent Documentation",
                  desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions.",
                },
                {
                  num: "02",
                  title: "High-Growth Locations",
                  desc: "Projects in proven growth corridors with verified infrastructure.",
                },
                {
                  num: "03",
                  title: "End-to-End Partnership",
                  desc: "From acquisition to construction — one trusted team, start to finish.",
                },
              ].map((point, idx) => (
                <motion.div
                  key={point.num}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.6 + idx * 0.1, 
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="flex gap-4 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="text-[var(--bronze)] font-serif text-lg md:text-xl font-light flex-shrink-0 pt-0.5">
                    {point.num}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-[var(--bronze)] transition-colors duration-300">
                      {point.title}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button with Hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-10 pt-8 border-t border-gray-200"
            >
              <motion.button 
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-[var(--bronze)] text-xs md:text-sm uppercase tracking-widest font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn More About TrustOn
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
