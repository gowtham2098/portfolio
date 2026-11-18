import { useEffect, useRef } from "react";

/**
 * Pointer-tracked glow for a section backdrop.
 *
 * Attach `sectionRef` to the section that should track the pointer and
 * `spotRef` to the decorative layer that follows it. The pointer position is
 * written straight to CSS custom properties so the layer only ever translates:
 * no re-renders, no layout, no repaint.
 *
 * Mouse-only (touch never arms it) and skipped entirely when the visitor asks
 * for reduced motion.
 */
export function useHeroSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      spot.style.setProperty("--spot-x", `${x}px`);
      spot.style.setProperty("--spot-y", `${y}px`);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      spot.dataset.active = "true";
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const handleLeave = () => {
      spot.dataset.active = "false";
    };

    section.addEventListener("pointermove", handleMove, { passive: true });
    section.addEventListener("pointerleave", handleLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return { sectionRef, spotRef };
}
