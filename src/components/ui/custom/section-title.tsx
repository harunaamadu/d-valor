"use client";

import { LineReveal, Reveal, TextReveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionTitleProps {
  /** Small uppercase label above the heading */
  eyebrow?: string;
  /** Main heading text — revealed word-by-word */
  heading: string;
  /** Optional right-side hint text e.g. "View all" or "Drag to explore" */
  hint?: string;
  /** Optional href that wraps the hint text */
  hintHref?: string;
  /** Override heading tag */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Tailwind classes for the heading */
  headingClassName?: string;
  /** Tailwind classes for the outer wrapper */
  className?: string;
  /** Bottom margin before the section content */
  mb?: string;
  /** Stagger delay between heading words */
  stagger?: number;
  /** Base animation delay */
  delay?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionTitle({
  eyebrow,
  heading,
  hint,
  hintHref,
  as = "h2",
  headingClassName,
  className,
  mb = "mb-10 md:mb-14",
  stagger = 0.07,
  delay = 0,
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-end justify-between", mb, className)}>

      {/* ── Left: eyebrow + heading ── */}
      <div className="flex flex-col gap-3">

        {/* Eyebrow row */}
        {eyebrow && (
          <Reveal variant="slide" direction="left" duration={0.55} delay={delay + 0.05}>
            <div className="flex items-center gap-3">
              <LineReveal
                className="w-6 h-px bg-accent"
                direction="left"
                duration={0.5}
                delay={delay + 0.05}
              />
              <span className="text-xs tracking-[0.22em] uppercase font-body text-primary/50">
                {eyebrow}
              </span>
            </div>
          </Reveal>
        )}

        {/* Heading — word-by-word mask reveal */}
        <TextReveal
          as={as}
          text={heading}
          className={cn(
            "font-heading text-4xl md:text-5xl text-primary leading-none",
            headingClassName,
          )}
          stagger={stagger}
          delay={delay + 0.15}
          duration={0.6}
        />
      </div>

      {/* ── Right: hint / link ── */}
      {hint && (
        <Reveal
          variant="fade"
          delay={delay + 0.45}
          duration={0.5}
          className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-body text-primary/40 shrink-0"
        >
          {hintHref ? (
            <a
              href={hintHref}
              className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
            >
              {hint}
              <LineReveal
                className="w-8 h-px bg-primary/20"
                direction="left"
                delay={delay + 0.55}
                duration={0.45}
              />
            </a>
          ) : (
            <>
              <span>{hint}</span>
              <LineReveal
                className="w-8 h-px bg-primary/20"
                direction="left"
                delay={delay + 0.55}
                duration={0.45}
              />
            </>
          )}
        </Reveal>
      )}
    </div>
  );
}