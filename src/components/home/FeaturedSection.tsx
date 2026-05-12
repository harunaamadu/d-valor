"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";
import { SectionTitle } from "@/components/ui/custom/section-title";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import QuickViewModal from "@/components/product/QuickViewModal";
import type { FeaturedProduct } from "@/types/featured-product.types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FeaturedSectionProps {
  /** Pass fetched products; while undefined the skeletons render */
  products?: FeaturedProduct[];
}

// ─── Skeleton count ───────────────────────────────────────────────────────────

const SKELETON_COUNT = 4;

// ─── Product Grid ─────────────────────────────────────────────────────────────

function ProductGrid({
  products,
  onQuickView,
}: {
  products?: FeaturedProduct[];
  onQuickView: (slug: string) => void;
}) {
  // Loading — render skeletons that match ProductCard's aspect-3/4 layout
  if (!products) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Loaded — stagger cards into view via StaggerReveal
  return (
    <StaggerReveal
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14"
      stagger={0.08}
      delay={0.1}
      variant="slide"
      direction="up"
      threshold={0.05}
    >
      {products.map((product, i) => (
        // ProductCard handles its own motion.div + ImageReveal internally;
        // StaggerReveal injects an outer wrapper — pass delay so the card's
        // internal animation doesn't clash with the stagger.
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
          delay={Math.min(i * 0.06, 0.36)}
          onQuickView={onQuickView}
        />
      ))}
    </StaggerReveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);

  return (
    <>
      <Reveal variant="slide" direction="up" delay={0.1} threshold={0.05}>
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full py-12 md:py-16 overflow-hidden"
        >
          <div className="wrapper">
            {/* Section header — eyebrow + heading word-reveal + "View all" hint */}
            <SectionTitle
              eyebrow="Handpicked for You"
              heading="Featured Products"
              hint="View all"
              hintHref="/shop"
            />

            {/* Grid — skeletons while loading, staggered cards when ready */}
            <ProductGrid
              products={products}
              onQuickView={setQuickViewSlug}
            />
          </div>
        </motion.section>
      </Reveal>

      {/* QuickViewModal lives outside the section so it can be fixed/absolute
          without being clipped by overflow-hidden on the section */}
      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </>
  );
}