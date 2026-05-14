"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";

import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import ActiveFilters from "@/components/shop/ActiveFilters";
import FilterPanel, { FilterState } from "@/components/shop/FilterPanel";
import PaginationControls from "@/components/shop/PaginationControls";
import SortSelect, { SortOption } from "@/components/shop/SortSelect";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";

import { FAKE_FEATURED_PRODUCTS } from "@/data/fake-products";
import type { FeaturedProduct } from "@/types/featured-product.types";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 12;

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  colors: [],
  sizes: [],
  priceRange: [0, 1000],
  inStockOnly: false,
  tags: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyFilters(
  products: FeaturedProduct[],
  filters: FilterState,
  category?: string,
): FeaturedProduct[] {
  return products.filter((p) => {
    // URL-level category (from /shop/[category])
    if (category) {
      const productCategory = (p as any).category?.toLowerCase().replace(/\s+/g, "-");
      if (productCategory && productCategory !== category) return false;
    }

    // Tag filter (New, Sale, Bestseller, Limited)
    if (filters.tags.length > 0 && (!p.tag || !filters.tags.includes(p.tag))) {
      return false;
    }

    // Price range
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }

    // Color filter
    if (filters.colors.length > 0) {
      const productColors = (p as any).colors?.map((c: any) =>
        c.label?.toLowerCase(),
      ) ?? [];
      const hasMatch = filters.colors.some((fc) =>
        productColors.includes(fc.toLowerCase()),
      );
      if (!hasMatch) return false;
    }

    // Size filter
    if (filters.sizes.length > 0) {
      const productSizes = (p as any).sizes?.map((s: any) => s.label) ?? [];
      const hasMatch = filters.sizes.some((fs) => productSizes.includes(fs));
      if (!hasMatch) return false;
    }

    // In stock
    if (filters.inStockOnly && (p.stock === 0)) return false;

    return true;
  });
}

function applySort(products: FeaturedProduct[], sort: SortOption): FeaturedProduct[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":   return a.price - b.price;
      case "price-desc":  return b.price - a.price;
      case "rating":      return (b.rating ?? 0) - (a.rating ?? 0);
      case "popular":     return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case "oldest":      return a.id.localeCompare(b.id);
      case "newest":
      default:            return b.id.localeCompare(a.id);
    }
  });
}

function paginate<T>(arr: T[], page: number, perPage: number): T[] {
  return arr.slice((page - 1) * perPage, page * perPage);
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Reveal variant="fade" duration={0.5} className="flex flex-col items-center justify-center py-24 gap-5 text-center">
      <div className="w-12 h-12 border border-primary/10 flex items-center justify-center">
        <HugeiconsIcon icon={FilterIcon} size={18} strokeWidth={1} className="text-primary/25" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-heading text-xl text-primary/50">No products found</p>
        <p className="text-xs font-body text-primary/30 tracking-wide">
          Try adjusting your filters or browse all products.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-xs tracking-[0.2em] uppercase font-body border border-primary/15 px-5 py-2.5 text-primary/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
      >
        Clear Filters
      </button>
    </Reveal>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ShopContentProps {
  onQuickView: (slug: string) => void;
  category?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShopContent({ onQuickView, category }: ShopContentProps) {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortOption>("newest");
  const [page, setPage] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Reset to page 1 whenever filters or sort change
  React.useEffect(() => { setPage(1); }, [filters, sort]);

  // Derive products
  const filtered  = applyFilters(FAKE_FEATURED_PRODUCTS, filters, category);
  const sorted    = applySort(filtered, sort);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PRODUCTS_PER_PAGE));
  const pageSlice = paginate(sorted, page, PRODUCTS_PER_PAGE);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.tags.length > 0 ||
    filters.inStockOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div className="flex flex-col gap-8">

      {/* ── Top bar: count + mobile filter btn + sort ── */}
      <Reveal variant="fade" duration={0.45}>
        <div className="flex items-center justify-between gap-4">

          {/* Left: count + mobile filter trigger */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-body text-primary/50 tracking-wide">
              <span className="text-primary font-medium">{sorted.length}</span> products
            </p>

            {/* Mobile filter button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-body tracking-wide border border-primary/15 px-3 py-2 text-primary/50 hover:text-primary hover:border-primary/35 transition-all duration-200"
            >
              <HugeiconsIcon icon={FilterIcon} size={12} strokeWidth={1.5} />
              Filters
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 bg-accent shrink-0" />
              )}
            </button>
          </div>

          {/* Right: sort */}
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </Reveal>

      {/* ── Active filter pills ── */}
      <ActiveFilters filters={filters} onChange={setFilters} />

      {/* ── Main layout: sidebar + grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

        {/* Sidebar */}
        <div className="lg:sticky lg:top-28 h-fit">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </div>

        {/* Product area */}
        <div className="flex flex-col gap-10">

          {pageSlice.length === 0 ? (
            <EmptyState onReset={() => setFilters(DEFAULT_FILTERS)} />
          ) : (
            <StaggerReveal
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-12"
              stagger={0.06}
              delay={0.05}
              variant="slide"
              direction="up"
              threshold={0.04}
            >
              {pageSlice.map((product, i) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  productId={product.productId}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  comparePrice={product.comparePrice}
                  imageUrl={product.imageUrl}
                  hoverImageUrl={product.hoverImageUrl}
                  tag={product.tag}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  variantId={product.variantId}
                  stock={product.stock}
                  delay={Math.min(i * 0.05, 0.3)}
                  onQuickView={onQuickView}
                />
              ))}
            </StaggerReveal>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Reveal variant="fade" delay={0.2}>
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}