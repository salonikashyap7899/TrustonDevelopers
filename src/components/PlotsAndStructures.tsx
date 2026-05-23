import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

function CssBuildingScene() {
  const buildings = [
    { h: "60%", w: 14, x: 20, delay: 0, accent: false },
    { h: "85%", w: 18, x: 38, delay: 0.1, accent: true },
    { h: "100%", w: 22, x: 62, delay: 0.2, accent: false },
    { h: "70%", w: 16, x: 88, delay: 0.15, accent: false },
    { h: "45%", w: 12, x: 108, delay: 0.25, accent: true },
    { h: "90%", w: 20, x: 130, delay: 0.05, accent: false },
    { h: "55%", w: 14, x: 154, delay: 0.3, accent: false },
  ];

  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden rounded-2xl border border-white/5"
      style={{ background: "linear-gradient(180deg, #050b12 0%, #0a1a2a 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(0,191,255,0.12) 0%, transparent 70%)" }}
      />

      {/* Grid lines on ground */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00BFFF]/20" />
      <div className="absolute bottom-8 left-0 right-0 h-px bg-white/5" />

      {/* Buildings */}
      <div className="relative flex items-end gap-0 h-[85%] px-8 pb-0">
        {buildings.map((b, i) => (
          <motion.div
            key={i}
            className="relative shrink-0 rounded-t-sm"
            style={{ width: b.w, height: b.h, marginLeft: i === 0 ? 0 : 6 }}
            initial={{ scaleY: 0, originY: 1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: b.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Building body */}
            <div
              className="w-full h-full rounded-t-sm"
              style={{
                background: b.accent
                  ? "linear-gradient(180deg, #003a5c 0%, #001a2e 100%)"
                  : "linear-gradient(180deg, #0a1e2f 0%, #040d14 100%)",
                border: b.accent ? "1px solid rgba(0,191,255,0.3)" : "1px solid rgba(255,255,255,0.05)",
                borderBottom: "none",
                boxShadow: b.accent ? "0 0 20px rgba(0,191,255,0.1)" : "none",
              }}
            >
              {/* Window lights */}
              <div className="flex flex-col gap-1 p-1 h-full">
                {Array.from({ length: Math.floor(parseInt(b.h) / 15) }).map((_, r) => (
                  <div key={r} className="flex gap-[2px] justify-center">
                    {Array.from({ length: Math.floor(b.w / 5) }).map((_, c) => (
                      <motion.div
                        key={c}
                        className="rounded-sm"
                        style={{
                          width: 2,
                          height: 3,
                          background: Math.random() > 0.4
                            ? (b.accent ? "rgba(0,191,255,0.7)" : "rgba(255,255,255,0.25)")
                            : "transparent",
                        }}
                        animate={{ opacity: [1, Math.random() > 0.8 ? 0.3 : 1, 1] }}
                        transition={{
                          duration: 2 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Antenna on tallest */}
            {b.accent && i === 1 && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-px bg-[#00BFFF]/60"
                style={{ height: 16 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Cyan grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,191,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Label */}
      <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-[#00BFFF]/40 font-bold">
        Prime Estate · Lucknow
      </div>
    </div>
  );
}

export function PlotsAndStructures() {
  return (
    <section className="relative py-32 px-6 bg-background overflow-hidden">
      <Section3DBackground opacity={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
                Building <em className="text-luxe-cyan italic">Plots & Structures</em>
              </h2>
            </Reveal>

            <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>
                  Discover the ultimate foundation for your architectural dreams. Our premium building
                  plots are strategically located in Lucknow&apos;s most promising corridors, offering
                  100% legal clearance and Jila Panchayat approval.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-12 pt-8">
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">150+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Premium Plots</p>
                  </div>
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">Elite</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Architectural Support</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Visual Side — pure CSS building scene */}
          <div className="order-1 lg:order-2 h-[380px] md:h-[460px] relative">
            <CssBuildingScene />
          </div>
        </div>
      </div>
    </section>
  );
}
