import {
  CategorySection,
  EditorialPromoGrid,
  FeaturedSection,
  HeroSection,
  BlogSection,
  InstagramSection,
  SubscriptionSection,
} from "@/components/home";
import { FAKE_FEATURED_PRODUCTS } from "@/data/fake-products";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 min-h-full">
      <HeroSection />
      <CategorySection />
      <FeaturedSection products={FAKE_FEATURED_PRODUCTS} />
      <EditorialPromoGrid />
      <BlogSection />
      <InstagramSection />
      <SubscriptionSection />
    </main>
  );
}
