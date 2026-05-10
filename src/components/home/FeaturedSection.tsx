"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";
import { SectionTitle } from "@/components/ui/custom/section-title";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import QuickViewModal from "@/components/product/QuickViewModal";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedProduct {
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
  stock?: number;
}

interface FeaturedSectionProps {
  products?: FeaturedProduct[];
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

const SKELETON_COUNT = 4;

function ProductGrid({
  products,
  onQuickView,
}: {
  products?: FeaturedProduct[];
  onQuickView: (slug: string) => void;
}) {
  if (!products) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

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
        <ProductCard
          key={product.id}
          {...product}
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
    <Reveal variant="slide" direction="up" delay={0.1} threshold={0.05}>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full py-12 md:py-16 overflow-hidden"
      >
        <div className="wrapper">
          <SectionTitle
            eyebrow="Handpicked for You"
            heading="Featured Products"
            hint="View all"
            hintHref="/shop"
          />

          <ProductGrid products={products} onQuickView={setQuickViewSlug} />
        </div>
      </motion.section>

      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </Reveal>
  );
}