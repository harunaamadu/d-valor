"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ShoppingBag01Icon,
  ArrowRight01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import ProductVariantSelector, {
  type ColorOption,
  type SizeOption,
} from "./ProductVariantSelector";
import ProductQuantityInput from "./ProductQuantityInput";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuickViewProduct {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand?: string;
  price: number;
  comparePrice?: number;
  images: { src: string; alt: string }[];
  description?: string;
  rating?: number;
  reviewCount?: number;
  colors?: ColorOption[];
  sizes?: SizeOption[];
  stock?: number;
  inStock?: boolean;
}

interface QuickViewModalProps {
  slug: string | null;
  open: boolean;
  onClose: () => void;
  /** Optionally provide product data directly (avoids a fetch) */
  product?: QuickViewProduct;
}

// ─── Demo fetcher (replace with your actual data layer) ──────────────────────

async function fetchProductBySlug(slug: string): Promise<QuickViewProduct | null> {
  // TODO: replace with your Sanity or Prisma query
  return {
    id: slug,
    productId: slug,
    slug,
    name: "Luminous Glow Serum",
    brand: "D'valor",
    price: 185,
    comparePrice: 220,
    images: [
      { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop", alt: "Luminous Glow Serum" },
      { src: "https://images.unsplash.com/photo-1606830733744-0ad4bfa8b3c5?w=600&auto=format&fit=crop", alt: "Luminous Glow Serum texture" },
    ],
    description:
      "A brightening serum formulated with Vitamin C, niacinamide, and rare plant extracts to visibly reduce dark spots and enhance radiance.",
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { label: "Original", hex: "#f5e6cc", variantId: "v-original", inStock: true },
      { label: "Intensive", hex: "#e8c99a", variantId: "v-intensive", inStock: true },
      { label: "Sensitive", hex: "#fdf0e0", variantId: "v-sensitive", inStock: false },
    ],
    sizes: [
      { label: "30ml", variantId: "s-30", inStock: true, description: "Travel-friendly size" },
      { label: "50ml", variantId: "s-50", inStock: true, description: "Full-size" },
      { label: "100ml", variantId: "s-100", inStock: true, description: "Luxury size" },
    ],
    stock: 8,
    inStock: true,
  };
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
          className={i < Math.floor(rating) ? "text-accent fill-accent" : "text-primary/20"}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QuickViewModal({
  slug,
  open,
  onClose,
  product: productProp,
}: QuickViewModalProps) {
  const { addItem } = useCartStore();
  const [product, setProduct] = React.useState<QuickViewProduct | null>(productProp ?? null);
  const [loading, setLoading] = React.useState(false);

  const [activeImage, setActiveImage] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [selectedColorHex, setSelectedColorHex] = React.useState<string>("");
  const [selectedColorLabel, setSelectedColorLabel] = React.useState<string>("");
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedSizeLabel, setSelectedSizeLabel] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  // Fetch if no product data provided
  React.useEffect(() => {
    if (!open || !slug) return;
    if (productProp) { setProduct(productProp); return; }
    setLoading(true);
    setActiveImage(0);
    fetchProductBySlug(slug).then((p) => {
      setProduct(p);
      setSelectedColor(p?.colors?.[0]?.variantId ?? null);
      setSelectedColorHex(p?.colors?.[0]?.hex ?? "");
      setSelectedColorLabel(p?.colors?.[0]?.label ?? "");
      setSelectedSize(p?.sizes?.[0]?.variantId ?? null);
      setSelectedSizeLabel(p?.sizes?.[0]?.label ?? "");
      setLoading(false);
    });
  }, [open, slug, productProp]);

  // Lock scroll
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard close
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedColor ?? product.id,
        productId: product.productId,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0]?.src ?? "",
        color: selectedColorLabel || null,
        colorHex: selectedColorHex || null,
        size: selectedSizeLabel || null,
        stock: product.stock ?? 10,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
            className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm"
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
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-primary/15 text-primary/40 hover:text-primary hover:border-primary/40 transition-all duration-200"
              aria-label="Close"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={15} color="currentColor" strokeWidth={1.5} />
            </button>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border border-accent/40 border-t-accent animate-spin" />
                  <span className="text-xs text-primary/40 tracking-[0.2em] uppercase font-body">Loading</span>
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && product && (
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* ── Left: Images ── */}
                <div className="relative bg-primary/4">
                  {/* Main image */}
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

                  {/* Thumbnail dots */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={cn(
                            "transition-all duration-300",
                            i === activeImage ? "w-5 h-px bg-primary" : "w-1.5 h-1.5 rounded-full bg-primary/30 hover:bg-primary/60"
                          )}
                          aria-label={`View image ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Right: Info ── */}
                <div className="flex flex-col gap-5 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-[10px] tracking-[0.25em] uppercase font-body text-accent">
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
                      <span className="text-xs font-body text-primary/40">
                        {product.rating.toFixed(1)}
                        {product.reviewCount !== undefined && ` (${product.reviewCount})`}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-end gap-3">
                    <span className="font-heading text-xl text-primary">
                      GH₵ {product.price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
                    </span>
                    {product.comparePrice && product.comparePrice > product.price && (
                      <span className="text-sm font-body text-primary/30 line-through pb-0.5">
                        GH₵ {product.comparePrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  {/* Separator */}
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

                  {/* Quantity + Add */}
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      <ProductQuantityInput
                        value={quantity}
                        max={product.stock ?? 10}
                        onChange={setQuantity}
                        disabled={!product.inStock}
                      />

                      <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2.5",
                          "py-2.5 px-5",
                          "text-[10px] tracking-[0.2em] uppercase font-body",
                          "transition-all duration-300 relative overflow-hidden group",
                          product.inStock
                            ? added
                              ? "bg-accent text-primary"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-primary/30 text-primary/40 cursor-not-allowed"
                        )}
                      >
                        {!added && (
                          <>
                            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                            <span className="relative z-10 flex items-center gap-2">
                              <HugeiconsIcon icon={ShoppingBag01Icon} size={13} color="currentColor" strokeWidth={1.5} />
                              {product.inStock ? "Add to Bag" : "Sold Out"}
                            </span>
                          </>
                        )}
                        {added && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-primary"
                          >
                            ✓ Added
                          </motion.span>
                        )}
                      </button>
                    </div>

                    {/* Full details link */}
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 py-2 text-[10px] tracking-[0.2em] uppercase font-body text-primary/40 hover:text-primary border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      View Full Details
                      <HugeiconsIcon icon={ArrowRight01Icon} size={11} color="currentColor" strokeWidth={2} />
                    </Link>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-xs font-body text-primary/55 leading-relaxed pt-1 border-t border-primary/8">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}