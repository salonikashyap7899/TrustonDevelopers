import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function ScrollProgressBar() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (isMobile) return null;

  return (
    <motion.div
      className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-[10000] origin-left"
      style={{
        scaleX,
        background: "var(--gradient-luxe)",
        boxShadow: "0 0 10px var(--luxe-blue)",
      }}
    />
  );
}
