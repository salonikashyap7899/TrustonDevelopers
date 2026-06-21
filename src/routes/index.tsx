import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-estate.jpg";
import { openConsultationModal } from "@/components/ConsultationModal";
import { Reveal, CountUp } from "@/components/Reveal";
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
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TRUSTON" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  const heroContent = usePageContent("home.hero", {});
  return (
    <div className="bg-[#04090f] text-foreground overflow-x-hidden">

      {/* Hero */}
      <section className="relative h-screen bg-[#04090f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline preload="metadata"
            className="w-full h-full object-cover"
            style={{ opacity: 0.88, transform: "translateZ(0)" }}
          >
            <source
              src={String(heroContent.video_url || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4")}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/40 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-16 max-w-[1200px] mx-auto w-full">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-10"
            >
              <h1 className="font-serif leading-[0.85] tracking-tight">
                <span className="text-white text-5xl md:text-6xl lg:text-8xl font-light">
                  {heroContent.title ?? "TRUST"}
                </span>
                <span className="text-[#00BFFF] text-5xl md:text-6xl lg:text-8xl font-light">
                  {heroContent.title_accent || "ON"}
                </span>
              </h1>
              <p className="mt-6 text-white/70 text-sm md:text-xl uppercase tracking-[0.35em]">
                {heroContent.subtitle ?? "Own the Ground. Build the Legacy."}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <button
                onClick={openConsultationModal}
                className="px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Consultation
              </button>
              <a
                href="tel:+919616061166"
                className="px-10 py-4 border border-white/20 text-white/75 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                +91 96160-61166
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 2 },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
          onClick={() => document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-10 right-8 md:right-16 lg:right-24 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors duration-500 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Who We Are */}
      <WhoWeAreSection />

      {/* Gallery Section */}
      <div className="-mt-1">
        <GallerySection />
      </div>

      {/* Prime Estate */}
      <div className="pb-12 md:pb-20 bg-[#0F0F0D]">
        <PrimeEstateSection />
      </div>

      {/* Philosophy */}
      <PhilosophySection />

      {/* Plots & Structures */}
      <PlotsAndStructures />

      {/* Intro Highlight (New Generation) */}
      <IntroHighlightSection />

      {/* Services (Four Pillars) */}
      <TrustonServicesSection />

      {/* Stats Bar */}
      <div className="-mt-1">
        <EnhancedStatsBar />
      </div>

      {/* Why Buyers Choose Truston */}
      <TrustonWhySection />

      {/* Testimonials */}
      <Testimonials />

      {/* Marquee */}
      <MarqueeBanner />

      {/* CTA Strip */}
      <TrustonCTAStrip />
    </div>
  );
}

/* Philosophy */
function PhilosophySection() {
  const content = usePageContent("home.philosophy", {
    eyebrow: "Our Philosophy",
    title: "Crafting",
    title_accent: "Timeless",
    subtitle: "Legacies",
    body: "TrustOn stands at the intersection of architectural brilliance and strategic investment. We don't just sell plots; we provide the foundation for your future aspirations.",
    body_secondary: "Our commitment to quality and transparency ensures that every square foot you own is a testament to enduring luxury — built to outlast trends and appreciate with time.",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-25_23-25-53-thbQTIwazkPXtZmxwz9M0Fc8S5PCNo.jpg",
  });

  return (
    <section className="py-28 md:py-36 px-6 bg-[#050b14] relative overflow-hidden">
      <Section3DBackground opacity={0.10} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                {content.eyebrow}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
              {content.title}{" "}
              <em className="text-[#00BFFF] italic font-light">{content.title_accent}</em>
              <br />
              {content.subtitle}
            </h2>
            <div className="w-16 h-px bg-[#00BFFF]/30 mb-8" />
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4 font-light">
              {content.body}
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-10 font-light">
              {content.body_secondary}
            </p>
            <div className="flex items-stretch divide-x divide-white/10 border border-white/[0.07] rounded-2xl overflow-hidden">
              {[
                { val: "100%", label: "Transparency" },
                { val: "Prime", label: "Locations" },
                { val: "5+", label: "Years of Trust" },
              ].map((s) => (
                <div key={s.label} className="flex-1 px-6 py-5 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-[#00BFFF] leading-none mb-1">{s.val}</p>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl aspect-[4/3]">
              {content.video_url ? (
                <video
                  src={String(content.video_url)}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover brightness-75"
                />
              ) : (
                <img
                  src={String(content.image_url || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-25_23-25-53-thbQTIwazkPXtZmxwz9M0Fc8S5PCNo.jpg")}
                  alt="Prime Estate — Aerial Township Layout"
                  className="w-full h-full object-cover brightness-75"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[#050b14] border border-[#00BFFF]/25 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl">
              <p className="font-serif text-xl text-[#00BFFF] leading-none mb-1">₹12L+</p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">Starting Unit</p>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}

/* Marquee */
const DEFAULT_MARQUEE_WORDS = [
  "Cinematic Living",
  "Editorial Architecture",
  "Premium Plots",
  "Jila Panchayat Approved",
  "Legacy Investments",
  "Prime Location",
  "Transparent Dealings",
];

function MarqueeBanner() {
  const c = usePageContent("home.marquee", { words: DEFAULT_MARQUEE_WORDS });
  const words: string[] = Array.isArray(c.words) && (c.words as string[]).length > 0
    ? (c.words as string[])
    : DEFAULT_MARQUEE_WORDS;
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
            {w} <span className="text-[#00BFFF]/50 not-italic text-xs mx-1">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Stats Bar */
const STAT_ICONS = ["◉", "◆", "◎", "◈", "◇", "◐"];
const DEFAULT_STATS = [
  { num: 150, suffix: "+", label: "Premium Plots", desc: "Carefully selected" },
  { num: 25, suffix: "%", label: "Land Appreciation", desc: "Year-on-year growth" },
  { num: 5, suffix: "+", label: "Years of Trust", desc: "Proven track record" },
  { num: 100, suffix: "%", label: "Legal Clearance", desc: "Fully documented" },
];

function EnhancedStatsBar() {
  const c = usePageContent("home.stats", { items: DEFAULT_STATS });

  type StatItem = { num?: number | string; suffix?: string; label?: string; desc?: string };
  const rawItems = Array.isArray(c.items) && (c.items as StatItem[]).length > 0
    ? (c.items as StatItem[])
    : DEFAULT_STATS;

  const stats = rawItems.map((s: StatItem, i: number) => ({
    num: typeof s.num === "number" ? s.num : Number(s.num) || 0,
    suffix: String(s.suffix || ""),
    label: String(s.label || ""),
    desc: String(s.desc || ""),
    icon: STAT_ICONS[i % STAT_ICONS.length],
  }));

  return (
    <section className="border-y border-white/5 px-6 relative overflow-hidden" style={{ background: "#04090f" }}>
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label || i} delay={i * 0.1}>
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
