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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    default: "D'Valor | Luxury Beauty & Skincare",
    template: "%s | D'Valor",
  },

  description:
    "Discover premium skincare, beauty essentials, cosmetics, fragrances, and self-care products curated for radiant beauty and confidence.",

  keywords: [
    "D'Valor",
    "beauty store",
    "luxury skincare",
    "beauty products",
    "cosmetics online",
    "fragrances",
    "organic skincare",
    "lip care",
    "self care",
    "premium beauty",
    "beauty ecommerce",
    "skincare Ghana",
    "luxury beauty store",
  ],

  authors: [
    {
      name: "Haruna Amadu",
      url: "https://www.facebook.com/harunaamadu95",
    },
  ],

  creator: "Haruna Amadu",
  publisher: "D'Valor",

  applicationName: "D'Valor",

  alternates: {
    canonical: "https://dvalor.vercel.app",
  },

  openGraph: {
    title: "D'Valor | Luxury Beauty & Skincare",
    description:
      "Shop premium skincare, cosmetics, fragrances, and beauty essentials designed to elevate your glow and confidence.",

    url: "https://dvalor.vercel.app",

    siteName: "D'Valor",

    images: [
      {
        url: "https://dvalor.vercel.app/images/logo.png",
        width: 1200,
        height: 630,
        alt: "D'Valor Beauty & Skincare",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "D'Valor | Luxury Beauty & Skincare",

    description:
      "Premium skincare, cosmetics, fragrances, and self-care essentials for every glow.",

    images: ["https://dvalor.vercel.app/images/logo.png"],

    creator: "@dvalor",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        montserratHeading.variable,
        "font-sans",
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground flex flex-col"
      >
        <TooltipProvider>
          {children}

          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              classNames: {
                toast:
                  "font-sans border border-stone-200 bg-white text-stone-900 shadow-lg rounded-none",

                title:
                  "text-[10px] tracking-[0.2em] uppercase font-medium",

                description:
                  "text-xs text-stone-500 tracking-wide",

                success: "border-l-2 border-l-lime-500",

                error: "border-l-2 border-l-destructive",

                info: "border-l-2 border-l-cyan-600",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
