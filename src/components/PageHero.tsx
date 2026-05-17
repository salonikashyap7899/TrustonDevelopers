import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { LazyVideo, type VideoSource } from "./LazyVideo";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.2, delay: i * 0.18, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  poster: string;
  videoSources?: VideoSource[];
  alt: string;
  children?: ReactNode;
  /** Height: 'full' (100vh) for landing, 'short' (60vh) for inner pages */
  height?: "full" | "short";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  poster,
  videoSources,
  alt,
  children,
  height = "short",
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${
        height === "full" ? "h-screen min-h-[720px]" : "h-[80vh] min-h-[560px]"
      }`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <LazyVideo
          sources={videoSources}
          poster={poster}
          alt={alt}
          className="w-full h-full"
          mediaClassName="ken-burns"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "var(--gradient-cream-fade)" }} />

      <motion.div
        style={{ opacity }}
        className={`relative z-10 h-full flex flex-col px-6 md:px-16 max-w-7xl mx-auto ${
          height === "full" ? "justify-end pb-24" : "justify-end pb-20 pt-32"
        }`}
      >
        {eyebrow && (
          <motion.p
            initial="hidden" animate="show" custom={0} variants={fadeUp}
            className="text-bronze text-[11px] uppercase tracking-luxe mb-6 flex items-center gap-3"
          >
            <span className="divider-bronze" /> {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial="hidden" animate="show" custom={1} variants={fadeUp}
          className={`font-display text-cream leading-[0.95] tracking-tight ${
            height === "full"
              ? "text-[14vw] md:text-[8vw]"
              : "text-6xl md:text-8xl"
          }`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial="hidden" animate="show" custom={2} variants={fadeUp}
            className="text-cream/85 mt-8 max-w-2xl text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial="hidden" animate="show" custom={3} variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
