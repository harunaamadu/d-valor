"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";
import { SectionTitle } from "@/components/ui/custom/section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ProductCard, { type ProductCardProps } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import QuickViewModal from "./QuickViewModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RelatedProductsProps {
  products?: ProductCardProps[];
  isLoading?: boolean;
  title?: string;
  eyebrow?: string;
  className?: string;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function RelatedSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse w-full">
      <Skeleton className="w-full aspect-3/4" />
      <Skeleton className="h-2.5 w-20" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RelatedProducts({
  products,
  isLoading = false,
  title = "You May Also Like",
  eyebrow = "More to Discover",
  className,
}: RelatedProductsProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [quickViewSlug, setQuickViewSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  const isDataLoading = isLoading || !products;
  const displayItems = isDataLoading
    ? Array.from({ length: 5 })
    : products;

  if (!isDataLoading && products.length === 0) return null;

  return (
    <section className={cn("w-full py-12 md:py-16", className)}>
      <div className="wrapper">
        {/* Section title */}
        <SectionTitle
          eyebrow={eyebrow}
          heading={title}
          hint="View all"
          hintHref="/shop"
          mb="mb-8 md:mb-12"
        />

        {/* Carousel */}
        <Reveal variant="slide" direction="up" delay={0.2} threshold={0.05}>
          <Carousel
            setApi={setApi}
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {isDataLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem
                      key={`sk-${i}`}
                      className="pl-4 md:pl-6 basis-3/4 xs:basis-3/5 sm:basis-2/5 md:basis-1/3 lg:basis-1/4"
                    >
                      <RelatedSkeleton />
                    </CarouselItem>
                  ))
                : products.map((product, i) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-4 md:pl-6 basis-3/4 xs:basis-3/5 sm:basis-2/5 md:basis-1/3 lg:basis-1/4"
                    >
                      <ProductCard
                        {...product}
                        delay={i * 0.05}
                        onQuickView={setQuickViewSlug}
                      />
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation row */}
          {!isDataLoading && count > 1 && (
            <div className="flex items-center gap-3 mt-8">
              {/* Progress dots */}
              <div className="flex items-center gap-1.5 flex-1">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "transition-all duration-400",
                      i === current ? "w-5 h-px bg-primary" : "w-1 h-1 rounded-full bg-primary/20 hover:bg-primary/50"
                    )}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  className={cn(
                    "static translate-y-0",
                    "w-9 h-9 border border-primary/20 hover:border-primary/50",
                    "bg-transparent hover:bg-primary/5",
                    "text-primary/50 hover:text-primary",
                    "transition-all duration-300"
                  )}
                />
                <CarouselNext
                  className={cn(
                    "static translate-y-0",
                    "w-9 h-9 border border-primary/20 hover:border-primary/50",
                    "bg-transparent hover:bg-primary/5",
                    "text-primary/50 hover:text-primary",
                    "transition-all duration-300"
                  )}
                />
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {/* Quick view */}
      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </section>
  );
}