import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import heroImg from "@/assets/hero-estate.jpg";

export const Route = createFileRoute("/architecture-design")({
  head: () => ({
    meta: [
      { title: "Architecture & Design — TrustOn" },
      {
        name: "description",
        content:
          "Your vision, brought to life on paper first. Architecture and interior design rooted in craft and intent.",
      },
      { property: "og:title", content: "Architecture & Design — TrustOn" },
    ],
  }),
  component: Page,
});

const processSteps = [
  {
    num: "01",
    title: "Discovery & Brief",
    desc: "We begin by understanding your vision, lifestyle, aspirations, and the story you want your space to tell. Every detail matters — from room flow to natural light.",
  },
  {
    num: "02",
    title: "Concept Design",
    desc: "Our architects translate your brief into spatial concepts — floor plans, elevation sketches, and mood boards that capture the essence of your future home.",
  },
  {
    num: "03",
    title: "Technical Development",
    desc: "Concept designs evolve into full technical drawings — structural plans, MEP coordination, material schedules, and regulatory compliance documentation.",
  },
  {
    num: "04",
    title: "Construction Documents",
    desc: "Complete, approved, construction-ready documentation handed over to your build team — with full support throughout the construction process.",
  },
];

const capabilities = [
  {
    icon: "📐",
    title: "Custom Blueprint Design",
    desc: "Every home deserves a unique plan. Our architects design from scratch, tailoring every room, corridor, and opening to your exact lifestyle and lot dimensions.",
  },
  {
    icon: "🏙️",
    title: "3D Visualization",
    desc: "Before a single brick is laid, walk through your home virtually. Our photorealistic 3D renders and walkthroughs bring your design to life with complete clarity.",
  },
  {
    icon: "✅",
    title: "Regulatory Compliance",
    desc: "Deep knowledge of local building codes, JP approvals, and municipal regulations ensures your design gets approved faster — with zero costly surprises.",
  },
  {
    icon: "🛋️",
    title: "Interior Design",
    desc: "From spatial planning to material selection, finish specifications and lighting design — we handle every layer of your interior environment.",
  },
  {
    icon: "🌿",
    title: "Sustainable Design",
    desc: "We integrate passive solar principles, natural ventilation, and sustainable materials to create homes that are both beautiful and responsibly built.",
  },
  {
    icon: "📏",
    title: "Space Planning",
    desc: "Optimized layouts that maximize every square foot — balancing privacy, flow, natural light, and functional efficiency without compromise.",
  },
];

const portfolio = [
  {
    label: "Luxury Residences",
    count: "60+",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format",
  },
  {
    label: "Commercial Spaces",
    count: "40+",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format",
  },
  {
    label: "Mixed-Use Developments",
    count: "20+",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format",
  },
];

function Page() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={luxuryInteriorImg}
            alt="Architecture & Design"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.28) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[10px] md:text-xs text-[#00BFFF] uppercase font-bold mb-6 tracking-[0.4em] flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-[#00BFFF]" />
            TrustOn Services
            <span className="w-8 h-px bg-[#00BFFF]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-6"
          >
            Architecture
            <br />
            <em className="text-[#00BFFF] italic">&amp; Design</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Spaces designed with vision, built with precision. Your home begins as a
            conversation — and ends as a legacy.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 1 }, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/30"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-white/5 bg-[#060c16]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { val: "180+", label: "Projects Delivered" },
            { val: "100K+", label: "Sqft Designed" },
            { val: "98%", label: "Client Satisfaction" },
            { val: "100%", label: "Approval Success" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center py-12 px-6 text-center border-r border-white/5 last:border-0 cursor-default">
                <p className="font-serif text-4xl md:text-5xl text-white font-light leading-none tracking-tight">
                  {s.val}
                </p>
                <div className="w-6 h-px bg-[#00BFFF]/30 my-4 group-hover:w-12 group-hover:bg-[#00BFFF] transition-all duration-500" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 group-hover:text-[#00BFFF] transition-colors duration-500 font-bold">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="relative py-32 px-6">
        <Section3DBackground opacity={0.08} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Overview
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
              Where Vision Meets
              <br />
              <em className="text-[#00BFFF] italic">Expert Craft</em>
            </h2>
            <div className="space-y-6">
              {[
                "Great architecture is more than drawing walls on paper. It is about fundamentally shaping the way people live, work, and experience the spaces around them.",
                "Our architecture and design services bring together bold creative thinking, rigorous technical expertise, and a deep understanding of human needs to deliver structures that stand the test of time.",
                "We believe no two projects are alike. Every design begins with listening — truly, attentively, and without assumption.",
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-white/55 text-lg leading-relaxed font-light">{p}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <img
                src={heroImg}
                alt="Architecture & Design"
                className="relative rounded-[32px] border border-white/5 shadow-2xl w-full"
                style={{ filter: "saturate(0.85) brightness(0.7)" }}
              />
              <div className="absolute -bottom-6 -right-6 bg-[#060c16] border border-[#00BFFF]/30 rounded-2xl p-6 shadow-xl">
                <p className="font-serif text-2xl text-[#00BFFF]">5+</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">
                  Years of Expertise
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <Section3DBackground opacity={0.12} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Our Process
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              From Concept to
              <br />
              <em className="text-[#00BFFF] italic">Construction-Ready</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "rgba(0,191,255,0.4)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#04090f] border border-white/5 rounded-[32px] p-10 group cursor-default"
                >
                  <span className="absolute top-6 right-8 font-serif text-7xl text-white/[0.03] group-hover:text-[#00BFFF]/10 transition-colors duration-700 leading-none select-none">
                    {step.num}
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] mb-4 font-bold">
                    Phase {step.num}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{step.desc}</p>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#00BFFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              What We Offer
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              Our Design
              <br />
              <em className="text-[#00BFFF] italic">Capabilities</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(0,191,255,0.25)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/5 bg-[#060c16] rounded-[28px] p-10 group cursor-default"
                >
                  <span className="text-3xl mb-6 block">{cap.icon}</span>
                  <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#00BFFF] transition-colors duration-300 leading-tight">
                    {cap.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{cap.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Our Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              Projects That Define
              <br />
              <em className="text-[#00BFFF] italic">Excellence</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-[32px] border border-white/5 hover:border-[#00BFFF]/30 transition-all duration-500 cursor-default"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.label}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-50 group-hover:brightness-40 group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/90 via-[#04090f]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-serif text-4xl text-[#00BFFF] mb-2">{item.count}</p>
                    <h3 className="font-serif text-xl text-white">{item.label}</h3>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Trust ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              The TrustOn Standard
              <span className="w-8 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-12">
              Why clients trust TrustOn
              <br />
              <em className="text-[#00BFFF] italic">with their design</em>
            </h2>
            {[
              "Our architects bring years of hands-on experience across residential, commercial, and mixed-use projects — combining technical skill with creative passion. We understand the local regulatory landscape deeply, which means fewer delays and smoother approvals.",
              "We treat every project with the care and attention it deserves, regardless of scale. We are not just designers — we are your partners in creating a space that works hard, lasts long, and feels exactly right.",
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-white/40 text-xl md:text-2xl leading-relaxed font-serif italic mb-8 max-w-4xl mx-auto">
                  {p}
                </p>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#060c16] text-center relative overflow-hidden">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-6">
              Private Advisory Engagement
            </p>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
              Let's Build Something
              <br />
              <em className="text-[#00BFFF] italic">Extraordinary</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="px-12 py-5 text-[12px] uppercase tracking-[0.15em] font-bold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.4)]"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Start Your Project →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-12 py-5 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.15em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                +91 96160-61166
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
