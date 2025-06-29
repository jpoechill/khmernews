import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khmer News Reader - Learn Khmer Through Real-World Articles",
  description: "Master Khmer language with our interactive news reader. Practice reading with side-by-side translations, transliterations, and vocabulary building. Perfect for Khmer learners at all levels.",
  keywords: [
    "Khmer language learning",
    "Cambodian news",
    "Khmer reading practice",
    "Khmer vocabulary",
    "Khmer transliteration",
    "Cambodian articles",
    "Khmer language resources",
    "Learn Khmer online",
    "Khmer translation",
    "Cambodian culture"
  ],
  authors: [{ name: "Khmer News Reader Team" }],
  creator: "Khmer News Reader",
  publisher: "Khmer News Reader",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://khmernewsreader.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Khmer News Reader - Learn Khmer Through Real-World Articles",
    description: "Master Khmer language with our interactive news reader. Practice reading with side-by-side translations, transliterations, and vocabulary building.",
    url: 'https://khmernewsreader.com',
    siteName: 'Khmer News Reader',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Khmer News Reader - Interactive Language Learning',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Khmer News Reader - Learn Khmer Through Real-World Articles",
    description: "Master Khmer language with our interactive news reader. Practice reading with side-by-side translations, transliterations, and vocabulary building.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
