import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import heroImg from "@/assets/luxury-interior.jpg";
import { useSingleRecord } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
};

export const Route = createFileRoute("/architecture-design")({
  head: () => ({
    meta: [
      { title: "Architecture & Design — TrustOn Developers" },
      {
        name: "description",
        content:
          "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation.",
      },
    ],
  }),
  component: ArchitectureDesignPage,
});

const deliveryItems = [
  "Concept Design & Layouts",
  "Elevation & 3D Renderings",
  "Complete Blueprint Documentation",
  "Material & Finish Selection Guidance",
  "Space Planning & Optimization",
  "Structural Design Consultation",
  "Regulatory & Compliance Alignment",
  "Construction Supervision",
];

function ArchitectureDesignPage() {
  const { data: hero } = useSingleRecord<HeroSection>(
    "hero_sections",
    "page_key",
    "architecture-design",
  );
  const content = usePageContent("architecture.main", {
    intro_title: "Your Vision, Our",
    intro_title_accent: "Design",
    intro_body:
      "At TrustOn, we believe exceptional design is where dreams take tangible form. Whether you're starting from an empty plot or reimagining an existing space, our architectural team brings technical expertise, creative innovation, and your personal aspirations into cohesive, buildable designs.",
  });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || heroImg}
            alt="Architecture & Design"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.08} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                Crafting Spaces
              </p>
              <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {hero?.title || "Architecture &"}{" "}
                <em className="text-[#00BFFF] italic">{hero?.title_accent || "Design"}</em>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light mb-12">
                {hero?.subtitle ||
                  "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation—each project a masterpiece of form and function."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                >
                  Start Your Design
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

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">
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
                  What We Deliver
                </h3>
                <ul className="space-y-6">
                  {deliveryItems.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/70 text-lg">
                      <span className="w-8 h-px bg-[#00BFFF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Ready to Design Your Dream <em className="text-[#00BFFF] italic">Home</em>?
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Schedule a consultation with our architecture team. We'll discuss your vision, analyze
              your plot, and create a design proposal tailored to your dreams and budget.
            </p>
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
            >
              Book Free Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
