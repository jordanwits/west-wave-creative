import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for West Wave Creative form builder and management.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/forms/login",
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

