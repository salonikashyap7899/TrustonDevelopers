import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
 devin/1779443260-smooth-scroll-projects-page
import heroImg from "@/assets/hero-estate.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import qualityImg from "@/assets/project-prime.jpg";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

import {
  Users,
  Target,
  Award,
  Eye,
  MapPin,
  ShieldCheck,
  Zap,
  Layout,
  Maximize,
  ArrowRight,
  Play
} from "lucide-react";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import architectImg from "@/assets/luxury-interior.jpg"; // Using interior as placeholder for leadership if needed
 main

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — TrustOn Premium Estate" },
      {
        name: "description",
 devin/1779443260-smooth-scroll-projects-page
        content:
          "Learn about TrustOn — premium real estate development built on transparency, quality, and long-term vision.",

        content: "Discover Prime Estate by TrustOn - Redefining luxury living in Lucknow.",
 main
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
 devin/1779443260-smooth-scroll-projects-page
    <div className="bg-[#0A192F] text-white overflow-x-hidden selection:bg-luxe-cyan selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="TrustOn About Us"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/40 via-transparent to-[#0A192F]" />
        </div>

    <div className="bg-[#0A192F] text-white selection:bg-luxe-cyan selection:text-black">
      {/* 1. Hero Section with Breadcrumbs */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-[140px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="About Us Hero"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-transparent to-[#0A192F]" />
        </div>

 main
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
devin/1779443260-smooth-scroll-projects-page
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter uppercase"
          >
            About Us
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-luxe-cyan"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="text-white/30">›</span>
            <span className="text-white/50">About Us</span>
          </motion.nav>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-luxe-cyan text-lg">✦</span>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-luxe-cyan">
                About Our Company
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-8 leading-tight tracking-tighter uppercase">
              PRIME ESTATE - Own the Ground. Build Your Legacy.
            </h2>
            <div className="w-24 h-1 bg-luxe-cyan mb-8" />
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-4xl">
              Prime Estate is a trusted name in real estate development, built on a foundation of
              transparency, quality, and long-term vision. We don't just sell land, we craft
              opportunities. Our flagship project, Prime Estate, is a Jila Panchayat approved
              township that combines legal security, prime location, and future-ready
              infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Visual Innovation Section */}
      <section className="py-32 px-6 bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <SectionEyebrow>Visual Innovation</SectionEyebrow>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-tighter">
                  3D Visual Excellence
                </h2>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
                  Experience your future before it's built. Our advanced 3D architectural renderings
                  provide a hyper-realistic preview of your legacy, ensuring every detail aligns
                  with your vision of perfection.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 glass-premium p-4 rounded-xl">
                    <span className="text-luxe-cyan text-xl">🔭</span>
                    <span className="font-bold text-white text-sm">Real-time Visualization</span>
                  </div>
                  <div className="flex items-center gap-3 glass-premium p-4 rounded-xl">
                    <span className="text-luxe-cyan text-xl">☀️</span>
                    <span className="font-bold text-white text-sm">Natural Lighting Sim</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <Reveal delay={0.15}>
                <div className="relative max-w-lg w-full">
                  <div className="absolute -inset-4 bg-luxe-blue/20 blur-[60px] rounded-full" />
                  <img
                    src={interiorImg}
                    alt="3D Plot Visualization"
                    className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/5"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Showcase Section */}
      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionEyebrow>Interactive Showcase</SectionEyebrow>
              <h2 className="font-display text-4xl md:text-6xl text-white tracking-tighter">
                Explore Our Floor Plans
              </h2>
              <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg font-light">
                Experience the flow of luxury through our hyper-realistic 3D layout explorer.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* 3D Plot Viewer Area */}
            <Reveal delay={0.1}>
              <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl aspect-video lg:aspect-auto lg:h-[500px] group">
                <img
                  src={qualityImg}
                  alt="Interactive 3D Plot Viewer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8 z-20">
                  <div className="glass-premium px-6 py-4 rounded-2xl">
                    <h3 className="font-display text-2xl text-white font-bold uppercase tracking-tight">
                      Luxury Estate <span className="text-luxe-cyan">Phase I</span>
                    </h3>
                    <span className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">
                      Premium Residential Plot
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full px-10 py-8 bg-gradient-to-t from-[#0A192F]/90 to-transparent flex justify-between items-end z-20">
                  <div>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Estimated Investment
                    </span>
                    <p className="font-display text-3xl text-luxe-cyan font-bold tracking-tight">
                      Starting ₹4.5 Cr
                    </p>
                  </div>
                  <div className="glass-premium px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Configuration Sidebar */}
            <Reveal delay={0.2}>
              <div className="bg-ink/50 p-8 rounded-3xl border border-white/5 flex flex-col gap-8 shadow-2xl">
                <div>
                  <h4 className="text-[12px] text-luxe-cyan tracking-[0.2em] uppercase font-bold mb-2">
                    Select Configuration
                  </h4>
                  <p className="text-white/40 text-sm">Choose your legacy layout</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-luxe-cyan/30 hover:bg-white/[0.02] transition-all">
                    <span className="font-bold text-white/60 text-base">Premium Plots</span>
                    <span className="block text-xs text-white/30 font-bold tracking-wider mt-1">
                      1,800 - 2,200 SQ. FT.
                    </span>
                  </div>
                  <div className="w-full text-left p-5 rounded-2xl border border-luxe-cyan bg-luxe-cyan/10">
                    <span className="font-bold text-white text-base">Luxury Estates</span>
                    <span className="block text-xs text-luxe-cyan/80 font-bold tracking-wider mt-1">
                      2,500 - 4,000 SQ. FT.
                    </span>
                  </div>
                  <div className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-luxe-cyan/30 hover:bg-white/[0.02] transition-all">
                    <span className="font-bold text-white/60 text-base">Corner Collection</span>
                    <span className="block text-xs text-white/30 font-bold tracking-wider mt-1">
                      PREMIUM ORIENTATION
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <button className="w-full btn-magnetic btn-luxe py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
                    📥 Brochure
                  </button>
                  <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-bold text-white transition-all text-xs tracking-widest uppercase">
                    Detailed Specs
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Project Milestones */}
      <section className="py-32 px-6 bg-white/[0.02] relative">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionEyebrow>Our Performance</SectionEyebrow>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: "🏙️", value: "500+", label: "Luxury Plots Delivered" },
              { icon: "🏛️", value: "12+", label: "Iconic Landmarks Built" },
              { icon: "✅", value: "15", label: "Years of Excellence" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="glass-premium p-10 rounded-3xl text-center border border-white/5 hover:border-luxe-cyan/20 transition-all duration-500 hover:-translate-y-2">
                  <span className="text-5xl mb-4 block">{stat.icon}</span>
                  <p className="font-display text-5xl text-luxe-cyan mb-2">{stat.value}</p>
                  <p className="text-white/50 font-bold text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}

            className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-4"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 text-sm uppercase tracking-widest text-white/60 font-bold"
          >
            <Link to="/" className="hover:text-luxe-cyan transition-colors">Home</Link>
            <span className="w-1.5 h-1.5 rounded-full bg-luxe-cyan" />
            <span className="text-white">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. About Our Company Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 text-luxe-cyan mb-6">
              <Users size={20} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold">About Our Company</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display leading-tight mb-8">
              PRIME ESTATE – Own the Ground. Build Your Legacy
            </h2>
            <div className="w-20 h-1 bg-luxe-cyan mb-10" />
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Prime Estate is a trusted name in real estate development, built on a foundation of transparency, quality, and long-term vision. We don't just sell land; we craft opportunities.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Our flagship project, Prime Estate, is a Jila Panchayat approved township that combines legal security, prime location, and future-ready infrastructure.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-luxe-cyan/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={projectImg}
              alt="Prime Estate Project"
              className="relative rounded-2xl border border-white/5 shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
 main
          </div>
        </div>
      </section>

 devin/1779443260-smooth-scroll-projects-page
      {/* Client Testimonials */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <SectionEyebrow>Trusted By Visionaries</SectionEyebrow>
                <h2 className="font-display text-4xl md:text-6xl text-white tracking-tighter mt-4">
                  Client Experiences
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="bg-ink/50 p-8 md:p-12 rounded-3xl border border-white/5 hover:border-luxe-cyan/10 transition-all duration-500">
                <p className="text-white/70 text-lg italic mb-8 leading-relaxed">
                  "TrustOn doesn't just build structures; they curate lifestyles. The attention to
                  detail in their 3D renderings and final execution is unmatched."
                </p>
                <div>
                  <h4 className="font-display text-xl text-luxe-cyan">Jonathan V.</h4>
                  <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                    Corporate Executive
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-ink/50 p-8 md:p-12 rounded-3xl border border-white/5 hover:border-luxe-cyan/10 transition-all duration-500">
                <p className="text-white/70 text-lg italic mb-8 leading-relaxed">
                  "Investing with TrustOn was the best decision for my family's legacy. Their
                  transparency and architectural vision are truly inspiring."
                </p>
                <div>
                  <h4 className="font-display text-xl text-luxe-cyan">Sarah L.</h4>
                  <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                    Luxury Homeowner
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 px-6 bg-white/[0.02] relative">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <SectionEyebrow>Our Leaders</SectionEyebrow>
                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tighter mt-4">
                  The People Leading Our Vision
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-3xl aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 shadow-2xl mb-12 hover:-translate-y-2 transition-transform duration-500">
                <img
                  src={qualityImg}
                  alt="Meraj Husain Rizvi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/20 to-transparent" />
                <div className="absolute bottom-12 left-0 w-full px-6">
                  <h3 className="font-display text-3xl md:text-5xl text-white mb-2">
                    Meraj Husain Rizvi
                  </h3>
                  <p className="text-[11px] text-luxe-cyan font-bold uppercase tracking-[0.3em]">
                    Lead Architect
                  </p>
                </div>
              </div>
              <p className="max-w-3xl text-lg md:text-2xl text-white/50 italic leading-relaxed font-light">
                "Architecture is not just about buildings, it's about the permanence of human legacy
                and the structural integrity of our future."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-ink text-center relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Get In Touch</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-7xl text-white mb-12 tracking-tighter">
              Join Our Legacy
            </h2>
            <Link
              to="/contact"
              className="btn-magnetic btn-luxe px-12 py-5 inline-block rounded-full"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
=======
      {/* 3. Visual Inspiration Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
             <div className="absolute -inset-4 bg-luxe-blue/10 blur-2xl rounded-3xl" />
             <img
              src={architectImg}
              alt="Visual Inspiration"
              className="relative rounded-2xl border border-white/5 shadow-2xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 text-luxe-cyan mb-6">
              <Eye size={20} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold">Visual Inspiration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display leading-tight mb-8">
              3D-Visual Excellence
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Experience your future before it's built. Our advanced 3D-architectural renderings provide a hyper-realistic preview of your legacy, ensuring every detail aligns with your vision of perfection.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Zap size={18} />, label: "Real-Time Visualization" },
                { icon: <Target size={18} />, label: "Natural Lighting Effect" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-luxe-cyan/30 transition-colors">
                  <div className="text-luxe-cyan">{item.icon}</div>
                  <span className="font-bold tracking-wider text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Showcase */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 text-luxe-cyan mb-6">
            <Layout size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Interactive Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Explore Our Floor Plans</h2>
          <p className="text-white/40 max-w-2xl text-lg">
            Experience the flow of luxury through our hyper-realistic layout explorer.
          </p>
        </div>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img src={heroImg} className="w-full h-full object-cover brightness-50" alt="Floor Plan Preview" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
             <div className="bg-luxe-cyan p-6 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-110 transition-transform cursor-pointer">
                <Play fill="black" size={32} className="text-black ml-1" />
             </div>
             <p className="text-xs uppercase tracking-[0.5em] font-bold">Virtual Tour</p>
          </div>

          {/* Interactive UI Overlay from Ref */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left">
              <span className="text-[10px] uppercase tracking-widest text-luxe-cyan font-bold block mb-1">Estate Pricing</span>
              <p className="text-2xl font-display">Starting ₹4.5 Cr</p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-72 pointer-events-auto">
               {[
                 { label: "Premium Plots", sub: "1,500 - 3,000 SQ FT" },
                 { label: "Luxury Estates", sub: "5,000 - 10,000 SQ FT", active: true },
                 { label: "Corner Collection", sub: "Premium Obstructions" }
               ].map((opt, i) => (
                 <button key={i} className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${opt.active ? 'bg-luxe-cyan text-black border-luxe-cyan' : 'bg-black/40 backdrop-blur-md border-white/10 hover:border-luxe-cyan/50'}`}>
                   <div>
                     <p className="text-sm font-bold uppercase tracking-wider">{opt.label}</p>
                     <p className={`text-[10px] opacity-60 ${opt.active ? 'text-black' : 'text-white'}`}>{opt.sub}</p>
                   </div>
                   <ArrowRight size={16} />
                 </button>
               ))}
               <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                 <Target size={14} /> E-Brochure
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Performance (Counters) */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-luxe-cyan mb-16">
            <Target size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Our Performance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Layout />, val: "500+", label: "Luxury Plots Delivered" },
              { icon: <Users />, val: "12+", label: "Iconic Landmarks Built" },
              { icon: <ShieldCheck />, val: "15", label: "Years of Excellence" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-12 rounded-3xl flex flex-col items-center text-center group hover:bg-luxe-cyan/5 hover:border-luxe-cyan/20 transition-all duration-500">
                <div className="text-luxe-cyan mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
                <h3 className="text-6xl font-display mb-4">{stat.val}</h3>
                <p className="text-white/40 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-luxe-cyan mb-16">
          <Users size={20} />
          <span className="text-xs uppercase tracking-[0.4em] font-bold">Trusted by Visionaries</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "TrustOn doesn't just build structures, they curate lifestyles. The attention to detail in their 3D renderings and final execution is unmatched.",
              author: "Jonathan K.",
              role: "Corporate Executive"
            },
            {
              quote: "Investing with TrustOn was the best decision for my family's legacy. Their transparency and architectural vision are truly inspiring.",
              author: "Sarah L.",
              role: "Luxury Homeowner"
            }
          ].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-12 rounded-3xl relative">
              <div className="w-16 h-16 rounded-full bg-white/10 mb-8 overflow-hidden">
                 {/* Avatar placeholder */}
              </div>
              <p className="text-xl font-serif italic text-white/80 leading-relaxed mb-8">"{t.quote}"</p>
              <div>
                <p className="font-bold uppercase tracking-widest text-sm mb-1">{t.author}</p>
                <p className="text-luxe-cyan text-xs uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Leadership Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center gap-3 text-luxe-cyan mb-16">
            <Zap size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Our Leaders</span>
          </div>

          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-8">The People Leading Our Vision</h2>
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              Meet The Team <Play size={12} fill="black" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto text-center">
             <div className="relative group mb-12">
                <div className="absolute -inset-4 bg-luxe-cyan/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
                   <img src={architectImg} className="w-full h-full object-cover" alt="Meraj Husain Rizvi" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                   <div className="absolute bottom-12 left-0 right-0">
                      <h3 className="text-4xl font-display mb-1">Meraj Husain Rizvi</h3>
                      <p className="text-luxe-cyan uppercase tracking-[0.3em] font-bold text-xs">Lead Architect</p>
                   </div>
                </div>
             </div>
             <p className="text-2xl font-serif italic text-white/60 leading-relaxed">
               "Architecture is not just about buildings, it's about the permanence of human legacy and the structural integrity of our visions."
             </p>
          </div>
        </div>
 main
      </section>
    </div>
  );
}
