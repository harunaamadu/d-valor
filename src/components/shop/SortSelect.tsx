"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";

interface SortSelectProps {
  value: SortOption;
  onChange: (val: SortOption) => void;
  className?: string;
}

// ─── Options ──────────────────────────────────────────────────────────────────

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest First",    value: "newest" },
  { label: "Oldest First",    value: "oldest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated",       value: "rating" },
  { label: "Most Popular",    value: "popular" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SortSelect({ value, onChange, className }: SortSelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const activeLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Sort";

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 border text-xs font-body tracking-wide",
          "transition-colors duration-200 min-w-40",
          open
            ? "border-primary/60 text-primary"
            : "border-primary/15 text-primary/50 hover:border-primary/35 hover:text-primary",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-1 text-left">{activeLabel}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={2} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className={cn(
              "absolute right-0 top-full mt-1 z-30 w-48",
              "bg-background border border-primary/10",
              "shadow-[0_8px_32px_-8px_rgba(26,17,8,0.12)]",
              "overflow-hidden",
            )}
          >
            {SORT_OPTIONS.map((opt, i) => {
              const active = opt.value === value;
              return (
                <motion.li
                  key={opt.value}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  role="option"
                  aria-selected={active}
                >
                  <button
                    onClick={() => { onChange(opt.value); setOpen(false); }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 text-xs font-body",
                      "transition-colors duration-150",
                      active
                        ? "text-primary bg-primary/4"
                        : "text-primary/50 hover:text-primary hover:bg-primary/3",
                    )}
                  >
                    {opt.label}
                    {active && (
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={12}
                        strokeWidth={2}
                        className="text-accent"
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}