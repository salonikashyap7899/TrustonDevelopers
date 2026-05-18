import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 1.4, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-bronze text-[11px] uppercase tracking-luxe flex items-center gap-3 justify-center mb-5">
      <span className="divider-bronze" /> {children} <span className="divider-bronze" />
    </p>
  );
}
