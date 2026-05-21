import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";

const items = [
  {
    quote:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.",
    name: "Anil Singh",
    role: "Homeowner",
    initial: "A",
  },
  {
    quote:
      "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.",
    name: "Mohammed Irfan",
    role: "Channel Partner",
    initial: "M",
  },
  {
    quote:
      "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.",
    name: "Ramesh Verma",
    role: "Plot Owner, Phase 1",
    initial: "R",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 md:px-16 bg-surface-container-lowest overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-[0.08]"
        style={{ background: "radial-gradient(circle, rgba(169, 199, 255, 0.5), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.08]"
        style={{ background: "radial-gradient(circle, rgba(169, 199, 255, 0.5), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2 className="font-display text-display-lg text-on-surface text-center mb-4 max-w-4xl mx-auto">
            What our clients say about{" "}
            <span className="gradient-primary-text italic">partnering with us</span>
          </h2>
          <p className="text-center text-on-surface-variant mt-4 mb-20 max-w-xl mx-auto">
            Real stories from real homeowners and partners across Lucknow.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <motion.figure
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 30px 60px -15px rgba(72, 145, 246, 0.25)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.2, 0.8, 0.2, 1],
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                }}
                className="relative glass-panel p-10 h-full group cursor-default border border-transparent hover:border-primary/30 transition-all duration-500"
              >
                {/* Quote mark */}
                <div className="font-display text-8xl text-primary/15 leading-none absolute top-4 left-8 select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, si) => (
                    <span key={si} className="text-primary text-sm">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="font-serif italic text-lg text-on-surface-variant leading-relaxed relative z-10">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-8 pt-6 border-t border-primary/10 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface">{t.name}</p>
                    <p className="text-eyebrow text-on-surface-variant mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </figcaption>

                {/* Primary accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.figure>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal>
          <div className="mt-20 text-center">
            <p className="font-serif italic text-xl text-on-surface-variant mb-6">
              Join hundreds of satisfied homeowners and investors.
            </p>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 text-button uppercase tracking-widest hover:bg-primary-fixed transition-all duration-500"
            >
              Speak to an Expert →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
