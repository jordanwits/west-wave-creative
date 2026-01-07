import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BNB Breeze Website Redesign - Case Study",
  description: "Redesigned the Homeowner Information page for a short-term rental management company, creating a clear path for property owners to understand services and get started. 6 week timeline, 45% improvement in lead quality.",
  keywords: ["web design case study", "property management website", "short-term rental website", "conversion optimization"],
  openGraph: {
    title: "BNB Breeze Website Redesign Case Study | West Wave Creative",
    description: "Redesigned the Homeowner Information page for a short-term rental management company, creating a clear path for property owners to understand services and get started.",
    url: "/case-studies/bnb-breeze",
    type: "article",
    images: [
      {
        url: "/bnb-card-background.jpeg",
        width: 1200,
        height: 630,
        alt: "BNB Breeze luxury vacation rental property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BNB Breeze Website Redesign Case Study",
    description: "Redesigned the Homeowner Information page for a short-term rental management company, creating a clear path for property owners to understand services and get started.",
    images: ["/bnb-card-background.jpeg"],
  },
  alternates: {
    canonical: "/case-studies/bnb-breeze",
  },
}

export default function BNBBreezeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "BNB Breeze Website Redesign",
    description: "Redesigned the Homeowner Information page for a short-term rental management company, creating a clear path for property owners to understand services and get started.",
    author: {
      "@type": "Organization",
      name: "West Wave Creative",
    },
    about: {
      "@type": "Service",
      serviceType: "Web Design and Development",
      provider: {
        "@type": "Organization",
        name: "West Wave Creative",
      },
    },
    keywords: "web design, property management, short-term rental, conversion optimization",
    inLanguage: "en-US",
    image: "https://westwavecreative.com/bnb-card-background.jpeg",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      {children}
    </>
  )
}

