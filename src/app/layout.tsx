// globals.css
/* Define your global styles here */

// RootLayout.tsx
import type { Metadata } from "next";
import { Inter, Yeseva_One, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/component/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const yeseva_one = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yeseva_one",
});

const cormorant_garamond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant_garamond",
});

export const metadata: Metadata = {
  title: "Leaflet",
  description: "Leaf Image Identifier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant_garamond.variable} ${yeseva_one.variable} ${inter.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
