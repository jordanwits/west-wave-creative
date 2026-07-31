import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Hanken_Grotesk, DM_Mono } from "next/font/google"
import "./styles/global.css"

// "The Counter" type stack, self-hosted through next/font instead of the
// Google Fonts <link> the standalone build used. `tokens.css` reads these
// three variables for --font-display / --font-body / --font-mono.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--fff2-display",
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--fff2-body",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--fff2-mono",
})

export const metadata: Metadata = {
  title: {
    absolute: "Fab Fresh Fudge — Hand-cut fudge from the foot of Mt. Shasta",
  },
  description:
    "Fab Fresh Fudge — small-batch, hand-cut fudge made fresh in the Mt. Shasta region of Northern California. Read the board, build a six-flavor box, or find us on the road.",
  // Concept preview: reachable by direct link only, kept out of search.
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  icons: { icon: "/fabfreshfudge2/brand/favicon.png" },
}

// #fff2-root is load-bearing: tokens.css hangs its design tokens off this id
// and global.css uses body:has(#fff2-root) to undo the West Wave globals on
// this route only.
export default function FabFreshFudge2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      id="fff2-root"
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${dmMono.variable}`}
    >
      {children}
    </div>
  )
}
