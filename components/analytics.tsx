"use client"

import Script from "next/script"

/**
 * Analytics component for Google Analytics 4
 * 
 * Setup instructions:
 * 1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your .env.local file
 * 2. For Google Search Console verification:
 *    - Visit https://search.google.com/search-console
 *    - Add property for https://westwavecreative.com
 *    - Verify using HTML tag method or DNS
 *    - Submit sitemap: https://westwavecreative.com/sitemap.xml
 * 3. Monitor coverage, queries, and performance in Search Console
 */
export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

