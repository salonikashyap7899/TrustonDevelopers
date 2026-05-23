"use client";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function WhoWeAre() {
  return (
    <div className="flex flex-col overflow-hidden bg-transparent">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-luxe-cyan mb-3 md:mb-4">
              The TrustOn Legacy
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-3 md:mb-4">
              Who <em className="text-luxe-cyan italic">We Are</em>
            </h1>
            <p className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light px-4">
              Building tomorrow&apos;s landmarks with integrity, innovation, and unwavering commitment to excellence.
            </p>
          </>
        }
      >
        {/* Card Content - Who We Are Details */}
        <div className="h-full w-full bg-[#0a0f14] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Item 1 */}
            <div className="relative group">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white/5 absolute -top-1 md:-top-2 -left-1 md:-left-2 select-none group-hover:text-luxe-cyan/10 transition-colors duration-300">
                01
              </span>
              <div className="relative z-10 pt-6 md:pt-8 border-t border-white/10 group-hover:border-luxe-cyan/30 transition-colors duration-300">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-white mb-2 md:mb-4 tracking-wide">
                  Our Heritage
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-light">
                  Founded on principles of integrity and architectural excellence, TrustOn has been at the forefront of luxury real estate for over a decade.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative group">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white/5 absolute -top-1 md:-top-2 -left-1 md:-left-2 select-none group-hover:text-luxe-cyan/10 transition-colors duration-300">
                02
              </span>
              <div className="relative z-10 pt-6 md:pt-8 border-t border-white/10 group-hover:border-luxe-cyan/30 transition-colors duration-300">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-white mb-2 md:mb-4 tracking-wide">
                  Our Vision
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-light">
                  We redefine premium living by blending futuristic technology with timeless design, creating spaces that inspire and endure.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative group">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white/5 absolute -top-1 md:-top-2 -left-1 md:-left-2 select-none group-hover:text-luxe-cyan/10 transition-colors duration-300">
                03
              </span>
              <div className="relative z-10 pt-6 md:pt-8 border-t border-white/10 group-hover:border-luxe-cyan/30 transition-colors duration-300">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-white mb-2 md:mb-4 tracking-wide">
                  Our Commitment
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-light">
                  Every plot we sell is a testament to our commitment to quality, transparency, and long-term investor success.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-6 md:mt-10 lg:mt-12 flex justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 pt-6 md:pt-8 border-t border-white/5">
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-luxe-cyan">10+</p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mt-1 md:mt-2">Years Legacy</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-luxe-cyan">150+</p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mt-1 md:mt-2">Premium Plots</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-luxe-cyan">100%</p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mt-1 md:mt-2">Transparency</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
