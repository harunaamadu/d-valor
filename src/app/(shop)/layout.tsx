import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Shop",
  description: "D'valor Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
  );
}
