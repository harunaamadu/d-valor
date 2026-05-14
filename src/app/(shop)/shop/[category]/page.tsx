import PageTitle from "@/components/common/pages-title";
import CategoryShopContent from "@/components/shop/CategoryShopContent";
import { CATEGORIES } from "@/lib/constants";
import { Store01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categories = CATEGORIES.map((category) => ({
  label: category.label,
  slug:
    category.href.split("/").pop() ||
    category.label.toLowerCase().replace(/\s+/g, "-"),
}));

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const matchedCategory = categories.find(
    (item) => item.slug === category,
  );

  if (!matchedCategory) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: matchedCategory.label,
    description: `Browse ${matchedCategory.label} products at D'Valor`,
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const matchedCategory = categories.find(
    (item) => item.slug === category,
  );

  if (!matchedCategory) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="wrapper">
        <div className="mt-36">
          <PageTitle
            title={matchedCategory.label}
            icon={Store01Icon}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: matchedCategory.label },
            ]}
          />
        </div>

        <div className="mt-10">
          <CategoryShopContent category={category} />
        </div>
      </div>
    </main>
  );
}