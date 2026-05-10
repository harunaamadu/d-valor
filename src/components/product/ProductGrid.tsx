"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { LayoutGridIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import ProductCard, { type ProductCardProps } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import QuickViewModal from "./QuickViewModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type GridColumns = 2 | 3 | 4;

interface ProductGridProps {
  products?: ProductCardProps[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
  /** Default column count (desktop) */
  defaultColumns?: GridColumns;
  /** Show column toggle controls */
  showControls?: boolean;
  /** Show count label */
  showCount?: boolean;
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <Skeleton className="w-full aspect-3/4" />
      <Skeleton className="h-2.5 w-20" />
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-3.5 w-1/3" />
    </div>
  );
}

// ─── Column toggle button ─────────────────────────────────────────────────────

function ColBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-8 h-8 flex items-center justify-center border transition-all duration-200",
        active
          ? "border-primary/60 bg-primary/6 text-primary"
          : "border-primary/15 bg-transparent text-primary/30 hover:text-primary/60 hover:border-primary/30"
      )}
    >
      {children}
    </button>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

const COL_CLASSES: Record<GridColumns, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
  className,
  defaultColumns = 4,
  showControls = true,
  showCount = true,
}: ProductGridProps) {
  const [columns, setColumns] = React.useState<GridColumns>(defaultColumns);
  const [quickViewSlug, setQuickViewSlug] = React.useState<string | null>(null);

  const isDataLoading = isLoading || !products;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* ── Controls row ── */}
      {(showControls || showCount) && (
        <div className="flex items-center justify-between">
          {showCount && !isDataLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-body text-primary/40 tracking-wide"
            >
              <span className="text-primary font-medium">{products?.length ?? 0}</span>{" "}
              products
            </motion.p>
          )}
          {showCount && isDataLoading && (
            <Skeleton className="h-3.5 w-24" />
          )}

          {showControls && (
            <div className="flex items-center gap-1 ml-auto">
              <ColBtn active={columns === 2} onClick={() => setColumns(2)}>
                <span className="grid grid-cols-2 gap-px w-3 h-3">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="bg-current w-full h-full" />
                  ))}
                </span>
              </ColBtn>
              <ColBtn active={columns === 3} onClick={() => setColumns(3)}>
                <HugeiconsIcon icon={LayoutGridIcon} size={13} color="currentColor" strokeWidth={1.5} />
              </ColBtn>
              <ColBtn active={columns === 4} onClick={() => setColumns(4)}>
                <HugeiconsIcon icon={Menu01Icon} size={13} color="currentColor" strokeWidth={1.5} />
              </ColBtn>
            </div>
          )}
        </div>
      )}

      {/* ── Grid ── */}
      <motion.div
        layout
        className={cn(
          "grid gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 transition-all duration-300",
          COL_CLASSES[columns]
        )}
      >
        <AnimatePresence mode="popLayout">
          {isDataLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <ProductSkeleton key={`sk-${i}`} />
              ))
            : products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={Math.min(i * 0.06, 0.36)}
                  onQuickView={setQuickViewSlug}
                />
              ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty state ── */}
      {!isDataLoading && products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
        >
          <div className="w-12 h-12 border border-primary/15 flex items-center justify-center">
            <HugeiconsIcon icon={LayoutGridIcon} size={20} color="currentColor" strokeWidth={1} className="text-primary/30" />
          </div>
          <p className="font-heading text-xl text-primary/40">No products found</p>
          <p className="text-xs text-primary/30 font-body tracking-wide">Try adjusting your filters</p>
        </motion.div>
      )}

      {/* ── Quick view modal ── */}
      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </div>
  );
}