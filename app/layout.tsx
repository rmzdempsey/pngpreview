import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const brandSans = Barlow_Condensed({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  title: "Brochureware Preview Network",
  description: "Local brochureware previews backed by advertising partners and lead capture forms.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brandSans.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
