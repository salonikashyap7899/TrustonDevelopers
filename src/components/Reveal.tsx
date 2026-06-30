import { motion, type Variants, useInView, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Desktop variants — full motion
const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// Mobile variants — lighter: smaller distance, faster, no blur
const mobileVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const mobileSlideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const mobileSlideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  direction,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
}) {
  const isMobile = useIsMobile();

  const desktopV = direction === "left" ? slideLeft : direction === "right" ? slideRight : variants;
  const mobileV = direction === "left" ? mobileSlideLeft : direction === "right" ? mobileSlideRight : mobileVariants;
  const v = isMobile ? mobileV : desktopV;

  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: isMobile ? "-20px" : "-40px" }}
      transition={{ delay: isMobile ? delay * 0.5 : delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] uppercase tracking-luxe flex items-center gap-3 justify-center mb-5 ${light ? "text-white/60" : "text-luxe-cyan font-bold"}`}
    >
      <span className={`inline-block w-10 h-px ${light ? "bg-white/40" : "bg-luxe-cyan"}`} />
      {children}
      <span className={`inline-block w-10 h-px ${light ? "bg-white/40" : "bg-luxe-cyan"}`} />
    </p>
  );
}

export function CountUp({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) count.set(to);
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
