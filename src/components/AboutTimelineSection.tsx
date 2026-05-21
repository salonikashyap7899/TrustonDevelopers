import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

const timelineData = [
  {
    year: "2020",
    title: "Founding of TrustOn",
    description: "TrustOn envisions revolutionizing Lucknow's real estate with transparent and sustainable practices.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="24" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M24 4L40 24H8L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="18" y="32" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  },
  {
    year: "2022",
    title: "First Luxury Tower Completed",
    description: "Successfully delivered our first premium residential project with 100% customer satisfaction.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="8" width="24" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="18" y="14" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="26" y="14" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="18" y="22" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="26" y="22" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="18" y="30" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="26" y="30" width="4" height="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="20" y="38" width="8" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
  },
  {
    year: "2023",
    title: "Expansion into Townships",
    description: "Launched Prime Estate - our flagship township project with 120+ premium residential plots.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M12 24h24M24 12v24" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3"/>
        <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
  },
  {
    year: "2024",
    title: "Award for Sustainable Development",
    description: "Recognized for excellence in sustainable real estate development and community building.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  },
  {
    year: "2025",
    title: "Launch of Smart City Initiative",
    description: "Pioneering smart infrastructure integration across all new developments for future-ready living.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M16 8h16v8H16V8Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M24 22v6l4 2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  },
];

export function AboutTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #f8f9fc 0%, #e8eef8 50%, #f0f4fa 100%)"
      }}
    >
      {/* 3D Logo Background Element */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] opacity-[0.08] pointer-events-none"
        style={{ y: bgY }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(45,107,196,0.3) 0%, transparent 50%),
              linear-gradient(-45deg, rgba(45,107,196,0.2) 0%, transparent 50%)
            `,
            borderRadius: "20px",
            transform: "perspective(1000px) rotateY(15deg) rotateX(-5deg)",
            boxShadow: "0 50px 100px -20px rgba(45,107,196,0.15)"
          }}
        />
      </motion.div>

      {/* Flowing curved lines in background */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,300 Q360,100 720,300 T1440,300" 
          stroke="rgba(45,107,196,0.5)" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M0,500 Q360,700 720,500 T1440,500" 
          stroke="rgba(45,107,196,0.3)" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M0,700 Q360,500 720,700 T1440,700" 
          stroke="rgba(45,107,196,0.2)" 
          strokeWidth="1" 
          fill="none"
        />
      </svg>

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <SectionEyebrow>Our Journey</SectionEyebrow>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] mt-6 leading-[1.1]">
              About TrustOn: Building<br />
              <span className="text-[var(--accent)]">Legacy</span>, Designing <span className="text-[var(--accent)]">Futures</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Explore our journey of excellence and commitment to innovation.
            </p>
          </Reveal>
        </div>

        {/* Timeline with 3D Cards */}
        <div className="relative">
          {/* Central Timeline Line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-0">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <Reveal key={item.year} delay={idx * 0.1}>
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${idx > 0 ? 'lg:mt-16' : ''}`}>
                    {/* Card - alternating sides on desktop */}
                    <motion.div
                      className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-2'}`}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div 
                        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/50"
                        style={{
                          transform: "perspective(1000px)",
                          boxShadow: "0 25px 50px -12px rgba(45,107,196,0.1), 0 0 0 1px rgba(255,255,255,0.5) inset"
                        }}
                      >
                        {/* Floating 3D image frame */}
                        <motion.div 
                          className="relative mb-6 rounded-lg overflow-hidden"
                          style={{
                            transform: "perspective(1000px) rotateX(2deg)",
                            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)"
                          }}
                          whileHover={{ 
                            rotateX: 0,
                            scale: 1.02 
                          }}
                        >
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          {/* Glass overlay with icon */}
                          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-[var(--accent)]">
                            {item.icon}
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex items-start gap-4">
                          <span className="text-[var(--accent)] font-display text-2xl font-light">
                            {item.year}:
                          </span>
                          <div>
                            <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Decorative corner elements */}
                        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/20 rounded-tr-lg" />
                        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/20 rounded-bl-lg" />
                      </div>
                    </motion.div>

                    {/* Timeline Node - desktop only */}
                    <div className={`hidden lg:flex justify-center items-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Pulsing rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="w-16 h-16 rounded-full border border-[var(--accent)]/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border-2 border-[var(--accent)]/30">
                          <div className="w-4 h-4 rounded-full bg-[var(--accent)]" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Vision & Leadership Section */}
        <div className="mt-24 md:mt-32 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Our Vision */}
          <Reveal>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-6">
                Our Vision
              </h3>
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=350&fit=crop"
                  alt="Our Vision"
                  className="w-full h-56 object-cover"
                />
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                To redefine urban living through sustainable, intelligent, and beautiful communities.
              </p>
            </div>
          </Reveal>

          {/* Leadership */}
          <Reveal delay={0.1}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-6">
                Leadership
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/5]">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=375&fit=crop"
                      alt="CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-[var(--ink)]">Aarav Sharma</h4>
                  <p className="text-sm text-gray-500">CEO &amp; Founder</p>
                </div>
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/5]">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=375&fit=crop"
                      alt="Chief Architect"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-[var(--ink)]">Priya Kapoor</h4>
                  <p className="text-sm text-gray-500">Chief Architect</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
