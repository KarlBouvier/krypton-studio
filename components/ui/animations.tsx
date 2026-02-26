"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Variant } from "@/lib/types";
import {
  getScrollInTransition,
  getStepTransition,
  HOVER_SCALE,
  TAP_SCALE,
} from "@/lib/animations";

export interface AnimateOnScrollProps {
  children: React.ReactNode;
  enabled?: boolean;
  variant?: Variant;
  className?: string;
  id?: string;
  as?: "section" | "div";
  once?: boolean;
}

/**
 * Fade-in on scroll. Only animates when animations.enabled and user doesn't prefer reduced motion.
 */
export function AnimateOnScroll({
  children,
  enabled = false,
  variant = "classic",
  className,
  id,
  as: Component = "div",
  once = true,
}: AnimateOnScrollProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = enabled && !reduceMotion;
  const transition = getScrollInTransition(variant);

  if (!shouldAnimate) {
    if (Component === "section") {
      return (
        <section id={id} className={className}>
          {children}
        </section>
      );
    }
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const motionProps = {
    initial: { opacity: 0, y: 12 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once, margin: "-40px" } as const,
    transition,
    id,
    className,
  };

  if (Component === "section") {
    return <motion.section {...motionProps}>{children}</motion.section>;
  }
  return <motion.div {...motionProps}>{children}</motion.div>;
}

export interface ScaleOnHoverProps {
  children: React.ReactNode;
  enabled?: boolean;
  className?: string;
  as?: "div" | "span";
}

/**
 * Slight scale on hover/tap. Lightweight; only when animations.enabled.
 */
export function ScaleOnHover({
  children,
  enabled = false,
  className,
  as: Component = "div",
}: ScaleOnHoverProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = enabled && !reduceMotion;

  if (!shouldAnimate) {
    if (Component === "span") {
      return <span className={className}>{children}</span>;
    }
    return <div className={className}>{children}</div>;
  }

  const motionProps = {
    whileHover: { scale: HOVER_SCALE },
    whileTap: { scale: TAP_SCALE },
    transition: { duration: 0.2, ease: "easeOut" as const },
    className,
  };

  if (Component === "span") {
    return <motion.span {...motionProps}>{children}</motion.span>;
  }
  return <motion.div {...motionProps}>{children}</motion.div>;
}

export interface StepTransitionProps {
  children: React.ReactNode;
  step: number;
  enabled?: boolean;
  variant?: Variant;
  className?: string;
}

/**
 * Wraps step content with enter/exit. Use with AnimatePresence and a stable key (e.g. step).
 */
export function StepTransition({
  children,
  step,
  enabled = false,
  variant = "classic",
  className,
}: StepTransitionProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = enabled && !reduceMotion;
  const transition = getStepTransition(variant);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };
