"use client"

import dynamic from 'next/dynamic'

// Disable SSR completely to avoid hydration issues
const ClientFormPageWrapper = dynamic(
  () => import('./page-wrapper'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="font-sans text-[#3A506B]">Loading form...</p>
        </div>
      </div>
    )
  }
)

export default function ClientFormPage() {
  return <ClientFormPageWrapper />
}
