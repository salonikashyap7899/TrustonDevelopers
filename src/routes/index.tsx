import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-estate.jpg";

// Premium components
import { PremiumHero } from "@/components/PremiumHero";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { AboutTimelineSection } from "@/components/AboutTimelineSection";
import { PrimeEstateShowcase, ServicesSection } from "@/components/PrimeEstateShowcase";
import { AmenitiesSection, FloorPlansSection } from "@/components/AmenitiesFloorPlans";
import { LocationInquirySection, PremiumGallery, WhyTrustOnSection, CTAStripSection } from "@/components/LocationGalleryContact";
import { Testimonials } from "@/components/Testimonials";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Own the Ground. Build the Legacy." },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Premium Cinematic Hero */}
      <PremiumHero 
        poster={heroImg}
        videoSrc="/intro-video.mp4"
      />

      {/* Marquee Bar */}
      <MarqueeBar />

      {/* Who We Are - Sobha Style Floating Card */}
      <WhoWeAreSection />

      {/* About & Timeline Section with 3D Effects */}
      <AboutTimelineSection />

      {/* Prime Estate Project Showcase */}
      <PrimeEstateShowcase />

      {/* Services Section - White Card */}
      <ServicesSection />

      {/* Why TrustOn Section */}
      <WhyTrustOnSection />

      {/* Amenities Section with 3D Cards */}
      <AmenitiesSection />

      {/* Floor Plans Interactive Section */}
      <FloorPlansSection />

      {/* Premium Masonry Gallery */}
      <PremiumGallery />

      {/* Location & Inquiry Section */}
      <LocationInquirySection />

      {/* Enhanced Stats Bar */}
      <EnhancedStatsBar />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Strip */}
      <CTAStripSection />
    </div>
  );
}

/* ── Marquee Bar ────────────────────────────────────────────────── */
function MarqueeBar() {
  const items = [
    "Prime Estate · Lucknow",
    "Jila Panchayat Approved",
    "Residential Plot Colony",
    "Clear Title Deeds",
    "Dubagga Growth Corridor",
    "Plot Selling · Construction · Architecture",
    "Investment Consultancy",
    "Wide Internal Roads",
  ];

  return (
    <div 
      className="border-y border-[var(--accent)]/10 py-4 overflow-hidden"
      style={{ background: "rgba(45,107,196,0.02)" }}
    >
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{ 
          duration: 32, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-8 px-8 text-[11px] uppercase tracking-[0.22em] text-gray-400"
          >
            <span>{item}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Enhanced Stats Bar with Rich Animations ──────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", desc: "Fully documented" },
  ];

  return (
    <section className="bg-[var(--ink)] border-y border-white/5 px-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="group flex flex-col items-center py-16 px-6 text-center border-r border-white/5 last:border-0 cursor-default transition-all duration-300 relative"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>

              {/* Counter */}
              <p className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-none">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>

              {/* Divider */}
              <motion.div
                className="w-8 h-px bg-white/20 my-6 group-hover:w-16 group-hover:bg-[var(--accent)] transition-all duration-500"
              />

              {/* Label */}
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-[var(--accent)] transition-colors duration-500 font-semibold">
                {s.label}
              </p>

              {/* Description */}
              <p className="text-[10px] text-white/30 mt-2 group-hover:text-white/50 transition-colors duration-300">
                {s.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
