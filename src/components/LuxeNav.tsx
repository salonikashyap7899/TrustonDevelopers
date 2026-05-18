import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Project", to: "/project" },
  { label: "Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className="h-11 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[var(--bronze)] text-lg font-bold tracking-widest uppercase" style={{fontFamily: "Inter, sans-serif"}}>TrustOn</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-medium">Premium Estate</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              Home
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Link
              to="/about-us"
              className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              About Us
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Link
              to="/project"
              className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              Projects
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <Link
                to="/services"
                className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
                activeProps={{ className: "text-[var(--bronze)]" }}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute left-0 top-full w-56 bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden transition-all duration-200 ${
                  svcOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  to="/services"
                  className="block px-5 py-3 text-[12px] font-semibold text-[var(--bronze)] border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  All Services →
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block px-5 py-3 text-[13px] text-gray-700 hover:text-[var(--bronze)] hover:bg-gray-50 border-b border-gray-50 transition-colors last:border-0"
                    activeProps={{ className: "text-[var(--bronze)] bg-gray-50" }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/channel-partner"
              className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              Partner
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Link
              to="/contact"
              className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[var(--bronze)] transition-colors duration-200 relative group"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              Contact
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--bronze)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[var(--bronze)] text-white px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity duration-200 rounded-sm shadow-sm"
          >
            Enquire Now
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
          >
            <span className={`block w-6 h-[2px] bg-gray-800 transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-gray-800 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-gray-800 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          open ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {navLinks.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 text-[14px] font-medium text-gray-800 hover:text-[var(--bronze)] border-b border-gray-100 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile Services Accordion */}
          <div className="border-b border-gray-100">
            <button
              className="w-full flex items-center justify-between py-3.5 text-[14px] font-medium text-gray-800"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="pb-2 pl-3 flex flex-col gap-1">
                <Link to="/services" className="py-2 text-[13px] text-[var(--bronze)] font-semibold">All Services →</Link>
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="py-2 text-[13px] text-gray-600 hover:text-[var(--bronze)] transition-colors"
                    activeProps={{ className: "text-[var(--bronze)]" }}
                  >
                    — {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 text-[14px] font-medium text-gray-800 hover:text-[var(--bronze)] border-b border-gray-100 last:border-0 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="mt-4 mb-4 inline-flex justify-center bg-[var(--bronze)] text-white px-6 py-3 text-[12px] font-semibold uppercase tracking-widest rounded-sm"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
