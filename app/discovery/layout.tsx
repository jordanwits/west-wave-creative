import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Your Free Website Quote",
  description: "Answer a few quick questions and get a personalized website quote in 24 hours. Professional websites for small businesses, built fast and priced fairly.",
  openGraph: {
    title: "Get Your Free Website Quote | West Wave Creative",
    description: "Answer a few quick questions and get a personalized website quote in 24 hours. Professional websites for small businesses, built fast and priced fairly.",
    url: "https://westwavecreative.com/discovery",
    type: "website",
    images: [
      {
        url: "/west-wave-logo.png",
        width: 1200,
        height: 630,
        alt: "West Wave Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your Free Website Quote | West Wave Creative",
    description: "Answer a few quick questions and get a personalized website quote in 24 hours.",
    images: ["/west-wave-logo.png"],
  },
  alternates: {
    canonical: "https://westwavecreative.com/discovery",
  },
}

export default function DiscoveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

