// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  imageUrl: string;
  featured?: boolean;
}

export const FAKE_POSTS: BlogPost[] = [
  {
    id: "post_001",
    slug: "the-art-of-layering-skincare",
    title: "The Art of Layering Skincare for Maximum Glow",
    excerpt:
      "Unlock the science behind ingredient sequencing — from toners to serums to oils — so every product works harder for your skin.",
    category: "Skincare",
    readTime: "5 min read",
    publishedAt: "May 3, 2025",
    imageUrl: "/images/blog/blog-1.jpg",
    featured: true,
  },
  {
    id: "post_002",
    slug: "ghanaian-botanicals-in-beauty",
    title: "Ghanaian Botanicals Redefining Modern Beauty",
    excerpt:
      "From baobab oil to shea and kalahari melon — how indigenous West African ingredients are taking the global stage.",
    category: "Ingredients",
    readTime: "4 min read",
    publishedAt: "Apr 22, 2025",
    imageUrl: "/images/blog/blog-2.jpg",
  },
  {
    id: "post_003",
    slug: "nighttime-ritual-guide",
    title: "Your 5-Step Nighttime Ritual for Restored Skin",
    excerpt:
      "Night is when skin repairs itself. These five steps — in the right order — help it do exactly that.",
    category: "Ritual",
    readTime: "3 min read",
    publishedAt: "Apr 10, 2025",
    imageUrl: "/images/blog/blog-3.jpg",
  },
  {
    id: "post_004",
    slug: "fragrance-free-vs-unscented",
    title: "Fragrance-Free vs Unscented: What's the Difference?",
    excerpt:
      "One protects sensitive skin. The other can still contain masking chemicals. Here's how to read the label correctly.",
    category: "Education",
    readTime: "3 min read",
    publishedAt: "Mar 28, 2025",
    imageUrl: "/images/blog/blog-4.jpg",
  },
];
