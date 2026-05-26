import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import heroImg from "@/assets/hero-estate.jpg";
import { useSingleRecord } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
};

export const Route = createFileRoute("/construction-build")({
  head: () => ({
    meta: [
      { title: "Construction & Build — TrustOn Developers" },
      {
        name: "description",
        content:
          "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery.",
      },
    ],
  }),
  component: ConstructionBuildPage,
});

const constructionFeatures = [
  {
    title: "Complete Home Construction",
    desc: "From foundation to finishing, we handle the entire build process with professional oversight and dedicated project management.",
  },
  {
    title: "100% Material Certification",
    desc: "We source only grade-A materials from verified suppliers. Every batch is certified for quality and durability.",
  },
  {
    title: "50+ Structural Audits",
    desc: "Our projects undergo rigorous multi-stage quality inspections to ensure absolute structural integrity and compliance.",
  },
  {
    title: "Skilled Workforce Management",
    desc: "Our teams are composed of experienced artisans and technicians who take genuine pride in the precision of their work.",
  },
  {
    title: "Progress Transparency",
    desc: "Regular updates, site photos, and milestone reports ensure you are always informed about your project's status.",
  },
  {
    title: "On-Time Delivery Guaranteed",
    desc: "Rigorous project scheduling and resource management ensure your home is handed over exactly when promised.",
  },
];

function ConstructionBuildPage() {
  const { data: hero } = useSingleRecord<HeroSection>(
    "hero_sections",
    "page_key",
    "construction-build",
  );
  const content = usePageContent("construction.main", {
    intro_title: "Built with",
    intro_title_accent: "Precision",
    intro_body:
      "We combine traditional craftsmanship with modern engineering to deliver homes that stand the test of time.",
  });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || heroImg}
            alt="Construction & Build"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.25) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.08} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                Building Reality
              </p>
              <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {hero?.title || "Construction &"}{" "}
                <em className="text-[#00BFFF] italic">{hero?.title_accent || "Build"}</em>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light mb-12">
                {hero?.subtitle ||
                  "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery—your home, built perfectly."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                >
                  Start Your Build
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                {content.intro_title}{" "}
                <em className="text-[#00BFFF] italic">{content.intro_title_accent}</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                {content.intro_body}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div className="bg-[#060c16] border border-white/5 p-10 rounded-3xl group hover:border-[#00BFFF]/30 transition-all h-full">
                  <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#00BFFF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Build Your <em className="text-[#00BFFF] italic">Legacy</em>
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Ready to turn your architectural vision into reality? Connect with our construction
              team for a detailed project consultation and quote.
            </p>
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
            >
              Get a Construction Quote
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
