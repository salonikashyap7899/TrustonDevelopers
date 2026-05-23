import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { Testimonials } from "@/components/Testimonials";
import { WealthCalculator } from "@/components/WealthCalculator";
import { EnhancedDevelopersSection } from "@/components/DevelopersSection.Enhanced";
import { EnhancedGallerySection } from "@/components/GallerySection.Enhanced";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Services3DSection } from "@/components/Services3DSection";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { Projects3DShowcase } from "@/components/Projects3DShowcase";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import {
  FloatingImageScroll,
  SlideInOnScroll,
  BlurReveal,
  HighlightText,
} from "@/components/ScrollAnimations";
import { LuxuryHighlights } from "@/components/LuxuryHighlights";
import { Section3DBackground } from "@/components/Section3DBackground";

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
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[160vh] bg-ink overflow-hidden">
        {/* Fixed Background Video - Lazy loaded */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-60"
            poster="/og-image.png"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 md:mb-6 tracking-tight"
            >
              TRUST<span className="text-luxe-cyan">ON</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white/50 text-xs sm:text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] font-light uppercase"
            >
              Billion Dollar Legacy
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-8 md:bottom-12 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-luxe-cyan hover:text-luxe-cyan transition-colors duration-300 cursor-pointer"
          >
            <motion.svg 
              className="w-4 h-4 md:w-5 md:h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Who We Are Section */}
        <div className="relative z-10">
          <WhoWeAre />
        </div>
      </section>

      {/* 3. Intro Highlight Section */}
      <IntroHighlightSection />

      {/* 4. Building Plots & Structures */}
      <PlotsAndStructures />

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-ink relative overflow-hidden">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 md:mb-8 leading-tight">
                Crafting <em className="text-luxe-cyan italic">Timeless</em> Legacies
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                TrustOn stands at the intersection of architectural brilliance and strategic
                investment. We don&apos;t just sell plots; we provide the foundation for your future
                aspirations. Our commitment to quality and transparency ensures that every square
                foot you own is a testament to luxury.
              </p>
              <div className="flex gap-6 md:gap-8">
                <div>
                  <p className="text-2xl md:text-3xl font-serif text-luxe-cyan mb-1 md:mb-2">100%</p>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">
                    Transparency
                  </p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-serif text-luxe-cyan mb-1 md:mb-2">Prime</p>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">Locations</p>
                </div>
              </div>
            </Reveal>
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="aspect-square bg-gradient-to-br from-luxe-cyan/10 to-transparent rounded-full flex items-center justify-center border border-white/5"
              >
                <div className="w-3/4 h-3/4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center text-white/10 text-7xl md:text-9xl font-serif">
                  T
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Projects Showcase - This contains "Prime Estate" masterpieces */}
      <Projects3DShowcase />

      {/* MOVING Luxury Highlights Section — after Prime state (Projects Showcase) */}
      <LuxuryHighlights />

      {/* Futuristic Services Section */}
      <Services3DSection />

      {/* Enhanced Developers Section with Floating Images */}
      <EnhancedDevelopersSection />

      {/* Enhanced Gallery Section */}
      <EnhancedGallerySection />

      {/* Wealth Calculator */}
      <WealthCalculator />

      {/* Marquee */}
      <Marquee />

      {/* Enhanced Stats Bar */}
      <EnhancedStatsBar />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}

/* ── Enhanced Marquee with Floating Text ─────────────────────────── */
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
    <div className="bg-ink border-y border-white/5 py-4 md:py-8 overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-24"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-8 md:gap-24 shrink-0">
            {words.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-display text-lg md:text-2xl italic text-white/30 uppercase tracking-widest"
              >
                {w} <span className="text-luxe-cyan mx-4 md:mx-8 not-italic text-xs md:text-sm">*</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Enhanced Stats Bar with Rich Animations ──────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈", desc: "Fully documented" },
  ];
  return (
    <section className="bg-background border-y border-white/5 px-4 md:px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="group flex flex-col items-center py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center border-r border-white/5 last:border-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(4)]:border-0 relative">
              {/* Top accent line */}
              <div className="absolute top-0 left-4 right-4 md:left-8 md:right-8 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-luxe-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>

              {/* Icon */}
              <span className="text-luxe-cyan/30 text-xl md:text-3xl mb-3 md:mb-6 group-hover:text-luxe-cyan transition-colors duration-300">
                {s.icon}
              </span>

              {/* Counter */}
              <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-none tracking-tighter">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>

              {/* Divider */}
              <div className="w-6 md:w-8 h-px bg-white/10 my-4 md:my-6 group-hover:w-12 md:group-hover:w-16 group-hover:bg-luxe-cyan transition-all duration-300" />

              {/* Label */}
              <p className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/30 group-hover:text-luxe-cyan transition-colors duration-300 font-bold">
                {s.label}
              </p>

              {/* Description - Hidden on mobile */}
              <p className="hidden md:block text-[10px] text-white/20 mt-3 group-hover:text-white/50 transition-colors duration-300 font-medium">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Call to Action Section ──────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-ink">
      <Section3DBackground opacity={0.15} />

      {/* Background orbs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 md:top-20 right-10 md:right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxe-blue rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxe-cyan rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl relative z-10 text-center px-4">
        <BlurReveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 md:mb-8 tracking-tight leading-tight text-balance">
            Ready to Build Your <br className="hidden sm:block" />
            <em className="text-luxe-cyan italic font-serif">Legacy?</em>
          </h2>
        </BlurReveal>

        <SlideInOnScroll direction="up" delay={0.1}>
          <p className="text-white/40 text-sm md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Join the global circle of elite investors who have chosen TrustOn for their strategic
            real estate acquisitions.
          </p>
        </SlideInOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
        >
          <button className="btn-magnetic btn-luxe px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs">Secure Consultation</button>
          <button className="px-8 md:px-12 py-4 md:py-5 border border-white/10 text-white/50 font-bold rounded-full hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-300 text-[10px] md:text-[11px] uppercase tracking-widest">
            Private Portfolio
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 md:mt-20 flex flex-wrap justify-center gap-4 md:gap-10 text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-luxe-cyan text-base md:text-xl">✓</span>
            <span>Jila Panchayat Approved</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-luxe-cyan text-base md:text-xl">✓</span>
            <span>100% Legal Clearance</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-luxe-cyan text-base md:text-xl">✓</span>
            <span>Transparent Documentation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
