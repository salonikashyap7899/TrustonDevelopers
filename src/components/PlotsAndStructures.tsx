import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

export function PlotsAndStructures() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 bg-background overflow-hidden"
    >
      <Section3DBackground opacity={0.2} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
            Building <em className="text-luxe-cyan italic">Plots & Structures</em>
          </h2>
        </Reveal>

        <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
          <Reveal delay={0.2}>
            <p className="max-w-2xl mx-auto">
              Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow's most promising corridors, offering 100% legal clearance and Jila Panchayat approval.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex justify-center gap-16 pt-8">
              <div className="border-l border-luxe-cyan/30 pl-6 text-left">
                <p className="text-3xl font-display text-white mb-2">150+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Premium Plots</p>
              </div>
              <div className="border-l border-luxe-cyan/30 pl-6 text-left">
                <p className="text-3xl font-display text-white mb-2">Elite</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Architectural Support</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
