"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Reveal,
  StaggerReveal,
  TextReveal,
} from "@/components/animations/reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PromoCard {
  /** e.g. "25% Discount" */
  eyebrow: string;
  /** Main headline — split across two lines */
  heading: string[];
  cta: { label: string; href: string };
  /** Card background colour (Tailwind arbitrary or CSS var) */
  bg: string;
  /** Product image — should have transparent background */
  productImage: string;
  productAlt: string;
  /** Accent colour used for the CTA button */
  accent: string;
  /** Text colour — "light" or "dark" relative to the bg */
  theme?: "light" | "dark";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROMO_CARDS: PromoCard[] = [
  {
    eyebrow: "25% Discount",
    heading: ["Cosmetic Skin", "Perfectly"],
    cta: { label: "Shop Now", href: "/shop" },
    bg: "bg-chart-2",
    productImage: "/images/promo/big-banner-1-Photoroom.png",
    productAlt: "Foundation bottles",
    accent: "bg-radial from-primary/60 to-transparent",
    theme: "dark",
  },
  {
    eyebrow: "30% Discount",
    heading: ["Hydrated Skin", "Perfectly"],
    cta: { label: "Shop Now", href: "/shop/skincare" },
    bg: "bg-chart-1",
    productImage: "/images/promo/big-banner-2-Photoroom.png",
    productAlt: "Lip balm sticks",
    accent: "bg-radial from-secondary/60 to-transparent",
    theme: "dark",
  },
];

// ─── Single Card ──────────────────────────────────────────────────────────────

function PromoCard({ card, index }: { card: PromoCard; index: number }) {
  const isDark = card.theme === "dark";
  const textColor = isDark
    ? "text-primary-foreground"
    : "text-primary-foreground/60";

  return (
    <Reveal
      variant="slide"
      direction={index === 0 ? "left" : "right"}
      duration={0.7}
      delay={index * 0.12}
      threshold={0.1}
      className="relative group flex-1 min-w-0 overflow-x-clip overflow-y-visible! pt-28!"
    >
      <div
        className={cn(
          "relative w-full grid grid-cols-2 h-48 sm:h-56 md:h-60 lg:h-64",
          card.bg,
        )}
      >
        {/* ── Subtle grain overlay ── */}
        <div
          className="absolute inset-0 z-1 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* ── Corner bracket — top left ── */}
        <span className="absolute top-4 left-4 z-3 w-3.5 h-3.5 border-t border-l border-primary-foreground/90 group-hover:border-primary/50 transition-colors duration-500" />

        {/* ── Text content ── */}
        <div className="absolute inset-0 z-2 flex flex-col justify-center pl-6 sm:pl-8 pr-[45%] gap-2.5">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
            className={cn(
              "text-[10px] tracking-[0.22em] uppercase",
              isDark ? "text-primary-foreground" : "text-primary-foreground/60",
            )}
          >
            {card.eyebrow}
          </motion.span>

          {/* Heading */}
          <div className="flex flex-col">
            {card.heading.map((line, i) => (
              <h3
                key={i}
                className={cn(
                  "font-heading font-semibold leading-[1.05]",
                  "text-2xl sm:text-3xl md:text-3xl lg:text-4xl",
                  textColor,
                )}
              >
                {line}
              </h3>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.45, delay: index * 0.12 + 0.35 }}
          >
            <Link
              href={card.cta.href}
              className={cn(
                "inline-flex items-center gap-2 mt-1",
                "text-[10px] tracking-[0.18em] uppercase ",
                "px-4 py-2 text-surface",
                "relative overflow-hidden group/btn",
                "transition-all duration-300 text-primary-foreground",
                card.accent,
              )}
            >
              {/* Hover fill */}
              <span className="absolute inset-0 translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] bg-black/20" />
              <span className="relative z-10">{card.cta.label}</span>
              <span className="relative z-10 w-3 h-px bg-current group-hover/btn:w-4 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* ── Product image — bleeds right ── */}
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.12 + 0.15,
          }}
          className="absolute right-0 bottom-0 z-2 h-[150%] w-[48%] group-hover:-translate-y-1.5 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <Image
            src={card.productImage}
            alt={card.productAlt}
            fill
            className="object-cover object-center drop-shadow-2xl"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
          />
        </motion.div>

        {/* ── Subtle radial glow behind product ── */}
        <div
          className={cn(
            "absolute right-0 bottom-0 z-1 w-56 h-56 opacity-50 blur-3xl pointer-events-none rounded-full",
            card.accent,
          )}
        />
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EditorialPromoGrid() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="wrapper">
        {/* Two-column responsive grid */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          {PROMO_CARDS.map((card, i) => (
            <PromoCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
