"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon, EyeIcon, StarIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/animations/reveal";
import AddToBagButton from "./AddToBagButton";
import { createCartItemId } from "@/lib/cart/create-cart-item-id";
import { ColorOption, SizeOption } from "./ProductVariantSelector";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductCardProps {
  id: string;
  productId: string;
  slug: string;
  name: string;

  price: number;
  comparePrice?: number;

  imageUrl: string;
  hoverImageUrl?: string;

  tag?: "New" | "Sale" | "Bestseller" | "Limited" | string;

  rating?: number;
  reviewCount?: number;

  variantId?: string;

  colors?: ColorOption[];
  sizes?: SizeOption[];

  /** Aggregate stock — used as fallback when no colour is selected */
  stock?: number;

  onQuickView?: (slug: string) => void;
  className?: string;
  delay?: number;
}

// ─── Tag style map ────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, string> = {
  New:        "bg-primary text-primary-foreground",
  Sale:       "bg-destructive/90 text-white",
  Bestseller: "bg-accent text-primary",
  Limited:    "bg-primary/80 text-primary-foreground",
};

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HugeiconsIcon
            key={i}
            icon={StarIcon}
            size={10}
            strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
            className={
              i < Math.floor(rating)
                ? "text-accent fill-amber-300"
                : "text-primary/20"
            }
            color="currentColor"
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[10px] text-primary/60 tracking-wide">
          ({count})
        </span>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({
  id,
  productId,
  slug,
  name,
  price,
  comparePrice,
  imageUrl,
  hoverImageUrl,
  tag,
  rating,
  reviewCount,
  variantId,
  colors,
  sizes,
  stock: aggregateStock = 10,
  onQuickView,
  className,
  delay = 0,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [hovered, setHovered]           = React.useState(false);

  // ── Default to first colour / first size ──
  const defaultColor = colors?.[0] ?? null;
  const defaultSize  = sizes?.[0]  ?? null;

  // ── Derive stock from the default colour's stock, falling back to aggregate ──
  const effectiveStock: number = React.useMemo(() => {
    if (defaultColor?.stock !== undefined) return defaultColor.stock;
    return aggregateStock;
  }, [defaultColor, aggregateStock]);

  const isInStock = effectiveStock > 0;

  // ── Price: prefer the first size's price, fall back to product price ──
  const activePrice        = defaultSize?.price        ?? price;
  const activeComparePrice = defaultSize?.comparePrice ?? comparePrice;

  const discountPct =
    activeComparePrice && activeComparePrice > activePrice
      ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(
        "group relative flex flex-col",
        !isInStock && "pointer-events-none opacity-55",
        className,
      )}
      onMouseEnter={() => { if (isInStock) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image block ── */}
      <Link href={`/product/${slug}`} className="block relative overflow-hidden bg-primary/4 aspect-3/4">
        <ImageReveal direction="up" delay={delay + 0.05} duration={0.9} threshold={0.1}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hoverImageUrl
                ? hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                : "group-hover:scale-105",
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </ImageReveal>

        {hoverImageUrl && (
          <Image
            src={hoverImageUrl}
            alt={`${name} — alternate`}
            fill
            className={cn(
              "object-cover absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 transition-colors duration-500 z-10" />

        {/* Corner accents */}
        <span className="absolute top-3 left-3 z-20 w-4 h-4 border-t border-l border-white/0 group-hover:border-white/40 transition-all duration-400" />
        <span className="absolute bottom-3 right-3 z-20 w-4 h-4 border-b border-r border-white/0 group-hover:border-white/40 transition-all duration-400" />

        {/* Tag badge */}
        {tag && (
          <span
            className={cn(
              "absolute top-3 left-3 z-20 text-[9px] tracking-[0.18em] uppercase px-2.5 py-1",
              TAG_STYLES[tag] ?? "bg-primary/80 text-primary-foreground",
            )}
          >
            {tag}
          </span>
        )}

        {/* Discount badge (only when no tag) */}
        {discountPct && !tag && (
          <span className="absolute top-3 left-3 z-20 text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 bg-destructive/90 text-white">
            -{discountPct}%
          </span>
        )}

        {/* Hover action panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 z-20 flex"
            >
              <AddToBagButton
                variant="card"
                inStock={isInStock}
                item={{
                  id: createCartItemId({ productId, color: variantId }),
                  productId,
                  slug,
                  name,
                  price: activePrice,
                  image: imageUrl,
                  color: defaultColor?.label ?? null,
                  colorHex: defaultColor?.hex ?? null,
                  size: defaultSize?.label ?? null,
                  stock: effectiveStock,
                }}
                onClick={(e) => e.preventDefault()}
              />

              {onQuickView && (
                <button
                  onClick={(e) => { e.preventDefault(); onQuickView(slug); }}
                  className="w-11 flex items-center justify-center bg-primary/80 hover:bg-primary text-primary-foreground transition-colors duration-200 border-l border-white/15"
                  aria-label="Quick view"
                >
                  <HugeiconsIcon icon={EyeIcon} size={14} color="currentColor" strokeWidth={1.5} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* ── Wishlist button ── */}
      <button
        onClick={() => setIsWishlisted((p) => !p)}
        className={cn(
          "absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center",
          "bg-background/80 backdrop-blur-sm border border-primary/10",
          "hover:border-accent hover:bg-background transition-all duration-300",
          "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
          isWishlisted && "opacity-100 translate-y-0",
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={14}
          color="currentColor"
          strokeWidth={isWishlisted ? 0 : 1.5}
          className={isWishlisted ? "text-destructive fill-destructive" : "text-primary/60"}
        />
      </button>

      {/* ── Meta ── */}
      <div className="flex flex-col gap-1.5 pt-4">
        {rating !== undefined && <StarRating rating={rating} count={reviewCount} />}

        <Link href={`/product/${slug}`}>
          <h3 className="font-heading text-base leading-tight text-primary/90 hover:text-primary-hover transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-sm text-primary font-medium">
            GH₵ {activePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </span>
          {activeComparePrice && activeComparePrice > activePrice && (
            <span className="text-xs text-primary/35 line-through">
              GH₵ {activeComparePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}