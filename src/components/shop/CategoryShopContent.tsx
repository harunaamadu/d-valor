"use client";

import * as React from "react";

import ShopContent from "@/components/shop/ShopContent";
import QuickViewModal from "@/components/product/QuickViewModal";

interface CategoryShopContentProps {
  category: string;
}

export default function CategoryShopContent({
  category,
}: CategoryShopContentProps) {
  const [quickViewSlug, setQuickViewSlug] =
    React.useState<string | null>(null);

  return (
    <>
      <ShopContent
        category={category}
        onQuickView={(slug) => setQuickViewSlug(slug)}
      />

      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </>
  );
}