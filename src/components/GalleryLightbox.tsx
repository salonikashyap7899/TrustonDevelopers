import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

export interface GalleryItem {
  img: string;
  title: string;
  sub: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({ items, index, onClose, onPrev, onNext }: GalleryLightboxProps) {
  const isOpen = index !== null;
  const item = isOpen ? items[index] : null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          {/* Backdrop blur */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(8,10,20,0.92)", backdropFilter: "blur(12px)" }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 text-xl"
            aria-label="Close gallery"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 z-10 text-[11px] uppercase tracking-widest text-white/30">
            {(index ?? 0) + 1} / {items.length}
          </div>

          {/* Dot pagination */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); /* would need onGoTo */ }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-[var(--bronze)] w-6" : "bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-10 z-10 w-14 h-14 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-300 text-2xl"
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-10 z-10 w-14 h-14 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-300 text-2xl"
            aria-label="Next image"
          >
            →
          </button>

          {/* Main image */}
          <motion.div
            key={`img-${index}`}
            className="relative z-[2] max-w-5xl w-full mx-16"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative overflow-hidden shadow-2xl" style={{ maxHeight: "75vh" }}>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{ maxHeight: "75vh" }}
              />
              {/* Subtle gradient on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Animated scan line */}
              <motion.div
                className="absolute inset-x-0 h-px bg-[var(--bronze)]/30 pointer-events-none"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-5 flex items-end justify-between px-1"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--bronze)] mb-1">
                  TrustOn Prime Estate
                </p>
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <p className="text-white/40 text-sm mt-1 font-serif italic">{item.sub}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-white/20">Use arrows to navigate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Side thumbnail strip */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); /* would need onGoTo */ }}
                className={`w-14 h-14 overflow-hidden transition-all duration-300 ${
                  i === index ? "ring-2 ring-[var(--bronze)] opacity-100" : "opacity-30 hover:opacity-60"
                }`}
              >
                <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
