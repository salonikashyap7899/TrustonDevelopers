import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Project", to: "/project" },
  { label: "Services", to: "/plot-selling" },
  { label: "Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-700 ${
            scrolled ? "glass-light card-shadow" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="text-bronze text-2xl font-serif italic tracking-tight">Trust</span>
            <span className="text-ink text-2xl font-serif tracking-tight">On</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze"
                activeProps={{ className: "text-bronze" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bronze-border px-5 py-2 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all duration-500"
          >
            Enquire
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={`block w-6 h-px bg-ink transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[88px] mx-6 rounded-2xl glass-light overflow-hidden transition-all duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 px-2 text-sm uppercase tracking-luxe text-foreground/80 hover:text-bronze border-b border-border last:border-0"
              activeProps={{ className: "text-bronze" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex justify-center rounded-full bg-bronze text-cream px-6 py-3 text-xs uppercase tracking-luxe"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
