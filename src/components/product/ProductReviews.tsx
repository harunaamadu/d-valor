"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  ThumbsUpIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { StaggerReveal, Reveal } from "@/components/animations/reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  author: string;
  /** ISO date string */
  date: string;
  rating: number;
  title?: string;
  body: string;
  verified?: boolean;
  helpful?: number;
  /** User's skin type or relevant attribute */
  attribute?: string;
  images?: string[];
}

interface ProductReviewsProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  /** Breakdown per star (5..1) */
  ratingBreakdown?: Record<number, number>;
  className?: string;
}

// ─── Star display ─────────────────────────────────────────────────────────────

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={size}
          strokeWidth={i < rating ? 0 : 1.5}
          color="currentColor"
          className={i < rating ? "text-accent fill-accent" : "text-primary/20"}
        />
      ))}
    </div>
  );
}

// ─── Rating summary ───────────────────────────────────────────────────────────

function RatingSummary({
  average,
  total,
  breakdown,
}: {
  average: number;
  total: number;
  breakdown: Record<number, number>;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-8 border-b border-primary/10">
      {/* Big number */}
      <div className="flex flex-col items-center justify-center gap-1 shrink-0">
        <span className="font-heading text-6xl text-primary leading-none">
          {average.toFixed(1)}
        </span>
        <Stars rating={average} size={14} />
        <span className="text-xs  text-primary/60 tracking-wide mt-1">
          {total.toLocaleString()} reviews
        </span>
      </div>

      {/* Bar breakdown */}
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = breakdown[star] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs  text-primary/50 w-3 shrink-0">{star}</span>
              <HugeiconsIcon icon={StarIcon} size={10} strokeWidth={0} color="currentColor" className="text-accent fill-accent shrink-0" />
              <div className="flex-1 h-1 bg-primary/8 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (5 - star) * 0.07 }}
                  className="h-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px]  text-primary/35 w-7 text-right shrink-0">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = React.useState(review.helpful ?? 0);
  const [voted, setVoted] = React.useState(false);
  const date = new Date(review.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 pb-8 border-b border-primary/8 last:border-0 last:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <Stars rating={review.rating} />
            {review.verified && (
              <span className="text-[9px] tracking-[0.18em] uppercase  text-emerald-600 bg-emerald-500/10 px-2 py-0.5">
                Verified Purchase
              </span>
            )}
          </div>
          {review.title && (
            <p className="font-heading text-base text-primary leading-tight">
              {review.title}
            </p>
          )}
        </div>
        <span className="text-[10px]  text-primary/30 tracking-wide shrink-0">
          {date}
        </span>
      </div>

      {/* Body */}
      <p className="text-sm  text-primary/65 leading-relaxed">
        {review.body}
      </p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {review.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`Review image ${i + 1}`}
              className="w-16 h-16 object-cover border border-primary/10 shrink-0"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs  text-primary/50">{review.author}</span>
          {review.attribute && (
            <>
              <span className="text-primary/20">·</span>
              <span className="text-xs  text-primary/35">{review.attribute}</span>
            </>
          )}
        </div>

        <button
          onClick={() => {
            if (!voted) { setHelpful((h) => h + 1); setVoted(true); }
          }}
          className={cn(
            "flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase  transition-colors duration-200",
            voted ? "text-accent" : "text-primary/30 hover:text-primary/60"
          )}
          aria-label="Mark as helpful"
        >
          <HugeiconsIcon icon={ThumbsUpIcon} size={12} color="currentColor" strokeWidth={1.5} />
          Helpful{helpful > 0 ? ` (${helpful})` : ""}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_SHOW = 4;

export default function ProductReviews({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  ratingBreakdown = {},
  className,
}: ProductReviewsProps) {
  const [showAll, setShowAll] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<"recent" | "helpful" | "high" | "low">("recent");

  const sorted = React.useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "helpful") return (b.helpful ?? 0) - (a.helpful ?? 0);
      if (sortBy === "high") return b.rating - a.rating;
      if (sortBy === "low") return a.rating - b.rating;
      return 0;
    });
  }, [reviews, sortBy]);

  const visible = showAll ? sorted : sorted.slice(0, INITIAL_SHOW);

  return (
    <div id="reviews" className={cn("flex flex-col gap-8", className)}>
      {/* ── Section header ── */}
      <Reveal variant="slide" direction="up" delay={0.05} threshold={0.05}>
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-3xl text-primary">Customer Reviews</h2>
          <button className="hidden md:flex items-center gap-2 text-xs tracking-[0.18em] uppercase  border border-primary/20 px-4 py-2.5 hover:border-primary/50 hover:bg-primary/4 transition-all duration-300 text-primary/60 hover:text-primary">
            <HugeiconsIcon icon={PlusSignIcon} size={12} color="currentColor" strokeWidth={2} />
            Write a Review
          </button>
        </div>
      </Reveal>

      {/* ── Rating summary ── */}
      {totalReviews > 0 && (
        <Reveal variant="fade" delay={0.1} threshold={0.05}>
          <RatingSummary
            average={averageRating}
            total={totalReviews}
            breakdown={ratingBreakdown}
          />
        </Reveal>
      )}

      {/* ── Sort row ── */}
      {reviews.length > 1 && (
        <Reveal variant="fade" delay={0.15} threshold={0.05}>
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs  text-primary/35 tracking-wide mr-2">Sort:</span>
            {(["recent", "helpful", "high", "low"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={cn(
                  "text-[10px] tracking-[0.15em] uppercase  px-3 py-1.5 border transition-all duration-200",
                  sortBy === opt
                    ? "border-primary/50 bg-primary/5 text-primary"
                    : "border-primary/10 text-primary/35 hover:border-primary/30 hover:text-primary/60"
                )}
              >
                {opt === "recent" ? "Most Recent" : opt === "helpful" ? "Most Helpful" : opt === "high" ? "Highest" : "Lowest"}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Reviews list ── */}
      {reviews.length === 0 ? (
        <Reveal variant="fade" threshold={0.05}>
          <div className="flex flex-col items-center justify-center py-16 gap-4 border border-dashed border-primary/15">
            <Stars rating={0} size={24} />
            <p className="font-heading text-xl text-primary/60">No reviews yet</p>
            <p className="text-xs text-primary/25 ">Be the first to share your experience</p>
            <button className="mt-2 text-xs tracking-[0.18em] uppercase  border border-primary/20 px-5 py-2.5 hover:border-primary/50 transition-colors duration-300 text-primary/60 hover:text-primary">
              Write a Review
            </button>
          </div>
        </Reveal>
      ) : (
        <StaggerReveal
          stagger={0.07}
          variant="slide"
          direction="up"
          distance={20}
          threshold={0.05}
          className="flex flex-col gap-0"
        >
          <AnimatePresence>
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </AnimatePresence>
        </StaggerReveal>
      )}

      {/* ── Show more ── */}
      {reviews.length > INITIAL_SHOW && (
        <Reveal variant="fade" threshold={0.05}>
          <button
            onClick={() => setShowAll((p) => !p)}
            className="w-full py-3 border border-primary/15 text-xs tracking-[0.2em] uppercase  text-primary/45 hover:text-primary hover:border-primary/60 hover:bg-primary/3 transition-all duration-300"
          >
            {showAll
              ? "Show Less"
              : `Show All ${reviews.length} Reviews`}
          </button>
        </Reveal>
      )}

      {/* ── Mobile write CTA ── */}
      <Reveal variant="fade" threshold={0.05} className="md:hidden">
        <button className="w-full py-3 border border-primary/20 text-xs tracking-[0.18em] uppercase  text-primary/50 hover:text-primary hover:border-primary/60 transition-all duration-300 flex items-center justify-center gap-2">
          <HugeiconsIcon icon={PlusSignIcon} size={12} color="currentColor" strokeWidth={2} />
          Write a Review
        </button>
      </Reveal>
    </div>
  );
}