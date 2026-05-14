"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build a page number array with ellipsis placeholders (-1) */
function buildPages(current: number, total: number): (number | -1)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | -1)[] = [1];

  if (current > 3) pages.push(-1);

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push(-1);
  pages.push(total);

  return pages;
}

// ─── Page button ──────────────────────────────────────────────────────────────

function PageBtn({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      aria-label={`Page ${page}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center text-xs font-body tracking-wide",
        "border transition-colors duration-200",
        active
          ? "border-primary bg-primary text-surface"
          : "border-primary/12 text-primary/50 hover:border-primary/35 hover:text-primary",
      )}
    >
      {active && (
        <motion.span
          layoutId="active-page"
          className="absolute inset-0 bg-primary -z-10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {page}
    </motion.button>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowBtn({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={cn(
        "w-9 h-9 flex items-center justify-center border text-xs",
        "transition-all duration-200",
        disabled
          ? "border-primary/8 text-primary/15 cursor-not-allowed"
          : "border-primary/15 text-primary/50 hover:border-accent hover:text-accent",
      )}
    >
      <HugeiconsIcon
        icon={direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon}
        size={14}
        strokeWidth={2}
      />
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>

      {/* Progress indicator */}
      <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-body text-primary/35">
        <span>Page {currentPage}</span>
        <div className="w-16 h-px bg-primary/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={false}
            animate={{ width: `${(currentPage / totalPages) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span>{totalPages}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <ArrowBtn
          direction="prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pages.map((page, i) =>
            page === -1 ? (
              <span
                key={`ellipsis-${i}`}
                className="w-9 h-9 flex items-center justify-center text-xs font-body text-primary/25"
              >
                ···
              </span>
            ) : (
              <PageBtn
                key={page}
                page={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
              />
            ),
          )}
        </div>

        {/* Next */}
        <ArrowBtn
          direction="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>

      {/* Jump to input */}
      <div className="flex items-center gap-2 text-xs font-body text-primary/35">
        <span>Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          defaultValue={currentPage}
          key={currentPage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = parseInt((e.target as HTMLInputElement).value);
              if (val >= 1 && val <= totalPages) onPageChange(val);
            }
          }}
          className={cn(
            "w-10 h-7 text-center text-xs font-body",
            "border border-primary/15 bg-transparent text-primary",
            "outline-none focus:border-accent transition-colors duration-200",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
          )}
        />
        <span>of {totalPages}</span>
      </div>

    </div>
  );
}