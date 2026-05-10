"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  FavouriteIcon,
  TruckIcon,
  StarIcon,
  ShareIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { Reveal, LineReveal } from "@/components/animations/reveal";
import ProductVariantSelector, {
  type ColorOption,
  type SizeOption,
} from "./ProductVariantSelector";
import ProductQuantityInput from "./ProductQuantityInput";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductInfoProps {
  productId: string;
  slug: string;
  name: string;
  brand?: string;
  sku?: string;
  price: number;
  comparePrice?: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  colors?: ColorOption[];
  sizes?: SizeOption[];
  stock?: number;
  /** If false, show out-of-stock state */
  inStock?: boolean;
  /** Badges: "clean" | "vegan" | "cruelty-free" | string */
  badges?: string[];
  className?: string;
}

// ─── Star row ─────────────────────────────────────────────────────────────────

function StarRow({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HugeiconsIcon
            key={i}
            icon={StarIcon}
            size={12}
            strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
            color="currentColor"
            className={i < Math.floor(rating) ? "text-accent fill-accent" : "text-primary/20"}
          />
        ))}
      </div>
      <span className="text-xs font-body text-primary/50">
        {rating.toFixed(1)}
        {count !== undefined && (
          <a href="#reviews" className="ml-1 hover:text-primary transition-colors duration-200">
            ({count} reviews)
          </a>
        )}
      </span>
    </div>
  );
}

// ─── Badge pill ───────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  clean: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
  vegan: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
  "cruelty-free": "border-rose-400/30 text-rose-600 dark:text-rose-400",
  organic: "border-amber-500/30 text-amber-700 dark:text-amber-400",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductInfo({
  productId,
  slug,
  name,
  brand,
  sku,
  price,
  comparePrice,
  description,
  rating,
  reviewCount,
  imageUrl,
  colors,
  sizes,
  stock = 10,
  inStock = true,
  badges,
  className,
}: ProductInfoProps) {
  const { addItem } = useCartStore();
  const [selectedColor, setSelectedColor] = React.useState<string | null>(
    colors?.[0]?.variantId ?? null
  );
  const [selectedColorHex, setSelectedColorHex] = React.useState<string>(
    colors?.[0]?.hex ?? "#000"
  );
  const [selectedColorLabel, setSelectedColorLabel] = React.useState<string>(
    colors?.[0]?.label ?? ""
  );
  const [selectedSize, setSelectedSize] = React.useState<string | null>(
    sizes?.[0]?.variantId ?? null
  );
  const [selectedSizeLabel, setSelectedSizeLabel] = React.useState<string>(
    sizes?.[0]?.label ?? ""
  );
  const [quantity, setQuantity] = React.useState(1);
  const [wishlisted, setWishlisted] = React.useState(false);
  const [addedAnimation, setAddedAnimation] = React.useState(false);

  const discountPct =
    comparePrice && comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (!inStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedColor ?? productId,
        productId,
        slug,
        name,
        price,
        image: imageUrl,
        color: selectedColorLabel || null,
        colorHex: selectedColorHex || null,
        size: selectedSizeLabel || null,
        stock,
      });
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <div className={cn("flex flex-col gap-7", className)}>
      {/* ── Brand + badges ── */}
      <Reveal variant="slide" direction="up" delay={0.05} duration={0.55}>
        <div className="flex items-center gap-3 flex-wrap">
          {brand && (
            <Link
              href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs tracking-[0.22em] uppercase font-body text-accent hover:text-primary transition-colors duration-200"
            >
              {brand}
            </Link>
          )}
          {brand && badges && badges.length > 0 && (
            <span className="w-px h-3 bg-primary/15" />
          )}
          {badges?.map((badge) => (
            <span
              key={badge}
              className={cn(
                "text-[9px] tracking-[0.18em] uppercase font-body border px-2 py-0.5",
                BADGE_STYLES[badge.toLowerCase()] ?? "border-primary/20 text-primary/50"
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      </Reveal>

      {/* ── Name ── */}
      <Reveal variant="slide" direction="up" delay={0.1} duration={0.65}>
        <h1 className="font-heading text-3xl md:text-4xl leading-tight text-primary">
          {name}
        </h1>
      </Reveal>

      {/* ── Rating ── */}
      {rating !== undefined && (
        <Reveal variant="fade" delay={0.18}>
          <StarRow rating={rating} count={reviewCount} />
        </Reveal>
      )}

      {/* ── Price block ── */}
      <Reveal variant="slide" direction="up" delay={0.22} duration={0.55}>
        <div className="flex items-end gap-3">
          <span className="font-heading text-2xl text-primary">
            GH₵ {price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </span>
          {comparePrice && comparePrice > price && (
            <span className="font-body text-sm text-primary/35 line-through pb-0.5">
              GH₵ {comparePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
            </span>
          )}
          {discountPct && (
            <span className="text-[10px] tracking-[0.15em] uppercase font-body text-destructive/80 bg-destructive/8 px-2 py-0.5">
              Save {discountPct}%
            </span>
          )}
        </div>
      </Reveal>

      {/* ── Divider ── */}
      <LineReveal className="h-px bg-primary/10" direction="left" delay={0.28} duration={0.5} />

      {/* ── Variants ── */}
      {((colors && colors.length > 0) || (sizes && sizes.length > 0)) && (
        <Reveal variant="slide" direction="up" delay={0.32} duration={0.55}>
          <ProductVariantSelector
            colors={colors}
            sizes={sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={(id, hex, label) => {
              setSelectedColor(id);
              setSelectedColorHex(hex);
              setSelectedColorLabel(label);
            }}
            onSizeChange={(id, label) => {
              setSelectedSize(id);
              setSelectedSizeLabel(label);
            }}
          />
        </Reveal>
      )}

      {/* ── Quantity + actions ── */}
      <Reveal variant="slide" direction="up" delay={0.38} duration={0.55}>
        <div className="flex flex-col gap-3">
          {/* Stock status */}
          {inStock ? (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-body text-primary/50 tracking-wide">
                {stock <= 5 ? `Only ${stock} left in stock` : "In stock — ships within 2–3 days"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive/70" />
              <span className="text-xs font-body text-destructive/70 tracking-wide">
                Out of stock
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <ProductQuantityInput
              value={quantity}
              max={Math.min(stock, 10)}
              onChange={setQuantity}
              disabled={!inStock}
              size="md"
            />

            {/* Add to bag */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={cn(
                "flex-1 flex items-center justify-center gap-2.5",
                "h-11 px-6",
                "text-xs tracking-[0.2em] uppercase font-body",
                "transition-all duration-300 relative overflow-hidden",
                inStock
                  ? addedAnimation
                    ? "bg-accent text-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 group"
                  : "bg-primary/30 text-primary/40 cursor-not-allowed"
              )}
              aria-label={inStock ? "Add to bag" : "Out of stock"}
            >
              {!addedAnimation && (
                <>
                  <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    <HugeiconsIcon icon={ShoppingBag01Icon} size={14} color="currentColor" strokeWidth={1.5} />
                    {inStock ? "Add to Bag" : "Sold Out"}
                  </span>
                </>
              )}
              {addedAnimation && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 text-primary"
                >
                  ✓ Added to Bag
                </motion.span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted((p) => !p)}
              className={cn(
                "w-11 h-11 flex items-center justify-center border transition-all duration-300",
                wishlisted
                  ? "border-destructive/50 bg-destructive/5 text-destructive"
                  : "border-primary/20 text-primary/50 hover:border-primary/40 hover:text-primary"
              )}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                size={16}
                color="currentColor"
                strokeWidth={wishlisted ? 0 : 1.5}
                className={wishlisted ? "fill-destructive" : ""}
              />
            </button>

            {/* Share */}
            <button
              className="w-11 h-11 flex items-center justify-center border border-primary/20 text-primary/40 hover:text-primary hover:border-primary/40 transition-all duration-300"
              aria-label="Share product"
              onClick={() => navigator.share?.({ title: name, url: window.location.href })}
            >
              <HugeiconsIcon icon={ShareIcon} size={16} color="currentColor" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Reveal>

      {/* ── Description ── */}
      {description && (
        <Reveal variant="fade" delay={0.44} duration={0.6}>
          <div className="flex flex-col gap-3 pt-1">
            <LineReveal className="h-px bg-primary/10" direction="left" delay={0.44} duration={0.5} />
            <p className="text-sm font-body text-primary/60 leading-relaxed">
              {description}
            </p>
          </div>
        </Reveal>
      )}

      {/* ── Shipping perks ── */}
      <Reveal variant="fade" delay={0.5} duration={0.6}>
        <div className="flex flex-col gap-2 p-4 bg-primary/3 border border-primary/8">
          <div className="flex items-center gap-3 text-xs font-body text-primary/60">
            <HugeiconsIcon icon={TruckIcon} size={14} color="currentColor" strokeWidth={1.5} className="text-accent shrink-0" />
            <span>Free delivery on orders over <strong className="text-primary">GH₵ 500</strong></span>
          </div>
          <div className="flex items-center gap-3 text-xs font-body text-primary/60">
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" strokeWidth={1.5} className="text-accent shrink-0" />
            <span>Free returns within <strong className="text-primary">30 days</strong> of delivery</span>
          </div>
        </div>
      </Reveal>

      {/* ── SKU ── */}
      {sku && (
        <p className="text-[10px] font-body text-primary/25 tracking-[0.15em]">
          SKU: {sku}
        </p>
      )}
    </div>
  );
}