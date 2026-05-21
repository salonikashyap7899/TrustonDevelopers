import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

const amenities = [
  "24/7 Security & CCTV",
  "Wide Internal Roads",
  "Underground Drainage",
  "Street Lighting",
  "Community Park",
  "Children's Play Area",
  "Boundary Wall",
  "Water Supply",
];

export function PrimeEstateShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      ref={containerRef}
      id="project"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45,107,196,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,107,196,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16 md:mb-20">
          <div>
            <Reveal>
              <SectionEyebrow light>Flagship Project</SectionEyebrow>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-6 leading-[1.1]">
                Prime <span className="text-[var(--accent)]">Estate</span>
              </h2>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Lucknow&apos;s most sought-after residential plot colony. Thoughtfully designed for families 
              seeking premium living with complete transparency and verified documentation.
            </p>
          </Reveal>
        </div>

        {/* Main Project Card */}
        <div className="grid lg:grid-cols-[55%_45%] border border-[var(--accent)]/15 overflow-hidden">
          {/* Left - Visual Panel */}
          <div className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden">
            {/* Background */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1C1A12 0%, #0E0D0A 60%, #1A180F 100%)"
              }}
            />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(45,107,196,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(45,107,196,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Decorative Arch Shape */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
              <motion.div 
                className="relative"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div 
                  className="w-40 h-52 border border-[var(--accent)]/12 rounded-t-full"
                  style={{ borderBottom: 'none' }}
                />
                <div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-36 border border-[var(--accent)]/08 rounded-t-full"
                  style={{ borderBottom: 'none' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)]/40" />
              </motion.div>
            </div>

            {/* Concentric circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[var(--accent)]/06"
                  style={{
                    width: 150 + i * 100,
                    height: 150 + i * 100,
                    top: -(75 + i * 50),
                    left: -(75 + i * 50),
                  }}
                  animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                  Now Open for Booking
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="font-display text-4xl md:text-5xl text-white mt-2 leading-none">
                  Prime<br />
                  <em className="text-[var(--accent)] italic">Estate</em>
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/50 text-sm mt-3">
                  Dubagga, Lucknow
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-1">
                  Since 2025
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right - Info Panel */}
          <div className="p-8 md:p-12 bg-[var(--ink)] flex flex-col">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-[var(--accent)]/08">
              {[
                { value: "120+", label: "Total Plots" },
                { value: "47", label: "Available Now" },
                { value: "1200", suffix: " Sq.Ft+", label: "Plot Sizes" },
                { value: "₹12L", suffix: "+", label: "Starting Price" },
              ].map((stat, idx) => (
                <Reveal key={stat.label} delay={idx * 0.1}>
                  <motion.div 
                    className="bg-[var(--ink)] p-6 md:p-8"
                    whileHover={{ backgroundColor: "rgba(45,107,196,0.05)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-display text-3xl md:text-4xl text-white font-light">
                      {stat.value}
                      {stat.suffix && (
                        <sup className="text-lg text-[var(--accent)]">{stat.suffix}</sup>
                      )}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Amenities */}
            <div className="mt-8 flex-1">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] mb-4">
                  Key Amenities
                </p>
              </Reveal>
              <div className="grid grid-cols-2 gap-px bg-white/04">
                {amenities.map((amenity, idx) => (
                  <Reveal key={amenity} delay={idx * 0.05}>
                    <div className="flex items-center gap-3 py-3 text-white/60 text-sm">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-60" />
                      {amenity}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Approval Badge */}
            <Reveal>
              <div className="mt-8 p-4 border border-[var(--accent)]/15 bg-[var(--accent)]/03">
                <p className="text-sm text-white/60">
                  <strong className="text-[var(--accent)]">Jila Panchayat Approved</strong> &middot; 
                  Clear title deeds with complete documentation
                </p>
              </div>
            </Reveal>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="/properties"
                className="px-8 py-4 bg-[var(--accent)] text-[var(--ink)] font-semibold text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--accent)]/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Plots
              </motion.a>
              <motion.a
                href="/contact"
                className="px-8 py-4 border border-[var(--accent)]/40 text-white/70 text-[11px] uppercase tracking-[0.15em] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Site Visit
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Services Section - White Card Style */
export function ServicesSection() {
  const services = [
    {
      num: "01",
      name: "Plot Selling",
      desc: "Premium residential plots with clear titles and complete documentation.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="16" width="32" height="28" rx="2"/>
          <path d="M16 16V8h16v8"/>
          <path d="M8 28h32M24 28v16"/>
        </svg>
      ),
    },
    {
      num: "02",
      name: "Construction",
      desc: "End-to-end construction services with quality assurance and timely delivery.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 44h40"/>
          <path d="M12 44V24l12-12 12 12v20"/>
          <rect x="20" y="32" width="8" height="12"/>
        </svg>
      ),
    },
    {
      num: "03",
      name: "Architecture",
      desc: "Modern architectural designs tailored to your vision and lifestyle.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="18"/>
          <path d="M12 24h24M24 12v24"/>
          <path d="M16 16l16 16M32 16L16 32"/>
        </svg>
      ),
    },
    {
      num: "04",
      name: "Investment Advisory",
      desc: "Expert guidance on real estate investments for maximum returns.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 40l8-16 8 8 8-16 8 12"/>
          <path d="M4 44h40"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="bg-[var(--ink)] pb-0">
      {/* White card that overlaps previous section */}
      <div 
        className="bg-white rounded-t-3xl -mt-10 relative z-10 py-16 md:py-24 px-6 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-12 md:mb-16">
            <div>
              <Reveal>
                <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  What We Offer
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] mt-4 leading-[1.1]">
                  Our <span className="text-[var(--accent)]">Services</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                From plot selection to construction completion, we provide comprehensive 
                real estate services with unmatched transparency.
              </p>
            </Reveal>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {services.map((service, idx) => (
              <Reveal key={service.name} delay={idx * 0.1}>
                <motion.div 
                  className="bg-white p-8 relative group cursor-pointer"
                  whileHover={{ backgroundColor: "#f8f8f6" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background number */}
                  <span 
                    className="absolute top-3 right-4 font-display text-7xl text-gray-100 leading-none pointer-events-none group-hover:text-[var(--accent)]/10 transition-colors"
                  >
                    {service.num}
                  </span>

                  {/* Icon */}
                  <div className="text-[var(--ink)] mb-6 relative z-10 group-hover:text-[var(--accent)] transition-colors">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-[var(--ink)] text-lg mb-3 relative z-10">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                    {service.desc}
                  </p>

                  {/* Link */}
                  <a 
                    href="#"
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] mt-6 relative z-10 group-hover:gap-3 transition-all"
                  >
                    Learn More <span>&rarr;</span>
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
