"use client";

import Link from "next/link";
import { ShoppingBag01Icon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function CartEmpty() {
  return (
    <Empty className="border border-primary/10 bg-primary/2 py-14">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-accent/15 text-accent">
          <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={1.8} />
        </EmptyMedia>
        <EmptyTitle>Your bag is feeling light</EmptyTitle>
        <EmptyDescription>
          Start with your ritual essentials and we&apos;ll keep them here while
          you browse.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="max-w-md">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="min-w-36">
            <Link href="/shop">Shop products</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-36">
            <Link href="/collections">Explore collections</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 text-primary/60">
          <HugeiconsIcon icon={SparklesIcon} size={14} strokeWidth={1.6} />
          <span>Free shipping appears at checkout when available.</span>
        </div>
      </EmptyContent>
    </Empty>
  );
}
