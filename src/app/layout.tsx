import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { JsonLdScript } from '@/components/JsonLdScript'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://neuralframestudio.com'),
  title: {
    default: 'NeuralFrame Studio | AI-Powered Video & Ad Creatives',
    template: '%s | NeuralFrame Studio',
  },
  description:
    'AI-Powered Video & Ad Creatives That Convert. Transform your content creation with cutting-edge AI technology designed for modern marketers. Get stunning marketing videos and ads in days, not weeks.',
  keywords: [
    'AI video generation',
    'ad creative',
    'marketing automation',
    'video creation',
    'AI creative studio',
    'video editing',
    'short form videos',
    'TikTok ads',
    'YouTube ads',
    'Instagram reels',
  ],
  authors: [{ name: 'NeuralFrame Studio', url: 'https://neuralframestudio.com' }],
  creator: 'NeuralFrame Studio',
  publisher: 'NeuralFrame Studio',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://neuralframestudio.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neuralframestudio.com',
    siteName: 'NeuralFrame Studio',
    title: 'NeuralFrame Studio | AI-Powered Video & Ad Creatives',
    description:
      'Transform your content creation with cutting-edge AI technology. Create stunning marketing videos and ads that convert.',
    images: [
      {
        url: 'https://neuralframestudio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeuralFrame Studio - AI-Powered Video & Ad Creatives',
        type: 'image/jpeg',
      },
      {
        url: 'https://neuralframestudio.com/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'NeuralFrame Studio Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralFrame Studio | AI-Powered Video & Ad Creatives',
    description:
      'Transform your content creation with cutting-edge AI technology. Create stunning marketing videos and ads that convert.',
    images: ['https://neuralframestudio.com/og-image.jpg'],
    creator: '@neuralframe',
    site: '@neuralframe',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NeuralFrame Studio',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://neuralframestudio.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NeuralFrame" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <JsonLdScript />
      </head>
      <body className={inter.variable}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
