import {
  CategorySection,
  EditorialPromoGrid,
  FeaturedSection,
  HeroSection,
  BlogSection,
  InstagramSection,
  SubscriptionSection,
} from "@/components/home";
import type { HeroSlide } from "@/components/home/HeroSection";
import { FAKE_FEATURED_PRODUCTS } from "@/data/fake-products";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery } from "@/sanity/schemaTypes/queries/homepage";

interface SanityHeroSlide {
  _id: string;
  eyebrow: string;
  headline: string[];
  subtext: string;
  cta: { label: string; href: string };
  secondaryCta?: { label?: string; href?: string };
  tag: string;
  bg: string;
  product?: string;
  productAlt?: string;
  accentColor: string;
}

export default async function Home() {
  let heroSlides: HeroSlide[] | undefined;

  try {
    const result = await sanityFetch({
      query: homepageQuery,
    });
    const data = result.data as { hero?: SanityHeroSlide[] };

    heroSlides = data.hero
      ?.filter(
        (slide: SanityHeroSlide) =>
          Boolean(slide.eyebrow) &&
          Array.isArray(slide.headline) &&
          slide.headline.length > 0 &&
          Boolean(slide.subtext) &&
          Boolean(slide.cta?.label) &&
          Boolean(slide.cta?.href) &&
          Boolean(slide.tag) &&
          Boolean(slide.bg) &&
          Boolean(slide.accentColor),
      )
      .map((slide: SanityHeroSlide, index: number) => ({
        id: index + 1,
        eyebrow: slide.eyebrow,
        headline: slide.headline,
        subtext: slide.subtext,
        cta: slide.cta,
        secondaryCta:
          slide.secondaryCta?.label && slide.secondaryCta?.href
            ? {
                label: slide.secondaryCta.label,
                href: slide.secondaryCta.href,
              }
            : undefined,
        tag: slide.tag,
        bg: slide.bg,
        product: slide.product,
        productAlt: slide.productAlt,
        accentColor: slide.accentColor,
      }));
  } catch {
    heroSlides = undefined;
  }

  return (
    <main className="flex flex-col flex-1 min-h-full">
      <HeroSection slides={heroSlides} />
      <CategorySection />
      <FeaturedSection products={FAKE_FEATURED_PRODUCTS} />
      <EditorialPromoGrid />
      <BlogSection />
      <InstagramSection />
      <SubscriptionSection />
    </main>
  );
}
