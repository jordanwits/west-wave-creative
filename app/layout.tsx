import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@/components/analytics"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://westwavecreative.com"),
  title: {
    default: "Pro Websites, Built Fast | West Wave Creative",
    template: "%s | West Wave Creative"
  },
  description: "Get a professional website designed to attract customers — at a price that works for small businesses.",
  generator: "v0.app",
  keywords: ["web design", "small business websites", "affordable web design", "professional website design", "custom websites"],
  authors: [{ name: "West Wave Creative" }],
  creator: "West Wave Creative",
  publisher: "West Wave Creative",
  icons: {
    icon: "/WWC%20Icon%20Color.png",
    shortcut: "/WWC%20Icon%20Color.png",
    apple: "/WWC%20Icon%20Color.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "West Wave Creative",
    title: "Pro Websites, Built Fast | West Wave Creative",
    description: "Get a professional website designed to attract customers — at a price that works for small businesses.",
    images: [
      {
        url: "/west-wave-logo.png",
        width: 1200,
        height: 630,
        alt: "West Wave Creative Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Websites, Built Fast | West Wave Creative",
    description: "Get a professional website designed to attract customers — at a price that works for small businesses.",
    images: ["/west-wave-logo.png"],
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
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "West Wave Creative",
    url: "https://westwavecreative.com",
    logo: "https://westwavecreative.com/west-wave-logo.png",
    description: "Professional website design and development for small businesses. Clean, effective websites built fast and priced fairly.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-530-338-7829",
      email: "dave@westwavecreative.com",
      contactType: "customer service",
      availableLanguage: "English",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "West Wave Creative",
    url: "https://westwavecreative.com",
    description: "Get a professional website designed to attract customers — at a price that works for small businesses.",
    publisher: {
      "@type": "Organization",
      name: "West Wave Creative",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Professional Website Design and Development",
    provider: {
      "@type": "Organization",
      name: "West Wave Creative",
      url: "https://westwavecreative.com",
    },
    name: "Professional Website Design for Small Businesses",
    description: "Professional, mobile-friendly websites in 2-4 weeks—optimized for SEO, speed, and conversions. Clear pricing, personal service, and results tailored to your budget.",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "1500",
      highPrice: "5000",
      description: "Typical project pricing for professional small business websites",
    },
  }

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
