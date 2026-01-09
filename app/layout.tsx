import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Microlearning | AI-Powered Training for Frontline Workers",
  description:
    "Train 250M+ frontline workers in India with 2-3 minute AI-powered microlearning modules delivered via WhatsApp & SMS in 12+ Indian languages. Visit micro-learning.app to learn more.",
  keywords: [
    "microlearning",
    "frontline workers",
    "WhatsApp training",
    "SMS learning",
    "AI training",
    "India workforce",
    "factory training",
    "warehouse training",
    "employee training",
    "skill development",
  ],
  authors: [{ name: "Microlearning" }],
  openGraph: {
    title: "Microlearning | AI-Powered Training for Frontline Workers",
    description:
      "Train 250M+ frontline workers with 2-3 minute modules via WhatsApp & SMS in 12+ languages.",
    type: "website",
    locale: "en_IN",
    siteName: "Microlearning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Microlearning | AI-Powered Training for Frontline Workers",
    description:
      "Train 250M+ frontline workers with 2-3 minute modules via WhatsApp & SMS in 12+ languages.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
