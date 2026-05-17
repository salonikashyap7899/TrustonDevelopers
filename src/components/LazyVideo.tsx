import { useEffect, useRef, useState } from "react";

export type VideoSource = { src: string; type?: string; media?: string };

interface LazyVideoProps {
  /** Optional video sources (mp4/webm). If empty, only the poster is rendered. */
  sources?: VideoSource[];
  /** Poster / fallback image — always rendered first, kept as a stand-in if video fails. */
  poster: string;
  alt: string;
  className?: string;
  /** Class on the inner <video>/<img> element. */
  mediaClassName?: string;
  /** Kicks in autoplay + load only when this fraction of the element is visible. */
  threshold?: number;
}

/**
 * Optimized cinematic background media.
 * - Renders the poster image immediately (instant LCP, native lazy loading off-screen)
 * - Defers video load until the element is in the viewport (IntersectionObserver)
 * - Skips video entirely on Save-Data, reduced-motion, or slow connections
 * - Supports multiple <source> variants (webm + mp4, and per-media art-direction)
 * - Gracefully falls back to the poster on error or when no sources are provided
 */
export function LazyVideo({
  sources = [],
  poster,
  alt,
  className = "",
  mediaClassName = "",
  threshold = 0.15,
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Decide if we should attempt video at all
  const allowVideo = (() => {
    if (typeof window === "undefined") return false;
    if (sources.length === 0) return false;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData) return false;
    if (
      nav.connection?.effectiveType &&
      ["slow-2g", "2g"].includes(nav.connection.effectiveType)
    )
      return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  })();

  useEffect(() => {
    if (!allowVideo) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [allowVideo, threshold]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* Poster is always present — instant fallback, stays under the video */}
      <img
        src={poster}
        alt={alt}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoReady ? "opacity-0" : "opacity-100"
        } ${mediaClassName}`}
      />
      {allowVideo && shouldLoad && !videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          } ${mediaClassName}`}
        >
          {sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      )}
    </div>
  );
}
