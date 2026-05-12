"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroSlide {
  id: number;
  eyebrow: string;
  headline: string[]; // split into lines for staggered reveal
  subtext: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tag: string; // floating label e.g. "New Arrival"
  bg: string; // background image path
  product?: string; // product image path (right-aligned)
  productAlt?: string;
  accentColor: string; // per-slide gold tint variation
}

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Ritual Collection — 2025",
    headline: ["The Art of", "Luminous Skin"],
    subtext:
      "A curated ceremony of rare botanicals and advanced actives, distilled into your daily ritual.",
    cta: { label: "Shop the Collection", href: "/shop" },
    secondaryCta: { label: "Discover More", href: "/collections/ritual" },
    tag: "New Arrival",
    bg: "/images/hero/banner_1.png",
    product: "/images/hero/hero-product-1.png",
    productAlt: "D'valor Luminous Serum",
    accentColor: "#c9a96e",
  },
  {
    id: 2,
    eyebrow: "Velour Skin Series",
    headline: ["Softness", "Redefined"],
    subtext:
      "Whipped textures enriched with Ghanaian shea and cold-pressed rosehip. Luxury your skin can feel.",
    cta: { label: "Explore the Series", href: "/shop" },
    secondaryCta: { label: "Learn the Ritual", href: "/collections/velour" },
    tag: "Bestseller",
    bg: "/images/hero/banner_2.png",
    product: "/images/hero/hero-product-2.png",
    productAlt: "D'valor Velour Body Butter",
    accentColor: "#d4b896",
  },
  {
    id: 3,
    eyebrow: "Radiance Edit",
    headline: ["Glow From", "Within"],
    subtext:
      "Vitamin C meets 24k gold. A brightening ritual that turns heads before you say a word.",
    cta: { label: "Shop Radiance", href: "/shop" },
    secondaryCta: { label: "See Ingredients", href: "/collections/radiance" },
    tag: "Limited Edition",
    bg: "/images/hero/banner_3.png",
    product: "/images/hero/hero-product-3.png",
    productAlt: "D'valor Radiance Elixir",
    accentColor: "#e2c97e",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.35 } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.4 } },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SlideTag({ label }: { label: string }) {
  return (
    <motion.span
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-accent border border-accent/40 px-3 py-1.5"
    >
      <span className="w-1.5 h-1.5 bg-accent" />
      {label}
    </motion.span>
  );
}

function SlideEyebrow({ text }: { text: string }) {
  return (
    <motion.p
      variants={fadeUp}
      custom={0.1}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-xs tracking-[0.25em] uppercase text-primary/50"
    >
      {text}
    </motion.p>
  );
}

function SlideHeadline({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.h1
            variants={fadeUp}
            custom={0.15 + i * 0.1}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-primary"
          >
            {line}
          </motion.h1>
        </div>
      ))}
    </div>
  );
}

function SlideDivider() {
  return (
    <motion.div
      variants={lineReveal}
      initial="hidden"
      animate="visible"
      className="h-px w-16 bg-accent"
    />
  );
}

function SlideSubtext({ text }: { text: string }) {
  return (
    <motion.p
      variants={fadeUp}
      custom={0.4}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-sm sm:text-base text-primary/60 max-w-sm leading-relaxed"
    >
      {text}
    </motion.p>
  );
}

function SlideCTAs({
  cta,
  secondaryCta,
  accentColor,
}: Pick<HeroSlide, "cta" | "secondaryCta" | "accentColor">) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.5}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-wrap items-center gap-4"
    >
      {/* Primary CTA */}
      <Link
        href={cta.href}
        className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.18em] uppercase px-7 py-3 overflow-hidden transition-all duration-300"
      >
        <span
          className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ backgroundColor: accentColor }}
        />
        <span className="relative z-10">{cta.label}</span>
        <span className="relative z-10 w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
      </Link>

      {/* Secondary CTA */}
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className="group inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-primary/60 hover:text-primary transition-colors duration-300"
        >
          {secondaryCta.label}
          <span className="w-3 h-px bg-current group-hover:w-5 transition-all duration-300" />
        </Link>
      )}
    </motion.div>
  );
}

function SlideProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full h-full flex items-end justify-center"
    >
      {/* Decorative glow behind product */}
      <div className="absolute bottom-0 right-0 w-4/5 h-4/5 bg-accent/10 blur-3xl" />

      {/* Floating accent ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 border border-accent/15"
        style={{ borderRadius: "40% 60% 55% 45% / 45% 55% 65% 35%" }}
      />

      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-bottom drop-shadow-2xl"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}

// ─── Pagination Dots ──────────────────────────────────────────────────────────

function PaginationDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="group relative flex items-center justify-center w-6 h-6"
        >
          <span
            className={`block transition-all duration-500 ${
              i === active
                ? "w-6 h-px bg-primary"
                : "w-1.5 h-1.5 bg-primary/30 group-hover:bg-primary/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function SlideProgress({ duration = 6000 }: { duration?: number }) {
  return (
    <div className="w-24 h-0.75 bg-accent/30 overflow-hidden">
      <motion.div
        key={Date.now()} // remounts on slide change
        className="h-full bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="hidden lg:flex flex-col items-center gap-2"
    >
      <div className="h-12 w-px overflow-hidden bg-primary/10">
        <motion.div
          className="h-1/2 w-full bg-accent"
          animate={{ y: ["−100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-xs tracking-[0.2em] uppercase text-primary [writing-mode:vertical-rl]">
        Scroll
      </span>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AUTOPLAY_DELAY = 6000;

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplay = React.useMemo(
    () => Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
    [],
  );

  // Sync dot indicator with carousel
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-145 max-h-240 overflow-hidden bg-backgound">
      {/* ── Shadcn Carousel (handles swipe + autoplay) ── */}
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        opts={{ loop: true, align: "start" }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((s) => (
            <CarouselItem
              key={s.id}
              className="pl-0 relative w-full h-screen min-h-145 max-h-screen"
            >
              {/* Background */}
              <div className="absolute inset-0 z-0 wrapper">
                <Image
                  src={s.bg}
                  alt=""
                  fill
                  className="object-cover aspect-video! object-center"
                  priority={s.id === 1}
                  sizes="100vw"
                />
                {/* Layered overlays for depth */}
                <div className="absolute inset-0 bg-backgound/60" />
                <div className="absolute inset-0 bg-linear-to-r from-backgound/90 via-backgound/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-backgound/80 via-transparent to-transparent" />
              </div>

              {/* Grain texture overlay */}
              <div
                className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
                }}
              />

              {/* Content grid */}
              <div className="wrapper relative z-10 h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0">
                {/* ── Left: Text ── */}
                <div className="flex flex-col justify-center gap-6 pt-24 pb-16 lg:py-0">
                  <AnimatePresence mode="wait">
                    {current === s.id - 1 && (
                      <motion.div
                        key={`content-${s.id}`}
                        className="flex flex-col gap-5"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <SlideTag label={s.tag} />
                        <SlideEyebrow text={s.eyebrow} />
                        <SlideHeadline lines={s.headline} />
                        <SlideDivider />
                        <SlideSubtext text={s.subtext} />
                        <SlideCTAs
                          cta={s.cta}
                          secondaryCta={s.secondaryCta}
                          accentColor={s.accentColor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Right: Product Image ── */}
                <div className="hidden lg:block relative h-full">
                  <AnimatePresence mode="wait">
                    {current === s.id - 1 && s.product && (
                      <SlideProductImage
                        key={`product-${s.id}`}
                        src={s.product}
                        alt={s.productAlt ?? ""}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile product image (bottom peek) */}
              <div className="absolute bottom-0 right-0 w-48 h-64 z-10 lg:hidden">
                <AnimatePresence mode="wait">
                  {current === s.id - 1 && s.product && (
                    <SlideProductImage
                      key={`product-mobile-${s.id}`}
                      src={s.product}
                      alt={s.productAlt ?? ""}
                    />
                  )}
                </AnimatePresence>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ── Bottom Bar: slide counter + dots + progress ── */}
      <div className="absolute bottom-2 left-0 right-0 z-20">
        <div className="wrapper flex items-center justify-between">
          {/* Left: counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.15em] text-primary">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="w-px h-4 bg-primary/20" />
            <span className="text-xs tracking-[0.15em] text-primary/60">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Center: dots */}
          <PaginationDots
            count={slides.length}
            active={current}
            onSelect={goTo}
          />

          {/* Right: progress + scroll */}
          <div className="flex items-end gap-6">
            <SlideProgress duration={AUTOPLAY_DELAY} key={current} />
            <ScrollIndicator />
          </div>
        </div>
      </div>

      {/* ── Decorative vertical text (desktop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center gap-2"
      >
        <div className="w-px h-16 bg-primary/15" />
        <span className="text-xs tracking-[0.3em] uppercase text-primary/30 [writing-mode:vertical-rl]">
          D&apos;valor Beauty
        </span>
      </motion.div>

      {/* ── Decorative accent corner ── */}
      <div className="absolute top-0 right-0 z-10 w-32 h-32 pointer-events-none hidden lg:block">
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-accent/30" />
      </div>
    </section>
  );
}
