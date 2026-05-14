"use client";

import * as React from "react";

import PageTitle from "@/components/common/pages-title";
import ShopContent from "@/components/shop/ShopContent";
import QuickViewModal from "@/components/product/QuickViewModal";

import { Store01Icon } from "@hugeicons/core-free-icons";

export default function CategoryPage() {
  const [quickViewSlug, setQuickViewSlug] = React.useState<string | null>(
    null,
  );

  return (
    <>
      <main className="min-h-screen pb-20">
        <div className="wrapper">
          <div className="mt-36">
            <PageTitle
              title="Shop"
              icon={Store01Icon}
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Shop" },
              ]}
            />
          </div>

          <div className="mt-10">
            <ShopContent
              onQuickView={(slug) => setQuickViewSlug(slug)}
            />
          </div>
        </div>
      </main>

      <QuickViewModal
        slug={quickViewSlug}
        open={!!quickViewSlug}
        onClose={() => setQuickViewSlug(null)}
      />
    </>
  );
}