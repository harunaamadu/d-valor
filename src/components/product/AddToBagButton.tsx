"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useCartStore, type CartItem } from "@/store/cart.store";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddToBagButtonProps {
  /** The cart line to add — quantity is controlled separately */
  item: Omit<CartItem, "quantity">;
  /** How many units to add in one click (default: 1) */
  quantity?: number;
  /**
   * Whether this colour/size combination is in stock.
   * Callers should pass the *colour-level* stock-derived flag,
   * not just the top-level product inStock flag.
   */
  inStock?: boolean;
  /** "card" = slim strip at bottom of ProductCard; "detail" = full PDP button */
  variant?: "card" | "detail";
  className?: string;
  addedLabel?: string;
  soldOutLabel?: string;
  maxStockLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddToBagButton({
  item,
  quantity = 1,
  inStock = true,
  variant = "detail",
  className,
  addedLabel    = "Added",
  soldOutLabel  = "Sold Out",
  maxStockLabel = "Max in Bag",
  onClick,
}: AddToBagButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  // How many of this exact line-item are already in the bag
  const currentQuantity = useCartStore(
    (state) => state.items.find((ci) => ci.id === item.id)?.quantity ?? 0,
  );

  const [added, setAdded] = React.useState(false);
  const previousQuantityRef = React.useRef(currentQuantity);

  // Remaining purchasable stock for this colour/size combination
  const remainingStock    = Math.max(0, item.stock - currentQuantity);
  const hasReachedMaxStock = remainingStock === 0;
  const isDisabled         = !inStock || hasReachedMaxStock;
  const disabledLabel      = !inStock ? soldOutLabel : maxStockLabel;

  // Trigger the "added" flash whenever the cart quantity increases for this item
  React.useEffect(() => {
    if (currentQuantity > previousQuantityRef.current) {
      setAdded(true);
      const id = window.setTimeout(() => setAdded(false), 2000);
      previousQuantityRef.current = currentQuantity;
      return () => window.clearTimeout(id);
    }
    previousQuantityRef.current = currentQuantity;
  }, [currentQuantity]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (isDisabled) return;
    addItem(item, quantity);
  };

  // ── Card variant (slim, slides up from image bottom) ──────────────────────

  if (variant === "card") {
    return (
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={
          isDisabled
            ? `${item.name} — ${disabledLabel.toLowerCase()}`
            : `Add ${item.name} to bag`
        }
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3",
          "text-[10px] tracking-[0.2em] uppercase transition-colors duration-200",
          isDisabled
            ? "bg-neutral-300/30 text-neutral-300/60 cursor-not-allowed"
            : added
              ? "bg-accent text-primary"
              : "bg-primary text-neutral-100 hover:bg-primary/90",
          className,
        )}
      >
        {added ? (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-primary"
          >
            <span aria-hidden>&#10003;</span>
            {addedLabel}
          </motion.span>
        ) : (
          <>
            <HugeiconsIcon icon={ShoppingBag01Icon} size={13} color="currentColor" strokeWidth={1.5} />
            {isDisabled ? disabledLabel : "Add to Bag"}
          </>
        )}
      </button>
    );
  }

  // ── Detail variant (full PDP / Quick-view button) ─────────────────────────

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={isDisabled ? disabledLabel : "Add to bag"}
      className={cn(
        "flex-1 flex items-center justify-center gap-2.5",
        "transition-all duration-300 relative overflow-hidden group",
        isDisabled
          ? "bg-primary/30 text-primary/60 cursor-not-allowed"
          : added
            ? "bg-accent text-primary"
            : "bg-primary text-neutral-100 hover:text-primary hover:bg-primary/90",
        className,
      )}
    >
      {added ? (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 text-primary"
        >
          <span aria-hidden>&#10003;</span>
          {addedLabel}
        </motion.span>
      ) : (
        <>
          {!isDisabled && (
            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          )}
          <span className="relative z-10 flex items-center gap-2.5">
            <HugeiconsIcon icon={ShoppingBag01Icon} size={13} color="currentColor" strokeWidth={1.5} />
            {isDisabled ? disabledLabel : "Add to Bag"}
          </span>
        </>
      )}
    </button>
  );
}