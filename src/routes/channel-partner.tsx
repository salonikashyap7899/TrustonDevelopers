import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { useSingleRecord } from "@/hooks/useCollections";

export const Route = createFileRoute("/channel-partner")({
  head: () => ({
    meta: [
      { title: "Channel Partner Program — TrustOn" },
      {
        name: "description",
        content:
          "Earn premium commissions partnering with TrustOn — RERA-compliant projects, marketing support, and a dedicated relationship manager.",
      },
      { property: "og:title", content: "Channel Partner Program — TrustOn" },
    ],
  }),
  component: Page,
});

const benefits = [
  {
    t: "Premium Commissions",
    d: "Our tiered structure rewards high-performance — the more you scale, the more you earn.",
  },
  {
    t: "Strategic Compliance",
    d: "Every TrustOn project is Jila Panchayat approved and legally documented for security.",
  },
  {
    t: "Empire Relationship Manager",
    d: "Your personal point of contact for every query, private viewing, and deal closure.",
  },
  {
    t: "Global Marketing Assets",
    d: "Access to high-definition cinematic brochures and 3D architectural visualization tools.",
  },
];

function Page() {
  const { data: hero } = useSingleRecord<Record<string, string | undefined>>(
    "hero_sections",
    "page_key",
    "channel-partner",
  );

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="Partnership Ecosystem"
        title={
          <>
            {hero?.title || "Scale your business."}
            <br />
            {hero?.title_accent || "Earn more, together."}
          </>
        }
        subtitle={
          hero?.subtitle ||
          "Built for elite real estate consultants who want to offer premium residential plots backed by a billion-dollar brand vision."
        }
        poster={hero?.image_url || "/attached_assets/image_1779159211927.png"}
        alt="Channel Partner Program"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Strategic Growth</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center mb-24 tracking-tighter leading-none text-white">
              Accelerate your <em className="text-luxe-cyan italic font-serif">yield.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["Portfolio Strategy", "We architect every project with a multi-decade vision."],
              ["Strategic Acquisition", "Full legal and documentation assistance provided."],
              ["Operational Excellence", "From site analysis to final legacy delivery."],
              ["Wealth Intelligence", "Expert guidance for HNI and institutional clients."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div className="glass-premium p-10 h-full rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxe-cyan mb-6 font-bold">
                    {t}
                  </p>
                  <p className="text-white/40 font-light leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.15} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Global Advantages</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-24 tracking-tighter leading-none">
              Why partner with <br />
              <em className="text-luxe-cyan italic font-serif">TrustOn Empire?</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <div className="glass-premium p-12 h-full rounded-[40px] border border-white/5 group hover:border-luxe-cyan/40 transition-all duration-500">
                  <span className="font-display text-6xl text-white/5 group-hover:text-luxe-cyan transition-colors duration-700 leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-3xl text-white mt-10 mb-6 tracking-tight">
                    {b.t}
                  </h3>
                  <p className="text-white/40 text-lg leading-relaxed font-light">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <SectionEyebrow>Registration Portal</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-10 tracking-tighter leading-none">
              Initialize <em className="text-luxe-cyan italic font-serif">Alliance.</em>
            </h2>
          </Reveal>
          <Reveal>
            <form className="glass-premium rounded-[48px] p-12 md:p-16 border border-white/10 shadow-luxe flex flex-col gap-10">
              <div className="grid sm:grid-cols-2 gap-10">
                <Field label="Full Identity" />
                <Field label="Communication Number" type="tel" />
                <Field label="Digital Mail" type="email" />
                <Field label="Jurisdiction (City)" />
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/contact" className="btn-magnetic btn-luxe px-16 py-5 rounded-full">
                  Connect With Us →
                </Link>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-4 block">
        {label}
      </span>
      <input
        type={type}
        className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light"
      />
    </label>
  );
}
