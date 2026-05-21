import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn | Modern Legacy Developers" },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      {/* Hero Section */}
      <SobhaStyleHero
        height="full"
        title={
          <>
            Modern <span className="text-primary italic">Legacy</span>
          </>
        }
        subtitle="Crafting monumental spaces that redefine the skyline. We merge structural precision with luxury editorial storytelling."
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      >
        <button className="px-12 py-5 bg-primary text-on-primary text-button uppercase tracking-widest hover:bg-primary-fixed transition-all">
          Explore Portfolio
        </button>
        <button className="px-12 py-5 border border-primary text-primary text-button uppercase tracking-widest hover:bg-primary/10 transition-all">
          Our Vision
        </button>
      </SobhaStyleHero>

      {/* Trust Bar / Marquee */}
      <TrustMarquee />

      {/* Our Legacy Section */}
      <LegacySection />

      {/* Prime Estates - Bento Grid */}
      <PrimeEstatesSection />

      {/* Newsletter CTA */}
      <NewsletterSection />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}

/* Trust Bar Marquee */
function TrustMarquee() {
  const brands = [
    "ELITE ESTATES",
    "PRESTIGE GARDENS",
    "OBSIDIAN TOWERS",
    "IVORY RESIDENCES",
    "SKYLINE MANOR",
  ];

  return (
    <section className="py-12 bg-surface-container-low border-y border-primary/10 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex items-center gap-12 px-6">
            {brands.map((brand, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-12">
                <span className="font-display text-2xl text-on-surface/30">{brand}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* Our Legacy Section */
function LegacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 relative architectural-grid overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Text Content */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Large watermark */}
            <div className="absolute -top-12 -left-12 font-display text-[180px] opacity-[0.03] pointer-events-none select-none hidden lg:block">
              TRUSTON
            </div>

            <span className="text-eyebrow text-primary mb-6 block tracking-[0.3em]">
              Foundation & Core
            </span>
            <h2 className="text-display-lg mb-8">
              Our Legacy of <br />
              <span className="italic text-primary">Excellence</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-lg mb-8">
              Since our inception, Truston Developers has been at the forefront of architectural
              innovation. Our philosophy is rooted in creating spaces that breathe, inspire, and
              endure through generations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <span className="text-stat-num text-primary block">
                  <CountUp to={20} suffix="+" />
                </span>
                <span className="text-label-md uppercase tracking-widest text-on-surface/60">
                  Years Experience
                </span>
              </div>
              <div>
                <span className="text-stat-num text-primary block">
                  <CountUp to={150} />
                </span>
                <span className="text-label-md uppercase tracking-widest text-on-surface/60">
                  Global Projects
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-surface-container overflow-hidden group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNO-m9qAvOb1MX7LwHDh7hig3Y1wVIsjTJcmNPhQwr1DaLtHkCaonaGeYPAGpE3nkjqgkoEYjZnntx8rL8KHQjfKSSxVeFvqtirZN1uiwTu2tMVP8VCvdcikRKPz6Tg8if34i2VVayoYtty_sFbWelgUeeGHl8tiRt1SNfuQo9XFNKOrZ93FeEW2YibX_hX9ZmQGwUvQCtNL2e0Bab-kYNsRIiYQ28u2-vNP5Y0Mt2e5nBI5x-P6MRSShzotq5TsrWk9KJlpr6azDz"
              alt="Luxury architectural detail"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 parallax-bg"
            />
          </div>
          {/* Overlapping philosophy card */}
          <div className="absolute -bottom-12 -left-12 lg:-left-24 glass-panel p-12 max-w-md hidden md:block">
            <h4 className="text-display-lg text-primary mb-4">Philosophy</h4>
            <p className="text-body-md text-on-surface-variant italic">
              {"\"We don't build structures; we curate the environments where memories are etched into the stone of time.\""}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Prime Estates Bento Grid */
function PrimeEstatesSection() {
  const projects = [
    {
      title: "The Obsidian Heights",
      location: "DUBAI | 2024",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCobpBdQJ9gnVEGI9gWzocfAxI71f6kxCTG3Mdqr1f7F74WVb06eXuuupi5NIv6XUoabYf_Lhb9qdGHnvwC_0a4BGBhCfOx5nMyI0JPGFIp1LJfuQveovkknaYOGyw3QnPyQCG-oL8aG82xlV4pdQAPQjMYa14YJ4UuLYMmAjPc1zViCgh698R9rNUvmEsLZIYdoqH0Rbxpuk14iuV_95JkSe2ebd1DmS7lftL4-yeKCKdN7lQmEkT0T1QVA80vrgVgEuteElv6Q0YO",
      span: "md:col-span-8",
    },
    {
      title: "Azure Sanctuary",
      location: "MONACO | 2023",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3362MRHK11nrCr2mGe7jjs0vlGMhrQdg9As7-WcVHqTE37wY6vsKi47snw34rWEkMLHSa6l4Xcv6KO0szizljnHSISacaVESvPTNPLv1JDy6zAaCHDCFUbMA6O-m_ytCbOW6R9qWFUosS_SPe8fqEkas85bbuZlqMW2JBLMJTOUU3MB7bFTedI3_L5ZvIHOeoQXrzhjY3dCYfr1XAOUPR6xw6gMgp0HIsX2sZ6350QYyS48CgmGhhZP2DfAb2oIZY2LBVI5FFScdy",
      span: "md:col-span-4",
    },
    {
      title: "Belgravia Manor",
      location: "LONDON | 2024",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdIY1Wx6DnjIAVsvNR3geEMDGc6w_OiQp_u_kfeLjY8dbdXacnrcEtkyqSiNzyxaRrDUxeLYpVKobPk4gWCmn74z9Ht2VjfdPbd8jFJkUGxIvryM50jpievFEdXRMHYPH-bgcok6P7yPl3PbjNf_pPxBJyvYYThmGgsikk7GllqslyGs7lLvPDRYrk9n3xYqXJ3fctxZ1PK6UCiU-kmEPrar4qZcPnR3NKdfY1JSfTX9-JIAiB2-hi12Lw1v6eqomDX22Ku6fnxjrL",
      span: "md:col-span-5",
    },
    {
      title: "Neo-Ginza Plaza",
      location: "TOKYO | 2025",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8TunYILVRPhg_IcROROPnFctlWxLMgI3ukJsEkBwrr55Vlq47sFOEwBjBimKTik3BrjHdiTymUb7nDI857D4lUWKR1hi2OIglfpQ-Iy7YvmZCdZBo1M-KcBSiBPYMUe24XQuCB6wgREReKgb0inzmXBdi7kziOZcMJu6L4sYBFF2gJ8DaNcEe7DOFaz0Wn59x2g9NqtIHY0V5fcggko0kjk2_n6PyFbb9RPe-zSB0MbArcmjTh_e0s4ux-1KssLP4oWsI2Mayt95O",
      span: "md:col-span-7",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between items-end mb-24">
            <div>
              <span className="text-eyebrow text-primary mb-4 block tracking-[0.3em]">
                Curated Portfolio
              </span>
              <h2 className="text-display-lg">Prime Estates</h2>
            </div>
            <Link
              to="/project"
              className="text-button uppercase text-primary border-b border-primary pb-1 group flex items-center gap-2 mt-6 md:mt-0"
            >
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[900px]">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <Link
                to="/project"
                className={`${project.span} group relative overflow-hidden block h-full min-h-[300px]`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-12 left-12">
                  <span className="text-eyebrow text-on-surface mb-2 block tracking-widest">
                    {project.location}
                  </span>
                  <h3 className="text-display-lg text-on-surface">{project.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Newsletter Section */
function NewsletterSection() {
  return (
    <section className="py-24 px-6 md:px-16 text-center">
      <Reveal>
        <div className="max-w-4xl mx-auto glass-panel p-12 md:p-24 relative">
          <span className="text-eyebrow text-primary mb-6 block tracking-[0.4em]">
            Stay Informed
          </span>
          <h2 className="text-display-lg mb-12">
            Join the Inner <span className="italic text-primary">Circle</span>
          </h2>
          <div className="relative max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your corporate email"
              className="w-full bg-transparent border-0 border-b border-primary/40 py-6 px-4 text-body-lg text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/20"
            />
            <button className="absolute right-0 bottom-6 text-button uppercase text-primary tracking-widest group">
              Subscribe
              <span className="block h-px w-0 group-hover:w-full bg-primary transition-all duration-300" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
