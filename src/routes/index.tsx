import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { Testimonials } from "@/components/Testimonials";
import { CursorGlow } from "@/components/CursorGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Own the Ground. Build the Legacy." },
      { name: "description", content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow." },
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
      <CursorGlow />
      <PageHero
        height="full"
        eyebrow="Luxury Real Estate — Lucknow"
        title={<>Own the <em className="gradient-bronze-text not-italic font-display">Ground.</em><br />Build the <span className="font-display italic">Legacy.</span></>}
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      >
        <Link to="/project" className="group inline-flex items-center gap-4 bg-[var(--bronze)] text-white px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-ink transition-all duration-500 shadow-luxe">
          Explore Projects
          <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
        </Link>
        <Link to="/contact" className="text-[11px] uppercase tracking-[0.25em] text-white/80 hover:text-[var(--bronze)] transition-all duration-500 border-b border-white/30 hover:border-[var(--bronze)] pb-0.5">
          Private Consultation
        </Link>
      </PageHero>

      <Marquee />
      <StatsBar />
      <PlotTracker />
      <Highlights />
      <WealthCalculator />
      <AboutPrime />
      <InvestLucknow />
      <Services />
      <ProjectFeature />
      <WhyTrust />
      <Testimonials />
      <ChannelPartnerCTA />
    </div>
  );
}

function Marquee() {
  const words = ["Cinematic Living", "Editorial Architecture", "Premium Plots", "Jila Panchayat Approved", "Legacy Investments", "Prime Location"];
  return (
    <div className="bg-[var(--ink)] border-y border-white/5 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap marquee gap-20">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-20 shrink-0">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className="font-serif text-2xl italic text-white/50 hover:text-white transition-colors duration-300">
                {w} <span className="text-[var(--bronze)] mx-6 not-italic text-base">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots" },
    { num: 25, suffix: "%", label: "Land Appreciation" },
    { num: 5, suffix: "+", label: "Years of Trust" },
    { num: 100, suffix: "%", label: "Legal Clearance" },
  ];
  return (
    <section className="bg-white py-16 px-6 border-b border-gray-100">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center py-8 px-6 text-center">
            <p className="font-display text-5xl md:text-6xl gradient-bronze-text font-bold">
              <CountUp to={s.num} suffix={s.suffix} />
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mt-3">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Highlights() {
  const cards = [
    { title: "Premium Living", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg" },
    { title: "Green Development", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg" },
    { title: "Modern Amenities", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg" },
    { title: "Property Guidance", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg" },
    { title: "Reasonable Pricing", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg" },
  ];
  return (
    <section className="py-24 px-6 bg-[var(--sand)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center mb-14">
          <SectionEyebrow>Lifestyle</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-6xl">
            A life <em className="gradient-bronze-text not-italic">beyond ordinary.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                <img
                  src={c.img} alt={c.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[var(--bronze)]/0 group-hover:bg-[var(--bronze)]/10 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-6 h-px bg-[var(--bronze)] mb-3 group-hover:w-12 transition-all duration-500" />
                  <p className="font-serif text-lg text-white leading-tight">{c.title}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPrime() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">
        <Reveal direction="left">
          <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
            <motion.div style={{ y }} className="absolute inset-[-10%]">
              <img src={interiorImg} alt="Luxury interior" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            {/* Badge overlay */}
            <div className="absolute bottom-8 right-8 bg-[var(--bronze)] text-white p-6 shadow-xl">
              <p className="font-display text-3xl font-bold">150+</p>
              <p className="text-[10px] uppercase tracking-widest mt-1 text-white/80">Premium Plots</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <p className="text-[var(--bronze)] text-[11px] uppercase tracking-luxe mb-5 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--bronze)]" />
            Own the Ground. Build Your Legacy.
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8">
            Prime Estate — where <em className="gradient-bronze-text not-italic">imagination</em> takes shape.
          </h2>
          <p className="text-foreground/65 text-lg leading-relaxed mb-10">
            Prime Estate is a trusted name in real estate development, built on a foundation
            of transparency, quality, and long-term vision. We don't just sell land — we craft
            opportunities. Our flagship project is a Jila Panchayat approved township that
            combines legal security, prime location, and future-ready infrastructure.
          </p>
          <div className="grid sm:grid-cols-2 gap-px bg-gray-100 mb-10">
            <div className="bg-white p-7 border-l-2 border-[var(--bronze)]">
              <p className="text-[var(--bronze)] text-[10px] uppercase tracking-widest mb-3">Our Mission</p>
              <p className="font-serif text-lg leading-snug">Make premium, legally secure land ownership accessible to every aspiring homeowner.</p>
            </div>
            <div className="bg-white p-7 border-l-2 border-[var(--bronze)]">
              <p className="text-[var(--bronze)] text-[10px] uppercase tracking-widest mb-3">Our Vision</p>
              <p className="font-serif text-lg leading-snug">Build not just properties, but thriving communities where families and businesses flourish.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Link to="/about-us" className="inline-flex items-center gap-3 bg-[var(--ink)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--bronze)] transition-all duration-500">
              Read More <span>→</span>
            </Link>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Call Anytime</p>
              <a href="tel:+919616061166" className="font-serif text-2xl text-[var(--bronze)] hover:underline">+91 96160-61166</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InvestLucknow() {
  const items = [
    { t: "Lucknow Metro", d: "Extended metro lines are boosting surrounding land values across key residential zones.", num: "3X", unit: "Growth" },
    { t: "Purvanchal Expressway", d: "Direct connectivity to UP's fastest-growing economic and industrial corridor.", num: "300", unit: "KM Range" },
    { t: "25% Land Appreciation", d: "Premium zones in Lucknow have seen up to 25% appreciation in the last 3 years.", num: "25%", unit: "Appreciation" },
    { t: "Airport Expansion", d: "The new international terminal is driving demand for premium residential properties.", num: "#1", unit: "Growth City" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-[var(--ink)]">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={lucknowImg} alt="" className="w-full h-full object-cover opacity-10" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/80 via-transparent to-[var(--ink)]/90" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow light>NRI / Investment</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-6">
            Why invest in <em className="gradient-bronze-text not-italic">Lucknow?</em>
          </h2>
          <p className="text-center text-white/50 max-w-2xl mx-auto mb-20 text-lg">
            One of India's fastest-growing real estate markets — driven by world-class infrastructure and rapidly rising land values.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-px bg-white/5">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1}>
              <div className="group bg-white/[0.03] hover:bg-white/[0.07] p-10 h-full transition-all duration-700 border-t-2 border-transparent hover:border-[var(--bronze)]">
                <p className="font-display text-5xl gradient-bronze-text font-bold mb-2">{it.num}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6">{it.unit}</p>
                <h3 className="font-serif text-xl text-white mb-4">{it.t}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Plot Selling", sub: "Premium Plots. Zero Compromise.", to: "/plot-selling", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg", num: "01" },
    { title: "Architecture & Design", sub: "Your Vision, Brought to Life on Paper First", to: "/architecture-design", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg", num: "02" },
    { title: "Construction & Build", sub: "We Don't Just Build Buildings. We Build Promises", to: "/construction-build", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg", num: "03" },
    { title: "Investment Consulting", sub: "Buy Smart. Invest Smarter.", to: "/investment-consulting", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg", num: "04" },
  ] as const;

  return (
    <section className="py-32 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Our Services</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-4">
            Everything you need,{" "}
            <em className="gradient-bronze-text not-italic">under one roof.</em>
          </h2>
          <p className="text-center text-foreground/50 mb-20 max-w-xl mx-auto">
            Four pillars of expertise, one trusted partner — from land to legacy.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-1">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09}>
              <Link to={s.to} className="group block relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <img
                  src={s.img} alt={s.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-700" />

                {/* Number top-right */}
                <div className="absolute top-6 right-6 font-display text-4xl text-white/20 group-hover:text-[var(--bronze)]/60 transition-colors duration-500">
                  {s.num}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  {/* Line animate */}
                  <div className="w-8 h-px bg-[var(--bronze)] mb-5 group-hover:w-16 transition-all duration-700" />
                  <h3 className="font-display text-4xl mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="text-white/60 font-serif italic mb-6 group-hover:text-white/80 transition-colors duration-500">{s.sub}</p>
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--bronze)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Discover More <span>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-12">
            <p className="font-serif italic text-xl text-foreground/60">
              Don't be late — luxury doesn't wait. Choose the life you deserve.
            </p>
            <Link to="/services" className="inline-flex items-center gap-3 border border-[var(--bronze)] text-[var(--bronze)] px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--bronze)] hover:text-white transition-all duration-500">
              All Services →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[var(--sand)]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Flagship Project</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3 leading-tight">
            Where imagination takes shape in{" "}
            <em className="gradient-bronze-text not-italic">luxury.</em>
          </h2>
          <p className="text-center text-foreground/55 font-serif italic text-lg mb-16">
            Crafted for those who expect nothing less than exceptional living.
          </p>
        </Reveal>

        <Reveal>
          <Link
            to="/projects/$slug"
            params={{ slug: "prime-estate-lucknow-uttar-pradesh" }}
            className="group block relative overflow-hidden shadow-2xl"
          >
            <div className="relative" style={{ aspectRatio: "21/9" }}>
              <motion.img
                style={{ scale }}
                src={projectImg} alt="Prime Estate"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 max-w-2xl text-white">
              <div className="w-8 h-px bg-[var(--bronze)] mb-6 group-hover:w-16 transition-all duration-700" />
              <p className="text-[10px] uppercase tracking-widest text-[var(--bronze)] mb-3">Residential Township · Lucknow</p>
              <h3 className="font-display text-5xl md:text-6xl mb-6">Prime Estate</h3>
              <p className="text-white/70 mb-10 max-w-md text-lg leading-relaxed">
                A flagship Jila Panchayat approved township — combining legal security,
                prime location, and future-ready infrastructure.
              </p>
              <span className="inline-flex w-fit items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest group-hover:gap-6 transition-all duration-500">
                View Project <span>→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WhyTrust() {
  const items = [
    { t: "Legal Security", d: "Every plot backed by Jila Panchayat approval & clear title deeds.", icon: "⚖" },
    { t: "Transparent Dealings", d: "No hidden charges. What we quote is what you pay.", icon: "◈" },
    { t: "Design Expertise", d: "In-house architects who understand your vision, not just blueprints.", icon: "◻" },
    { t: "Prime Location", d: "Strategic positioning with road access & utility connections.", icon: "◉" },
    { t: "Quality Construction", d: "Grade-A materials, skilled workforce, no shortcuts.", icon: "◆" },
    { t: "After-Sale Support", d: "We stay with you long after the deal is signed.", icon: "◎" },
  ];
  return (
    <section className="py-32 px-6 bg-[var(--ink)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--bronze) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--bronze) 0%, transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow light>Why Choose Us</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-20">
            Why buyers trust{" "}
            <em className="gradient-bronze-text not-italic">Prime Estate.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 h-full transition-all duration-700 border-b-2 border-transparent hover:border-[var(--bronze)] cursor-default">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[var(--bronze)] text-3xl">{it.icon}</span>
                  <span className="font-display text-5xl text-white/10 group-hover:text-white/20 transition-colors">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">{it.t}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelPartnerCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">
        <Reveal direction="left">
          <p className="text-[var(--bronze)] text-[11px] uppercase tracking-luxe mb-5 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--bronze)]" />
            Channel Partner Program
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            Earn more by partnering with{" "}
            <em className="gradient-bronze-text not-italic">TrustOn</em> today.
          </h2>
          <p className="text-foreground/65 text-lg leading-relaxed mb-10">
            Join TrustOn's Channel Partner Program and start earning premium commissions on every
            deal — with full marketing support, RERA-compliant projects, and a team that's always
            in your corner.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/channel-partner" className="inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--ink)] transition-all duration-500">
              Register Now <span>→</span>
            </Link>
            <a href="tel:+919616061166" className="inline-flex items-center gap-3 border border-gray-200 text-foreground/70 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-500">
              Call Us
            </a>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.12}>
          <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
            <img
              src="https://truston.advrtisinguru.com/wp-content/uploads/2026/01/ser3.jpg"
              alt="Channel Partner Program" loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="font-display text-3xl mb-1">Join 50+</p>
              <p className="text-[11px] uppercase tracking-widest text-white/60">Active Partners</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
