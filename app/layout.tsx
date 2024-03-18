import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Inventory Management",
  applicationName: "Inventory Management",
  description: "Inventory management for different category products",
  creator: "Nikhil Thakare",
  openGraph: {
    title: "Invertory Management",
    description: "Inventory management for different category products",
    url: "https://inventory-management-nikhilt27.vercel.app/",
    siteName: "Invertory Management",
    images: [
      {
        url: "https://res.cloudinary.com/gafrfdasdx/image/upload/v1710780494/Screenshot_2024-03-18_at_10.17.16_PM_cbsgge.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col min-h-screen">
      <body className={`flex flex-col flex-grow ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
