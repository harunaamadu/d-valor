"use client";

import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import { ClientOnly } from "@/components/common/ClientOnly";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart.store";

const formatCount = (count: number) =>
  `${count} item${count === 1 ? "" : "s"} in your bag`;

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <ClientOnly>
      <section className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-4 border border-primary/10 bg-background/70 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-primary/45">
                Shopping bag
              </p>
              <h2 className="font-heading text-2xl text-primary">
                {formatCount(itemCount)}
              </h2>
            </div>

            {items.length > 0 && (
              <Button variant="ghost" onClick={clearCart} className="self-start">
                Clear bag
              </Button>
            )}
          </div>

          <Separator />

          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </ClientOnly>
  );
}
