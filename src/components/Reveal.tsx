import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "blur-in";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  variant?: RevealVariant;
  once?: boolean;
}

/**
 * Scroll reveal built on IntersectionObserver + CSS transitions.
 *
 * Content is visible by default so the server-rendered HTML paints
 * immediately (and stays readable without JS). Only elements that are still
 * below the fold when React mounts are hidden and then revealed on scroll.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "visible">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    // Already on screen (or above it)? Keep it visible, no animation.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          if (once) observer.disconnect();
        } else if (!once) {
          setState("hidden");
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const animationClass =
    state === "static"
      ? ""
      : state === "hidden"
        ? `reveal-hidden reveal-${variant}`
        : `reveal-visible reveal-${variant}`;

  return (
    <div
      ref={ref}
      className={`reveal ${animationClass} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
