"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckmarkCircle02Icon,
  DiscountTag02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ClientOnly } from "@/components/common/ClientOnly";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { showToast } from "@/lib/toast";
import { useCartStore } from "@/store/cart.store";

const COUPONS: Record<string, number> = {
  WELCOME10: 10,
  GLOW15: 15,
  RITUAL20: 20,
};

const formatPrice = (value: number) =>
  `GH₵ ${value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function CartSummary() {
  const [couponInput, setCouponInput] = useState("");

  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const discount = useCartStore((state) => state.discount);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const itemCount = useCartStore((state) => state.getItemCount());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discountAmount = useCartStore((state) => state.getDiscountAmount());
  const total = useCartStore((state) => state.getTotal());

  const shippingLabel = useMemo(() => {
    if (items.length === 0) return "Calculated at checkout";
    if (subtotal >= 500) return "Free";
    return "Calculated at checkout";
  }, [items.length, subtotal]);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    const discountValue = COUPONS[code];

    if (!discountValue) {
      showToast.couponInvalid();
      return;
    }

    await applyCoupon(code, discountValue);
    showToast.couponApplied(code, discountValue);
    setCouponInput(code);
  };

  return (
    <ClientOnly>
      <Card className="sticky top-24 gap-0 self-start">
        <CardHeader className="gap-2">
          <div className="flex items-center gap-2 text-accent">
            <HugeiconsIcon icon={SparklesIcon} size={16} strokeWidth={1.8} />
            <span className="text-xs uppercase tracking-[0.22em] text-primary/45">
              Order summary
            </span>
          </div>
          <CardTitle className="text-xl">Your total at a glance</CardTitle>
          <CardDescription>
            {itemCount === 0
              ? "Add products to see your order totals."
              : `${itemCount} item${itemCount === 1 ? "" : "s"} ready for checkout.`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-3 mt-4 mb-2">
            <label
              htmlFor="coupon"
              className="text-xs uppercase tracking-[0.18em] text-primary"
            >
              Promo code
            </label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Enter code"
                disabled={items.length === 0}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleApplyCoupon}
                disabled={items.length === 0 || couponInput.trim().length === 0}
              >
                Apply
              </Button>
            </div>

            {coupon && (
              <div className="flex items-start justify-between gap-3 border border-accent/25 bg-accent/5 p-3 text-xs">
                <div className="flex items-start gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={16}
                    strokeWidth={1.8}
                    className="mt-0.5 text-accent"
                  />
                  <div>
                    <p className="font-medium text-primary">{coupon} applied</p>
                    <p className="text-primary/60">
                      You&apos;re getting {discount}% off your order.
                    </p>
                  </div>
                </div>

                <Button variant="ghost" onClick={removeCoupon}>
                  Remove
                </Button>
              </div>
            )}

            {!coupon && items.length > 0 && (
              <div className="flex items-start gap-2 text-xs text-primary/60">
                <HugeiconsIcon
                  icon={DiscountTag02Icon}
                  size={14}
                  strokeWidth={1.8}
                />
                <span>Try `WELCOME10`, `GLOW15`, or `RITUAL20`.</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-primary/60">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-primary/60">
              <span>Discount</span>
              <span className="text-primary">
                {discountAmount > 0 ? `- ${formatPrice(discountAmount)}` : "GH₵ 0.00"}
              </span>
            </div>
            <div className="flex items-center justify-between text-primary/60">
              <span>Shipping</span>
              <span className="text-primary">{shippingLabel}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">
                Order total
              </p>
              <p className="text-[10px] text-primary/60">
                Taxes and final shipping shown at checkout.
              </p>
            </div>

            <div className="font-heading text-xl text-primary">
              {formatPrice(total)}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3 border-t mt-4">
          <Button className="w-full" size="lg" disabled={items.length === 0}>
            Proceed to checkout
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </ClientOnly>
  );
}
