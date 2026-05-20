import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRUSTON | Modern Legacy Developers" },
      {
        name: "description",
        content: "The Standard of Permanence. Modern Legacy Developers.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#111417] text-[#e1e2e8] selection:bg-[#a9c7ff] selection:text-[#003063] overflow-x-hidden font-['Hanken_Grotesk']">
      <Header />
      <SideNav />
      <main className="lg:pl-20">
        <HeroSection />
        <BrandMarquee />
        <AboutSection />
        <PortfolioSection />
        <NewsletterSection />
        <Footer />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-[100] flex justify-between items-center px-16 py-6 bg-[#0b0e12]/80 backdrop-blur-xl border-b border-[#a9c7ff]/10">
      <div className="flex items-center gap-4">
        <img 
          alt="TRUSTON" 
          className="h-10 w-auto" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvfytJwLFxLL1iX0vRHEQoqtzQqVQnSXffLakTj4Kl9ePM7mBwKGlW6FJlsj2fQCA-JOAwXVN7feNPaeci9lHKYuPPXuioWsjbFGVpxIfGgiFmbK2QNXfHYI4CfUxu9mTeeqdxBUS92OjFCjVFtsDY8FHhVsvezWuqK7aHfDXhHbKgAJNfcBD6tAxzbolh-Wv_pL8nA8iOUcA_fBxkkjMvucOQBvwiNdc7ADswO9fol1fxL7jkMYpX2iojhgZUMiLsHmeH-6zjKJEx"
          style={{ filter: 'brightness(0) saturate(100%) invert(83%) sepia(18%) saturate(1065%) hue-rotate(185deg) brightness(101%) contrast(104%)' }}
        />
        <div className="font-['EB_Garamond'] text-[24px] tracking-[0.2em] text-[#a9c7ff]">TRUSTON</div>
      </div>
      <nav className="hidden lg:flex gap-12">
        {['Portfolio', 'Trackers', 'Services', 'Consultancy', 'About', 'Contact'].map((item) => (
          <a key={item} className="text-[12px] font-semibold uppercase tracking-widest text-[#e1e2e8]/70 hover:text-[#a9c7ff] transition-colors duration-300" href="#">{item}</a>
        ))}
      </nav>
      <button className="text-[12px] font-semibold uppercase tracking-widest px-8 py-3 border border-[#a9c7ff] text-[#a9c7ff] hover:bg-[#a9c7ff] hover:text-[#003063] transition-all duration-300">
        Book Visit
      </button>
    </header>
  );
}

function SideNav() {
  return (
    <aside className="hidden lg:flex flex-col h-full fixed left-0 top-0 w-20 hover:w-80 bg-[#191c20] border-r border-[#a9c7ff]/10 z-[90] transition-all duration-500 overflow-hidden group">
      <div className="mt-32 px-6 space-y-8">
        {[
          { icon: 'home', label: 'Home', active: true },
          { icon: 'domain', label: 'Estates' },
          { icon: 'trending_up', label: 'Investment' },
          { icon: 'architecture', label: 'Design' },
          { icon: 'info', label: 'About' },
          { icon: 'gavel', label: 'Legal' },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-6 py-4 transition-all cursor-pointer ${item.active ? 'bg-[#4891f6]/20 text-[#a9c7ff] border-l-4 border-[#a9c7ff]' : 'text-[#c1c6d5] hover:text-[#a9c7ff]'}`}>
            <span className="material-symbols-outlined ml-2">{item.icon}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero-main">
      <div className="absolute inset-0 bg-[#0b0e12]">
        <img 
          className="w-full h-full object-cover opacity-60 scale-110" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111417] via-transparent to-[#111417]"></div>
      </div>
      
      <div className="relative z-10 text-center px-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#a9c7ff] mb-6 block">Est. 2004</span>
        <h1 className="font-['EB_Garamond'] text-6xl md:text-9xl text-[#e1e2e8] mb-8 tracking-tighter">
          Modern <span className="italic text-[#a9c7ff]">Legacy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#e1e2e8]/60 mb-12 leading-relaxed">
          Crafting monumental spaces that redefine the skyline. We merge structural precision with luxury editorial storytelling.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-10 py-4 bg-[#a9c7ff] text-[#003063] text-[12px] font-bold uppercase tracking-widest hover:bg-[#4891f6] transition-all">
            Explore Portfolio
          </button>
          <button className="px-10 py-4 border border-[#e1e2e8]/20 text-[#e1e2e8] text-[12px] font-bold uppercase tracking-widest hover:bg-[#e1e2e8]/5 transition-all">
            Our Vision
          </button>
        </div>
      </div>

      <div className="absolute left-12 bottom-24 hidden xl:block">
        <div className="flex items-center gap-4 -rotate-90 origin-left translate-y-full">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#e1e2e8]/40">Scroll to Discover</span>
          <div className="w-24 h-px bg-[#e1e2e8]/20"></div>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const brands = ['ELITE ESTATES', 'PRESTIGE GARDENS', 'OBSIDIAN TOWERS', 'IVORY RESIDENCES'];
  return (
    <div className="py-12 border-y border-[#a9c7ff]/10 bg-[#0b0e12] overflow-hidden">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-24 px-12">
            {brands.map((brand) => (
              <span key={brand} className="font-['EB_Garamond'] text-xl text-[#e1e2e8]/30 tracking-[0.2em] flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-[#a9c7ff] rounded-full"></span>
                {brand}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-32 px-16 relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#a9c7ff] mb-6 block">Foundation & Core</span>
          <h2 className="font-['EB_Garamond'] text-5xl text-[#e1e2e8] mb-8 leading-tight">
            Our Legacy of <br/><span className="italic text-[#a9c7ff]">Excellence</span>
          </h2>
          <p className="text-lg text-[#e1e2e8]/60 mb-12 leading-relaxed">
            Since our inception, Truston Developers has been at the forefront of architectural innovation. Our philosophy is rooted in creating spaces that breathe, inspire, and endure through generations.
          </p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="font-['EB_Garamond'] text-4xl text-[#e1e2e8] mb-2">20+</div>
              <div className="text-[10px] uppercase tracking-widest text-[#e1e2e8]/40">Years Experience</div>
            </div>
            <div>
              <div className="font-['EB_Garamond'] text-4xl text-[#e1e2e8] mb-2">150</div>
              <div className="text-[10px] uppercase tracking-widest text-[#e1e2e8]/40">Global Projects</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-[#272a2e] rounded-lg overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5" 
              className="w-full h-full object-cover opacity-80"
              alt="About"
            />
          </div>
          <div className="absolute -bottom-12 -left-12 bg-[#111418]/70 backdrop-blur-xl border border-[#a9c7ff]/15 p-12 max-w-sm rounded-lg">
            <h3 className="font-['EB_Garamond'] text-2xl text-[#e1e2e8] mb-4">Philosophy</h3>
            <p className="text-sm text-[#e1e2e8]/60 italic leading-relaxed">
              "We don't build structures; we curate the environments where memories are etched into the stone of time."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const projects = [
    { title: 'The Obsidian Heights', location: 'Dubai | 2024', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5' },
    { title: 'Azure Sanctuary', location: 'Monaco | 2024', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5' },
    { title: 'Belgravia Manor', location: 'London | 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5' },
    { title: 'Neo-Ginza Plaza', location: 'Tokyo | 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-ROCBKCxIGJcRW8o3SCAaQ1ZgMO-JvMPGGi8RTxgnKNdJ-3Rf7bsm6b4jxKpvdfH8uDrqlunqCVe78ITL5kG8C-pSi_n0pZqQBddh99xIiTwY6fh9SHqudMGeUjRVQ4pSBqXzyUKNprJhpPk62qRaHi-gGAFZ9MCXBlzh4-Pupmlna6vkt9PIltmBM0huYQG4kOZ1UKbV7fxTlWgh-AXgyYwzAGGqAhw07fFkFPJP3wDZZImKY5ETYq5' },
  ];

  return (
    <section className="py-32 px-16 bg-[#0b0e12]">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#a9c7ff] mb-6 block">Curated Portfolio</span>
          <h2 className="font-['EB_Garamond'] text-5xl text-[#e1e2e8]">Prime Estates</h2>
        </div>
        <a href="#" className="text-[12px] font-bold uppercase tracking-widest text-[#a9c7ff] flex items-center gap-2 group">
          View All Projects
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video rounded-lg overflow-hidden mb-6 relative">
              <img src={project.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111417]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#e1e2e8]/40 mb-2">{project.location}</div>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#e1e2e8] group-hover:text-[#a9c7ff] transition-colors">{project.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-32 px-16">
      <div className="bg-[#111418]/70 backdrop-blur-xl border border-[#a9c7ff]/15 p-24 rounded-lg text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(169, 199, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(169, 199, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#a9c7ff] mb-6 block">Stay Informed</span>
        <h2 className="font-['EB_Garamond'] text-5xl text-[#e1e2e8] mb-12">Join the Inner <span className="italic text-[#a9c7ff]">Circle</span></h2>
        <div className="max-w-md mx-auto flex gap-4 border-b border-[#e1e2e8]/20 pb-4">
          <input type="email" placeholder="Your corporate email" className="bg-transparent border-none outline-none flex-1 text-[#e1e2e8] placeholder:text-[#e1e2e8]/20" />
          <button className="text-[12px] font-bold uppercase tracking-widest text-[#a9c7ff]">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-16 border-t border-[#a9c7ff]/10 bg-[#0b0e12]">
      <div className="grid md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#a9c7ff]"></div>
            <div className="font-['EB_Garamond'] text-2xl tracking-[0.2em] text-[#a9c7ff]">TRUSTON</div>
          </div>
          <p className="text-sm text-[#e1e2e8]/40 leading-relaxed">
            Redefining architectural heritage through the lens of modern innovation.
          </p>
          <div className="flex gap-6 mt-8">
            {['public', 'share', 'mail'].map((icon) => (
              <span key={icon} className="material-symbols-outlined text-[#e1e2e8]/40 hover:text-[#a9c7ff] cursor-pointer transition-colors">{icon}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#e1e2e8]/20 mb-8">Navigation</h4>
          <ul className="space-y-4">
            {['The Trackers', 'Prime Estates', 'Consultancy'].map((item) => (
              <li key={item}><a href="#" className="text-sm text-[#e1e2e8]/60 hover:text-[#a9c7ff] transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#e1e2e8]/20 mb-8">Resources</h4>
          <ul className="space-y-4">
            {['Legal Hub', 'Career', 'Archive'].map((item) => (
              <li key={item}><a href="#" className="text-sm text-[#e1e2e8]/60 hover:text-[#a9c7ff] transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#e1e2e8]/20 mb-8">Global HQ</h4>
          <p className="text-sm text-[#e1e2e8]/60 leading-relaxed">
            83 Architectural Plaza<br/>Skyline District, DU 90210<br/><br/>
            contact@truston-dev.com<br/>
            +971 (0) 4 555 0199
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-[#e1e2e8]/5">
        <div className="text-[10px] uppercase tracking-widest text-[#e1e2e8]/20">
          © 2024 Truston Developers. All Rights Reserved.
        </div>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
            <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-[#e1e2e8]/20 hover:text-[#a9c7ff] transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
