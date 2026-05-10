import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductSkeletonProps {
  /** Show compact version (less height) */
  compact?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductSkeleton({ compact, className }: ProductSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-3 animate-pulse", className)}>
      {/* Image */}
      <Skeleton className={cn("w-full", compact ? "aspect-square" : "aspect-3/4")} />
      {/* Stars */}
      <Skeleton className="h-2.5 w-20" />
      {/* Name */}
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      {/* Price */}
      <Skeleton className="h-3.5 w-1/3" />
    </div>
  );
}