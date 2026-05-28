import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useCollection } from "@/hooks/useCollections";
import { usePageContent } from "@/hooks/usePageContent";

type GalleryItem = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: GalleryItem[] = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hotel-lobby-interior-600x800-WG01Uupa8UG10aj2s5VawHF395TK7I.jpg", alt: "Hero - Garden Lounge" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/businessman-explaining-concept-details-600x800-FO11bTBNHjI3eH951WwQGcREnhqjLc.jpg", alt: "Top Left - Business Discussion" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aerial-photography-chinese-city-600x800-SyCb3lRsuGnO000Bxr88b6YhZpNVPY.jpg", alt: "Bottom Left - Aerial City View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close-up-hand-holding-cash-600x800-CcjTC5pecDnrWOJwP8R1D4tz81kdm0.jpg", alt: "Top Right - Property Investment" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hotel-lobby-interior-600x800-WG01Uupa8UG10aj2s5VawHF395TK7I.jpg", alt: "Bottom Right - Garden Space" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: remoteImages } = useCollection<GalleryItem>("gallery", { order: "order_index" });
  const displayImages = remoteImages?.length && remoteImages.length >= 5 ? remoteImages : DEFAULT_IMAGES;
  const gridImages = displayImages.slice(0, 5);

  const c = usePageContent("home.gallery", {
    heading: "SPACES WHERE LIFE",
    heading_accent: "Unfolds",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const heroWidth = useTransform(smoothProgress, [0, 1], ["100vw", "35%"]);
  const heroHeight = useTransform(smoothProgress, [0, 1], ["100vh", "75%"]);
  const heroRadius = useTransform(smoothProgress, [0, 1], ["0px", "6px"]);

  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  const cornerOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);

  const tlX = useTransform(smoothProgress, [0, 1], ["-50vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 1], ["-50vh", "0vh"]);
  const tlRotate = useTransform(smoothProgress, [0, 1], [-10, 0]);

  const blX = useTransform(smoothProgress, [0, 1], ["-50vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 1], ["50vh", "0vh"]);
  const blRotate = useTransform(smoothProgress, [0, 1], [-10, 0]);

  const trX = useTransform(smoothProgress, [0, 1], ["50vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 1], ["-50vh", "0vh"]);
  const trRotate = useTransform(smoothProgress, [0, 1], [10, 0]);

  const brX = useTransform(smoothProgress, [0, 1], ["50vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 1], ["50vh", "0vh"]);
  const brRotate = useTransform(smoothProgress, [0, 1], [10, 0]);

  if (gridImages.length < 5) return null;

  const heading = c.heading || "SPACES WHERE LIFE";
  const headingAccent = c.heading_accent || "Unfolds";

  return (
    <section id="gallery-section" className="relative bg-[#04090f] w-full select-none">
      <div ref={containerRef} className="h-[120vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04090f]">
          <div className="relative w-full max-w-[1400px] h-[85vh] mx-auto top-1/2 -translate-y-1/2 flex items-center justify-center">

            <motion.div
              style={{ x: tlX, y: tlY, rotate: tlRotate, opacity: cornerOpacity }}
              className="absolute top-[5%] left-[5%] w-[25%] h-[40%] rounded-md overflow-hidden shadow-lg"
            >
              <img src={gridImages[1].src} alt={gridImages[1].alt} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              style={{ x: blX, y: blY, rotate: blRotate, opacity: cornerOpacity }}
              className="absolute bottom-[5%] left-[10%] w-[22%] h-[35%] rounded-md overflow-hidden shadow-lg"
            >
              <img src={gridImages[2].src} alt={gridImages[2].alt} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              style={{ x: trX, y: trY, rotate: trRotate, opacity: cornerOpacity }}
              className="absolute top-[10%] right-[10%] w-[22%] h-[35%] rounded-md overflow-hidden shadow-lg"
            >
              <img src={gridImages[3].src} alt={gridImages[3].alt} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              style={{ x: brX, y: brY, rotate: brRotate, opacity: cornerOpacity }}
              className="absolute bottom-[5%] right-[5%] w-[25%] h-[40%] rounded-md overflow-hidden shadow-lg"
            >
              <img src={gridImages[4].src} alt={gridImages[4].alt} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              style={{
                width: heroWidth,
                height: heroHeight,
                borderRadius: heroRadius,
              }}
              className="absolute z-10 overflow-hidden shadow-2xl bg-[#04090f] flex items-center justify-center origin-center"
            >
              <img src={gridImages[0].src} alt={gridImages[0].alt} className="w-full h-full object-cover object-center absolute inset-0" />

              <motion.div
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 z-20 pointer-events-none"
              >
                <h1
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-center"
                >
                  {heading} <br />
                  <span className="italic font-normal">{headingAccent}</span>
                </h1>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
