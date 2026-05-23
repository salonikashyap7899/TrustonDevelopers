import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { Carousel, TestimonialCard } from "@/components/ui/retro-testimonial";
import type { iTestimonial } from "@/components/ui/retro-testimonial";

const testimonials: iTestimonial[] = [
  {
    name: "Anil Singh",
    designation: "Homeowner — Phase 1",
    description:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget. The whole process was seamless and transparent.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mohammed Irfan",
    designation: "Channel Partner",
    description:
      "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good. Best partnership I've had in real estate.",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ramesh Verma",
    designation: "Plot Owner — Phase 1",
    description:
      "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent. Best decision of my life.",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    designation: "Investor — Lucknow",
    description:
      "I purchased two plots through TrustOn after thorough market research. The appreciation over 18 months has been exceptional. Their investment consulting team provided data-driven insights I couldn't find elsewhere.",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Vikram Agarwal",
    designation: "NRI Buyer — Dubai",
    description:
      "Managing a real estate investment from abroad is always nerve-wracking, but TrustOn made every step crystal clear. Documentation was impeccable, the team answered every call, and the legal clearance was pristine.",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sunita Pandey",
    designation: "Homeowner — Phase 2",
    description:
      "The architectural design service exceeded all expectations. Our 3D walkthrough felt like stepping into a dream. When construction completed, the reality matched perfectly. TrustOn truly delivers on every promise.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
];

const BG_IMAGE =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop";

const cards = testimonials.map((t, index) => (
  <TestimonialCard
    key={t.name}
    testimonial={t}
    index={index}
    backgroundImage={BG_IMAGE}
  />
));

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 bg-[#04090f] overflow-hidden">
      <Section3DBackground opacity={0.08} />

      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        <Reveal>
          <SectionEyebrow light>Client Narratives</SectionEyebrow>
          <h2 className="font-serif text-5xl md:text-7xl text-center text-white mb-4 max-w-4xl mx-auto tracking-tight leading-tight">
            Distinguished{" "}
            <em className="text-[#00BFFF] italic">Partnerships</em>
          </h2>
          <p className="text-center text-white/40 mt-4 mb-4 max-w-xl mx-auto font-light text-lg">
            Voices of excellence from our growing network of homeowners, investors, and partners.
          </p>
        </Reveal>

        <Carousel items={cards} />

        <div className="mt-20 text-center">
          <Reveal>
            <p className="font-serif italic text-2xl text-white/30 mb-8">
              Join the future of luxury real estate.
            </p>
            <a
              href="tel:+919616061166"
              className="inline-block px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#04090f]"
            >
              Speak to an Expert →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
