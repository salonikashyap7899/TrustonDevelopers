import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import { Section3DBackground } from "@/components/Section3DBackground";
import {
  TrustonServicesSection,
  TrustonWhySection,
  TrustonCTAStrip,
} from "@/components/TrustonDevelopersSection";
import { PrimeEstateSection } from "@/components/PrimeEstateSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { GallerySection } from "@/components/GallerySection";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRUSTON" },
      {
        name: "description",
        content:
          "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TRUSTON" },
      { property: "og:image", content: heroImg },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImg,
        fetchPriority: "high",
      } as never,
    ],
  }),
  component: Index,
});

function Index() {
  const heroContent = usePageContent("home.hero", {
    eyebrow: "BEGIN YOUR JOURNEY",
    title: "TRUST",
    title_accent: "ON",
    subtitle: "Own the Ground. Build the Legacy.",
  });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden bg-black">

        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.82,
              transform: "translateZ(0)",
            }}
          >
            <source
              src={
                heroContent.video_url ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4"
              }
              type="video/mp4"
            />
          </video>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* BLUE GLOW */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 via-transparent to-black" />

          {/* VIGNETTE */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        {/* TOP NAV GLASS EFFECT */}
        <div className="absolute top-0 left-0 w-full h-28 bg-black/20 backdrop-blur-md border-b border-white/5 z-20" />

        {/* NAVBAR */}
        <header className="absolute top-0 left-0 w-full z-30 px-8 md:px-16 py-8">
          <div className="flex items-center justify-between">

            {/* LEFT MENU */}
            <div className="hidden md:flex items-center gap-14">
              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                About
              </a>

              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                Projects
              </a>

              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                Properties
              </a>
            </div>

            {/* LOGO */}
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight">
                <span className="text-white/30">TRUST</span>
                <span className="text-[#00BFFF]">ON</span>
              </h2>
            </div>

            {/* RIGHT MENU */}
            <div className="hidden md:flex items-center gap-14">
              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                Services
              </a>

              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                Lifestyle
              </a>

              <a className="text-white/80 text-sm tracking-[0.35em] uppercase hover:text-[#00BFFF] transition-all duration-500 cursor-pointer">
                Contact
              </a>
            </div>
          </div>
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

          {/* SMALL TOP TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#00BFFF] text-sm md:text-base uppercase tracking-[0.45em] mb-8 font-light"
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-serif leading-[0.85] tracking-tight mb-8"
          >
            <span className="block text-white text-6xl md:text-8xl lg:text-[10rem] font-light">
              {heroContent.title}
              <span className="text-[#00BFFF]">
                {heroContent.title_accent}
              </span>
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white/55 text-lg md:text-2xl tracking-[0.35em] uppercase mb-14 max-w-5xl leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >

            {/* ENQUIRE BUTTON */}
            <Link
              to="/contact"
              className="px-12 py-5 rounded-full bg-[#00BFFF] text-black uppercase tracking-[0.25em] text-sm font-bold hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(0,191,255,0.35)]"
            >
              Enquire Now →
            </Link>

            {/* PHONE BUTTON */}
            <a
              href="tel:+919616061166"
              className="px-12 py-5 rounded-full border border-white/15 text-white/75 uppercase tracking-[0.25em] text-sm font-bold hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500 backdrop-blur-md"
            >
              +91 96160-61166
            </a>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 10, 0],
          }}
          transition={{
            opacity: {
              delay: 2,
              duration: 1,
            },
            y: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all duration-500 cursor-pointer">
            ↓
          </div>
        </motion.div>
      </section>

      {/* Who We Are */}
      <WhoWeAreSection />

      {/* Gallery Section */}
      <div className="-mt-1">
        <GallerySection />
      </div>

      {/* Prime Estate Project (Building Plots & Structures) — After Gallery */}
      <div className="pb-12 md:pb-20 bg-[#0F0F0D]">
        <PrimeEstateSection />
      </div>
      
      


      {/* Philosophy */}
      <PhilosophySection />
     {/* Plots & Structures — CSS building scene */}
      <PlotsAndStructures />


      {/* Intro Highlight (New Generation) */}
      <IntroHighlightSection />

      {/* Services (Four Pillars) */}
      <TrustonServicesSection />

      {/* Stats Bar — After Four Pillars */}
      <div className="-mt-1">
        <EnhancedStatsBar />
      </div>

      {/* Why Buyers Choose Truston — Before Client Narratives */}
      <TrustonWhySection />

      {/* Testimonials (Client Narratives) */}
      <Testimonials />



      {/* Marquee */}
      <Marquee />

      {/* CTA Strip */}
      <TrustonCTAStrip />
    </div>
  );
}

/* ── Philosophy ───────────────────────������──────────────────────────── */
function PhilosophySection() {
  const content = usePageContent("home.philosophy", {
    eyebrow: "Our Philosophy",
    title: "Crafting",
    title_accent: "Timeless",
    subtitle: "Legacies",
    body: "TrustOn stands at the intersection of architectural brilliance and strategic investment. We don't just sell plots; we provide the foundation for your future aspirations.",
    body_secondary: "Our commitment to quality and transparency ensures that every square foot you own is a testament to enduring luxury — built to outlast trends and appreciate with time.",
  });

  return (
    <section className="py-28 md:py-36 px-6 bg-[#050b14] relative overflow-hidden">
      <Section3DBackground opacity={0.10} />

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Text ── */}
          <Reveal>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                {content.eyebrow}
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
              {content.title}{" "}
              <em className="text-[#00BFFF] italic font-light">{content.title_accent}</em>
              <br />
              {content.subtitle}
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-[#00BFFF]/30 mb-8" />

            {/* Body */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4 font-light">
              {content.body}
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-10 font-light">
              {content.body_secondary}
            </p>

            {/* Stats row */}
            <div className="flex items-stretch divide-x divide-white/10 border border-white/[0.07] rounded-2xl overflow-hidden">
              {[
                { val: "100%", label: "Transparency" },
                { val: "Prime", label: "Locations" },
                { val: "5+", label: "Years of Trust" },
              ].map((s) => (
                <div key={s.label} className="flex-1 px-6 py-5 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-[#00BFFF] leading-none mb-1">
                    {s.val}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl pointer-events-none" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl aspect-[4/3]">
              <img
                src={content.image_url || "/assets/aerial-township.jpg"}
                alt="Prime Estate — Aerial Township"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#050b14] border border-[#00BFFF]/25 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl">
              <p className="font-serif text-xl text-[#00BFFF] leading-none mb-1">₹12L+</p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                Starting Unit
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
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
  const items = [...words, ...words, ...words];
  return (
    <div className="border-y border-white/5 py-8 overflow-hidden relative" style={{ background: "#04090f" }}>
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
