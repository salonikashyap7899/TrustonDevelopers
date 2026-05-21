import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "Our Legacy | Truston Developers" },
      {
        name: "description",
        content:
          "Since 1984, Truston Developers has redefined luxury living through timeless design, uncompromising quality, and an unwavering commitment to our heritage.",
      },
      { property: "og:title", content: "About Truston Developers" },
      { property: "og:description", content: "The story behind Prime Estate." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "1984",
    title: "The Foundation",
    description: "Aman Truston establishes the firm with a single luxury villa project in Gomti Nagar, setting the tone for architectural excellence.",
  },
  {
    year: "2002",
    title: "Modern Horizons",
    description: "Introduction of eco-conscious engineering and the first high-rise luxury towers in the Lucknow skyline.",
  },
  {
    year: "2015",
    title: "Cultural Renaissance",
    description: "Launch of 'The Hazratganj Archive', a heritage-inspired luxury retail and residential complex that won national design awards.",
  },
  {
    year: "Present",
    title: "Next Era",
    description: "Scaling global standards with smart-automated luxury living and sustainable architectural ecosystems.",
  },
];

const leaders = [
  {
    name: "Aman Truston",
    role: "Chairman & Founder",
    quote: "\"Luxury is not an accumulation of things; it is the presence of clarity and the absence of noise. We build silence and precision into every corner.\"",
    tagline: "Founding Legacy",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCofZm-zgNfJMieb_XVVU_NJm4rESrbOk8sOmauFlNOHAgfzFp9HHvzXGXIBmzg6tOb0Rp0saRHTCnec2eHMMRHl3AZdDY5jpfAr8Dp2M8r3dYJt4OyK2ZHdDOIJGHWKX9VMHnJtlieOyC5EiAg3TeGeRfq2-zbL-e1OIFcY4Cs5SVYoGlt7f94dF5K_inR0iKM0onAo8HTHO80pDp2l08_552Cf1pvDluyTyQlZpAaPcsjM5NtxyPf22bO9dBdT3I_HCDeznaPn1Rd",
  },
  {
    name: "Saira Truston",
    role: "Managing Director",
    quote: "\"The architecture of the future must be as sustainable as it is beautiful. We are crafting spaces that will be as relevant in a hundred years as they are today.\"",
    tagline: "Modern Catalyst",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUGAl7xLBS5KreTEBsIfNayDOLIOnDBJQIKcPWLv5jW5RwtRimHwmNZVgqEaMK8yy4LYH10dgCeyhx6Edrmy4KvbQG0W23SVB6EpPJXhqAgtWWlQP_NODaIOmv46slwHTKymVC6JiXwqhoM67rSZiFCuZ9Q_A0ah5FkMJSIcc2mJ0OdrJcyx3gy-m_2_gHxiEVxb4Mzv2D8CczjYTG4fZGhqAH49wYcaksJsJnVaMCItkzavfEw5WckwteDni039xjrfaWwRhN31ib",
    offset: true,
  },
];

function AboutPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero Section */}
      <HeroSection />

      {/* Legacy Story Section */}
      <LegacyStorySection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-surface-container-lowest">
        <img
          src={interiorImg}
          alt="Luxury Architectural Detail"
          className="w-full h-full object-cover brightness-[0.25] scale-105"
        />
      </div>
      <div className="relative z-10 text-center px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center items-center gap-4"
        >
          <span className="h-[1px] w-12 bg-primary" />
          <span className="text-label-md text-primary uppercase tracking-[0.4em]">Our Legacy</span>
          <span className="h-[1px] w-12 bg-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-display-lg md:text-[84px] text-on-surface mb-8"
        >
          The Architecture of <span className="gradient-primary-text italic font-bold">Excellence</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          Since 1984, Truston Developers has redefined luxury living through timeless design, uncompromising quality, and an unwavering commitment to our heritage.
        </motion.p>
        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-label-md text-primary/60 tracking-widest uppercase">The Story</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function LegacyStorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-16 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-label-md text-primary uppercase mb-4 block tracking-widest">Our Heritage</span>
          <h2 className="text-display-lg text-on-surface mb-8">
            Four Decades of <span className="italic text-primary">Structural Poetry</span>
          </h2>
          <div className="space-y-6">
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Truston Developers didn&apos;t start with blueprints; it started with a philosophy. We believe that every building is a dialogue between the earth it stands on and the sky it reaches for.
            </p>
            <p className="text-body-md text-on-surface-variant">
              Founded in the cultural heart of Lucknow, we have spent 38 years mastering the delicate balance between Nawabi elegance and contemporary structural precision. Our estates are not just residences; they are legacies etched in stone and steel.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="lg:col-span-6 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-square relative overflow-hidden rounded-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPeFp7cHTCk_np59158QyidEycNilZDP356vVnH21k-ZfN9gf8WKme4AKTd5Vv_dzN2ZgveUsqECs-MBbxLyvaj6Ahf07FrwG4h99MWdtx1zEfSkgehQi8pTGHYHpAEg_y5pS61MSAH-hCvnrcQy96TPcnHvf_X_E2SjemyOpfg4_081MnKIB7Qv0lgGgKr4LTjRDAHvBDGgZVQ2_SJ7XIyXy0vKqNBNzjilvExgEZb5QjTvIk4XBhBvdYyeYTPkHRqn0MD5gXuVkF"
              alt="Heritage Detail"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 glass-panel p-8 border border-primary/20 rounded-lg hidden md:block">
            <span className="text-display-lg text-[48px] text-primary block leading-none mb-2">1984</span>
            <span className="text-label-md text-on-surface-variant uppercase tracking-widest">Where the journey began</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-32 px-6 md:px-16 bg-surface relative overflow-hidden">
      <div className="text-center mb-24">
        <Reveal>
          <span className="text-label-md text-primary uppercase block mb-4 tracking-[0.3em]">Timeline</span>
          <h2 className="text-display-lg text-on-surface">Milestones of Mastery</h2>
        </Reveal>
      </div>
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Center Line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full z-0"
          style={{ background: "linear-gradient(to bottom, transparent, var(--primary) 15%, var(--primary) 85%, transparent)" }}
        />
        {timeline.map((item, i) => (
          <Reveal key={item.year} delay={i * 0.15}>
            <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 ${i % 2 === 0 ? "" : "md:text-left"}`}>
              {i % 2 === 0 ? (
                <>
                  <div className="md:text-right md:pr-12">
                    <span className="text-headline-lg text-primary mb-2 block">{item.year}</span>
                    <h3 className="text-title-md text-on-surface mb-3">{item.title}</h3>
                    <p className="text-body-md text-on-surface-variant">{item.description}</p>
                  </div>
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <div className="hidden md:block" />
                  <div className="md:pl-12">
                    <span className="text-headline-lg text-primary mb-2 block">{item.year}</span>
                    <h3 className="text-title-md text-on-surface mb-3">{item.title}</h3>
                    <p className="text-body-md text-on-surface-variant">{item.description}</p>
                  </div>
                </>
              )}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(169,199,255,0.5)]" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="bg-surface-container-lowest py-32 px-6 md:px-16 relative overflow-hidden">
      <div className="text-center mb-24">
        <Reveal>
          <span className="text-label-md text-primary uppercase block mb-4 tracking-widest">Leadership</span>
          <h2 className="text-display-lg text-on-surface">The Visionary Mindset</h2>
        </Reveal>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {leaders.map((leader, i) => (
          <Reveal key={leader.name} delay={i * 0.2}>
            <div className={`group ${leader.offset ? "lg:mt-32" : ""}`}>
              <div className="relative mb-12 aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-headline-lg text-primary mb-2">{leader.name}</h3>
                  <p className="text-label-md text-on-surface uppercase tracking-[0.2em] opacity-80">{leader.role}</p>
                </div>
              </div>
              <div className="pl-8 border-l border-primary/40 max-w-lg">
                <p className="text-body-lg text-on-surface-variant italic mb-6">{leader.quote}</p>
                <div className="flex items-center gap-4 text-primary">
                  <span className="h-[1px] w-8 bg-primary" />
                  <span className="text-label-md uppercase tracking-widest">{leader.tagline}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface-container text-center">
      <Reveal>
        <div className="max-w-3xl mx-auto glass-panel p-16">
          <span className="text-label-md text-primary uppercase block mb-4 tracking-widest">Ready to Begin?</span>
          <h2 className="text-display-lg text-on-surface mb-8">
            Continue the <span className="italic text-primary">Legacy</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/project"
              className="text-button uppercase tracking-widest px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              View Portfolio
            </Link>
            <Link
              to="/contact"
              className="text-button uppercase tracking-widest px-8 py-4 bg-primary text-on-primary hover:bg-primary-fixed transition-all"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
