import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aletheia Life Website - Case Study",
  description: "A comprehensive website project for Aletheia Life, showcasing modern design and user-focused functionality. Professional delivery with attention to detail.",
  keywords: ["web design case study", "aletheia life", "website design", "modern website"],
  openGraph: {
    title: "Aletheia Life Website Case Study | West Wave Creative",
    description: "A comprehensive website project for Aletheia Life, showcasing modern design and user-focused functionality.",
    url: "https://westwavecreative.com/case-studies/aletheia-life",
    type: "article",
    images: [
      {
        url: "/nature shot.jpeg",
        width: 1200,
        height: 630,
        alt: "Aletheia Life project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aletheia Life Website Case Study",
    description: "A comprehensive website project for Aletheia Life, showcasing modern design and user-focused functionality.",
    images: ["/nature shot.jpeg"],
  },
  alternates: {
    canonical: "https://westwavecreative.com/case-studies/aletheia-life",
  },
}

export default function AletheiaLifeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Aletheia Life Website",
    description: "A comprehensive website project for Aletheia Life, showcasing modern design and user-focused functionality.",
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
    keywords: "web design, modern website, user experience",
    inLanguage: "en-US",
    image: "https://westwavecreative.com/nature shot.jpeg",
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
