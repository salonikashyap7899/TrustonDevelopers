import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

export function RedefiningLuxurySection() {
  const content = usePageContent("home.redefining", {
    eyebrow: "Welcome to the Era of TrustOn",
    title: "Redefining",
    title_accent: "Luxury",
    subtitle: "Real Estate",
    body: "Where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
    body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
  });

  return (
    <section className="relative bg-[#04090f] overflow-hidden py-24 md:py-36">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00BFFF]/[0.05] blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#00BFFF]/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Organic circular image */}
          <motion.div
            className="relative flex items-center justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 m-auto w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-[#00BFFF]/10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-0 m-auto w-[280px] h-[280px] md:w-[390px] md:h-[390px] rounded-full border border-[#00BFFF]/[0.06] animate-[spin_28s_linear_infinite_reverse]" />

            {/* Organic feathered image */}
            <div
              className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] overflow-hidden"
              style={{
                borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                WebkitMaskImage:
                  "radial-gradient(ellipse 82% 82% at 50% 50%, black 35%, rgba(0,0,0,0.7) 58%, rgba(0,0,0,0.2) 72%, transparent 88%)",
                maskImage:
                  "radial-gradient(ellipse 82% 82% at 50% 50%, black 35%, rgba(0,0,0,0.7) 58%, rgba(0,0,0,0.2) 72%, transparent 88%)",
              }}
            >
              <img
                src="/assets/redefining-luxury.jpg"
                alt="Luxury Waterfront Estate"
                className="w-full h-full object-cover scale-110"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute bottom-6 right-4 md:bottom-10 md:right-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-[#04090f]/80 backdrop-blur-xl border border-[#00BFFF]/25 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,191,255,0.12)]">
                <p className="text-[8px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold mb-1">Luxury Living</p>
                <p className="text-white font-serif text-sm italic leading-snug">"Where luxury meets legacy."</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Text content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                {content.eyebrow}
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-serif leading-[0.9] tracking-tight mb-8">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white font-light">
                {content.title}
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-[#00BFFF] font-light italic">
                {content.title_accent}
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white/60 font-light">
                {content.subtitle}
              </span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-[#00BFFF] to-transparent mb-8" />

            {/* Body */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-5">
              {content.body}
            </p>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mb-10">
              {content.body_secondary}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {["Architectural Excellence", "Cinematic Storytelling", "Elite Lifestyle", "3D Environments"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[#00BFFF]/20 text-[11px] uppercase tracking-[0.3em] text-white/50 hover:border-[#00BFFF]/50 hover:text-white/80 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
