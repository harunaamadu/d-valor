"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, OkFingerIcon } from "@hugeicons/core-free-icons";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "../animations/reveal";
import { sectionVariants } from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  name: string;
}

interface Category {
  href: string;
  label: string;
  description?: string;
  imageUrl?: string;
}

// ─── Mock user (replace with your auth session) ───────────────────────────────

const user: User = { name: "haruna" };


// ─── Personalised "For You" card ──────────────────────────────────────────────

function ForYouCard({ name }: { name: string }) {
  return (
    <CarouselItem className="basis-4/5 xs:basis-3/5 sm:basis-2/5 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Link
        href={`/recommended-for-${name}`}
        className={cn(
          "group relative flex flex-col items-start justify-between",
          "w-full aspect-3/4 p-5 overflow-hidden select-none",
          "border border-accent/30 hover:border-accent",
          "bg-surface transition-all duration-500",
        )}
      >
        {/* Corner bracket — top right */}
        <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/40 group-hover:border-accent transition-colors duration-300" />

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 border border-primary/10 group-hover:border-accent/50 bg-primary/5 transition-all duration-300">
          <HugeiconsIcon
            icon={OkFingerIcon}
            size={22}
            color="currentColor"
            strokeWidth={1.5}
            className="text-primary"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-[0.18em] uppercase font-body text-primary/40">
            Curated for
          </p>
          <p className="font-heading text-2xl leading-tight text-primary capitalize">
            {name}
          </p>
          <p className="text-xs font-body text-primary/50 leading-relaxed mt-1 max-w-35">
            Picks tailored to your taste &amp; history
          </p>
        </div>

        {/* CTA arrow */}
        <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-body text-accent">
          <span>Explore</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={14}
            color="currentColor"
            strokeWidth={2}
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          />
        </div>

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>
    </CarouselItem>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <CarouselItem className="basis-4/5 xs:basis-3/5 sm:basis-2/5 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Link
        href={cat.href}
        className={cn(
          "group relative flex flex-col justify-end",
          "w-full aspect-3/4 p-5 overflow-hidden select-none",
          "text-neutral-100",
          "transition-all duration-500",
        )}
      >
        {/* Background image */}
        {cat.imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={cat.imageUrl}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        )}

        {/* linear overlays */}
        <div className="absolute inset-0 z-1 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 z-1 bg-linear-to-b from-black/20 to-transparent" />

        {/* Hover tint */}
        <div className="absolute inset-0 z-2 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Corner accent line — top left */}
        <span className="absolute top-3 left-3 z-3 w-4 h-4 border-t border-l border-white/30 group-hover:border-accent transition-colors duration-300" />

        {/* Content */}
        <div className="relative z-3 flex flex-col gap-2">
          {/* Description — slides up on hover */}
          <div className="overflow-hidden">
            <p
              className={cn(
                "text-xs font-body leading-relaxed text-white/70",
                "max-h-0 opacity-0 -translate-y-2",
                "group-hover:max-h-16 group-hover:opacity-100 group-hover:translate-y-0",
                "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "line-clamp-3",
              )}
            >
              {cat.description}
            </p>
          </div>

          {/* Label row */}
          <div className="flex items-end justify-between">
            <h3 className="font-heading text-2xl leading-tight">{cat.label}</h3>
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 border border-white/30",
                "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                "group-hover:border-accent transition-all duration-300",
              )}
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                color="currentColor"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </Link>
    </CarouselItem>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AUTOPLAY_DELAY = 3200;

export default function CategorySection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const autoplay = React.useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  // Sync indicator
  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full py-8 md:py-12 overflow-hidden"
    >
      {/* ── Carousel — bleeds past wrapper intentionally ── */}
      <Reveal variant="slide" direction="up" delay={0.3} threshold={0.05}>
      <div className="wrapper">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {/* Personalised card */}
            <ForYouCard name={user.name} />

            {/* Category cards */}
            {(CATEGORIES as Category[]).map((cat) => (
              <CategoryCard key={cat.href} cat={cat} />
            ))}
          </CarouselContent>

          {/* Nav arrows — styled to match brand */}
          <Reveal variant="fade" delay={0.5}>
            <div className="flex items-center gap-3 mt-8">
              {/* Progress dots */}
              <div className="flex items-center gap-2 flex-1">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "transition-all duration-400 bg-accent hover:bg-primary/50",
                      i === current ? "w-6 h-1 bg-primary" : "w-1.5 h-1.5",
                    )}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  className={cn(
                    "static translate-y-0",
                    "w-10 h-10 border border-accent hover:border-primary/20",
                    "bg-transparent hover:bg-accent/10",
                    "text-primary/60 hover:text-primary",
                    "transition-all duration-300",
                  )}
                />
                <CarouselNext
                  className={cn(
                    "static translate-y-0",
                    "w-10 h-10 border border-accent hover:border-primary/20",
                    "bg-transparent hover:bg-accent/10",
                    "text-primary/60 hover:text-primary",
                    "transition-all duration-300",
                  )}
                />
              </div>
            </div>
          </Reveal>
        </Carousel>
      </div>
      </Reveal>
    </motion.section>
  );
}
