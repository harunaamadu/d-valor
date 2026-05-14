"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import type { FilterState } from "./FilterPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActiveFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  className?: string;
}

// ─── Label helpers ────────────────────────────────────────────────────────────

const COLOR_LABELS: Record<string, { label: string; hex: string }> = {
  ivory:  { label: "Ivory",  hex: "#faf7f2" },
  blush:  { label: "Blush",  hex: "#f6d4d4" },
  gold:   { label: "Gold",   hex: "#c9a96e" },
  cocoa:  { label: "Cocoa",  hex: "#8a6b4f" },
  ebony:  { label: "Ebony",  hex: "#1a1108" },
  rose:   { label: "Rose",   hex: "#e8c99a" },
};

function toLabel(str: string) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Single pill ──────────────────────────────────────────────────────────────

function Pill({
  label,
  colorHex,
  onRemove,
}: {
  label: string;
  colorHex?: string;
  onRemove: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -4 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/15 bg-primary/3 text-xs font-body text-primary/70"
    >
      {/* Color swatch */}
      {colorHex && (
        <span
          className="w-2.5 h-2.5 border border-primary/15 shrink-0"
          style={{ backgroundColor: colorHex }}
        />
      )}

      <span className="tracking-wide">{label}</span>

      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-primary/30 hover:text-accent transition-colors duration-200 ml-0.5"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={10} strokeWidth={2} />
      </button>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ActiveFilters({
  filters,
  onChange,
  className,
}: ActiveFiltersProps) {
  // Build a flat list of active filter descriptors
  const pills: { id: string; label: string; colorHex?: string; remove: () => void }[] = [];

  // Categories
  filters.categories.forEach((cat) => {
    pills.push({
      id: `cat-${cat}`,
      label: toLabel(cat),
      remove: () =>
        onChange({ ...filters, categories: filters.categories.filter((c) => c !== cat) }),
    });
  });

  // Price range (only show if non-default)
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
    pills.push({
      id: "price",
      label: `GH₵ ${filters.priceRange[0]} – ${filters.priceRange[1]}`,
      remove: () => onChange({ ...filters, priceRange: [0, 1000] }),
    });
  }

  // Colors
  filters.colors.forEach((color) => {
    const meta = COLOR_LABELS[color];
    pills.push({
      id: `color-${color}`,
      label: meta?.label ?? toLabel(color),
      colorHex: meta?.hex,
      remove: () =>
        onChange({ ...filters, colors: filters.colors.filter((c) => c !== color) }),
    });
  });

  // Sizes
  filters.sizes.forEach((size) => {
    pills.push({
      id: `size-${size}`,
      label: size,
      remove: () =>
        onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== size) }),
    });
  });

  // Tags
  filters.tags.forEach((tag) => {
    pills.push({
      id: `tag-${tag}`,
      label: tag,
      remove: () =>
        onChange({ ...filters, tags: filters.tags.filter((t) => t !== tag) }),
    });
  });

  // In stock
  if (filters.inStockOnly) {
    pills.push({
      id: "instock",
      label: "In Stock",
      remove: () => onChange({ ...filters, inStockOnly: false }),
    });
  }

  if (pills.length === 0) return null;

  return (
    <motion.div
      layout
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {/* Eyebrow */}
      <span className="text-[10px] tracking-[0.2em] uppercase font-body text-primary/30 shrink-0 mr-1">
        Active:
      </span>

      {/* Pills */}
      <AnimatePresence mode="popLayout">
        {pills.map((pill) => (
          <Pill
            key={pill.id}
            label={pill.label}
            colorHex={pill.colorHex}
            onRemove={pill.remove}
          />
        ))}
      </AnimatePresence>

      {/* Clear all */}
      <AnimatePresence>
        {pills.length > 1 && (
          <motion.button
            layout
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() =>
              onChange({
                categories: [],
                colors: [],
                sizes: [],
                priceRange: [0, 1000],
                inStockOnly: false,
                tags: [],
              })
            }
            className="text-[10px] tracking-[0.2em] uppercase font-body text-primary/30 hover:text-accent underline underline-offset-2 transition-colors duration-200 ml-1"
          >
            Clear all
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}