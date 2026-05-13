"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, ArrowRight01Icon, StarIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import ProductVariantSelector from "./ProductVariantSelector";
import ProductQuantityInput from "./ProductQuantityInput";
import { fetchProductBySlug, QuickViewProduct } from "@/data/fake-products";
import AddToBagButton from "./AddToBagButton";
import { createCartItemId } from "@/lib/cart/create-cart-item-id";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickViewModalProps {
  slug: string | null;
  open: boolean;
  onClose: () => void;
  /** Skip the fetch and use pre-loaded data directly */
  product?: QuickViewProduct;
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={11}
          strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
          color="currentColor"
          className={
            i < Math.floor(rating) ? "text-accent fill-amber-300" : "text-primary/20"
          }
        />
      ))}
    </div>
  );
}

// ─── Inner content (extracted so it remounts cleanly when slug changes) ───────

function QuickViewContent({
  product,
  onClose,
}: {
  product: QuickViewProduct;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = React.useState(0);

  // ── Colour state ──
  const [selectedColor,      setSelectedColor]      = React.useState<string | null>(product.colors?.[0]?.variantId ?? null);
  const [selectedColorHex,   setSelectedColorHex]   = React.useState<string>(product.colors?.[0]?.hex ?? "");
  const [selectedColorLabel, setSelectedColorLabel] = React.useState<string>(product.colors?.[0]?.label ?? "");

  // ── Size state ──
  const [selectedSize,      setSelectedSize]      = React.useState<string | null>(product.sizes?.[0]?.variantId ?? null);
  const [selectedSizeLabel, setSelectedSizeLabel] = React.useState<string>(product.sizes?.[0]?.label ?? "");

  const [quantity, setQuantity] = React.useState(1);

  // ── Derived: active size data → price ──
  const activeSizeData = React.useMemo(
    () => product.sizes?.find((s) => s.variantId === selectedSize) ?? product.sizes?.[0] ?? null,
    [product.sizes, selectedSize],
  );

  const activePrice        = activeSizeData?.price        ?? product.price;
  const activeComparePrice = activeSizeData?.comparePrice ?? product.comparePrice;

  // ── Derived: active colour data → stock ──
  const activeColorData = React.useMemo(
    () => product.colors?.find((c) => c.variantId === selectedColor) ?? product.colors?.[0] ?? null,
    [product.colors, selectedColor],
  );

  /**
   * Effective stock:
   *  1. Selected colour's per-shade stock.
   *  2. Aggregate product stock as fallback.
   */
  const effectiveStock: number = React.useMemo(() => {
    if (activeColorData?.stock !== undefined) return activeColorData.stock;
    return product.stock ?? 10;
  }, [activeColorData, product.stock]);

  const effectiveInStock = (product.inStock ?? true) && effectiveStock > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      {/* ── Left: images ── */}
      <div className="relative bg-primary/4">
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage]?.src ?? ""}
                alt={product.images[activeImage]?.alt ?? product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "transition-all duration-300",
                  i === activeImage
                    ? "w-5 h-px bg-primary"
                    : "w-1.5 h-1.5 rounded-full bg-primary/30 hover:bg-primary/60",
                )}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Right: info ── */}
      <div className="flex flex-col gap-5 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">

        {/* Brand */}
        {product.brand && (
          <p className="text-[10px] tracking-[0.25em] uppercase text-accent">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <h2 className="font-heading text-2xl text-primary leading-tight">
          {product.name}
        </h2>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-primary/60">
              {product.rating.toFixed(1)}
              {product.reviewCount !== undefined && ` (${product.reviewCount})`}
            </span>
          </div>
        )}

        {/* Price — animates when size changes */}
        <div className="flex items-end gap-3">
          <motion.span
            key={activePrice}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-heading text-xl text-primary"
          >
            GH₵ {activePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </motion.span>

          {activeComparePrice && activeComparePrice > activePrice && (
            <span className="text-sm text-primary/30 line-through pb-0.5">
              GH₵ {activeComparePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        <div className="h-px bg-primary/8" />

        {/* Variants */}
        <ProductVariantSelector
          colors={product.colors}
          sizes={product.sizes}
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

        {/* Stock hint */}
        {effectiveInStock && effectiveStock <= 5 && (
          <p className="text-xs text-destructive/70 tracking-wide">
            Only {effectiveStock} left
            {activeColorData ? ` in ${activeColorData.label}` : ""}
          </p>
        )}

        {/* Quantity + add */}
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex items-center gap-3">
            <ProductQuantityInput
              value={quantity}
              max={effectiveStock}
              onChange={setQuantity}
              disabled={!effectiveInStock}
            />

            <AddToBagButton
              inStock={effectiveInStock}
              quantity={quantity}
              className="py-2.5 px-5 text-[10px] tracking-[0.2em] uppercase"
              item={{
                id: createCartItemId({
                  productId: product.productId,
                  color: selectedColor,
                  size: selectedSize,
                }),
                productId: product.productId,
                slug: product.slug,
                name: product.name,
                price: activePrice,
                image: product.images[0]?.src ?? "",
                color: selectedColorLabel || null,
                colorHex: selectedColorHex || null,
                size: selectedSizeLabel || null,
                stock: effectiveStock,
              }}
            />
          </div>

          {/* View full details */}
          <Link
            href={`/product/${product.slug}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2 text-[10px] tracking-[0.2em] uppercase text-primary/60 hover:text-primary border border-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            View Full Details
            <HugeiconsIcon icon={ArrowRight01Icon} size={11} color="currentColor" strokeWidth={2} />
          </Link>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-primary/55 leading-relaxed pt-1 border-t border-primary/8">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Modal shell ──────────────────────────────────────────────────────────────

export default function QuickViewModal({
  slug,
  open,
  onClose,
  product: productProp,
}: QuickViewModalProps) {
  const [fetchResult, setFetchResult] = React.useState<{
    slug: string | null;
    product: QuickViewProduct | null;
  }>({ slug: null, product: null });

  // Fetch when no direct product prop is provided
  React.useEffect(() => {
    if (!open || !slug || productProp) return;

    let cancelled = false;

    fetchProductBySlug(slug).then((next) => {
      if (cancelled) return;
      setFetchResult({ slug, product: next });
    });

    return () => { cancelled = true; };
  }, [open, slug, productProp]);

  // Lock scroll while open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const product = productProp ?? (fetchResult.slug === slug ? fetchResult.product : null);
  const loading = open && !!slug && !productProp && fetchResult.slug !== slug;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-3xl md:max-h-[90vh] bg-background overflow-auto"
            style={{ boxShadow: "0 32px 80px -12px rgba(26,17,8,0.22)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-primary/15 text-primary/60 hover:text-primary hover:border-primary/60 transition-all duration-200"
              aria-label="Close"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={15} color="currentColor" strokeWidth={1.5} />
            </button>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border border-accent/40 border-t-accent animate-spin" />
                  <span className="text-xs text-primary/60 tracking-[0.2em] uppercase">
                    Loading
                  </span>
                </div>
              </div>
            )}

            {/* Content — key forces remount when slug changes so state resets */}
            {!loading && product && (
              <QuickViewContent key={product.slug} product={product} onClose={onClose} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}