import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { FloatingImageScroll, SlideInOnScroll, BlurReveal } from "@/components/ScrollAnimations";

/**
 * Enhanced DevelopersSection with scroll animations and floating images
 */

export function EnhancedDevelopersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax background effect
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-sand/30 to-white"
    >
      {/* Prime Estate Flagship Section */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <SectionEyebrow>Flagship Project</SectionEyebrow>
          </Reveal>

          {/* Main Grid: Image + Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mt-12">
            {/* Floating Image */}
            <Reveal direction="left" delay={0.1}>
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-luxe">
                <FloatingImageScroll
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg"
                  alt="Prime Estate Luxury Interior"
                  className="h-full"
                  intensity={0.8}
                />
              </div>
            </Reveal>

            {/* Content */}
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="typography-section-title text-ink mb-4">
                    Prime Estate <br />
                    <span className="text-bronze">Luxury Living</span>
                  </h2>
                  <p className="typography-body text-gray-700 leading-relaxed">
                    Experience the pinnacle of luxury living in Lucknow's most coveted location.
                    Prime Estate represents a new era of sophisticated urban development with
                    world-class amenities and architectural excellence.
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4 border-l-2 border-bronze pl-6"
                >
                  {[
                    { title: "150+ Premium Plots", desc: "Carefully curated land parcels" },
                    { title: "World-Class Amenities", desc: "Clubhouse, gardens, security" },
                    { title: "Green Living", desc: "40% green space allocation" },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <p className="font-semibold text-ink text-sm md:text-base">{feature.title}</p>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ x: 8 }}
                  className="inline-flex items-center gap-3 text-bronze font-semibold text-sm md:text-base uppercase tracking-widest hover:gap-4 transition-all duration-300"
                >
                  Explore Prime Estate
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-24 md:py-32 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0}>
            <SectionEyebrow>Our Services</SectionEyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="typography-section-title text-center text-ink mt-8 mb-16">
              Comprehensive Real Estate Solutions
            </h2>
          </Reveal>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏗️",
                title: "Construction & Build",
                desc: "End-to-end construction management with quality assurance at every stage.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/construction-site-600x800.jpg",
              },
              {
                icon: "📊",
                title: "Investment Consulting",
                desc: "Expert guidance on real estate investments with proven ROI strategies.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/investment-consulting-600x800.jpg",
              },
              {
                icon: "🎯",
                title: "Plot Selling",
                desc: "Premium plot selection in high-growth locations with transparent dealings.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/plot-selling-600x800.jpg",
              },
            ].map((service, idx) => (
              <SlideInOnScroll
                key={service.title}
                direction={idx % 2 === 0 ? "up" : "down"}
                delay={idx * 0.15}
              >
                <motion.div
                  whileHover={{ y: -12, rotateY: 3, rotateX: -2 }}
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                  className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-luxe transition-all duration-500 h-full"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-bronze transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </SlideInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why TrustOn Section */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-ink via-ink/95 to-ink">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
        </motion.div>

        <div className="mx-auto max-w-5xl relative z-10">
          <BlurReveal>
            <SectionEyebrow light>Why Choose TrustOn</SectionEyebrow>
          </BlurReveal>

          <BlurReveal>
            <h2 className="typography-section-title text-center text-white mt-8 mb-16">
              Trusted by Thousands of Investors
            </h2>
          </BlurReveal>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                num: "01",
                title: "Transparent Dealings",
                desc: "Complete documentation, legal clarity, and zero hidden costs. Every transaction is documented and verified.",
              },
              {
                num: "02",
                title: "High-Growth Locations",
                desc: "Strategic locations with proven infrastructure development and long-term appreciation potential.",
              },
              {
                num: "03",
                title: "Expert Guidance",
                desc: "Our team of seasoned professionals provides personalized investment strategies tailored to your goals.",
              },
              {
                num: "04",
                title: "End-to-End Support",
                desc: "From property selection to legal completion, we handle every aspect of your investment journey.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-bronze/20 text-bronze text-xl font-bold group-hover:bg-bronze/30 transition-colors duration-300">
                      {pillar.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-bronze transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-r from-bronze to-blue-600">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Legacy?
            </h3>
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
              Join thousands of satisfied investors who have chosen TrustOn for their real estate
              investments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-bronze font-bold rounded-lg hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Get Started Today
              <span>→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
