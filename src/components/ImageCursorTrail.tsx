import { useRef, useCallback, type ReactNode } from "react";

const TRAIL_IMAGES = [
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg",
];

interface ImageCursorTrailProps {
  children: ReactNode;
  className?: string;
}

export function ImageCursorTrail({ children, className = "" }: ImageCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const globalIndexRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist < window.innerWidth / 25) return;

    lastPos.current = { x: e.clientX, y: e.clientY };

    const total = imgRefs.current.length;
    const idx = globalIndexRef.current % total;
    const tailIdx = (globalIndexRef.current - 5 + total) % total;

    const lead = imgRefs.current[idx];
    const tail = imgRefs.current[tailIdx];

    if (lead) {
      lead.style.left = `${e.clientX - rect.left}px`;
      lead.style.top = `${e.clientY - rect.top}px`;
      lead.dataset.status = "active";
      setTimeout(() => {
        if (lead) lead.dataset.status = "inactive";
      }, 1200);
    }
    if (tail && tail !== lead) {
      tail.dataset.status = "inactive";
    }

    globalIndexRef.current++;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-none ${className}`}
      onMouseMove={handleMouseMove}
    >
      {TRAIL_IMAGES.map((src, i) => (
        <img
          key={i}
          ref={(el) => { imgRefs.current[i] = el; }}
          src={src}
          alt=""
          data-status="inactive"
          aria-hidden="true"
          className="pointer-events-none absolute z-20 w-36 h-44 object-cover rounded-2xl -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 transition-all duration-500 ease-out data-[status=active]:opacity-100 data-[status=active]:scale-100 border border-white/10 shadow-2xl"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      ))}
      {children}
    </div>
  );
}
