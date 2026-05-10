import CategorySection from "@/components/home/CategorySection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 min-h-full">
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
    </main>
  );
}
