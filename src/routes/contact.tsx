import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-estate.jpg";
import { submitContactMessage } from "@/lib/contactSubmit";
import { useSingleRecord } from "@/hooks/useCollections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TrustOn Developers" },
      {
        name: "description",
        content:
          "Talk to TrustOn — buy a plot, design your home, start construction, or become a channel partner. Our team replies within 2 hours.",
      },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Plot Purchase Enquiry",
  "Architecture & Design",
  "Construction & Build",
  "Investment Consulting",
  "Channel Partnership",
  "Site Visit Request",
  "General Enquiry",
];

function ContactPage() {
  const { data: hero } = useSingleRecord<Record<string, string | undefined>>(
    "hero_sections",
    "page_key",
    "contact",
  );
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");

    try {
      await submitContactMessage({
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      const subject = encodeURIComponent(`TrustOn Enquiry — ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`,
      );
      window.open(`mailto:trustondevelopers01@gmail.com?subject=${subject}&body=${body}`);
      setStatus("sent");
    }
  };

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-[140px]">
        <div className="absolute inset-0 z-0">
          <img
            src={hero?.image_url || heroImg}
            alt="Contact TrustOn"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.18) saturate(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/50 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Get in Touch
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-none tracking-tight mb-4">
              {hero?.title || "Let's Start a"}
              <br />
              <em className="text-[#00BFFF] italic">{hero?.title_accent || "Conversation"}</em>
            </h1>
            <p className="text-white/45 text-base font-light max-w-lg leading-relaxed mt-4">
              {hero?.subtitle ||
                "Whether you're buying a plot, building a home, or exploring investment opportunities — our team responds within 2 hours."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2">
            <Reveal direction="left">
              <div className="sticky top-28">
                <h2 className="font-serif text-4xl text-white leading-tight mb-6">
                  Tell Us What
                  <br />
                  You <em className="text-[#00BFFF] italic">Need</em>
                </h2>
                <p className="text-white/40 text-sm leading-[2] font-light mb-10">
                  Fill in the form and one of our advisors will reach out to discuss your goals,
                  timeline, and how TrustOn can serve you best.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal direction="right" delay={0.1}>
              {status === "sent" ? (
                <div className="border border-[#00BFFF]/25 bg-[#00BFFF]/8 rounded-2xl p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full border-2 border-[#00BFFF] flex items-center justify-center text-2xl mb-6">
                    ✓
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-3">Message Received</h3>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-[#00BFFF] text-[11px] uppercase tracking-[0.15em] font-bold hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-white/8 rounded-2xl p-8 md:p-12 bg-[#060c16] space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      label="Full Name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">
                        Service
                      </span>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light"
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">
                      Message
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light resize-none"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-12 py-4 bg-[#00BFFF] text-[#04090f] text-[12px] uppercase tracking-[0.15em] font-bold rounded-xl hover:scale-105 disabled:opacity-60 transition-all"
                  >
                    {status === "sending" ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light transition-colors"
      />
    </label>
  );
}
