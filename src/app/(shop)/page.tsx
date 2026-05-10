import CategorySection from "@/components/home/CategorySection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";
import { FAKE_FEATURED_PRODUCTS } from "@/data/fake-products";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 min-h-full">
      <HeroSection />
      <CategorySection />
      <FeaturedSection products={FAKE_FEATURED_PRODUCTS} />
    </main>
  );
}
