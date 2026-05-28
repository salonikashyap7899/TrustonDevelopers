import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { usePageContent } from "@/hooks/usePageContent";

function CssBuildingScene() {
  return (
    <motion.div
      className="relative w-full h-full rounded-2xl border border-white/5 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="/assets/plots_structures_scene.jpg"
        alt="Prime Estate Building Plot"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}

export function PlotsAndStructures() {
  const c = usePageContent("home.plots_structures", {
    eyebrow: "Strategic Masterpieces",
    title: "Building",
    title_accent: "Plots & Structures",
    body: "Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow's most promising corridors, offering 100% legal clearance and Jila Panchayat approval.",
    stat_1_val: "150+", stat_1_label: "Premium Plots",
    stat_2_val: "Elite", stat_2_label: "Architectural Support",
  });

  return (
    <section className="relative py-32 px-6 bg-[#060c16] overflow-hidden">
      <Section3DBackground opacity={0.15} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionEyebrow>{String(c.eyebrow || "Strategic Masterpieces")}</SectionEyebrow>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
                {String(c.title || "Building")} <em className="text-[#00BFFF] italic">{String(c.title_accent || "Plots & Structures")}</em>
              </h2>
            </Reveal>

            <div className="space-y-8 text-white/60 text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>{String(c.body || "Discover the ultimate foundation for your architectural dreams.")}</p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-12 pt-6">
                  <div className="border-l-2 border-[#00BFFF]/40 pl-6">
                    <p className="text-3xl font-serif text-white mb-1">{String(c.stat_1_val || "150+")}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">{String(c.stat_1_label || "Premium Plots")}</p>
                  </div>
                  <div className="border-l-2 border-[#00BFFF]/40 pl-6">
                    <p className="text-3xl font-serif text-white mb-1">{String(c.stat_2_val || "Elite")}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">{String(c.stat_2_label || "Architectural Support")}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2 h-[380px] md:h-[480px] relative">
            <CssBuildingScene />
          </div>
        </div>
      </div>
    </section>
  );
}
