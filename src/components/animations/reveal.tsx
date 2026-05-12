"use client";

import * as React from "react";
import { motion, useInView, type Variant, type Transition } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealVariant  = "fade" | "slide" | "scale" | "blur" | "clip" | "rotate";

interface RevealProps {
  children: React.ReactNode;
  className?: string;

  /** Animation preset */
  variant?: RevealVariant;
  /** Slide direction (used with "slide" variant) */
  direction?: RevealDirection;

  /** Distance in px for slide/clip travel */
  distance?: number;
  /** Framer Motion transition overrides */
  transition?: Transition;
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Duration of the animation (seconds) */
  duration?: number;

  /**
   * How much of the element must be visible before triggering.
   * 0 = any pixel, 1 = fully visible.
   */
  threshold?: number;
  /**
   * Root margin passed to IntersectionObserver (e.g. "-100px 0px").
   * Negative values trigger the reveal later (element deeper in view).
   */
  margin?: string;

  /** Re-animate every time the element enters the viewport */
  repeat?: boolean;

  /** Render as a different HTML tag */
  as?: React.ElementType;
}

/** Used in StaggerReveal to inject per-child delay */
interface RevealItemProps extends RevealProps {
  /** injected by StaggerReveal — do not set manually */
  _staggerDelay?: number;
}

// ─── Preset Builder ───────────────────────────────────────────────────────────

function buildVariants(
  variant: RevealVariant,
  direction: RevealDirection,
  distance: number,
): { hidden: Variant; visible: Variant } {
  const axis =
    direction === "left" || direction === "right" ? "x" : "y";
  const sign =
    direction === "down" || direction === "right" ? -1 : 1;
  const offset = sign * distance;

  switch (variant) {
    case "slide":
      return {
        hidden:  { opacity: 0, [axis]: offset },
        visible: { opacity: 1, [axis]: 0 },
      };

    case "scale":
      return {
        hidden:  { opacity: 0, scale: 0.88 },
        visible: { opacity: 1, scale: 1 },
      };

    case "blur":
      return {
        hidden:  { opacity: 0, filter: "blur(12px)", y: distance * 0.5 },
        visible: { opacity: 1, filter: "blur(0px)",  y: 0 },
      };

    case "clip":
      // Clip-path reveal — elegant curtain wipe
      return {
        hidden: {
          opacity: 1,
          clipPath:
            direction === "left"  ? "inset(0 100% 0 0)" :
            direction === "right" ? "inset(0 0 0 100%)" :
            direction === "down"  ? "inset(100% 0 0 0)" :
                                    "inset(0 0 100% 0)",
        },
        visible: {
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
        },
      };

    case "rotate":
      return {
        hidden:  { opacity: 0, rotate: direction === "right" ? -8 : 8, y: distance * 0.6 },
        visible: { opacity: 1, rotate: 0, y: 0 },
      };

    case "fade":
    default:
      return {
        hidden:  { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
}

// ─── Core Reveal ──────────────────────────────────────────────────────────────

export function Reveal({
  children,
  className,
  variant    = "slide",
  direction  = "up",
  distance   = 32,
  delay      = 0,
  duration   = 0.65,
  threshold  = 0.15,
  margin     = "0px",
  repeat     = true,
  as         = "div",
  transition,
  _staggerDelay = 0,
}: RevealItemProps) {
  const ref = React.useRef<HTMLElement>(null);

  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | undefined,
    once: !repeat,
  });

  const variants = React.useMemo(
    () => buildVariants(variant, direction, distance),
    [variant, direction, distance],
  );

  const resolvedTransition: Transition = {
    duration,
    ease: [0.22, 1, 0.36, 1],
    delay: delay + _staggerDelay,
    ...transition,
  };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={resolvedTransition}
    >
      {children}
    </MotionTag>
  );
}

// ─── Stagger Reveal (wraps multiple children with incremental delays) ──────────

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's reveal */
  stagger?: number;
  /** Base delay before the first child animates */
  delay?: number;
  /** Passed through to every child Reveal */
  variant?: RevealVariant;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  repeat?: boolean;
  as?: React.ElementType;
  itemAs?: React.ElementType;
}

export function StaggerReveal({
  children,
  className,
  stagger    = 0.1,
  delay      = 0,
  variant    = "slide",
  direction  = "up",
  distance   = 28,
  duration   = 0.6,
  threshold  = 0.1,
  margin     = "0px",
  repeat     = true,
  as         = "div",
  itemAs     = "div",
}: StaggerRevealProps) {
  const items = React.Children.toArray(children);
  const Tag   = as as React.ElementType;

  return (
    <Tag className={className}>
      {items.map((child, i) => (
        <Reveal
          key={i}
          variant={variant}
          direction={direction}
          distance={distance}
          duration={duration}
          delay={delay}
          threshold={threshold}
          margin={margin}
          repeat={repeat}
          as={itemAs}
          _staggerDelay={i * stagger}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}

// ─── Text Reveal (word-by-word) ───────────────────────────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  /** Per-word delay increment */
  stagger?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  repeat?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  stagger   = 0.045,
  delay     = 0,
  duration  = 0.55,
  threshold = 0.2,
  margin    = "0px",
  repeat    = true,
  as        = "p",
}: TextRevealProps) {
  const ref  = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | undefined,
    once: !repeat,
  });

  const words = text.split(" ");
  const Tag   = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {/* Space between words */}
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}

// ─── Line Reveal (decorative hr/divider) ─────────────────────────────────────

interface LineRevealProps {
  className?: string;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  repeat?: boolean;
}

export function LineReveal({
  className,
  direction = "left",
  delay     = 0,
  duration  = 0.7,
  threshold = 0.3,
  margin    = "0px",
  repeat    = true,
}: LineRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | undefined,
    once: !repeat,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="h-full w-full bg-current"
        style={{ originX: direction === "left" ? 0 : 1 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      />
    </div>
  );
}

// ─── Image Reveal (clip-path curtain over Next Image wrapper) ─────────────────

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  /**
   * repeat=false (default for images) — once revealed, stays visible.
   * Set to true only if you want the curtain to re-close on scroll-out.
   */
  repeat?: boolean;
}

export function ImageReveal({
  children,
  className,
  direction = "up",
  delay     = 0,
  duration  = 1.0,
  threshold = 0.15,
  margin    = "0px",
  repeat    = false,           // ← images stay revealed after first trigger
}: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // once: true  → fires once and never re-hides  (repeat=false)
  // once: false → re-hides when element leaves    (repeat=true)
  const isInView = useInView(ref, {
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | undefined,
    once: !repeat,
  });

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const hiddenOffset =
    direction === "left" ? "-100%" :
    direction === "right" ? "100%" :
    direction === "down" ? "-100%" :
    "100%";
  const counterOffset =
    direction === "left" ? "100%" :
    direction === "right" ? "-100%" :
    direction === "down" ? "100%" :
    "-100%";
  const hiddenMask = { [axis]: hiddenOffset } as Record<"x" | "y", string>;
  const hiddenContent = { [axis]: counterOffset } as Record<"x" | "y", string>;
  const visibleState = { [axis]: "0%" } as Record<"x" | "y", string>;

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`.trim()}
    >
      <motion.div
        className="size-full"
        initial={hiddenMask}
        animate={isInView ? visibleState : hiddenMask}
        transition={{
          duration,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
      >
        <motion.div
          className="size-full"
          initial={hiddenContent}
          animate={isInView ? visibleState : hiddenContent}
          transition={{
            duration,
            ease: [0.76, 0, 0.24, 1],
            delay,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
