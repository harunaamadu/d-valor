import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dvalor.vercel.app"),

  title: {
    default: "D'Valor – Luxury Beauty & Skincare",
    template: "%s | D'Valor",
  },

  description:
    "Discover premium skincare, beauty essentials, cosmetics, fragrances, and self-care products curated for radiant beauty and confidence.",

  keywords: [
    "beauty store",
    "skincare products",
    "cosmetics online",
    "luxury beauty",
    "makeup store",
    "beauty ecommerce",
    "organic skincare",
    "beauty essentials",
    "fragrances",
    "lip care",
    "self care products",
    "beauty products online",
    "women beauty",
    "glow skincare",
    "D'Valor Beauty",
  ],

  authors: [{ name: "Haruna Amadu" }],
  creator: "D'Valor",
  publisher: "D'Valor",

  openGraph: {
    title: "D'Valor – Luxury Beauty & Skincare Store",
    description:
      "Shop premium skincare, makeup, fragrances, and beauty essentials designed to elevate your glow and confidence.",

    url: "https://dvalor.vercel.app",
    siteName: "D'Valor",

    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "D'Valor Beauty & Skincare Store",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "D'Valor – Luxury Beauty & Skincare",
    description:
      "Premium beauty, skincare, cosmetics, and self-care essentials for every glow.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        montserratHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <TooltipProvider>{children}</TooltipProvider>
         <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "font-sans border border-stone-200 bg-white text-stone-900 shadow-lg rounded-none",
                title: "text-xs tracking-[0.2em] uppercase font-medium",
                description: "text-xs text-stone-500 tracking-wide",
                success: "border-l-2 border-l-lime-500",
                error: "border-l-2 border-l-destructive",
                info: "border-l-2 border-l-cyan-600",
              },
            }}
          />
      </body>
    </html>
  );
}
