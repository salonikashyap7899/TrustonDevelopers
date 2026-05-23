import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { FloatingImageScroll, SlideInOnScroll, BlurReveal } from "./ScrollAnimations";
import { SwipeReveal } from "./TextReveal";
import { Luxury3DScene } from "./Luxury3DScene";
import { Section3DBackground } from "./Section3DBackground";

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
    <div ref={ref} className="relative overflow-hidden bg-background">
      {/* Prime Estate Flagship Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 min-h-[70vh] md:min-h-[80vh] flex items-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Luxury3DScene />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10 w-full">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <SectionEyebrow>Flagship Project</SectionEyebrow>
          </Reveal>

          {/* Main Grid: Image + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mt-8 md:mt-12">
            {/* Image */}
            <Reveal direction="left" delay={0.1}>
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                <FloatingImageScroll
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg"
                  alt="Prime Estate Luxury Interior"
                  className="h-full"
                  intensity={0.5}
                />
              </div>
            </Reveal>

            {/* Content */}
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <SwipeReveal>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-white mb-3 md:mb-4">
                      Prime Estate <br />
                      <span className="text-luxe-cyan italic font-serif">Luxury Living</span>
                    </h2>
                  </SwipeReveal>
                  <p className="text-white/60 leading-relaxed font-light text-sm md:text-base lg:text-lg">
                    Experience the pinnacle of luxury living in Lucknow&apos;s most coveted location.
                    Prime Estate represents a new era of sophisticated urban development with
                    world-class amenities and architectural excellence.
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4 md:space-y-6 border-l-2 border-luxe-cyan pl-4 md:pl-6"
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
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <p className="font-semibold text-white text-xs md:text-sm uppercase tracking-wider">
                        {feature.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-white/40 mt-1">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <button className="btn-magnetic btn-luxe px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-xs">
                    Explore Prime Estate
                    <span className="ml-2 md:ml-3">→</span>
                  </button>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-ink overflow-hidden">
        <Section3DBackground opacity={0.15} />

        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal delay={0}>
            <SectionEyebrow light>Our Services</SectionEyebrow>
          </Reveal>

          <SwipeReveal className="flex justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-center text-white mt-6 md:mt-8 mb-12 md:mb-20 tracking-tight">
              Comprehensive Real Estate{" "}
              <em className="text-luxe-cyan italic font-serif">Mastery</em>
            </h2>
          </SwipeReveal>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
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
                delay={idx * 0.1}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-2xl md:rounded-[32px] shadow-xl hover:shadow-2xl transition-all duration-500 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] border border-white/5"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-50 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10 text-white">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl mb-2 md:mb-4 group-hover:text-luxe-cyan transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-white/50 leading-relaxed font-light">
                      {service.desc}
                    </p>
                    <div className="mt-4 md:mt-8 flex items-center gap-3 text-luxe-cyan text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      View Expertise <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </SlideInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why TrustOn Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-background">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-10 md:right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxe-blue rounded-full blur-[80px] md:blur-[100px]" />
          <div className="absolute bottom-20 left-10 md:left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxe-cyan rounded-full blur-[80px] md:blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <BlurReveal>
            <SectionEyebrow>Why Choose TrustOn</SectionEyebrow>
          </BlurReveal>

          <BlurReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-center text-white mt-6 md:mt-8 mb-12 md:mb-20 tracking-tight">
              Elite Standard of <em className="text-luxe-cyan italic font-serif">Trust</em>
            </h2>
          </BlurReveal>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-12">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group border-b border-white/5 pb-6 md:pb-10"
              >
                <div className="flex gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-luxe-blue/10 text-luxe-cyan text-lg md:text-2xl font-display group-hover:bg-luxe-blue group-hover:text-white transition-all duration-500 border border-luxe-cyan/20">
                      {pillar.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl text-white mb-2 md:mb-3 group-hover:text-luxe-cyan transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-white/50 leading-relaxed font-light">
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
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxe-blue/20 to-luxe-cyan/20 opacity-20" />
        <Section3DBackground opacity={0.1} />

        <div className="mx-auto max-w-4xl text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 md:mb-8 tracking-tight text-balance">
              Ready to Build Your <em className="text-luxe-cyan italic font-serif">Legacy?</em>
            </h3>
            <p className="text-white/50 text-sm md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Join the elite circle of investors who have chosen TrustOn as their gateway to premium
              real estate.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic btn-luxe px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs"
            >
              Secure Your Future
              <span className="ml-2 md:ml-3">→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
