import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { PlotTrackerCompact } from "@/components/PlotTracker";
import heroImg from "@/assets/hero-estate.jpg";
import { useSingleRecord } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
};

export const Route = createFileRoute("/investment-consulting")({
  head: () => ({
    meta: [
      { title: "Investment Consulting — TrustOn Developers" },
      {
        name: "description",
        content:
          "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, and portfolio strategy.",
      },
    ],
  }),
  component: InvestmentConsultingPage,
});

const metrics = [
  {
    value: "12–18%",
    label: "Annual Appreciation",
    desc: "Historical land appreciation in high-growth Lucknow corridors, year-over-year",
  },
  {
    value: "7–10 yrs",
    label: "Wealth Doubling Timeline",
    desc: "Average investment doubling period at 12% compound annual growth",
  },
  {
    value: "3.1x–4.2x",
    label: "10-Year Return Multiple",
    desc: "Expected portfolio multiplier over a decade with strategic investment",
  },
  {
    value: "100%",
    label: "Legal Clearance",
    desc: "All TrustOn properties are fully documented and Jila Panchayat approved",
  },
];

const strategyItems = [
  "Location & Market Analysis",
  "ROI Projections & Scenario Planning",
  "Portfolio Diversification Strategy",
  "Legal Verification & Title Audit",
  "Tax Planning & Compliance Guidance",
  "NRI Investment Solutions",
  "Exit Strategy Planning",
  "Long-Term Wealth Management",
];

function InvestmentConsultingPage() {
  const { data: hero } = useSingleRecord<HeroSection>(
    "hero_sections",
    "page_key",
    "investment-consulting",
  );
  const content = usePageContent("investment.main", {
    intro_title: "Build Wealth Through",
    intro_title_accent: "Strategic Land Investment",
    intro_body:
      "Land is one of India's most predictable wealth-building assets. At TrustOn, we transform real estate investment from guesswork into strategic certainty. Our consulting approach combines deep local market expertise, transparent ROI analysis, and long-term portfolio strategy.",
  });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || heroImg}
            alt="Investment Consulting"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.25) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.1} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                Strategic Wealth Building
              </p>
              <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {hero?.title || "Investment"}{" "}
                <em className="text-[#00BFFF] italic">{hero?.title_accent || "Consulting"}</em>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light mb-12">
                {hero?.subtitle ||
                  "Real estate wealth isn't built by chance—it's built by strategy. Our investment consulting team provides data-driven guidance for seeking robust land investment opportunities in Lucknow's highest-growth corridors."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                >
                  Start Investment Planning
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all"
                >
                  Schedule Expert Consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                  {content.intro_title}{" "}
                  <em className="text-[#00BFFF] italic">{content.intro_title_accent}</em>
                </h2>
                <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
                  <p>{content.intro_body}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#060c16] border border-white/5 p-12 rounded-[48px]">
                <h3 className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-8">
                  Investment Services Include
                </h3>
                <ul className="space-y-6">
                  {strategyItems.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/70 text-lg">
                      <span className="text-[#00BFFF]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Real Estate Investment <em className="text-[#00BFFF] italic">Metrics</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Understand the numbers behind successful real estate wealth building.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className="bg-[#060c16] border-t-4 border-[#00BFFF] p-10 rounded-2xl text-center h-full">
                  <p className="font-serif text-4xl text-[#00BFFF] mb-4">{m.value}</p>
                  <h4 className="text-white font-bold mb-4">{m.label}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{m.desc}</p>
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
              Ready to Build Your Real Estate <em className="text-[#00BFFF] italic">Wealth</em>?
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Schedule a confidential consultation with our investment advisory team. We'll analyze
              your goals, assess your risk profile, and create a personalized strategy.
            </p>
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
            >
              Book Free Investment Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
