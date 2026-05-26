import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import plotImg from "@/assets/plot-tracker.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import { useSingleRecord } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
};

export const Route = createFileRoute("/plot-selling")({
  head: () => ({
    meta: [
      { title: "Plot Selling — TrustOn Developers" },
      {
        name: "description",
        content:
          "Jila Panchayat approved plots in Lucknow's highest-growth corridors. Zero ambiguity. Complete documentation. Starting at ₹12 Lakhs.",
      },
    ],
  }),
  component: PlotSellingPage,
});

const tickerItems = [
  "Jila Panchayat Approved",
  "Dubagga, Lucknow",
  "Clear Title Deeds",
  "47 Plots Available Now",
  "Starting ₹12 Lakhs",
  "25% Annual Appreciation",
  "End-to-End Support",
  "Prime Estate · Phase I & II",
];

const plotTypes = ["All", "Residential", "Corner Plots", "Commercial"];

const plots = [
  {
    tag: "⭐ Featured · Best Value",
    tagColor: "text-[#00BFFF] border-[#00BFFF]/30 bg-[#00BFFF]/8",
    loc: "Prime Estate · Dubagga, Lucknow",
    name: "Plot A-07 — Corner Double-Front",
    area: "720 sq ft",
    dims: "30 × 24 m",
    facing: "North-East",
    road: "24 m",
    ownership: "Freehold",
    price: "₹ 21.6 L",
    sub: "₹ 3,000 / sq ft · JP Approved",
    type: "corner",
    featured: true,
  },
  {
    tag: "Available",
    tagColor: "text-white/60 border-white/15 bg-white/4",
    loc: "Phase I · Sector 8, Lucknow",
    name: "Plot B-03 — Standard Residential",
    area: "450 sq ft",
    dims: "25 × 18 m",
    facing: "North",
    road: "18 m",
    ownership: "Freehold",
    price: "₹ 13.5 L",
    sub: "₹ 2,400 / sq ft",
    type: "residential",
  },
  {
    tag: "Commercial",
    tagColor: "text-amber-400 border-amber-400/30 bg-amber-400/8",
    loc: "NH-19 Corridor · Lucknow",
    name: "Plot C-01 — Highway Commercial",
    area: "600 sq ft",
    dims: "30 × 20 m",
    facing: "East",
    road: "Highway",
    ownership: "Freehold",
    price: "₹ 19.2 L",
    sub: "₹ 3,200 / sq ft",
    type: "commercial",
  },
  {
    tag: "◎ Corner Plot",
    tagColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
    loc: "Phase II · Green Township",
    name: "Plot D-11 — Corner Compact",
    area: "380 sq ft",
    dims: "20 × 19 m",
    facing: "South",
    road: "2 Roads",
    ownership: "Freehold",
    price: "₹ 12 L",
    sub: "₹ 2,500 / sq ft · Starter",
    type: "corner",
  },
  {
    tag: "Available",
    tagColor: "text-white/60 border-white/15 bg-white/4",
    loc: "Phase I · Central Block",
    name: "Plot E-05 — Wide Frontage",
    area: "540 sq ft",
    dims: "27 × 20 m",
    facing: "West",
    road: "20 m",
    ownership: "Freehold",
    price: "₹ 16.2 L",
    sub: "₹ 3,000 / sq ft",
    type: "residential",
  },
  {
    tag: "SOLD OUT",
    tagColor: "text-white/20 border-white/8 bg-white/2",
    loc: "Phase I · Prime Block",
    name: "Plot F-02 — Premium Corner",
    area: "860 sq ft",
    dims: "40 × 21.5 m",
    facing: "North-West",
    road: "30 m",
    ownership: "Freehold",
    price: "₹ 28 L",
    sub: "Sold",
    type: "corner",
    sold: true,
  },
];

function PlotSellingPage() {
  const { data: hero } = useSingleRecord<HeroSection>("hero_sections", "page_key", "plot-selling");
  const { data: dbPlots } = useCollection<any>("plots");
  const content = usePageContent("plots.main", {
    intro_title: "Select Your",
    intro_title_accent: "Plot",
  });
  const [activeFilter, setActiveFilter] = useState("All");

  const displayPlots = dbPlots && dbPlots.length > 0 ? dbPlots : plots;

  const filteredPlots =
    activeFilter === "All"
      ? displayPlots
      : displayPlots.filter((p: any) => {
          const pType = (p.type || "").toLowerCase();
          return activeFilter === "Corner Plots"
            ? pType === "corner"
            : pType === activeFilter.toLowerCase();
        });

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* ── HERO with bg image ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-[88px]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || plotImg}
            alt="Prime Estate"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.2) saturate(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/70 via-[#04090f]/30 to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 to-transparent" />
          {/* Blue glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,100,191,0.15) 0%, transparent 70%)",
            }}
          />
          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full grid md:grid-cols-2 gap-12 items-end">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Asset Acquisition · Prime Estate
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-white mb-6">
              {hero?.title || "Own"}{" "}
              <em className="text-[#00BFFF] italic">{hero?.title_accent || "Land"}</em>
              <br />
              {hero?.subtitle || "That Builds a Legacy"}
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-md mb-8 font-light">
              Jila Panchayat approved plots in Lucknow's highest-growth corridors. Zero ambiguity.
              Complete documentation. Prices starting at ₹12 Lakhs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#plots"
                className="px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-lg transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                View Available Plots
              </a>
              <a
                href="tel:+919616061166"
                className="px-8 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-lg hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <div className="border border-white/8 rounded-2xl overflow-hidden bg-[#060c16]/80 backdrop-blur-sm">
              <div className="grid grid-cols-2">
                {[
                  { num: "120+", label: "Total Plots" },
                  { num: "47", label: "Still Available" },
                  { num: "₹12L+", label: "Starting Price" },
                  { num: "25%", label: "Avg. Annual Growth" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`p-7 border border-white/5 ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""}`}
                  >
                    <p className="font-serif text-4xl text-[#00BFFF] leading-none mb-2">{s.num}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-bold">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 flex items-center gap-3 border-t border-white/5">
                <span className="text-xl">🏛️</span>
                <div>
                  <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.12em] font-bold mb-0.5">
                    Government Approved
                  </p>
                  <p className="text-white/40 text-xs font-light">
                    Jila Panchayat certified. Clear title deeds. Fully compliant.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="border-y border-[#00BFFF]/15 bg-[#00BFFF]/5 py-3 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "plot-ticker 28s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] shrink-0" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.12em] font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Available Plots ── */}
      <section className="py-20 px-6 md:px-12 bg-[#060c16]" id="plots">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <div>
                <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2">
                  <span className="w-6 h-px bg-[#00BFFF]" /> Available Inventory
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                  {content.intro_title}{" "}
                  <em className="text-[#00BFFF] italic">{content.intro_title_accent}</em>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-0 border border-white/10 rounded-lg overflow-hidden">
                {plotTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveFilter(t)}
                    className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] font-medium border-r border-white/10 last:border-r-0 transition-all duration-300 ${
                      activeFilter === t
                        ? "bg-[#00BFFF]/15 text-[#00BFFF]"
                        : "text-white/35 hover:text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {filteredPlots.map((plot: any, i: number) => (
              <Reveal key={plot.id || plot.name} delay={i * 0.07}>
                <div
                  className={`bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 flex flex-col relative group ${
                    (plot.is_featured || plot.featured) ? "md:col-span-2" : ""
                  } ${(plot.is_sold || plot.sold) ? "pointer-events-none" : "cursor-pointer"}`}
                >
                  {(plot.is_sold || plot.sold) && (
                    <div className="absolute inset-0 bg-[#04090f]/65 flex items-center justify-center z-10 rounded">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 border border-white/10 px-4 py-2 rounded bg-[#060c16]">
                        Sold Out
                      </span>
                    </div>
                  )}
                  {/* Plot visual placeholder */}
                  <div
                    className={`w-full bg-[#080d1a] flex items-center justify-center border-b border-white/5 relative overflow-hidden ${
                      (plot.is_featured || plot.featured) ? "h-48" : "h-36"
                    }`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-50"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-20"
                      style={{
                        background:
                          "radial-gradient(ellipse 60% 60% at 40% 50%, rgba(0,191,255,0.3) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <p className="font-serif text-2xl text-[#00BFFF]/50 italic">
                        {plot.name.split("—")[0].trim()}
                      </p>
                      <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] mt-1">
                        {plot.area}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className={`inline-block text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 border rounded-full mb-3 w-fit ${plot.tag_color || plot.tagColor}`}
                    >
                      {plot.tag}
                    </span>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.1em] mb-1">
                      {plot.location || plot.loc}
                    </p>
                    <h3
                      className={`font-serif text-white leading-snug mb-4 ${(plot.is_featured || plot.featured) ? "text-2xl" : "text-xl"}`}
                    >
                      {plot.name}
                    </h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 pb-4 mb-4 border-b border-white/6">
                      {[
                        { l: "Area", v: plot.area },
                        { l: "Dimensions", v: plot.dims },
                        { l: "Facing", v: plot.facing },
                        { l: "Road", v: plot.road },
                      ].map((s) => (
                        <div key={s.l}>
                          <p className="text-white text-sm font-medium">{s.v}</p>
                          <p className="text-white/30 text-[10px] uppercase tracking-[0.08em]">
                            {s.l}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
                      <div>
                        <p
                          className={`font-serif text-[#00BFFF] leading-none ${(plot.is_featured || plot.featured) ? "text-4xl" : "text-2xl"}`}
                        >
                          {plot.price}
                        </p>
                        <p className="text-white/30 text-[10px] mt-1">
                          {plot.subtitle || plot.sub}
                        </p>
                      </div>
                      {!(plot.is_sold || plot.sold) && (
                        <a
                          href="tel:+919616061166"
                          className="px-5 py-2.5 bg-[#00BFFF]/15 border border-[#00BFFF]/30 text-[#00BFFF] text-[11px] uppercase tracking-[0.1em] font-medium rounded-lg hover:bg-[#00BFFF]/25 transition-all duration-300 group-hover:border-[#00BFFF]/60"
                        >
                          Enquire Now →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-20 px-6 md:px-12 bg-[#00BFFF]/10 border-y border-[#00BFFF]/20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,191,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#00BFFF]" /> Start Your Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Your Plot in Prime Estate is <em className="text-[#00BFFF] italic">Waiting</em>
            </h2>
          </div>
          <div className="flex flex-col gap-4 min-w-[260px]">
            <a
              href="tel:+919616061166"
              className="flex items-center gap-3 text-white hover:text-[#00BFFF] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                📞
              </div>
              <span className="font-serif text-2xl">+91 96160-61166</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
