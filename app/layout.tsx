import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ShortcutsProvider from "@/components/ShortcutsProvider";
import RegisterSW from "@/components/RegisterSW";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://prepfast.in"),
  title: "InterviewPrep — Revise any tech topic in under 1 hour",
  description:
    "Free revision platform for mid-to-senior engineers — 14 topics, 399 concepts including Python, React, AWS, SQL, AI Coding Agents. Last 1 Hour mode.",
  keywords: [
    "interview prep",
    "software engineer interview",
    "system design interview",
    "coding interview",
    "tech interview revision",
    "python interview",
    "javascript interview",
    "java interview",
    "dsa interview",
    "ai coding agents interview",
    "claude code interview",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "InterviewPrep",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 14 topics, 399 concepts, depth levels, knowledge trees, and a compressed Last 1 Hour cheatsheet mode.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 14 topics, 399 concepts with depth levels and a Last 1 Hour cheatsheet.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
        <ShortcutsProvider />
        <RegisterSW />
        <Analytics />
      </body>
    </html>
  );
}
