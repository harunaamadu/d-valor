"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowDown01Icon,
  FilterIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  tags: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  /** Controlled open state for mobile drawer */
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

// ─── Static option data ───────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { label: "All Products",   value: "all" },
  { label: "Serums",         value: "serums" },
  { label: "Moisturisers",   value: "moisturisers" },
  { label: "Body Care",      value: "body-care" },
  { label: "Face Oils",      value: "face-oils" },
  { label: "Eye Creams",     value: "eye-creams" },
  { label: "Lip Care",       value: "lip-care" },
  { label: "SPF",            value: "spf" },
  { label: "Gift Sets",      value: "gift-sets" },
];

const COLOR_OPTIONS = [
  { label: "Ivory",    value: "ivory",   hex: "#faf7f2" },
  { label: "Blush",    value: "blush",   hex: "#f6d4d4" },
  { label: "Gold",     value: "gold",    hex: "#c9a96e" },
  { label: "Cocoa",    value: "cocoa",   hex: "#8a6b4f" },
  { label: "Ebony",    value: "ebony",   hex: "#1a1108" },
  { label: "Rose",     value: "rose",    hex: "#e8c99a" },
];

const SIZE_OPTIONS = [
  { label: "10ml",  value: "10ml" },
  { label: "30ml",  value: "30ml" },
  { label: "50ml",  value: "50ml" },
  { label: "100ml", value: "100ml" },
  { label: "200ml", value: "200ml" },
  { label: "250ml", value: "250ml" },
];

const TAG_OPTIONS = [
  { label: "New Arrival",     value: "New" },
  { label: "Bestseller",      value: "Bestseller" },
  { label: "On Sale",         value: "Sale" },
  { label: "Limited Edition", value: "Limited" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 1000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

// ─── Collapsible section ──────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-primary/8 py-5">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between group"
        aria-expanded={open}
      >
        <span className="text-xs tracking-[0.22em] uppercase font-body text-primary font-medium">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary/30 group-hover:text-primary transition-colors"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={14} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inner panel content ──────────────────────────────────────────────────────

function PanelContent({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className="flex flex-col">

      {/* ── Categories ── */}
      <FilterSection title="Category">
        <ul className="flex flex-col gap-1">
          {CATEGORY_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => {
                  if (opt.value === "all") {
                    set("categories", []);
                  } else {
                    set("categories", toggle(filters.categories, opt.value));
                  }
                }}
                className={cn(
                  "w-full flex items-center justify-between py-1.5 text-xs font-body",
                  "transition-colors duration-200 group",
                  (opt.value === "all" && filters.categories.length === 0) ||
                    filters.categories.includes(opt.value)
                    ? "text-primary"
                    : "text-primary/45 hover:text-primary",
                )}
              >
                <span className="flex items-center gap-2">
                  {/* Active tick */}
                  <span
                    className={cn(
                      "w-1 h-1 shrink-0 transition-colors duration-200",
                      (opt.value === "all" && filters.categories.length === 0) ||
                        filters.categories.includes(opt.value)
                        ? "bg-accent"
                        : "bg-transparent",
                    )}
                  />
                  {opt.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* ── Price range ── */}
      <FilterSection title="Price Range">
        <div className="flex flex-col gap-4">
          <Slider
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={filters.priceRange}
            onValueChange={(val) => set("priceRange", val as [number, number])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs font-body text-primary/50">
            <span>GH₵ {filters.priceRange[0]}</span>
            <span className="w-4 h-px bg-primary/20" />
            <span>GH₵ {filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* ── Colors ── */}
      <FilterSection title="Shade">
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => {
            const active = filters.colors.includes(c.value);
            return (
              <button
                key={c.value}
                title={c.label}
                onClick={() => set("colors", toggle(filters.colors, c.value))}
                className={cn(
                  "relative w-7 h-7 border-2 transition-all duration-200",
                  active ? "border-primary scale-110" : "border-transparent hover:border-primary/30",
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.label}
                aria-pressed={active}
              >
                {active && (
                  <motion.span
                    layoutId={`color-check-${c.value}`}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <span className="w-1.5 h-1.5 bg-primary/60" />
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* ── Sizes ── */}
      <FilterSection title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => {
            const active = filters.sizes.includes(s.value);
            return (
              <button
                key={s.value}
                onClick={() => set("sizes", toggle(filters.sizes, s.value))}
                aria-pressed={active}
                className={cn(
                  "px-3 py-1.5 text-xs font-body border tracking-wide transition-all duration-200",
                  active
                    ? "border-primary bg-primary text-surface"
                    : "border-primary/15 text-primary/50 hover:border-primary/40 hover:text-primary",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* ── Tags ── */}
      <FilterSection title="Product Type" defaultOpen={false}>
        <ul className="flex flex-col gap-1.5">
          {TAG_OPTIONS.map((t) => {
            const active = filters.tags.includes(t.value);
            return (
              <li key={t.value}>
                <button
                  onClick={() => set("tags", toggle(filters.tags, t.value))}
                  className={cn(
                    "flex items-center gap-2.5 text-xs font-body transition-colors duration-200",
                    active ? "text-primary" : "text-primary/45 hover:text-primary",
                  )}
                >
                  {/* Checkbox */}
                  <span
                    className={cn(
                      "w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors duration-200",
                      active ? "border-accent bg-accent" : "border-primary/25",
                    )}
                  >
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 bg-surface"
                      />
                    )}
                  </span>
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      {/* ── In stock ── */}
      <div className="py-5">
        <button
          onClick={() => set("inStockOnly", !filters.inStockOnly)}
          className="flex items-center gap-3 group"
        >
          {/* Toggle pill */}
          <div
            className={cn(
              "relative w-8 h-4 border transition-colors duration-300",
              filters.inStockOnly ? "bg-accent border-accent" : "bg-transparent border-primary/25",
            )}
          >
            <motion.div
              animate={{ x: filters.inStockOnly ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="absolute top-0.5 left-0.5 w-3 h-3 bg-surface"
            />
          </div>
          <span className="text-xs font-body text-primary/60 group-hover:text-primary transition-colors">
            In stock only
          </span>
        </button>
      </div>

      {/* ── Reset ── */}
      <button
        onClick={() =>
          onChange({
            categories: [],
            colors: [],
            sizes: [],
            priceRange: [PRICE_MIN, PRICE_MAX],
            inStockOnly: false,
            tags: [],
          })
        }
        className="mt-2 text-[10px] tracking-[0.2em] uppercase font-body text-primary/30 hover:text-accent transition-colors duration-200 self-start"
      >
        Clear all filters
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FilterPanel({
  filters,
  onChange,
  open,
  onClose,
  className,
}: FilterPanelProps) {
  // ── Desktop sidebar ──────────────────────────────────────────────────────────
  return (
    <>
      {/* Desktop: always-visible sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-56 shrink-0",
          className,
        )}
      >
        <div className="flex items-center gap-2 mb-6">
          <HugeiconsIcon icon={FilterIcon} size={13} strokeWidth={1.5} className="text-primary/40" />
          <span className="text-xs tracking-[0.22em] uppercase font-body text-primary/50">
            Filter
          </span>
        </div>
        <PanelContent filters={filters} onChange={onChange} />
      </aside>

      {/* Mobile: slide-in drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-primary/50 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-primary/10 overflow-y-auto lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={FilterIcon} size={13} strokeWidth={1.5} className="text-primary/40" />
                  <span className="text-xs tracking-[0.22em] uppercase font-body text-primary/50">
                    Filter
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-primary/40 hover:text-primary transition-colors"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.5} />
                </button>
              </div>

              <div className="px-6 py-4">
                <PanelContent filters={filters} onChange={onChange} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}