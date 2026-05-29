import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

export function RedefiningLuxurySection() {
  const content = usePageContent("home.redefining", {
    eyebrow: "Welcome to the Era of TrustOn",
    title: "Modern",
    title_accent: "Living",
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

          {/* LEFT — Circle Grid */}
          <motion.div
            className="relative flex items-center justify-center order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Main Image - Circle 1 */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img src="/assets/redefining-luxury.jpg" className="w-full h-full object-cover" alt="Luxury 1" />
              </div>
              {/* Image 2 - Circle 2 */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img src="/assets/building-render.jpg" className="w-full h-full object-cover" alt="Luxury 2" />
              </div>
              {/* Image 3 - Circle 3 */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 -mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img src="/assets/architecture-design.jpg" className="w-full h-full object-cover" alt="Luxury 3" />
              </div>
              {/* Image 4 - Circle 4 */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img src="/assets/interior-street.jpg" className="w-full h-full object-cover" alt="Luxury 4" />
              </div>
              
              {/* Center Accent Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#00BFFF]/10 backdrop-blur-md border border-[#00BFFF]/40 flex items-center justify-center z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#00BFFF]/60 animate-ping" />
              </div>
            </div>
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
            <h2 className="font-serif leading-tight tracking-tight mb-8">
              <span className="block text-4xl md:text-5xl text-white font-light uppercase tracking-widest">
                {content.title}
              </span>
              <span className="block text-4xl md:text-5xl text-[#00BFFF] font-light italic mt-2">
                {content.title_accent}
              </span>
              <span className="block text-4xl md:text-5xl text-white/40 font-light mt-2">
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
