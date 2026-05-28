import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useCollection } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type GalleryItem = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: GalleryItem[] = [
  { src: "/assets/building-plots.jpg",       alt: "Prime Estate — Aerial Night View" },
  { src: "/assets/gallery/prime-club.jpg",   alt: "Prime Estate Club House" },
  { src: "/assets/gallery/prime-road.jpg",   alt: "Prime Estate Internal Roads" },
  { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Estate Boulevard" },
  { src: "/assets/gallery/prime-street.jpg", alt: "Prime Estate Street at Sunset" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: remoteImages } = useCollection<GalleryItem>("gallery", { order: "order_index" });
  const displayImages = remoteImages?.length && remoteImages.length >= 5 ? remoteImages : DEFAULT_IMAGES;
  const gridImages = displayImages.slice(0, 5);

  const c = usePageContent("home.gallery", {
    heading: "LIVING LEGACIES",
    heading_accent: "In Stone & Light",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const heroWidth  = useTransform(smoothProgress, [0, 0.85], ["100vw", "36%"]);
  const heroHeight = useTransform(smoothProgress, [0, 0.85], ["100vh", "72%"]);
  const heroRadius = useTransform(smoothProgress, [0, 0.85], ["0px", "8px"]);

  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const textY       = useTransform(smoothProgress, [0, 0.4], [0, -30]);

  const cornerOpacity = useTransform(smoothProgress, [0.05, 0.35], [0, 1]);

  const tlX = useTransform(smoothProgress, [0, 0.85], ["-55vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 0.85], ["-55vh", "0vh"]);

  const blX = useTransform(smoothProgress, [0, 0.85], ["-55vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 0.85], ["55vh",  "0vh"]);

  const trX = useTransform(smoothProgress, [0, 0.85], ["55vw",  "0vw"]);
  const trY = useTransform(smoothProgress, [0, 0.85], ["-55vh", "0vh"]);

  const brX = useTransform(smoothProgress, [0, 0.85], ["55vw",  "0vw"]);
  const brY = useTransform(smoothProgress, [0, 0.85], ["55vh",  "0vh"]);

  if (gridImages.length < 5) return null;

  return (
    <section id="gallery-section" className="relative bg-[#04090f] w-full select-none">
      <div ref={containerRef} className="h-[280vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04090f]">
          <div className="relative w-full max-w-[1400px] h-[88vh] mx-auto top-1/2 -translate-y-1/2 flex items-center justify-center">

            {/* Top-left */}
            <motion.div
              style={{ x: tlX, y: tlY, opacity: cornerOpacity }}
              className="absolute top-[4%] left-[4%] w-[26%] h-[42%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={gridImages[1].src} alt={gridImages[1].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              style={{ x: blX, y: blY, opacity: cornerOpacity }}
              className="absolute bottom-[4%] left-[8%] w-[23%] h-[38%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={gridImages[2].src} alt={gridImages[2].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20" />
            </motion.div>

            {/* Top-right */}
            <motion.div
              style={{ x: trX, y: trY, opacity: cornerOpacity }}
              className="absolute top-[8%] right-[8%] w-[23%] h-[38%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={gridImages[3].src} alt={gridImages[3].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              style={{ x: brX, y: brY, opacity: cornerOpacity }}
              className="absolute bottom-[4%] right-[4%] w-[26%] h-[42%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={gridImages[4].src} alt={gridImages[4].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20" />
            </motion.div>

            {/* Hero — centre */}
            <motion.div
              style={{ width: heroWidth, height: heroHeight, borderRadius: heroRadius }}
              className="absolute z-10 overflow-hidden shadow-2xl bg-[#04090f] flex items-center justify-center origin-center"
            >
              <img
                src={gridImages[0].src}
                alt={gridImages[0].alt}
                className="w-full h-full object-cover object-center absolute inset-0"
              />

              {/* Text overlay */}
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-center text-white p-4 z-20 pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold mb-4">
                  Prime Estate · Lucknow
                </p>
                <h1
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-center"
                >
                  {c.heading || "LIVING LEGACIES"} <br />
                  <span className="italic font-normal text-[#00BFFF]">
                    {c.heading_accent || "In Stone & Light"}
                  </span>
                </h1>
                <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.35em]">
                  Scroll to explore
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
