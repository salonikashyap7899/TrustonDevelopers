import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import heroImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TrustOn | Plots, Architecture, Construction & Investment" },
      {
        name: "description",
        content:
          "Explore TrustOn's full suite of premium real estate services — plot selling, architecture & design, construction & build, and investment consulting.",
      },
      { property: "og:title", content: "Services — TrustOn" },
      {
        property: "og:description",
        content:
          "Premium plots, architecture, construction and investment consulting under one roof.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Plot Selling",
    sub: "Premium Plots. Zero Compromise.",
    blurb:
      "Curated, legally vetted plots across Lucknow's most promising corridors — appreciation-ready and approval-clear.",
    to: "/plot-selling",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
  },
  {
    title: "Architecture & Design",
    sub: "Your Vision, Brought to Life on Paper First.",
    blurb:
      "Bespoke architectural drawings, 3D visualisation and interior planning tailored to your land and lifestyle.",
    to: "/architecture-design",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
  },
  {
    title: "Construction & Build",
    sub: "We Don't Just Build Buildings. We Build Promises.",
    blurb:
      "Turnkey construction with transparent costing, on-time delivery and premium craftsmanship — end to end.",
    to: "/construction-build",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
  },
  {
    title: "Investment Consulting",
    sub: "Buy Smart. Invest Smarter.",
    blurb:
      "Data-led advisory on yield, ROI and exit timing across residential, commercial and pre-launch inventory.",
    to: "/investment-consulting",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg",
  },
] as const;

const capabilities = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Vertically Integrated Building",
    description: "Our unified management systems bridge the gap between complex architectural vision and structural realization. By eliminating external fragmentation, we maintain 100% fidelity to the original design specification.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Advanced Materials",
    description: "We utilize high-density composite alloys and carbon-infused concrete to ensure thermal efficiency and structural longevity exceeding 100-year lifespans.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Quantifiable Progress",
    description: "Access our proprietary real-time dashboard for biometric site reporting, scheduling forensics, and budgetary transparency at every phase.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality Assurance Protocol",
    description: "Every structure undergoes triple-layer auditing by independent structural engineers to exceed international safety standards.",
  },
];

const processSteps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Site Forensics",
    description: "Comprehensive geological scanning and topographical analysis utilizing LiDAR and subterranean imaging.",
    cta: "Scanning Phase",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Structural Logic",
    description: "Computational stress testing and BIM integration to ensure absolute structural integrity under extreme conditions.",
    cta: "Stress Testing",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Shell Assembly",
    description: "Execution of the primary structural skeleton using high-tensile steel and monolithic pouring techniques.",
    cta: "Fabrication",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "System Integration",
    description: "Installation of decentralized HVAC, cyber-physical security arrays, and enhanced interior finishes.",
    cta: "Commissioning",
  },
];

function ServicesPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero Section */}
      <HeroSection />

      {/* Strategic Competencies */}
      <CapabilitiesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Services Grid */}
      <ServicesGridSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Precision Engineering"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 architectural-grid opacity-30" />
      </div>
      <div className="relative z-10 px-6 md:px-16 py-32 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-eyebrow text-primary block mb-6"
        >
          Precision Engineering
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-display-lg md:text-[72px] text-on-surface leading-[1.1] mb-6"
        >
          Architectural Rigor.
          <br />
          <span className="gradient-primary-text italic">Obsidian Precision.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-body-lg text-on-surface-variant max-w-2xl mb-10"
        >
          Truston Developers engineers the future of luxury environments through institutional-grade construction management and advanced material science.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/contact"
            className="text-button uppercase tracking-widest px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all"
          >
            Start Your Project
          </Link>
          <Link
            to="/project"
            className="text-button uppercase tracking-widest px-8 py-4 text-on-surface-variant hover:text-primary transition-all flex items-center gap-2"
          >
            Technical Portfolio <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-eyebrow text-primary block mb-4">Capabilities</span>
          <h2 className="text-display-lg text-on-surface mb-16">Strategic Competencies</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.1}>
              <div className="glass-panel p-8 md:p-12 group hover:border-primary/30 transition-all">
                <div className="text-primary mb-6">{cap.icon}</div>
                <h3 className="text-title-md text-on-surface mb-4">{cap.title}</h3>
                <p className="text-body-md text-on-surface-variant">{cap.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-eyebrow text-primary block mb-4">Execution Framework</span>
            <h2 className="text-display-lg text-on-surface">The Anatomy of Development</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="glass-panel p-8 text-center group hover:border-primary/30 transition-all h-full flex flex-col">
                <div className="text-primary mb-6 flex justify-center">{step.icon}</div>
                <h3 className="text-title-md text-on-surface mb-4">{step.title}</h3>
                <p className="text-body-md text-on-surface-variant mb-6 flex-grow">{step.description}</p>
                <div className="flex items-center justify-center gap-2 text-label-md text-primary uppercase tracking-widest">
                  {step.cta} <span>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGridSection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionEyebrow>Explore</SectionEyebrow>
          <h2 className="font-display text-center text-display-lg mb-16">
            A complete <span className="gradient-primary-text italic">real estate</span> ecosystem.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.to}
                className="group block relative aspect-[16/11] rounded-lg overflow-hidden hover-lift card-shadow"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <p className="text-eyebrow text-primary mb-3">0{i + 1} — Service</p>
                  <h3 className="text-display-lg text-on-surface mb-2">{s.title}</h3>
                  <p className="text-on-surface/80 font-serif italic mb-3">{s.sub}</p>
                  <p className="text-body-md text-on-surface-variant max-w-md">{s.blurb}</p>
                  <span className="inline-flex items-center gap-2 mt-5 text-label-md uppercase tracking-widest text-primary opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700">
                    Discover →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface-container">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="glass-panel p-12 md:p-16">
            <span className="text-eyebrow text-primary block mb-4 text-center">Direct Engagement</span>
            <h2 className="text-display-lg text-on-surface text-center mb-8">
              Request a Structural Assessment
            </h2>
            <p className="text-body-lg text-on-surface-variant text-center mb-10 max-w-2xl mx-auto">
              Initiate a consultation with our Principal Engineering leads. We provide comprehensive technical feasibility reports within 72 hours.
            </p>
            <form className="grid md:grid-cols-2 gap-6 mb-8">
              <input
                type="text"
                placeholder="Entity Name"
                className="bg-surface-container-low border border-primary/20 py-4 px-6 text-body-md text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/30"
              />
              <input
                type="text"
                placeholder="Asset Class"
                className="bg-surface-container-low border border-primary/20 py-4 px-6 text-body-md text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/30"
              />
              <input
                type="text"
                placeholder="Target Capital Expenditure"
                className="bg-surface-container-low border border-primary/20 py-4 px-6 text-body-md text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/30"
              />
              <textarea
                placeholder="Technical Brief (Optional)"
                rows={4}
                className="bg-surface-container-low border border-primary/20 py-4 px-6 text-body-md text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/30 md:col-span-2 resize-none"
              />
            </form>
            <div className="text-center">
              <button className="text-button uppercase tracking-widest px-12 py-5 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all">
                Transmit Inquiry
              </button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-on-surface-variant text-body-md">
              <div className="flex items-center gap-2">
                <span className="text-primary">+91 96160-61166</span>
              </div>
              <div className="flex items-center gap-2">
                <span>trustondevelopers01@gmail.com</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
