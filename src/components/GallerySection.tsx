import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

const IMAGES = [
  { src: "/assets/building-plots.jpg",          alt: "Prime Estate — Aerial View" },
  { src: "/assets/gallery/prime-club.jpg",      alt: "Prime Club House" },
  { src: "/assets/gallery/prime-road.jpg",      alt: "Prime Roads" },
  { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Boulevard" },
  { src: "/assets/gallery/prime-street.jpg",    alt: "Prime Street" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Ultra-smooth lerp ── */
  const smooth = useMotionValue(0);
  useAnimationFrame(() => {
    const cur = smooth.get();
    const tgt = scrollYProgress.get();
    smooth.set(cur + (tgt - cur) * 0.09);
  });

  /* ── Hero transforms ── */
  const heroW = useTransform(smooth, [0, 0.9], ["100vw", "38%"]);
  const heroH = useTransform(smooth, [0, 0.9], ["100vh",  "62%"]);
  const heroR = useTransform(smooth, [0, 0.9], ["0px",    "16px"]);

  /* ── Overlay text ── */
  const textOp = useTransform(smooth, [0, 0.28], [1, 0]);
  const textY  = useTransform(smooth, [0, 0.28], [0, -32]);

  /* ── Corners: shared ── */
  const cornerOp = useTransform(smooth, [0.05, 0.58], [0, 1]);
  const cornerSc = useTransform(smooth, [0.05, 0.58], [0.8, 1]);

  /* ── Corner travel ── */
  const tlX = useTransform(smooth, [0, 0.9], ["-65vw", "0vw"]);
  const tlY = useTransform(smooth, [0, 0.9], ["-65vh", "0vh"]);
  const blX = useTransform(smooth, [0, 0.9], ["-65vw", "0vw"]);
  const blY = useTransform(smooth, [0, 0.9], [ "65vh", "0vh"]);
  const trX = useTransform(smooth, [0, 0.9], [ "65vw", "0vw"]);
  const trY = useTransform(smooth, [0, 0.9], ["-65vh", "0vh"]);
  const brX = useTransform(smooth, [0, 0.9], [ "65vw", "0vw"]);
  const brY = useTransform(smooth, [0, 0.9], [ "65vh", "0vh"]);

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
    border: "2px solid rgba(0,191,255,0.15)",
  };

  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <section
      id="gallery-section"
      style={{ background: "#04090f", margin: 0, padding: 0 }}
      className="relative w-full select-none"
    >
      {/* 185vh scroll container — animation ends well before exit */}
      <div ref={containerRef} style={{ height: "185vh", position: "relative" }}>
        <div
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#04090f" }}
          className="w-full"
        >
          <div className="relative w-full h-full flex items-center justify-center">

            {/* ── Top-left ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: tlX, y: tlY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "40%",
                top: "4%", left: "2%",
              }}
            >
              <div style={innerStyle}>
                <img src={IMAGES[1].src} alt={IMAGES[1].alt} style={imgStyle} />
              </div>
            </motion.div>

            {/* ── Bottom-left ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: blX, y: blY, opacity: cornerOp, scale: cornerSc,
                width: "21%", height: "35%",
                bottom: "5%", left: "6%",
              }}
            >
              <div style={innerStyle}>
                <img src={IMAGES[2].src} alt={IMAGES[2].alt} style={imgStyle} />
              </div>
            </motion.div>

            {/* ── Top-right ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: trX, y: trY, opacity: cornerOp, scale: cornerSc,
                width: "21%", height: "35%",
                top: "7%", right: "6%",
              }}
            >
              <div style={innerStyle}>
                <img src={IMAGES[3].src} alt={IMAGES[3].alt} style={imgStyle} />
              </div>
            </motion.div>

            {/* ── Bottom-right ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: brX, y: brY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "40%",
                bottom: "4%", right: "2%",
              }}
            >
              <div style={innerStyle}>
                <img src={IMAGES[4].src} alt={IMAGES[4].alt} style={imgStyle} />
              </div>
            </motion.div>

            {/* ── Hero — centre ── */}
            <motion.div
              style={{
                position: "absolute",
                zIndex: 10,
                overflow: "hidden",
                boxShadow: "0 48px 120px rgba(0,0,0,0.9)",
                width: heroW,
                height: heroH,
                borderRadius: heroR,
                border: "2px solid rgba(0,191,255,0.1)",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                <img
                  src={IMAGES[0].src}
                  alt={IMAGES[0].alt}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Dark gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                  }}
                />

                {/* Overlay text — fades as scroll begins */}
                <motion.div
                  style={{
                    opacity: textOp,
                    y: textY,
                    position: "absolute",
                    inset: 0,
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    pointerEvents: "none",
                    paddingBottom: "3.5rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.55em",
                      color: "#00BFFF",
                      fontWeight: 700,
                      marginBottom: "1.1rem",
                    }}
                  >
                    Prime Estate · Lucknow
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.8rem, 4.5vw, 4.2rem)",
                      fontWeight: 300,
                      lineHeight: 1.2,
                      textAlign: "center",
                      color: "#fff",
                      textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                      margin: 0,
                    }}
                  >
                    Living place that
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#00BFFF",
                      }}
                    >
                      becomes your pride
                    </em>
                  </h2>
                  <p
                    style={{
                      marginTop: "1.6rem",
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: "0.45em",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    Scroll to explore
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
