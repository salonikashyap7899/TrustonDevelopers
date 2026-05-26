import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import heroImg from "@/assets/luxury-interior.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { useSingleRecord, useCollection } from "@/hooks/useCollections";

type HeroSection = {
  title: string;
  title_accent: string;
  subtitle: string;
  image_url: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  link_text: string;
  link_url: string;
  features?: string[];
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TrustOn Developers" },
      {
        name: "description",
        content:
          "From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey.",
      },
    ],
  }),
  component: ServicesPage,
});

const DEFAULT_SERVICES = [
  {
    name: "Plot Selling",
    description:
      "Premium residential plots in Lucknow's highest-growth corridors. Every plot comes with Jila Panchayat approval, clear title deeds, and complete legal transparency. Own the foundation for your legacy.",
    features: [
      "100+ Premium Plots Available",
      "Jila Panchayat Approved",
      "Clear Title Deeds",
      "Complete Legal Documentation",
      "Transparent Pricing",
      "High-Growth Locations",
    ],
    link_url: "/plot-selling",
    link_text: "Explore Plots",
  },
  {
    name: "Architecture & Design",
    description:
      "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation—each project a masterpiece.",
    features: [
      "Concept Design & Layouts",
      "3D Renderings & Walkthroughs",
      "Complete Blueprints",
      "Material Selection Guidance",
      "Sustainable Design Solutions",
      "Regulatory Compliance",
    ],
    link_url: "/architecture-design",
    link_text: "View Design Services",
  },
  {
    name: "Construction & Build",
    description:
      "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery—your home, built perfectly.",
    features: [
      "Complete Home Construction",
      "100% Material Certification",
      "50+ Structural Audits",
      "Skilled Workforce Management",
      "Progress Transparency",
      "On-Time Delivery Guaranteed",
    ],
    link_url: "/construction-build",
    link_text: "Learn About Building",
  },
  {
    name: "Investment Consulting",
    description:
      "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, portfolio strategy—all tailored to your financial goals and risk profile.",
    features: [
      "Location & Market Analysis",
      "ROI Projections & Modeling",
      "Portfolio Strategy",
      "Legal Verification & Title Audit",
      "NRI Investment Solutions",
      "Tax Planning & Guidance",
    ],
    link_url: "/investment-consulting",
    link_text: "Investment Strategies",
  },
];

function ServicesPage() {
  const { data: hero } = useSingleRecord<HeroSection>("hero_sections", "page_key", "services");
  const { data: remoteServices } = useCollection<Service>("services", { order: "order_index" });
  const services = remoteServices?.length ? remoteServices : DEFAULT_SERVICES;
  const content = usePageContent("services.main", {
    intro_title: "Four Pillars of",
    intro_title_accent: "Expertise",
    intro_body:
      "Each service is crafted to deliver excellence, whether you're a first-time buyer, experienced investor, or visionary builder.",
    advantage_title: "The TrustOn",
    advantage_title_accent: "Advantage",
    advantage_body:
      "Unlike traditional real estate agencies that juggle multiple vendors, TrustOn brings all expertise under one roof. One vision. One team. Complete continuity.",
  });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || heroImg}
            alt="TrustOn Services"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.08} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
              Complete Real Estate Ecosystem
            </p>
            <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
              {hero?.title || "Our"}{" "}
              <em className="text-[#00BFFF] italic">{hero?.title_accent || "Services"}</em>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto mb-12">
              {hero?.subtitle ||
                "From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey—whether you're buying a plot, building your dream home, or investing strategically."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Services Grid */}
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

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-[#060c16] border border-white/5 p-10 rounded-[32px] group hover:border-[#00BFFF]/30 transition-all duration-500"
                >
                  <div className="text-5xl font-serif text-[#00BFFF]/20 mb-6 group-hover:text-[#00BFFF]/40 transition-colors">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-4">{service.name}</h3>
                  <p className="text-white/45 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  {service.features && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {service.features.map((f) => (
                        <li key={f} className="text-white/60 text-sm flex items-start gap-2">
                          <span className="text-[#00BFFF]">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={service.link_url || "#"}
                    className="inline-flex items-center gap-2 text-[#00BFFF] text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all"
                  >
                    {service.link_text} <span>→</span>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TrustOn Advantage (Integration) */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                {content.advantage_title}{" "}
                <em className="text-[#00BFFF] italic">{content.advantage_title_accent}</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                {content.advantage_body}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Seamless Coordination",
                desc: "Plot selection flows directly into architectural design, then construction—no coordination gaps, no vendor confusion. Your project stays aligned throughout.",
                benefit: "Timeline: 40–50 weeks from plot to handover",
              },
              {
                title: "Unified Quality Standards",
                desc: "Same quality philosophy across all services. Materials certified. Processes audited. Standards maintained. Consistency from first consultation to final handover.",
                benefit: "Quality: 50+ structural audits per project",
              },
              {
                title: "Complete Transparency",
                desc: "One team manages your project end-to-end. No hidden costs. No vendor surprises. Every decision, every material, every progress update—completely transparent.",
                benefit: "Transparency: Monthly progress reports & documentation",
              },
            ].map((adv, i) => (
              <Reveal key={adv.title} delay={i * 0.1}>
                <div className="bg-[#04090f] border-t-4 border-[#00BFFF] p-10 rounded-2xl h-full flex flex-col">
                  <h3 className="font-serif text-2xl text-white mb-4">{adv.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-8 flex-grow">{adv.desc}</p>
                  <div className="bg-[#00BFFF]/10 p-4 rounded-lg text-[#00BFFF] text-xs font-bold text-center">
                    {adv.benefit}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Why Choose <em className="text-[#00BFFF] italic">TrustOn</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Five reasons TrustOn stands apart in Lucknow's real estate landscape.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Transparency, Always",
                desc: "Zero ambiguity in every transaction. Plot details, legal status, pricing, timelines, and quality standards disclosed fully upfront. No fine print. No surprises.",
              },
              {
                title: "High-Growth Location Intelligence",
                desc: "Dubagga and surrounding corridors are on a proven appreciation trajectory. We identify high-potential land before the market, passing that advantage directly to our clients.",
              },
              {
                title: "Government-Approved & Legally Secure",
                desc: "Every project carries Jila Panchayat approvals and verified title deeds. Your investment is legally clean, compliant, and protected for generations.",
              },
              {
                title: "One Team, Every Step",
                desc: "Plot acquisition, architecture, construction, investment advisory—all under one roof. No coordination between multiple agencies. One trusted partner.",
              },
              {
                title: "Proven Track Record",
                desc: "150+ premium plots sold. 50+ homes completed. Consistent on-time delivery. Years of trust from homeowners, investors, and partners.",
              },
              {
                title: "Your Goals, Our Commitment",
                desc: "Build now or hold for appreciation—both strategies are equally valid. We support your objectives with equal commitment, no pressure, no gimmicks.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="bg-[#060c16] border-l-4 border-[#00BFFF] p-8 rounded-xl h-full">
                  <h4 className="font-serif text-xl text-white mb-4">{item.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-[#00BFFF] p-16 md:p-24 rounded-[48px] text-[#04090f] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="font-serif text-4xl md:text-6xl mb-8">
                  Ready to Begin Your <em className="italic">Journey</em>?
                </h2>
                <p className="text-[#04090f]/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                  Explore our services, understand which path aligns with your vision, and connect
                  with our team for a detailed, obligation-free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="px-10 py-5 bg-[#04090f] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    to="/project"
                    className="px-10 py-5 border-2 border-[#04090f] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#04090f] hover:text-white transition-all"
                  >
                    Explore Our Projects
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
