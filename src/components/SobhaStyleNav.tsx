import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const navLinks = [
  { label: "Portfolio", to: "/project" },
  { label: "Trackers", to: "/services" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Consultancy", to: "/investment-consulting" },
  { label: "About", to: "/about-us" },
  { label: "Contact", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-surface-container-lowest/80 backdrop-blur-xl border-b border-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="TRUSTON"
              className="h-10 w-auto object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(83%) sepia(18%) saturate(1065%) hue-rotate(185deg) brightness(101%) contrast(104%)" }}
            />
            <span className="font-display text-[22px] tracking-[0.15em] text-primary uppercase font-medium hidden sm:block">
              TRUSTON
            </span>
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setSvcOpen(true)}
                  onMouseLeave={() => setSvcOpen(false)}
                >
                  <button className="text-button uppercase tracking-widest text-on-surface/70 hover:text-primary transition-colors duration-300 flex items-center gap-1">
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 10 8"
                    >
                      <path
                        d="M1 1L5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {svcOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-56 glass-panel overflow-hidden rounded-lg"
                      >
                        <Link
                          to="/services"
                          className="block px-5 py-3 text-button text-primary border-b border-primary/10 hover:bg-primary/5 transition-colors"
                        >
                          All Services →
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="block px-5 py-3 text-body-md text-on-surface-variant hover:text-primary hover:bg-primary/5 border-b border-primary/5 transition-colors last:border-0"
                            activeProps={{
                              className: "text-primary bg-primary/5",
                            }}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="text-button uppercase tracking-widest text-on-surface/70 hover:text-primary transition-colors duration-300"
                  activeProps={{
                    className: "text-primary border-b border-primary pb-1",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button - Right */}
          <Link
            to="/contact"
            className="hidden sm:block text-button uppercase tracking-widest px-6 lg:px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95"
          >
            Book Visit
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 bg-primary ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 bg-primary ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 bg-primary ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-primary/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {navLinks.filter(l => !l.hasDropdown).map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="py-4 text-button uppercase tracking-widest text-on-surface hover:text-primary border-b border-primary/5 transition-colors"
                  activeProps={{ className: "text-primary" }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services dropdown mobile */}
              <div className="border-b border-primary/5">
                <button
                  className="w-full flex items-center justify-between py-4 text-button uppercase tracking-widest text-on-surface"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 10 8"
                  >
                    <path
                      d="M1 1L5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pb-2 pl-3 flex flex-col gap-1 overflow-hidden"
                    >
                      <Link
                        to="/services"
                        className="py-2 text-body-md text-primary font-semibold"
                      >
                        All Services →
                      </Link>
                      {services.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="py-2 text-body-md text-on-surface-variant hover:text-primary transition-colors"
                          activeProps={{ className: "text-primary" }}
                        >
                          — {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile CTA */}
              <Link
                to="/contact"
                className="mt-4 text-button uppercase tracking-widest px-6 py-4 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all text-center"
              >
                Book Visit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
