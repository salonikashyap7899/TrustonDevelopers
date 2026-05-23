import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { WealthCalculator } from "@/components/WealthCalculator";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import { Section3DBackground } from "@/components/Section3DBackground";
import {
  TrustonWhoWeAreSection,
  TrustonServicesSection,
  TrustonWhySection,
  TrustonCTAStrip,
} from "@/components/TrustonDevelopersSection";
import { PrimeEstateSection } from "@/components/PrimeEstateSection";
import { Services3DSection } from "@/components/Services3DSection";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GlowCard } from "@/components/ui/spotlight-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Billion Dollar Luxury Real Estate" },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#04090f] text-foreground overflow-x-hidden">

      {/* ── Hero — Full-screen video ── */}
      <section className="relative min-h-screen bg-[#04090f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ opacity: 0.75, transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/40 via-[#04090f]/10 to-[#04090f]/90" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-[10px] md:text-xs text-[#00BFFF] uppercase font-bold mb-6"
            >
              Begin Your Journey
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-6 tracking-tight leading-none"
            >
              TRUST<span style={{ color: "#00BFFF" }}>ON</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white/50 text-sm md:text-base tracking-[0.4em] font-light uppercase"
            >
              Billion Dollar Legacy
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Enquire Now →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-10 py-4 border border-white/20 text-white/70 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                +91 96160-61166
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { duration: 1, delay: 1.5 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            }}
            className="absolute bottom-10 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors duration-500 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <TrustonWhoWeAreSection />

      {/* Prime Estate Project */}
      <PrimeEstateSection />

      {/* Services */}
      <TrustonServicesSection />

      {/* ── Scroll Showcase (ContainerScroll) ── */}
      <ScrollShowcaseSection />

      {/* Intro Highlight */}
      <IntroHighlightSection />

      {/* Plots & Structures — CSS building scene */}
      <PlotsAndStructures />

      {/* Philosophy */}
      <PhilosophySection />

      {/* Why Truston */}
      <TrustonWhySection />

      {/* Services 3D */}
      <Services3DSection />

      {/* Wealth Calculator */}
      <WealthCalculator />

      {/* Marquee */}
      <Marquee />

      {/* Stats Bar */}
      <EnhancedStatsBar />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Strip */}
      <TrustonCTAStrip />
    </div>
  );
}

/* ── Scroll Showcase ─────────────────────────────────────────────── */
const showcaseCards = [
  {
    icon: "◉",
    title: "Prime Plots",
    desc: "Jila Panchayat approved plots in Lucknow's fastest-growing corridors. Every square foot documented.",
    stat: "120+",
    statLabel: "Plots",
  },
  {
    icon: "◆",
    title: "Architectural Design",
    desc: "Luxury home designs crafted by seasoned architects — 3D walkthroughs before a single brick is laid.",
    stat: "50+",
    statLabel: "Designs Delivered",
  },
  {
    icon: "◎",
    title: "Construction Excellence",
    desc: "Turnkey build service with premium materials, transparent pricing, and on-time delivery commitment.",
    stat: "100%",
    statLabel: "On-Schedule",
  },
  {
    icon: "◈",
    title: "Investment Consulting",
    desc: "Market intelligence, appreciation forecasts, and personalized portfolio advisory for smart buyers.",
    stat: "25%",
    statLabel: "Avg. Annual Growth",
  },
  {
    icon: "❖",
    title: "Channel Partners",
    desc: "Lucrative commission structures, co-marketing support, and a trusted brand that sells itself.",
    stat: "200+",
    statLabel: "Active Partners",
  },
  {
    icon: "✦",
    title: "Transparency Guarantee",
    desc: "Clear title deeds, zero hidden charges, and a team that answers every question — before and after purchase.",
    stat: "5+",
    statLabel: "Years of Trust",
  },
];

function ScrollShowcaseSection() {
  return (
    <section className="bg-[#04090f] overflow-hidden relative">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              What We Offer
              <span className="w-8 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              Every Service,{" "}
              <em className="text-[#00BFFF] italic not-italic" style={{ fontStyle: "italic" }}>
                One Vision
              </em>
            </h2>
            <p className="text-white/40 text-base mt-4 font-light max-w-xl mx-auto">
              From raw land to refined living — TrustOn delivers the complete journey.
            </p>
          </div>
        }
      >
        <div className="h-full w-full overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 h-full">
            {showcaseCards.map((card, i) => (
              <GlowCard
                key={card.title}
                glowColor="blue"
                customSize
                className="p-5 md:p-6 flex flex-col justify-between min-h-[140px] md:min-h-auto"
              >
                <div>
                  <motion.span
                    className="text-[#00BFFF]/50 text-xl md:text-2xl mb-3 block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    {card.icon}
                  </motion.span>
                  <h3 className="text-white font-serif text-base md:text-lg leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed hidden md:block">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="text-[#00BFFF] font-serif text-xl md:text-2xl font-light">
                    {card.stat}
                  </span>
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] ml-2 font-bold">
                    {card.statLabel}
                  </span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

/* ── Philosophy ───────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section className="py-24 px-6 bg-[#050b14] relative overflow-hidden">
      <Section3DBackground opacity={0.12} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Our Philosophy
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              Crafting <em className="text-[#00BFFF] italic">Timeless</em> Legacies
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              TrustOn stands at the intersection of architectural brilliance and strategic
              investment. We don&apos;t just sell plots; we provide the foundation for your future
              aspirations. Our commitment to quality and transparency ensures that every square
              foot you own is a testament to luxury.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-serif text-[#00BFFF] mb-2">100%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Transparency</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#00BFFF] mb-2">Prime</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Locations</p>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square flex items-center justify-center relative"
            >
              {/* Concentric rings */}
              {[280, 220, 160, 100].map((size, i) => (
                <motion.div
                  key={size}
                  className="absolute rounded-full border"
                  style={{
                    width: size,
                    height: size,
                    borderColor: `rgba(0,191,255,${0.08 - i * 0.015})`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                />
              ))}
              {/* Center logo */}
              <div className="w-20 h-20 bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded-full flex items-center justify-center z-10">
                <span className="text-3xl font-serif text-[#00BFFF]">T</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────────────── */
function Marquee() {
  const words = [
    "Cinematic Living",
    "Editorial Architecture",
    "Premium Plots",
    "Jila Panchayat Approved",
    "Legacy Investments",
    "Prime Location",
    "Transparent Dealings",
  ];
  const items = [...words, ...words];
  return (
    <div className="border-y border-white/5 py-6 overflow-hidden relative" style={{ background: "#04090f" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee-scroll 35s linear infinite", willChange: "transform" }}
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="font-serif text-xl italic text-white/25 hover:text-[#00BFFF] transition-colors duration-500 cursor-default uppercase tracking-widest shrink-0 px-10"
          >
            {w} <span className="text-[#00BFFF] not-italic text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Bar ─────────────────────────────────────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈", desc: "Fully documented" },
  ];
  return (
    <section className="border-y border-white/5 px-6 relative overflow-hidden" style={{ background: "#04090f" }}>
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(0,191,255,0.03)" }}
              className="group flex flex-col items-center py-14 px-6 text-center border-r border-white/5 last:border-0 cursor-default transition-all duration-500 relative"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: "#00BFFF" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              </div>
              <motion.span
                className="text-[#00BFFF]/30 text-2xl mb-5 group-hover:text-[#00BFFF] transition-colors duration-500"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                {s.icon}
              </motion.span>
              <p className="font-serif text-4xl md:text-6xl text-white font-light leading-none tracking-tight">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>
              <motion.div className="w-6 h-px bg-white/10 my-5 group-hover:w-12 group-hover:bg-[#00BFFF] transition-all duration-500" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 group-hover:text-[#00BFFF] transition-colors duration-500 font-bold">
                {s.label}
              </p>
              <p className="text-[10px] text-white/20 mt-2 group-hover:text-white/50 transition-colors duration-300">
                {s.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
