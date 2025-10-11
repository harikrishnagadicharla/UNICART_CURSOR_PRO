import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthInitializer } from "@/components/AuthInitializer";
import { AuthDebugger } from "@/components/AuthDebugger";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "UniCart - Modern E-Commerce Platform",
  description: "Your one-stop destination for quality products at competitive prices. Shop electronics, fashion, home goods, and more with free shipping on orders over $100.",
  keywords: ["ecommerce", "online shopping", "electronics", "fashion", "home goods"],
  authors: [{ name: "UniCart Team" }],
  creator: "UniCart",
  publisher: "UniCart",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unicart.com",
    title: "UniCart - Modern E-Commerce Platform",
    description: "Your one-stop destination for quality products at competitive prices.",
    siteName: "UniCart",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniCart - Modern E-Commerce Platform",
    description: "Your one-stop destination for quality products at competitive prices.",
    creator: "@unicart",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

