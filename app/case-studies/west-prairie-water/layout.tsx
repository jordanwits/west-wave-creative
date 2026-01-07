import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "West Prairie Water Website Launch - Case Study",
  description: "Created the first website for a water utility company, delivering a clear, accessible platform that helps residents access information and services with ease. Mobile-first design completed in 4 weeks.",
  keywords: ["web design case study", "utility website", "water company website", "government website", "accessible web design"],
  openGraph: {
    title: "West Prairie Water Website Launch Case Study | West Wave Creative",
    description: "Created the first website for a water utility company, delivering a clear, accessible platform that helps residents access information and services with ease.",
    url: "/case-studies/west-prairie-water",
    type: "article",
    images: [
      {
        url: "/prairie-river-background.jpeg",
        width: 1200,
        height: 630,
        alt: "Prairie river natural landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "West Prairie Water Website Launch Case Study",
    description: "Created the first website for a water utility company, delivering a clear, accessible platform that helps residents access information and services with ease.",
    images: ["/prairie-river-background.jpeg"],
  },
  alternates: {
    canonical: "/case-studies/west-prairie-water",
  },
}

export default function WestPrairieWaterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "West Prairie Water Website Launch",
    description: "Created the first website for a water utility company, delivering a clear, accessible platform that helps residents access information and services with ease.",
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
    keywords: "web design, utility, water company, government, accessible design",
    inLanguage: "en-US",
    image: "https://westwavecreative.com/prairie-river-background.jpeg",
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

