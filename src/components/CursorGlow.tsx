import { useEffect, useRef, useState } from "react";

/* ── House SVG icon string (rendered via DOM) ──────────── */
const HOUSE_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>
</svg>`;

const HOUSE_SVG_FILLED = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>
</svg>`;

export function CursorGlow() {
  const iconRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if desktop (no touch, has fine pointer)
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsDesktop(mediaQuery.matches);
    
    if (!mediaQuery.matches) return;

    const icon = iconRef.current;
    const ring = ringRef.current;
    if (!icon || !ring) return;

    let raf = 0;
    let ix = -100, iy = -100;
    let rx = -100, ry = -100;
    let tx = -100, ty = -100;
    let isHovering = false;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 100);
    };

    const setHover = (active: boolean) => {
      if (active === isHovering) return;
      isHovering = active;
      if (active) {
        icon.innerHTML = HOUSE_SVG_FILLED;
        icon.style.color = "var(--luxe-cyan)";
        icon.style.filter = "drop-shadow(0 0 8px var(--luxe-cyan))";
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "var(--luxe-cyan)";
      } else {
        icon.innerHTML = HOUSE_SVG;
        icon.style.color = "var(--luxe-blue)";
        icon.style.filter = "drop-shadow(0 0 4px var(--luxe-blue))";
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(0, 74, 173, 0.4)";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        "a, button, [role='button'], input, select, textarea, label, [data-cursor]",
      );
      setHover(isInteractive);
    };

    const loop = () => {
      // Only update when mouse is moving
      const ease = isMoving ? 0.15 : 0.08;
      rx += (tx - rx) * ease;
      ry += (ty - ry) * ease;

      const iconEase = isMoving ? 0.25 : 0.12;
      ix += (tx - ix) * iconEase;
      iy += (ty - iy) * iconEase;

      const offsetX = -11;
      const offsetY = -11;

      icon.style.transform = `translate3d(${ix + offsetX}px, ${iy + offsetY}px, 0) scale(${isHovering ? 1.3 : 1})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    icon.innerHTML = HOUSE_SVG;
    icon.style.color = "var(--luxe-blue)";
    icon.style.filter = "drop-shadow(0 0 4px var(--luxe-blue))";

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      clearTimeout(moveTimeout);
    };
  }, []);

  // Don't render on mobile/touch devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Lagged ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9989] rounded-full"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          border: "1px solid rgba(0, 74, 173, 0.4)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          willChange: "transform",
        }}
      />
      {/* House icon */}
      <div
        ref={iconRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9990]"
        style={{
          width: 22,
          height: 22,
          transition: "transform 0.15s ease, filter 0.3s, color 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
