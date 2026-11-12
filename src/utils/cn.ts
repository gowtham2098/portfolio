import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ── Framer Motion shared presets (use as const for framer-motion TS strictness) ── */

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const blurIn = {
  initial: { opacity: 0, filter: "blur(12px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Smooth hover presets (spring-based, no CSS transition conflict) ── */

export const cardHover = {
  whileHover: {
    y: -6,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  },
  whileTap: {
    scale: 0.985,
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
};

export const cardHoverSubtle = {
  whileHover: {
    y: -3,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  },
};

export const buttonHover = {
  whileHover: {
    y: -2,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
      mass: 0.8,
    },
  },
  whileTap: {
    scale: 0.97,
    y: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
};

export const buttonHoverSolid = {
  whileHover: {
    y: -2,
    scale: 1.03,
    boxShadow: "0 20px 40px -12px rgba(29, 102, 245, 0.35)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
      mass: 0.8,
    },
  },
  whileTap: {
    scale: 0.97,
    y: 0,
    boxShadow: "0 8px 16px -4px rgba(29, 102, 245, 0.2)",
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
};

export const iconPop = {
  whileHover: {
    scale: 1.12,
    y: -2,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
      mass: 0.8,
    },
  },
  whileTap: {
    scale: 0.9,
    transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

export const tagHover = {
  whileHover: {
    y: -1,
    scale: 1.04,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 20,
      mass: 0.6,
    },
  },
  whileTap: {
    scale: 0.96,
    transition: { type: "spring" as const, stiffness: 600, damping: 30 },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};
export const smoothTransition = { duration: 0.3, ease: "easeOut" as const };
