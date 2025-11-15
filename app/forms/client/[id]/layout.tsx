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
    index: false,
    follow: false,
  },
}

export default function ClientFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

