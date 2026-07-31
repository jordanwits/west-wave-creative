import type React from "react"
import type { Metadata } from "next"
import { Young_Serif, Figtree } from "next/font/google"
import "./fff1.css"

// The v1 design's type pairing, self-hosted through next/font instead of the
// Google Fonts <link> the standalone build used. `fff1.css` reads these two
// variables for --font-display / --font-body.
const youngSerif = Young_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--fff1-display",
})

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--fff1-body",
})

export const metadata: Metadata = {
  title: {
    absolute: "Fabulous Fudge — Small-Batch Fudge, Hand-Stirred & Shipped Fresh",
  },
  description:
    "Fabulous Fudge makes small-batch fudge the old-fashioned way — real butter, real cream, twenty-some flavors. Build your own six-pack box or find us at a show near you.",
  // Concept preview: reachable by direct link only, kept out of search.
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
}

// #fff1-root is load-bearing: fff1.css hangs its design tokens off this id and
// uses body:has(#fff1-root) to undo the West Wave globals on this route only.
export default function FabFreshFudge1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="fff1-root" className={`${youngSerif.variable} ${figtree.variable}`}>
      {children}
    </div>
  )
}
