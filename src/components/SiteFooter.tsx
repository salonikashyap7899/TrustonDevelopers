import { Link } from "@tanstack/react-router";

const navigation = [
  { label: "The Trackers", to: "/services" },
  { label: "Prime Estates", to: "/project" },
  { label: "Consultancy", to: "/investment-consulting" },
] as const;

const resources = [
  { label: "Legal Hub", to: "/about-us" },
  { label: "Career", to: "/contact" },
  { label: "Archive", to: "/project" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full py-24 px-6 md:px-16 bg-surface-container-lowest border-t border-primary/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="md:col-span-1">
          <div className="font-display text-headline-lg text-primary tracking-tighter mb-8 flex items-center gap-2">
            <img
              src="/logo.png"
              alt="TRUSTON"
              className="h-8 w-auto"
              style={{ filter: "brightness(0) saturate(100%) invert(83%) sepia(18%) saturate(1065%) hue-rotate(185deg) brightness(101%) contrast(104%)" }}
            />
            TRUSTON
          </div>
          <p className="text-body-md text-on-surface/50 mb-8">
            Redefining architectural heritage through the lens of modern innovation.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-on-surface/50 hover:text-primary transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="#" className="text-on-surface/50 hover:text-primary transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="mailto:trustondevelopers01@gmail.com" className="text-on-surface/50 hover:text-primary transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-button uppercase text-primary mb-8 tracking-widest">Navigation</h5>
          <ul className="space-y-4">
            {navigation.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-on-surface/50 hover:text-primary underline-offset-8 transition-opacity"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-button uppercase text-primary mb-8 tracking-widest">Resources</h5>
          <ul className="space-y-4">
            {resources.map((l) => (
              <li key={l.to + l.label}>
                <Link
                  to={l.to}
                  className="text-on-surface/50 hover:text-primary underline-offset-8 transition-opacity"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Global HQ */}
        <div>
          <h5 className="text-button uppercase text-primary mb-8 tracking-widest">Global HQ</h5>
          <address className="not-italic text-body-md text-on-surface/50 space-y-4">
            <p>
              UGF, Apple Plaza, Next To HDFC Bank,
              <br />
              Hardoi Road, Lucknow — 226003
            </p>
            <p>
              <a href="mailto:trustondevelopers01@gmail.com" className="hover:text-primary transition-colors">
                trustondevelopers01@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+919616061166" className="hover:text-primary transition-colors">
                +91 96160-61166
              </a>
            </p>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="md:col-span-4 pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-body-md text-on-surface-variant">
            &copy; 2024 Truston Developers. All Rights Reserved.
          </span>
          <div className="flex gap-8 text-label-md uppercase tracking-widest text-on-surface/30">
            <Link to="/about-us" className="hover:text-primary transition-all">
              Privacy Policy
            </Link>
            <Link to="/about-us" className="hover:text-primary transition-all">
              Terms of Service
            </Link>
            <Link to="/admin/login" className="hover:text-primary transition-all">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
