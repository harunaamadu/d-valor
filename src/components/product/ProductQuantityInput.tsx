"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductQuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const SIZE_CONFIG = {
  sm: { btn: "w-7 h-7", display: "w-8 text-xs", icon: 11 },
  md: { btn: "w-9 h-9", display: "w-12 text-sm", icon: 13 },
  lg: { btn: "w-11 h-11", display: "w-14 text-base", icon: 15 },
};

export default function ProductQuantityInput({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  size = "md",
  className,
}: ProductQuantityInputProps) {
  const cfg = SIZE_CONFIG[size];
  const [direction, setDirection] = React.useState<"up" | "down">("up");

  const decrement = () => {
    if (value <= min || disabled) return;
    setDirection("down");
    onChange(value - 1);
  };

  const increment = () => {
    if (value >= max || disabled) return;
    setDirection("up");
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      setDirection(parsed > value ? "up" : "down");
      onChange(parsed);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-stretch border border-primary/20",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Decrement */}
      <button
        onClick={decrement}
        disabled={value <= min || disabled}
        aria-label="Decrease quantity"
        className={cn(
          cfg.btn,
          "flex items-center justify-center",
          "text-primary/50 hover:text-primary hover:bg-primary/5",
          "border-r border-primary/20",
          "transition-all duration-150",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <HugeiconsIcon icon={MinusSignIcon} size={cfg.icon} color="currentColor" strokeWidth={2} />
      </button>

      {/* Value display */}
      <div className={cn("relative overflow-hidden flex items-center justify-center", cfg.display)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            initial={{ y: direction === "up" ? 12 : -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction === "up" ? -12 : 12, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute font-body font-medium text-primary select-none pointer-events-none"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        {/* Hidden input for accessibility */}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={handleInputChange}
          className="opacity-0 absolute inset-0 w-full h-full text-center"
          aria-label="Quantity"
        />
      </div>

      {/* Increment */}
      <button
        onClick={increment}
        disabled={value >= max || disabled}
        aria-label="Increase quantity"
        className={cn(
          cfg.btn,
          "flex items-center justify-center",
          "text-primary/50 hover:text-primary hover:bg-primary/5",
          "border-l border-primary/20",
          "transition-all duration-150",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <HugeiconsIcon icon={PlusSignIcon} size={cfg.icon} color="currentColor" strokeWidth={2} />
      </button>
    </div>
  );
}