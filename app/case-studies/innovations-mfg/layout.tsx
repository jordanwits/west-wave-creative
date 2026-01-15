import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Innovations MFG Website Redesign - Case Study",
  description: "A complete redesign for a precision metal-fabrication company, elevating their credibility and creating a conversion-focused experience that showcases their expertise. Completed in 2 weeks.",
  keywords: ["web design case study", "manufacturing website", "metal fabrication website", "industrial website design", "B2B website"],
  openGraph: {
    title: "Innovations MFG Website Redesign Case Study | West Wave Creative",
    description: "A complete redesign for a precision metal-fabrication company, elevating their credibility and creating a conversion-focused experience that showcases their expertise.",
    url: "https://westwavecreative.com/case-studies/innovations-mfg",
    type: "article",
    images: [
      {
        url: "/plasma-cutter.webp",
        width: 1200,
        height: 630,
        alt: "Industrial manufacturing equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovations MFG Website Redesign Case Study",
    description: "A complete redesign for a precision metal-fabrication company, elevating their credibility and creating a conversion-focused experience.",
    images: ["/plasma-cutter.webp"],
  },
  alternates: {
    canonical: "https://westwavecreative.com/case-studies/innovations-mfg",
  },
}

export default function InnovationsMFGLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Innovations MFG Website Redesign",
    description: "A complete redesign for a precision metal-fabrication company, elevating credibility and creating a conversion-focused experience that showcases their expertise.",
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
    keywords: "web design, manufacturing, metal fabrication, industrial, B2B website",
    inLanguage: "en-US",
    image: "https://westwavecreative.com/plasma-cutter.webp",
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

