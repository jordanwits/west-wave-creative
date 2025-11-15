import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Onboarding Form | West Wave Creative",
  description: "Please fill out this form to help us understand your needs and get started on your project.",
  openGraph: {
    title: "Client Onboarding Form | West Wave Creative",
    description: "Please fill out this form to help us understand your needs and get started on your project.",
    type: "website",
    siteName: "West Wave Creative",
    images: [
      {
        url: "https://westwavecreative.com/west-wave-logo.png",
        width: 1200,
        height: 630,
        alt: "West Wave Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Onboarding Form | West Wave Creative",
    description: "Please fill out this form to help us understand your needs and get started on your project.",
    images: ["https://westwavecreative.com/west-wave-logo.png"],
  },
  robots: {
    index: false, // Don't index form pages
    follow: false,
  },
}

export default function ClientFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Ensure meta tags are present for link previews */}
      <head>
        <meta property="og:title" content="Client Onboarding Form | West Wave Creative" />
        <meta property="og:description" content="Please fill out this form to help us understand your needs and get started on your project." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/west-wave-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Onboarding Form | West Wave Creative" />
        <meta name="twitter:description" content="Please fill out this form to help us understand your needs and get started on your project." />
        <meta name="twitter:image" content="/west-wave-logo.png" />
      </head>
      {children}
    </>
  )
}

