import {
  FaInstagram,
  FaXTwitter,
  FaPinterest,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const BRAND_DIRECTORY = [
  {
    label: "Skincare",
    items: [
      { label: "Serums", href: "/shop/skincare/serums" },
      { label: "Moisturisers", href: "/shop/skincare/moisturisers" },
      { label: "Face Oils", href: "/shop/skincare/face-oils" },
      { label: "Eye Creams", href: "/shop/skincare/eye-creams" },
      { label: "Toners", href: "/shop/skincare/toners" },
      { label: "Exfoliants", href: "/shop/skincare/exfoliants" },
      { label: "Cleansers", href: "/shop/skincare/cleansers" },
      { label: "Face Masks", href: "/shop/skincare/masks" },
      { label: "SPF & Protection", href: "/shop/skincare/spf" },
    ],
  },
  {
    label: "Body Care",
    items: [
      { label: "Body Butters", href: "/shop/body/butters" },
      { label: "Body Oils", href: "/shop/body/oils" },
      { label: "Body Scrubs", href: "/shop/body/scrubs" },
      { label: "Lotions", href: "/shop/body/lotions" },
      { label: "Hand Creams", href: "/shop/body/hand-creams" },
      { label: "Foot Care", href: "/shop/body/foot-care" },
    ],
  },
  {
    label: "Lip Care",
    items: [
      { label: "Lip Treatments", href: "/shop/lip/treatments" },
      { label: "Lip Balms", href: "/shop/lip/balms" },
      { label: "Lip Serums", href: "/shop/lip/serums" },
      { label: "Lip Masks", href: "/shop/lip/masks" },
    ],
  },
  {
    label: "Hair Care",
    items: [
      { label: "Scalp Treatments", href: "/shop/hair/scalp" },
      { label: "Hair Oils", href: "/shop/hair/oils" },
      { label: "Leave-In Conditioners", href: "/shop/hair/leave-in" },
      { label: "Hair Masks", href: "/shop/hair/masks" },
      { label: "Shampoos", href: "/shop/hair/shampoos" },
    ],
  },
];

export const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Bestsellers", href: "/shop?filter=bestseller" },
      { label: "Sale", href: "/shop?filter=sale" },
      { label: "Collections", href: "/collections" },
      { label: "Gift Sets", href: "/shop/gift-sets" },
    ],
  },
  {
    heading: "Our Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
      { label: "Stockists", href: "/stockists" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Delivery & Returns", href: "/delivery" },
      { label: "FAQs", href: "/faqs" },
      { label: "Track Your Order", href: "/track" },
      { label: "Loyalty Programme", href: "/loyalty" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const SOCIALS = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/dvalor",
  },
  { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com/@dvalor" },
  {
    icon: FaPinterest,
    label: "Pinterest",
    href: "https://pinterest.com/dvalor",
  },
  { icon: FaXTwitter, label: "X", href: "https://x.com/dvalor" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com/dvalor" },
];

interface PaymentProps {
  label?: string;
  bg?: string;
  text?: string;
  abbr?: string;
  image?: string;
}

export const PAYMENT_METHODS: PaymentProps[] = [
  { label: "Visa", bg: "#1a1f71", text: "#fff", abbr: "VISA", image: "/icons/Visa.svg" },
  { label: "Mastercard", bg: "#eb001b", text: "#fff", abbr: "MC", image: "/icons/mastercard.svg" },
  { label: "PayPal", bg: "#003087", text: "#fff", abbr: "PP", image: "/icons/Paypal.svg" },
  { label: "ApplePay", bg: "#003087", text: "#fff", abbr: "AP", image: "/icons/ApplePay.svg" },
  { label: "GooglePay", bg: "#003087", text: "#fff", abbr: "GP", image: "/icons/GooglePay.svg" },
  { label: "Stripe", bg: "#003087", text: "#fff", abbr: "STP", image: "/icons/Stripe.svg" },
  // { label: "Bitcoin", bg: "#003087", text: "#fff", abbr: "PP", image: "/icons/Bitcoin.svg" },
  // { label: "MTN MoMo", bg: "#ffcb00", text: "#333", abbr: "MoMo", image: "/icons/" },
];
