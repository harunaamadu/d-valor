import type { IconSvgObject } from "@hugeicons/core-free-icons";
import type { IconType } from "react-icons";

import {
  CustomerService01Icon,
  Home01Icon,
  StarIcon,
  UserGroupIcon,
  ArrowRight01Icon,
  DiscountTag02Icon,
  Fire02Icon,
  Leaf01Icon,
  FavouriteIcon,
  ShoppingBag01Icon,
  TruckIcon,
  SparklesIcon,
  SunIcon,
  EyeIcon,
  BlushBrush02Icon,
  GiftIcon,
} from "@hugeicons/core-free-icons";

import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

export interface Suggestion {
  label: string;
}

export interface NavChildLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: IconSvgObject;
  badge?: string;
  children?: NavChildLink[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface CategoryItem {
  label: string;
  href: string;
  icon: IconSvgObject;
  imageUrl?: string; // add sanity
  color: string;
  description: string;
}

export interface FloatingBadge {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}

export interface HeroFeature {
  title: string;
  description: string;
  icon: IconSvgObject;
}

export interface PromoBanner {
  title: string;
  subtitle: string;
  href: string;
  icon: IconSvgObject;
}

/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

export const suggestions: Suggestion[] = [
  { label: "Vitamin C Serum" },
  { label: "Hydrating Face Cream" },
  { label: "Retinol Night Serum" },
  { label: "Body Lotion" },
  { label: "Niacinamide Serum" },
  { label: "SPF 50 Sunscreen" },
  { label: "Beauty Oil" },
  { label: "Lip Care Set" },
];

/* =========================================================
   NAVIGATION
========================================================= */

export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products",
    icon: ShoppingBag01Icon,
    children: [
      {
        label: "All Products",
        href: "/products",
      },
      {
        label: "Skincare",
        href: "/collections/skincare",
      },
      {
        label: "Face Serums",
        href: "/collections/face-serums",
      },
      {
        label: "Body Care",
        href: "/collections/body-care",
      },
      {
        label: "Beauty Oils",
        href: "/collections/beauty-oils",
      },
      {
        label: "New Arrivals",
        href: "/products?sort=newest",
      },
    ],
  },

  {
    label: "Collections",
    href: "/collections",
    icon: SparklesIcon,
    children: [
      {
        label: "All collections",
        href: "/collections",
      },
      {
        label: "Skincare Essentials",
        href: "/collections/skincare-essentials",
      },
      {
        label: "Body Care Collection",
        href: "/collections/body-care-collection",
      },
      {
        label: "Face Serums & Treatments",
        href: "/collections/face-serums-and-reatments",
      },
      {
        label: "Lip & Eye Care",
        href: "/collections/lip-and-eye-care",
      },
      {
        label: "Beauty Gift Sets",
        href: "/collections/beauty-gift-sets",
      },
    ],
  },

  {
    label: "Glow Deals",
    href: "/deals",
    icon: Fire02Icon,
    badge: "HOT",
  },

  {
    label: "Gift Sets",
    href: "/gift-sets",
    icon: GiftIcon,
  },
];

/* =========================================================
   FOOTER LINKS
========================================================= */

export const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Shop: [
    {
      label: "All Products",
      href: "/products",
    },
    {
      label: "Best Sellers",
      href: "/collections/best-sellers",
    },
    {
      label: "New Arrivals",
      href: "/products?sort=newest",
    },
    {
      label: "Bundles & Kits",
      href: "/collections/bundles",
    },
    {
      label: "Gift Sets",
      href: "/gift-sets",
    },
  ],

  Company: [
    {
      label: "About Aurora Beauty",
      href: "/about",
    },
    {
      label: "Our Ingredients",
      href: "/ingredients",
    },
    {
      label: "Sustainability",
      href: "/sustainability",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],

  Support: [
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "Shipping & Delivery",
      href: "/shipping",
    },
    {
      label: "Returns & Refunds",
      href: "/returns",
    },
    {
      label: "Track Your Order",
      href: "/track-order",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
};

/* =========================================================
   SOCIAL LINKS
========================================================= */

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },

  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: FaTiktok,
  },

  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: FaXTwitter,
  },

  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
];

/* =========================================================
   CATEGORIES
========================================================= */
const SharedImage = "https://images.unsplash.com/photo-1670201202961-dce15b9e6939?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const CATEGORIES: CategoryItem[] = [
  {
    label: "Serums",
    icon: SparklesIcon,
    imageUrl: "/images/category/serum.jpg",
    color: "from-amber-500/20 to-yellow-500/20",
    href: "/collections/serums",
    description: "Brightening and hydrating skin treatments",
  },
  {
    label: "Foundations",
    icon: BlushBrush02Icon,
    imageUrl: "/images/category/foundation.jpg",
    color: "from-rose-500/20 to-pink-500/20",
    href: "/collections/foundations",
    description: "Smooth and flawless makeup coverage",
  },
  {
    label: "Moisturizers",
    icon: SunIcon,
    imageUrl: "/images/category/moisturizer.jpg",
    color: "from-cyan-500/20 to-sky-500/20",
    href: "/collections/moisturizers",
    description: "Deep hydration for soft glowing skin",
  },
  {
    label: "Eyeliners",
    icon: EyeIcon,
    imageUrl: "/images/category/eyeliner.jpg",
    color: "from-slate-500/20 to-gray-500/20",
    href: "/collections/eyeliners",
    description: "Define and enhance your eye makeup",
  },
  {
    label: "Lipsticks",
    icon: FavouriteIcon,
    imageUrl: "/images/category/lipstick.jpg",
    color: "from-red-500/20 to-rose-500/20",
    href: "/collections/lipsticks",
    description: "Bold and beautiful shades for every look",
  },
  {
    label: "Perfumes",
    icon: SparklesIcon,
    imageUrl: "/images/category/perfume.jpg",
    color: "from-violet-500/20 to-fuchsia-500/20",
    href: "/collections/perfumes",
    description: "Long-lasting luxury fragrances",
  },
  {
    label: "Skincare",
    icon: SparklesIcon,
    imageUrl: "/images/category/skincare.jpg",
    color: "from-emerald-500/20 to-green-500/20",
    href: "/collections/skincare",
    description: "Daily essentials for healthy radiant skin",
  },
  {
    label: "Makeup Kits",
    icon: BlushBrush02Icon,
    imageUrl: "/images/category/makeup-kit.jpg",
    color: "from-orange-500/20 to-amber-500/20",
    href: "/collections/makeup-kits",
    description: "Complete beauty sets for every occasion",
  },
  {
    label: "Gift Sets",
    icon: GiftIcon,
    imageUrl: "/images/category/gift.jpg",
    color: "from-pink-500/20 to-rose-500/20",
    href: "/collections/gift-sets",
    description: "Perfect beauty gifts for someone special",
  },
];

/* =========================================================
   FLOATING HERO BADGES
========================================================= */

export const FLOATING_BADGES: FloatingBadge[] = [
  {
    label: "✨ Best Seller",
    top: "18%",
    left: "8%",
    delay: 0,
  },

  {
    label: "🌿 Clean Ingredients",
    top: "65%",
    left: "5%",
    delay: 0.3,
  },

  {
    label: "⭐ Rated 4.9/5",
    top: "22%",
    right: "7%",
    delay: 0.2,
  },

  {
    label: "🚚 Free Shipping",
    top: "70%",
    right: "8%",
    delay: 0.5,
  },
];

/* =========================================================
   ROTATING HERO WORDS
========================================================= */

export const ROTATING_WORDS = [
  "Radiant Skin",
  "Glow Essentials",
  "Clean Beauty",
  "Deep Hydration",
  "Self Care",
];

/* =========================================================
   HERO FEATURES
========================================================= */

export const HERO_FEATURES: HeroFeature[] = [
  {
    title: "Clean Ingredients",
    description: "Carefully selected skin-loving formulas",
    icon: Leaf01Icon,
  },

  {
    title: "Cruelty Free",
    description: "Beauty products never tested on animals",
    icon: FavouriteIcon,
  },

  {
    title: "Glow Guaranteed",
    description: "Visible results with every routine",
    icon: SparklesIcon,
  },
];

/* =========================================================
   PROMO BANNERS
========================================================= */

export const PROMO_BANNERS: PromoBanner[] = [
  {
    title: "Summer Glow Sale",
    subtitle: "Save up to 40% on selected skincare essentials",
    href: "/deals",
    icon: DiscountTag02Icon,
  },

  {
    title: "Free Shipping",
    subtitle: "On all orders over $80",
    href: "/shipping",
    icon: TruckIcon,
  },

  {
    title: "Discover Your Routine",
    subtitle: "Find products tailored to your skin needs",
    href: "/collections/skincare",
    icon: ArrowRight01Icon,
  },
];
