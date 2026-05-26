import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal } from "@/components/Reveal";
import { useSingleRecord, useCollection } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
  phone_number: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  slug: string;
  order_index: number;
};

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Prime Estate — Projects | TrustOn" },
      {
        name: "description",
        content:
          "Prime Estate — Jila Panchayat approved residential plots in Lucknow. Phase 1 & 2 now selling. Highway & metro connected.",
      },
    ],
  }),
  component: ProjectPage,
});

const DEFAULT_FAQS = [
  {
    q: "Are the plots in Prime Estate legally approved?",
    a: "Yes — all plots are Jila Panchayat approved with clear title deeds and proper documentation. Every stage is handled with complete transparency. No hidden conditions, no fine print.",
  },
  {
    q: "Can I get construction approval to build my home?",
    a: "Yes. With proper construction approval, you can design and build exactly as you envision. TrustOn also offers in-house architecture and construction services if you'd like guidance through the process.",
  },
  {
    q: "What is the starting price of plots?",
    a: "Plots start from ₹12 Lakhs+ depending on size and phase. Pricing is fully transparent with no hidden costs. Contact our team for current availability and the latest pricing sheet.",
  },
  {
    q: "Is Phase 2 available for booking now?",
    a: "Phase 2 is in active development. Early buyers can register interest now to secure priority booking at launch pricing — locking in below-market rates before the public announcement.",
  },
  {
    q: "How well connected is Prime Estate to Lucknow?",
    a: "Prime Estate at Dubagga offers direct highway connectivity and close proximity to the metro corridor — ensuring seamless access to central Lucknow, airports, schools, and commercial hubs.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 text-left gap-6 group"
      >
        <span className="font-serif text-lg text-white group-hover:text-[#00BFFF] transition-colors duration-300 leading-snug">
          {q}
        </span>
        <span
          className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#00BFFF] text-lg font-light shrink-0 transition-all duration-400 ${
            open
              ? "bg-[#00BFFF]/15 border-[#00BFFF]/50 rotate-45"
              : "group-hover:border-[#00BFFF]/40"
          }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-white/45 text-sm leading-[2] font-light pb-7 pr-12">{a}</p>
      </motion.div>
    </div>
  );
}

function ProjectPage() {
  const { data: hero } = useSingleRecord<HeroSection>("hero_sections", "page_key", "projects");
  const { data: projects } = useCollection<Project>("projects", { order: "order_index" });
  const content = usePageContent("projects.main", {
    faq_title: "Common Questions About",
    faq_title_accent: "Prime Estate",
  });

  return (
    <div
      className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]"
      style={{ paddingTop: "140px" }}
    >
      {/* ── HERO — split layout ── */}
      <section className="min-h-[90vh] grid lg:grid-cols-2 overflow-hidden">
        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-[#04090f] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-pulse" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Now Selling — Phase 1 &amp; 2
              </span>
            </div>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
              Flagship Project &nbsp;·&nbsp; Dubagga, Lucknow
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-light leading-none tracking-tight text-white mb-8">
              {hero?.title || "Prime"}
              <br />
              <em className="text-[#00BFFF] italic">{hero?.title_accent || "Estate"}</em>
            </h1>
            <p className="text-white/50 text-base leading-[1.95] font-light max-w-md mb-10">
              {hero?.subtitle ||
                "Residential plots in Lucknow's fastest-growing corridor — highway & metro connected, Jila Panchayat approved, with clear title deeds at every stage."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${hero?.phone_number || "+919616061166"}`}
                className="px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-lg transition-all duration-500"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Site Visit
              </a>
              <a
                href="#overview"
                className="px-8 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-lg hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-500"
              >
                Explore Project ↓
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — image with stats bar */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-full">
          <img
            src={hero?.image_url || heroImg}
            alt="Prime Estate"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 bg-[#04090f]/85 backdrop-blur-sm grid grid-cols-4 border-t border-white/8">
            {[
              { num: "120+", label: "Premium Plots" },
              { num: "47", label: "Available Now" },
              { num: "₹12L+", label: "Starting Price" },
              { num: "2", label: "Project Phases" },
            ].map((s, i) => (
              <div key={s.label} className={`py-5 px-5 ${i < 3 ? "border-r border-white/8" : ""}`}>
                <p className="font-serif text-2xl text-white leading-none mb-1">{s.num}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16]" id="overview">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" /> Project Overview
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
                Premium Residential Plots{" "}
                <em className="text-[#00BFFF] italic">Crafted for Modern Living</em>
              </h2>
              <p className="text-white/50 text-sm leading-[2] mb-5 font-light">
                Prime Estate is a thoughtfully planned residential plots colony designed for those
                who want the freedom to build on their own terms. Located in a promising growth
                corridor of Lucknow, the project offers well-defined plots, proper road
                connectivity, and essential infrastructure to support long-term development.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="border border-white/8 rounded-2xl overflow-hidden">
                {[
                  ["Project Type", "Residential Plots"],
                  ["Target Buyers", "Investors & End Users"],
                  ["Launch Date", "5 January 2025"],
                  ["Location", "Dubagga, Lucknow U.P."],
                  ["Approval", "Jila Panchayat ✓"],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex items-center ${i % 2 === 0 ? "bg-[#060c16]" : "bg-[#080d1a]"} px-6 py-4 border-b border-white/5 last:border-b-0`}
                  >
                    <span className="text-white/35 text-[10px] uppercase tracking-[0.15em] font-bold w-40 shrink-0">
                      {k}
                    </span>
                    <span
                      className={`text-sm font-light ${k === "Approval" ? "text-[#00BFFF]" : "text-white/80"}`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-16 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Frequently Asked
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-12">
              {content.faq_title}{" "}
              <em className="text-[#00BFFF] italic">{content.faq_title_accent}</em>
            </h2>
          </Reveal>
          <div className="border border-white/8 rounded-2xl px-8 md:px-12 overflow-hidden bg-[#060c16]">
            {(content.faqs as any[])?.length
              ? (content.faqs as any[]).map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)
              : DEFAULT_FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── Projects List ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-16">
              Our <em className="text-[#00BFFF] italic">Developments</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((p) => (
              <Reveal key={p.id}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="group block bg-[#04090f] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00BFFF]/30 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-[#00BFFF] text-[10px] uppercase tracking-widest font-bold mb-3">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-2xl text-white mb-4">{p.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-16 bg-[#060c16] text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,191,255,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
              Ready to Claim
              <br />
              Your <em className="text-[#00BFFF] italic">Plot?</em>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${hero?.phone_number || "+919616061166"}`}
                className="px-10 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-full transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                {hero?.phone_number || "+91 96160-61166"}
              </a>
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-full hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-500"
              >
                Email Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
