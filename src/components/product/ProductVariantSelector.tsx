"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColorOption {
  label: string;
  hex: string;
  variantId: string;
  /** Per-colour stock count; undefined means unknown/unlimited */
  stock?: number;
  inStock?: boolean;
  imageUrl?: string;
}

export interface SizeOption {
  label: string;
  variantId: string;
  inStock: boolean;
  description?: string;
  price?: number;
  comparePrice?: number;
}

interface ProductVariantSelectorProps {
  colors?: ColorOption[];
  sizes?: SizeOption[];
  selectedColor?: string | null;
  selectedSize?: string | null;
  onColorChange?: (variantId: string, hex: string, label: string) => void;
  onSizeChange?: (variantId: string, label: string) => void;
  className?: string;
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({
  option,
  selected,
  onSelect,
}: {
  option: ColorOption;
  selected: boolean;
  onSelect: () => void;
}) {
  /** Derive effective inStock: explicit flag wins; otherwise fall back to stock > 0 */
  const effectivelyInStock =
    option.inStock !== undefined
      ? option.inStock
      : option.stock === undefined || option.stock > 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onSelect}
          disabled={!effectivelyInStock}
          aria-label={`Color: ${option.label}`}
          aria-pressed={selected}
          className={cn(
            "relative w-7 h-7 transition-all duration-200",
            "border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
            selected ? "border-primary" : "border-transparent hover:border-primary/30",
            !effectivelyInStock && "opacity-40 cursor-not-allowed"
          )}
          style={{ backgroundColor: option.hex }}
        >
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HugeiconsIcon
                icon={Tick02Icon}
                size={11}
                strokeWidth={2.5}
                color={
                  isLightColor(option.hex)
                    ? "rgba(26,17,8,0.8)"
                    : "rgba(255,255,255,0.9)"
                }
              />
            </motion.span>
          )}

          {/* Out of stock diagonal line */}
          {!effectivelyInStock && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-full h-px bg-primary/60 rotate-45" />
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <span>
          {option.label}
          {!effectivelyInStock
            ? " — Out of stock"
            : option.stock !== undefined && option.stock <= 5
              ? ` — Only ${option.stock} left`
              : ""}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ─── Size button ──────────────────────────────────────────────────────────────

function SizeButton({
  option,
  selected,
  onSelect,
}: {
  option: SizeOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const btn = (
    <button
      onClick={onSelect}
      disabled={!option.inStock}
      aria-label={`Size: ${option.label}`}
      aria-pressed={selected}
      className={cn(
        "relative min-w-12 h-9 px-3 text-xs tracking-widest uppercase",
        "border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-primary/20 text-primary/70 hover:border-primary/60 hover:text-primary",
        !option.inStock && "opacity-35 cursor-not-allowed line-through"
      )}
    >
      {option.label}
    </button>
  );

  if (option.description) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent>
          <span>{option.description}</span>
        </TooltipContent>
      </Tooltip>
    );
  }
  return btn;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductVariantSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  className,
}: ProductVariantSelectorProps) {
  const activeColor = colors?.find((c) => c.variantId === selectedColor);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* ── Colors ── */}
      {colors && colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/50">
              Shade
            </p>
            {activeColor && (
              <motion.p
                key={activeColor.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-primary"
              >
                {activeColor.label}
                {activeColor.stock !== undefined && activeColor.stock <= 5 && activeColor.stock > 0 && (
                  <span className="ml-2 text-[10px] text-destructive/70">
                    ({activeColor.stock} left)
                  </span>
                )}
              </motion.p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {colors.map((color) => (
              <ColorSwatch
                key={color.variantId}
                option={color}
                selected={selectedColor === color.variantId}
                onSelect={() =>
                  onColorChange?.(color.variantId, color.hex, color.label)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Sizes ── */}
      {sizes && sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/50">
              Size
            </p>
            <button className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-accent hover:text-primary transition-colors duration-200">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                size={11}
                color="currentColor"
                strokeWidth={1.5}
              />
              Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <SizeButton
                key={size.variantId}
                option={size}
                selected={selectedSize === size.variantId}
                onSelect={() => onSizeChange?.(size.variantId, size.label)}
              />
            ))}
          </div>

          {/* Sold out notice */}
          {sizes.every((s) => !s.inStock) && (
            <p className="text-xs text-destructive/70 tracking-wide mt-1">
              All sizes currently sold out. Join the waitlist below.
            </p>
          )}
        </div>
      )}
    </div>
  );
}