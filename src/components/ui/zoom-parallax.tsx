import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Smoother spring config for premium feel
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };

  // Create smooth spring-based transforms for each scale level
  const rawScale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const rawScale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const rawScale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const rawScale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const rawScale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Apply spring smoothing for buttery animations
  const scale4 = useSpring(rawScale4, springConfig);
  const scale5 = useSpring(rawScale5, springConfig);
  const scale6 = useSpring(rawScale6, springConfig);
  const scale8 = useSpring(rawScale8, springConfig);
  const scale9 = useSpring(rawScale9, springConfig);

  // Opacity transforms for fade-in effect
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0.3, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 0.2, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 0.1, 0]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
  const opacities = [opacity1, opacity2, opacity3, opacity2, opacity3, opacity2, opacity3];

  const limited = images.slice(0, 7);

  // Image position configurations with improved layout
  const imageConfigs = [
    { className: "" }, // Center main image
    { className: "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]" },
    { className: "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]" },
    { className: "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]" },
    { className: "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" },
    { className: "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" },
    { className: "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[25vh] [&>div]:!w-[15vw]" },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {limited.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const opacity = opacities[index % opacities.length];
          const config = imageConfigs[index];

          return (
            <motion.div
              key={index}
              style={{ 
                scale,
                willChange: "transform",
              }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${config.className}`}
            >
              <motion.div 
                className="relative h-[25vh] w-[25vw] overflow-hidden rounded-lg"
                style={{ opacity }}
              >
                {/* Premium border glow effect */}
                <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-br from-[#00BFFF]/20 via-transparent to-[#004aad]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Gallery image ${index + 1}`}
                  className="h-full w-full object-cover transition-all duration-1000 ease-out"
                  style={{
                    filter: "brightness(0.85) saturate(1.1)",
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Premium vignette effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Ambient light effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#00BFFF]/[0.03] rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  );
}
