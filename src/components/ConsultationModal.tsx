import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, User, MessageSquare, ChevronDown } from "lucide-react";
import { submitContactMessage } from "@/lib/contactSubmit";

const services = [
  "Plot Purchase Enquiry",
  "Architecture & Design",
  "Construction & Build",
  "Investment Consulting",
  "Channel Partnership",
  "Site Visit Request",
  "General Enquiry",
];

let _listeners: ((open: boolean) => void)[] = [];

export function openConsultationModal() {
  _listeners.forEach((fn) => fn(true));
}

export function useConsultationModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    _listeners.push(setOpen);
    return () => {
      _listeners = _listeners.filter((l) => l !== setOpen);
    };
  }, []);
  return { open, setOpen };
}

export function ConsultationModal() {
  const { open, setOpen } = useConsultationModal();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    try {
      await submitContactMessage({ data: { name: form.name, email: form.email, phone: form.phone, service: form.service, message: form.message } });
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch {
      const subject = encodeURIComponent(`TrustOn Consultation — ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`);
      window.open(`mailto:trustondevelopers01@gmail.com?subject=${subject}&body=${body}`);
      setStatus("sent");
    }
  };

  const close = () => { setOpen(false); setStatus("idle"); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-[#060c16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/50 to-transparent" />

              <div className="flex items-start justify-between p-6 border-b border-white/8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#00BFFF] font-bold mb-1">
                    Free Consultation
                  </p>
                  <h2 className="font-serif text-2xl text-white leading-tight">
                    Book a <em className="italic text-[#00BFFF]">Consultation</em>
                  </h2>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-300 mt-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto">
                {status === "sent" ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full border-2 border-[#00BFFF] flex items-center justify-center mx-auto mb-5">
                      <svg className="w-6 h-6 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">Request Received</h3>
                    <p className="text-white/45 text-sm font-light leading-relaxed max-w-xs mx-auto mb-6">
                      Our advisor will contact you within 2 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[#00BFFF] text-[11px] uppercase tracking-[0.15em] font-bold hover:underline"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-2 block">
                          Full Name <span className="text-[#00BFFF]">*</span>
                        </span>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                          <input
                            type="text" name="name" required value={form.name} onChange={handleChange}
                            placeholder="Your name"
                            className="w-full bg-white/4 border border-white/10 focus:border-[#00BFFF] outline-none rounded-lg py-3 pl-9 pr-3 text-white/80 text-sm font-light transition-colors duration-300 placeholder:text-white/20"
                          />
                        </div>
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-2 block">
                          Phone <span className="text-[#00BFFF]">*</span>
                        </span>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                          <input
                            type="tel" name="phone" required value={form.phone} onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-white/4 border border-white/10 focus:border-[#00BFFF] outline-none rounded-lg py-3 pl-9 pr-3 text-white/80 text-sm font-light transition-colors duration-300 placeholder:text-white/20"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-2 block">Email Address</span>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-white/4 border border-white/10 focus:border-[#00BFFF] outline-none rounded-lg py-3 pl-9 pr-3 text-white/80 text-sm font-light transition-colors duration-300 placeholder:text-white/20"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-2 block">Service Interested In</span>
                      <div className="relative">
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
                        <select
                          name="service" value={form.service} onChange={handleChange}
                          className="w-full bg-white/4 border border-white/10 focus:border-[#00BFFF] outline-none rounded-lg py-3 px-3 text-white/80 text-sm font-light transition-colors duration-300 cursor-pointer appearance-none"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <option value="" className="bg-[#060c16]">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[#060c16]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mb-2 block">Message</span>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-white/20" />
                        <textarea
                          name="message" value={form.message} onChange={handleChange} rows={3}
                          placeholder="Tell us your requirements…"
                          className="w-full bg-white/4 border border-white/10 focus:border-[#00BFFF] outline-none rounded-lg py-3 pl-9 pr-3 text-white/80 text-sm font-light transition-colors duration-300 resize-none placeholder:text-white/20"
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 disabled:opacity-60"
                      style={{ background: "#00BFFF", color: "#04090f" }}
                    >
                      {status === "sending" ? "Sending…" : "Book Free Consultation"}
                    </button>

                    <p className="text-white/25 text-[10px] text-center leading-relaxed">
                      No commitment required. Our advisor will call within 2 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
