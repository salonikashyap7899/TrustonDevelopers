import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import lucknowAerialImg from "@/assets/lucknow-aerial.jpg";
import { useSingleRecord, useCollection } from "@/hooks/useCollections";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The Legacy Journal — TrustOn Developers" },
      {
        name: "description",
        content:
          "Expert perspectives on Lucknow real estate, land investment, architecture, and building generational wealth.",
      },
    ],
  }),
  component: BlogPage,
});

const categories = [
  "All",
  "Investment",
  "Architecture",
  "Market Trends",
  "Lifestyle",
  "Legal & Docs",
  "NRI Guide",
];

type Article = {
  id: string;
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
  author?: string;
  read?: string;
  featured?: boolean;
};

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "1",
    cat: "investment",
    title: "How to Evaluate Land ROI Before You Buy",
    excerpt:
      "Beyond the brochure — a data-driven framework for assessing real appreciation potential in Lucknow's emerging corridors before committing capital.",
    date: "May 10, 2025",
    img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=800&auto=format&fit=crop",
  },
];

function BlogPage() {
  const { data: hero } = useSingleRecord<Record<string, string | undefined>>(
    "hero_sections",
    "page_key",
    "blog",
  );
  const { data: dbArticles } = useCollection<any>("articles");
  const [activeFilter, setActiveFilter] = useState("All");
  const [subscribed, setSubscribed] = useState(false);

  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : DEFAULT_ARTICLES;

  const filteredArticles =
    activeFilter === "All"
      ? articles
      : articles.filter((a: any) => {
          const aCat = (a.category || a.cat || "").toLowerCase();
          const target = activeFilter.toLowerCase().replace(/ & /g, " ").replace(/ /g, "");
          return aCat === target;
        });

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* ── HERO with bg image ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-[88px]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || lucknowAerialImg}
            alt="Blog Hero"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/70 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Editorial &amp; Insights
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight text-white mb-6">
              {hero?.title || "The Legacy"}
              <br />
              <em className="text-[#00BFFF] italic">{hero?.title_accent || "Journal"}</em>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed mb-10">
              {hero?.subtitle ||
                "Expert perspectives on Lucknow real estate, land investment, architecture, and the art of building generational wealth."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div
        className="sticky top-[72px] z-40 bg-[#060c16]/95 border-b border-white/5 px-6 md:px-12 py-4"
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mr-3">
            Filter
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-medium border transition-all duration-300 rounded-full ${
                activeFilter === cat
                  ? "border-[#00BFFF] text-[#00BFFF] bg-[#00BFFF]/10"
                  : "border-white/10 text-white/40 hover:border-[#00BFFF]/50 hover:text-[#00BFFF]/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Articles Grid ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {filteredArticles.map((art: any, i: number) => (
              <Reveal key={art.id || i} delay={i * 0.06}>
                <article className="bg-[#060c16] p-0 cursor-pointer group hover:bg-[#080d1a] transition-colors duration-300 relative flex flex-col h-full border-b border-white/5">
                  <div className="overflow-hidden">
                    <img
                      src={art.image_url || art.img}
                      alt={art.title}
                      className="w-full aspect-video object-cover transition-all duration-500 group-hover:brightness-100"
                      style={{ filter: "brightness(0.75)" }}
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">
                      {art.category || art.cat}
                    </span>
                    <h3 className="font-serif text-xl font-light text-white leading-snug mb-3 flex-1">
                      {art.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                      {art.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-white/6">
                      <span className="text-white/30 text-[10px] tracking-wide">
                        {art.published_at ? new Date(art.published_at).toLocaleDateString() : art.date}
                      </span>
                      <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.12em] flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-[#060c16]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div>
              <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold block mb-5">
                Stay Informed
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-white">
                The <em className="text-[#00BFFF] italic">Legacy Letter</em>
                <br />
                Every Fortnight
              </h2>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="flex flex-col gap-4">
              {subscribed ? (
                <div className="p-8 border border-[#00BFFF]/30 rounded-2xl text-center">
                  <p className="text-[#00BFFF] text-lg font-serif">Subscribed ✓</p>
                </div>
              ) : (
                <button
                  onClick={() => setSubscribed(true)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[0.12em] font-bold rounded-xl transition-all duration-300 whitespace-nowrap"
                  style={{ background: "#00BFFF", color: "#04090f" }}
                >
                  Subscribe to Newsletter
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
