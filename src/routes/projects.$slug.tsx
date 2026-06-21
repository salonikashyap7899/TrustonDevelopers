import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, STATUS_COLOR } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.slug);
    return {
      meta: [
        { title: project ? `${project.name} — ${project.city} | TrustOn` : "Project — TrustOn" },
        { name: "description", content: project?.blurb ?? "TrustOn premium real estate development." },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = PROJECTS.find((p) => p.id === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  if (!project) {
    return (
      <div className="min-h-screen bg-[#04090f] flex items-center justify-center" style={{ paddingTop: "140px" }}>
        <div className="text-center">
          <p className="font-serif italic text-6xl text-[#00BFFF] mb-4">404</p>
          <h1 className="font-serif text-3xl text-white mb-4">Project not found</h1>
          <Link to="/project" className="text-[#00BFFF] text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
            ← Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLOR[project.status] || "#00BFFF";

  const specs = [
    ["Location", `${project.flag} ${project.city}, ${project.country}`],
    ["Type", project.type],
    ["Status", project.status],
    ["Starting Price", project.startingPrice],
    ["Area Range", project.area],
    ["Total Units", project.units],
    ["Possession", project.possession],
  ];

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden" style={{ paddingTop: "140px" }}>

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.8)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.12) 0%, transparent 70%)" }}
        />

        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <Link
              to="/project"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-[#00BFFF] transition-colors mb-5 font-semibold"
            >
              ← All Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${statusColor}55`, color: statusColor, background: `${statusColor}18` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                {project.status}
              </span>
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-white/15 text-white/45">
                {project.type}
              </span>
            </div>
            <h1 className="font-serif text-[clamp(36px,5.5vw,72px)] font-semibold text-white leading-[1.0] tracking-tight mb-4">
              {project.name}
            </h1>
            <p className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
              {project.flag} {project.city}, {project.country} · {project.startingPrice}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW + SPECS ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          {/* Left — overview */}
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Project Overview
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
              About <em className="italic text-[#00BFFF]">{project.name}</em>
            </h2>
            <p className="text-white/50 text-base leading-[1.9] mb-8 font-light">{project.overview}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]/70 shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — specs table */}
          <Reveal delay={0.1}>
            <div className="border border-white/8 rounded-2xl overflow-hidden">
              {specs.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-center px-6 py-4 border-b border-white/5 last:border-b-0 ${i % 2 === 0 ? "bg-[#060c16]" : "bg-[#080d1a]"}`}
                >
                  <span className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold w-36 shrink-0">{k}</span>
                  <span className={`text-sm font-light ${k === "Status" ? "" : "text-white/80"}`} style={k === "Status" ? { color: statusColor } : {}}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+919616061166"
                className="flex-1 text-center py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Site Visit
              </a>
              <a
                href="#enquire"
                className="flex-1 text-center py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase border border-white/20 text-white/70 hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-300"
              >
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8 bg-[#060c16]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">Project Gallery</p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              Inside <em className="italic text-[#00BFFF]">{project.name}</em>
            </h2>
          </Reveal>

          {/* Featured image */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/7] mb-4 border border-white/8 group cursor-pointer">
              <img
                src={project.gallery[activeImage]}
                alt={`${project.name} gallery`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.85)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060c16]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                {activeImage + 1} / {project.gallery.length}
              </div>
            </div>
          </Reveal>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-200 ${
                  activeImage === i ? "border-[#00BFFF]" : "border-transparent hover:border-white/30"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                {activeImage === i && (
                  <div className="absolute inset-0 bg-[#00BFFF]/15" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">Amenities</p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              Everything <em className="italic text-[#00BFFF]">Included</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {project.amenities.map((a, i) => (
              <Reveal key={a} delay={i * 0.06}>
                <div className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-8 flex items-center gap-5 group cursor-pointer">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#00BFFF] shrink-0 border border-[#00BFFF]/20 group-hover:border-[#00BFFF]/60 transition-colors"
                    style={{ background: "rgba(0,191,255,0.08)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-white/60 font-medium group-hover:text-[#00BFFF] transition-colors duration-300">
                    {a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16] relative overflow-hidden" id="enquire">
        <div
          className="absolute bottom-[-160px] right-[-100px] w-[420px] h-[420px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.1) 0%, rgba(0,191,255,0) 70%)" }}
        />
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Reserve Your Unit
            </p>
            <h2 className="font-serif text-[clamp(28px,3.6vw,40px)] font-semibold text-white leading-[1.15]">
              Interested in <em className="italic text-[#00BFFF]">{project.name}?</em>
            </h2>
            <p className="mt-4 text-white/45 text-[15px] leading-relaxed max-w-[440px]">
              Leave your details and our team will get back to you within 24 hours with full pricing, availability, and documentation.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="tel:+919616061166" className="text-[#00BFFF] text-sm font-semibold hover:opacity-70 transition-opacity">
                +91 96160-61166
              </a>
              <span className="text-white/20">·</span>
              <span className="text-white/35 text-sm">info@trustonadvertising.com</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="bg-[#04090f] border border-white/8 rounded-2xl p-7"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — our team will be in touch within 24 hours.");
              }}
            >
              <p className="text-white/60 text-xs uppercase tracking-widest mb-5 font-bold">Enquiry for: <span className="text-[#00BFFF]">{project.name}</span></p>
              <div className="mb-4">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                />
              </div>
              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Any specific questions or requirements..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-85"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Send Enquiry
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── More Projects ── */}
      <section className="py-16 px-6 md:px-16 border-t border-white/8">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-bold mb-1">Explore More</p>
            <p className="font-serif text-xl text-white">Browse the full TrustOn portfolio</p>
          </div>
          <Link
            to="/project"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.1em] font-semibold hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-300"
          >
            View All Projects →
          </Link>
        </div>
      </section>

    </div>
  );
}
