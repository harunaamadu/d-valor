"use client";

import Image from "next/image";
import Link from "next/link";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ProductQuantityInput from "@/components/product/ProductQuantityInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore, type CartItem as CartLineItem } from "@/store/cart.store";

interface CartItemProps {
  item: CartLineItem;
  compact?: boolean;
  className?: string;
}

const formatPrice = (value: number) =>
  `GH₵ ${value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function CartItem({
  item,
  compact = false,
  className,
}: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const lineTotal = item.price * item.quantity;
  const isLowStock = item.stock > 0 && item.stock <= 3;

  return (
    <article
      className={cn(
        "grid gap-4 border border-primary/10 bg-background/70 p-4",
        compact
          ? "grid-cols-[84px_1fr] items-start"
          : "grid-cols-1 items-start sm:grid-cols-[110px_1fr]",
        className,
      )}
    >
      <Link
        href={`/product/${item.slug}`}
        className={cn(
          "relative block overflow-hidden bg-primary/5",
          compact ? "aspect-square" : "aspect-[4/5] sm:aspect-square",
        )}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={compact ? "84px" : "(max-width: 640px) 100vw, 110px"}
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <Link
              href={`/product/${item.slug}`}
              className="font-heading text-base text-primary transition-colors hover:text-accent"
            >
              {item.name}
            </Link>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary/55">
              {item.size && <span>Size: {item.size}</span>}
              {item.color && (
                <span className="inline-flex items-center gap-1.5">
                  {item.colorHex && (
                    <span
                      className="size-2.5 border border-primary/10"
                      style={{ backgroundColor: item.colorHex }}
                    />
                  )}
                  Color: {item.color}
                </span>
              )}
              {!item.size && !item.color && <span>Standard selection</span>}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 text-primary/45 hover:text-destructive"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.8} />
          </Button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-primary">
              {formatPrice(item.price)}
            </div>
            <ProductQuantityInput
              value={item.quantity}
              min={1}
              max={item.stock}
              size={compact ? "sm" : "md"}
              onChange={(quantity) => updateQuantity(item.id, quantity)}
            />
            <div className="text-xs text-primary/55">
              {isLowStock ? (
                <span className="text-destructive">
                  Only {item.stock} left in stock
                </span>
              ) : (
                <span>Stock available: {item.stock}</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.18em] text-primary/45">
              Line total
            </div>
            <div className="font-heading text-lg text-primary">
              {formatPrice(lineTotal)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
