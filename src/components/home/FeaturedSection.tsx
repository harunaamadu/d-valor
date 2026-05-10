"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";
import { SectionTitle } from "@/components/ui/custom/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  tag?: string;
  slug: string;
}

interface FeaturedSectionProps {
  /** Pass your fetched products; while undefined the skeletons render */
  products?: FeaturedProduct[];
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-3/4" />
      {/* Tag pill */}
      <Skeleton className="h-4 w-14" />
      {/* Name */}
      <Skeleton className="h-5 w-3/4" />
      {/* Price */}
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <a
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col gap-3 select-none",
        "transition-all duration-300",
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-3/4 overflow-hidden bg-primary/5">
        {/* Tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 text-xs tracking-[0.15em] uppercase font-body bg-surface text-primary px-2.5 py-1">
            {product.tag}
          </span>
        )}

        {/* Placeholder — replace with Next Image */}
        <div className="absolute inset-0 bg-primary/5 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        {/* <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" sizes="(max-width:640px) 80vw, 25vw" /> */}

        {/* Corner bracket */}
        <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/0 group-hover:border-accent/60 transition-colors duration-500" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-[0.15em] uppercase font-body text-primary/40">
          {product.tag ?? "D'valor"}
        </p>
        <h3 className="font-heading text-xl leading-tight text-primary group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm font-body text-primary/60">
          GH₵ {product.price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </a>
  );
}

// ─── Grid layout ─────────────────────────────────────────────────────────────

const SKELETON_COUNT = 4;

function ProductGrid({ products }: { products?: FeaturedProduct[] }) {
  const isLoading = !products;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductCardSkeleton key={i} />
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StaggerReveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeaturedSection({ products }: FeaturedSectionProps) {
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

          {/* ── Title ── */}
          <SectionTitle
            eyebrow="Handpicked for You"
            heading="Featured Products"
            hint="View all"
            hintHref="/shop"
          />

          {/* ── Grid ── */}
          <ProductGrid products={products} />

        </div>
      </motion.section>
    </Reveal>
  );
}