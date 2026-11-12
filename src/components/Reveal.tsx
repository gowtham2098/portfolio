import { type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

interface VariantConfig {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
}

const variantConfigs: Record<RevealVariant, VariantConfig> = {
  "fade-up": { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  "fade-in": { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "slide-left": {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
  },
  "scale-in": {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -60px 0px",
    amount: 0.1,
  });
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const config = variantConfigs[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={config.initial}
      animate={isInView ? config.animate : config.initial}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
