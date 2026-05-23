import { Link } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const company = [
  { label: "About Us", to: "/about-us" },
  { label: "Projects", to: "/project" },
  { label: "Channel Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/70">
      {/* Top CTA strip */}
      <div className="border-b border-white/5 py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-luxe-blue rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxe-cyan rounded-full blur-[80px]" />
        </div>
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
          <div className="text-center lg:text-left">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-luxe-cyan mb-4 md:mb-6 font-bold">
              Begin Your Journey
            </p>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-2 tracking-tight text-balance">
              Own the Ground.
              <br />
              Build the <em className="gradient-luxe-text not-italic">Legacy.</em>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/contact" className="btn-magnetic btn-luxe px-6 md:px-10 py-4 md:py-5 text-center text-xs md:text-sm">
              Enquire Now →
            </Link>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center justify-center gap-2 md:gap-3 border border-white/10 text-white/70 px-6 md:px-10 py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-wider md:tracking-widest hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-300 rounded-full font-bold"
            >
              +91 96160-61166
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 lg:py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16">
        {/* Brand column */}
        <div className="sm:col-span-2">
          <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain brightness-125"
            />
            <div>
              <span className="block text-white text-xl md:text-2xl lg:text-3xl font-display tracking-tight leading-none">
                TrustOn
              </span>
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-luxe-cyan font-bold mt-1 md:mt-2">
                Premium Estate
              </span>
            </div>
          </div>
          <p className="text-white/40 text-sm md:text-base lg:text-lg leading-relaxed max-w-md mb-8 md:mb-12 font-light">
            Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township in
            Lucknow, crafted for those who expect more from every square foot.
          </p>
          {/* Social icons */}
          <div className="flex gap-3 md:gap-4">
            {[
              { label: "FB", href: "#" },
              { label: "IG", href: "#" },
              { label: "YT", href: "#" },
              { label: "WA", href: "https://wa.me/919616061166" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-10 h-10 md:w-12 md:h-12 border border-white/5 text-[9px] md:text-[10px] text-white/40 hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-300 flex items-center justify-center rounded-full font-bold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-luxe-cyan mb-6 md:mb-10 pb-3 md:pb-4 border-b border-white/5 font-bold">
            Expertise
          </p>
          <ul className="space-y-3 md:space-y-4">
            {services.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm md:text-base text-white/30 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2 md:gap-3 group"
                >
                  <span className="w-0 h-px bg-luxe-cyan group-hover:w-4 md:group-hover:w-6 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-luxe-cyan mb-6 md:mb-10 pb-3 md:pb-4 border-b border-white/5 font-bold">
            Company
          </p>
          <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12">
            {company.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm md:text-base text-white/30 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2 md:gap-3 group"
                >
                  <span className="w-0 h-px bg-luxe-cyan group-hover:w-4 md:group-hover:w-6 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-6 md:pt-10 border-t border-white/5 space-y-3 md:space-y-4">
            <a
              href="tel:+919616061166"
              className="block text-white font-display text-xl md:text-2xl lg:text-3xl hover:text-luxe-cyan transition-colors"
            >
              +91 96160-61166
            </a>
            <a
              href="mailto:trustondevelopers01@gmail.com"
              className="block text-white/30 text-[10px] md:text-xs hover:text-white/60 transition-colors break-all tracking-wider md:tracking-widest font-bold"
            >
              trustondevelopers01@gmail.com
            </a>
            <p className="text-white/20 text-[10px] md:text-[11px] leading-relaxed mt-4 md:mt-6 font-medium uppercase tracking-wider">
              UGF, Apple Plaza, Next To HDFC Bank,
              <br />
              Hardoi Road, Lucknow — 226003
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10 flex flex-col md:flex-row justify-between gap-4 md:gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 font-bold">
        <span className="text-center md:text-left">© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.</span>
        <span className="flex justify-center md:justify-end gap-6 md:gap-10">
          <Link to="/admin/login" className="hover:text-luxe-cyan transition-colors">
            Admin Portal
          </Link>
          <span className="text-white/10 italic hidden sm:inline">Pure Blue Luxury Architecture</span>
        </span>
      </div>
    </footer>
  );
}
