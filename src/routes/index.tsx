import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { Testimonials } from "@/components/Testimonials";
import { DevelopersSection } from "@/components/DevelopersSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";

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
      <SobhaStyleHero
        height="full"
        title=""
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      />

      <WhoWeAreSection />
      <DevelopersSection />

      <Marquee />
      <StatsBar />
      <Testimonials />
    </div>
  );
}

/* ── Marquee ─────────────────────────────────────────── */
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
  return (
    <div className="bg-[var(--ink)] border-y border-white/5 py-5 overflow-hidden">
      <div className="flex whitespace-nowrap marquee gap-16">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-16 shrink-0">
            {words.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-serif text-xl italic text-white/40 hover:text-white/70 transition-colors duration-500 cursor-default"
              >
                {w} <span className="text-[var(--bronze)] mx-5 not-italic text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Bar ───────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈" },
  ];
  return (
    <section className="bg-white border-b border-gray-100 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "oklch(0.98 0.004 240)" }}
              className="group flex flex-col items-center py-12 px-6 text-center border-r border-gray-100 last:border-0 cursor-default transition-colors duration-300 relative"
            >
              {/* Top accent line animate */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gray-100 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--bronze)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>

              <span className="text-[var(--bronze)]/30 text-2xl mb-4 group-hover:text-[var(--bronze)]/60 transition-colors duration-500">
                {s.icon}
              </span>
              <p className="font-display text-5xl md:text-6xl gradient-bronze-text font-bold leading-none">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>
              <div className="w-6 h-px bg-gray-200 my-4 group-hover:w-12 group-hover:bg-[var(--bronze)] transition-all duration-500" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 group-hover:text-[var(--bronze)] transition-colors duration-500">
                {s.label}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


