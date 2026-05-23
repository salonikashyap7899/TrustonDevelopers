import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const leftLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "PROJECTS", to: "/project" },
  { label: "PROPERTIES", to: "/services" },
] as const;

const rightLinks = [
  { label: "LIFESTYLE", to: "/lifestyle" },
  { label: "CONTACT US", to: "/contact" },
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

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ink/95 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-[100px] xl:h-[120px]">
          {/* Left Nav - Desktop only */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 flex-1">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[10px] xl:text-[11px] font-bold tracking-[0.3em] xl:tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <div className="flex justify-center shrink-0 lg:px-6">
            <Link to="/" className="flex flex-col items-center group">
              <img
                src="/logo.png"
                alt="TrustOn Logo"
                className="w-auto h-12 sm:h-14 lg:h-20 xl:h-24 object-contain brightness-125 group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </div>

          {/* Right Nav - Desktop only */}
          <div className="hidden lg:flex items-center justify-end gap-6 xl:gap-10 flex-1">
            <nav className="flex items-center gap-6 xl:gap-10">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button
                  className="flex items-center gap-2 text-[10px] xl:text-[11px] font-bold tracking-[0.3em] xl:tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan"
                >
                  SERVICES
                  <svg
                    className={`w-2.5 h-2.5 transition-transform duration-300 ${
                      svcOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>

                <AnimatePresence>
                  {svcOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-56 bg-ink/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden mt-3 rounded-xl"
                    >
                      <Link
                        to="/services"
                        className="block px-5 py-3 text-[10px] font-bold text-luxe-cyan border-b border-white/5 hover:bg-white/5 transition-colors uppercase tracking-widest"
                      >
                        All Expertise →
                      </Link>
                      {services.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="block px-5 py-3 text-sm text-white/50 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors last:border-0 font-light"
                          activeProps={{
                            className: "text-luxe-cyan bg-white/5",
                          }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[10px] xl:text-[11px] font-bold tracking-[0.3em] xl:tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-end relative z-50"
          >
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                open ? "w-6 rotate-45 translate-y-[5px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                open ? "opacity-0 w-4" : "w-4"
              }`}
            />
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                open ? "w-6 -rotate-45 -translate-y-[5px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-ink/98 backdrop-blur-xl border-t border-white/5 overflow-hidden fixed inset-x-0 top-16 sm:top-20 bottom-0"
          >
            <nav className="flex flex-col px-6 py-8 gap-2 overflow-y-auto max-h-full">
              {leftLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-4 text-xl font-display text-white border-b border-white/5 hover:text-luxe-cyan transition-colors"
                  activeProps={{ className: "text-luxe-cyan" }}
                >
                  {l.label}
                </Link>
              ))}

              <div className="border-b border-white/5">
                <button
                  className="w-full flex items-center justify-between py-4 text-xl font-display text-white"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  SERVICES
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: mobileServicesOpen ? "auto" : 0,
                    opacity: mobileServicesOpen ? 1 : 0,
                  }}
                  className="overflow-hidden pl-4 flex flex-col gap-1"
                >
                  <Link
                    to="/services"
                    className="py-3 text-sm text-luxe-cyan font-bold uppercase tracking-[0.3em]"
                  >
                    All Expertise →
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="py-3 text-base text-white/40 hover:text-white transition-colors font-light"
                      activeProps={{ className: "text-white" }}
                    >
                      — {s.label}
                    </Link>
                  ))}
                </motion.div>
              </div>

              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-4 text-xl font-display text-white border-b border-white/5 last:border-0 hover:text-luxe-cyan transition-colors"
                  activeProps={{ className: "text-luxe-cyan" }}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/contact"
                className="mt-8 btn-magnetic btn-luxe py-4 rounded-xl text-center text-sm"
              >
                Enquire Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
