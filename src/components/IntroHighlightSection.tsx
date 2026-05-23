import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

export function IntroHighlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-16 md:py-24 px-4 md:px-6 overflow-hidden bg-background"
    >
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-luxe-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-luxe-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Visual Side */}
          <motion.div style={{ y: y1 }} className="relative aspect-[4/5] lg:aspect-square">
            <div className="absolute inset-0 border border-white/10 rounded-2xl md:rounded-3xl transform rotate-2 scale-105" />
            <div className="absolute inset-0 border border-luxe-cyan/20 rounded-2xl md:rounded-3xl transform -rotate-2 scale-105" />
            <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
                alt="Visionary Architecture"
                loading="lazy"
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating Detail Card */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-6 md:-bottom-12 -right-2 md:-right-12 bg-ink/90 backdrop-blur-md p-6 md:p-10 rounded-2xl md:rounded-3xl max-w-[200px] md:max-w-xs shadow-2xl border border-white/10"
            >
              <div className="text-luxe-cyan text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4 font-bold">
                Innovation
              </div>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light">
                Pioneering futuristic living through architectural mastery and sustainable
                development.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="space-y-8 md:space-y-12">
            <Reveal>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="w-8 md:w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                  New Generation
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter">
                Redefining <br />
                <span className="text-luxe-cyan italic font-serif">Luxury</span> Real Estate
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-4 md:space-y-6 text-white/50 text-base md:text-lg lg:text-xl font-light leading-relaxed">
                <p>
                  Welcome to the era of TrustOn, where we blend cinematic storytelling with
                  architectural excellence. Our mission is to create billion-dollar luxury
                  experiences that transcend traditional real estate.
                </p>
                <p className="hidden md:block">
                  From interactive 3D environments to immersive lifestyle offerings, every detail is
                  crafted for the elite.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <button className="btn-magnetic btn-luxe px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs">Discover Our Vision</button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
