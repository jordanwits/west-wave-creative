"use client"

import { useState, useEffect, type ReactNode, type RefObject } from "react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export default function WestPrairieWaterCaseStudy() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const gallery = [
  { src: "/wpHero.png", alt: "Hero that builds trust with clear CTAs" },
    { src: "/wpBill.png", alt: "Simple billing entry point" },
    { src: "/wpAlert.png", alt: "Persistent alerts for outages and boil orders" },
    { src: "/wpAbout.png", alt: "Clear About page content" },
    { src: "/wpContact.png", alt: "Streamlined contact page" },
  ]

  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const overviewAnimation = useScrollAnimation({ threshold: 0.1 })
  const challengeAnimation = useScrollAnimation({ threshold: 0.1 })
  const brandAnimation = useScrollAnimation({ threshold: 0.1 })
  const processAnimation = useScrollAnimation({ threshold: 0.1 })
  const highlightsAnimation = useScrollAnimation({ threshold: 0.1 })
  const resultsAnimation = useScrollAnimation({ threshold: 0.1 })
  const nextCaseAnimation = useScrollAnimation({ threshold: 0.1 })
  const ctaAnimation = useScrollAnimation({ threshold: 0.1 })
  const contactAnimation = useScrollAnimation({ threshold: 0.1 })

  const { containerRef: resultsRef, visibleItems: resultItems } = useStaggeredAnimation(5, 200)
  const { containerRef: metaRef, visibleItems: metaItems } = useStaggeredAnimation(4, 120)
  const { containerRef: brandRef, visibleItems: brandItems } = useStaggeredAnimation(2, 150)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToFunnel = () => {
    window.location.href = "/funnel"
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? 0 : (i + 1) % gallery.length))
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length))
      if (e.key === "Escape") setLightboxIndex(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex])

  // Narrow ref types from HTMLElement to specific elements to satisfy TS
  const castRef = <T extends HTMLElement>(ref: unknown) => ref as RefObject<T>

  return (
    <main className="bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div
            className={`font-serif text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-[#0B132B]" : "text-white"
            }`}
          >
            West Wave <span className="text-[#D4AF37]">Creative</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className={`inline-flex items-center gap-2 font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#3A506B]" : "text-white/90"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06L2.47 12l3.75-3.75a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Homepage
            </a>
            <a
              href="/funnel"
              className={`inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#D4AF37]/90 hover:shadow-xl text-[#0B132B] font-semibold px-6 py-2 rounded-md transition-all ${
                isScrolled ? "" : "shadow-lg"
              }`}
            >
              Get My Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-white py-36 px-4 overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img
            src="/prairie-river-background.jpeg"
            alt="West Prairie Water hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>
        <div
          ref={castRef<HTMLDivElement>(heroAnimation.ref)}
          className={`max-w-7xl mx-auto relative z-10 animate-fade-in ${heroAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Portfolio</p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              West Prairie Water <span className="text-[#D4AF37]">Website Launch</span>
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 text-[#F5F3F4]/90 leading-relaxed max-w-3xl mx-auto">
              Launching the first digital presence for a rural water utility — clear information architecture,
              accessible service details, and an easy path to contact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
              <a
                href="/funnel"
                className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Get Your Free Quote
              </a>
              <a
                href="https://www.wpwaterco.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap justify-center border-2 border-[#F5F3F4] text-[#F5F3F4] hover:bg-[#F5F3F4] hover:text-[#0B132B] font-semibold px-8 py-3 rounded-lg transition-all bg-transparent"
              >
                View Live Site
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                  <path d="M13 5h6v6h-2V8.414l-8.293 8.293-1.414-1.414L15.586 7H13V5z" />
                  <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-6h-2v6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Meta panel */}
      <section
        ref={castRef<HTMLDivElement>(overviewAnimation.ref)}
        className={`mx-auto max-w-7xl px-6 py-12 lg:px-8 animate-slide-up ${overviewAnimation.isVisible ? "visible" : ""}`}
      >
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left column - Project Overview */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#0B132B] mb-6">Project Overview</h2>
            <div className="space-y-4 text-slate-600 font-sans">
              <p className="leading-relaxed">
                West Prairie Water needed their first website to give residents one place to find company info, service
                details, and contact options.
              </p>
              <p className="leading-relaxed">
                Our focus was on making everyday tasks simple: pay your bill, manage your account, and reach support quickly. Critical
                updates like boil orders and outages are easy to spot, and water quality reports are easy to find.
              </p>
              
            </div>
          </div>

          {/* Right column - Metadata */}
          <div ref={castRef<HTMLDivElement>(metaRef)} className="space-y-8">
            <div className={`stagger-item ${metaItems[0] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">CLIENT</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">West Prairie Water</p>
            </div>

            <div className={`stagger-item ${metaItems[1] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">TIMELINE</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">4 weeks</p>
            </div>

            <div className={`stagger-item ${metaItems[2] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">MY ROLE</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">
                UI/UX Designer
                <br />
                Full Stack Developer
              </p>
            </div>

            <div className={`stagger-item ${metaItems[3] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">TOOLS USED</h3>
              <div className="flex items-center gap-3">
                <img src="/figma-logo.png" alt="Figma" className="w-8 h-8" />
                <img src="/vercel-logo.png" alt="Vercel" className="w-8 h-8" />
                  <img src="/cursorLogo.png" alt="Cursor" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content & TOC layout */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Body */}
          <div className="lg:col-span-8 space-y-24">
            <div
              ref={castRef<HTMLDivElement>(challengeAnimation.ref)}
              className={`animate-fade-in ${challengeAnimation.isVisible ? "visible" : ""}`}
            >
              <ContentBlock
                as="div"
                title="The Challenge"
                paragraphs={[
                  "Residents needed a reliable source of truth for service information and alerts, but there was no central, easy-to-use site to reference.",
                ]}
                bullets={[
                  "No prior digital presence",
                  "Information hard to find across channels",
                  "Need for an easy-to-use mobile first application",
                ]}
              />
            </div>

            <div ref={castRef<HTMLDivElement>(brandAnimation.ref)} className={`animate-slide-up ${brandAnimation.isVisible ? "visible" : ""}`}>
              <ContentBlock
                as="div"
                title="Brand & System"
                paragraphs={[
                  "We developed a cohesive visual identity that emphasizes clarity and trust, creating a system that works across all devices.",
                ]}
                customContent={
                  <div ref={castRef<HTMLDivElement>(brandRef)} className="mt-8 grid gap-12 lg:grid-cols-2">
                    {/* Typography Section */}
                    <div className={`stagger-item ${brandItems[0] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Typography</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        Nunito Sans is used as the primary typeface for this website. It’s friendly, highly legible, and
                        supports clear hierarchy across headings, body text, and UI elements.
                      </p>

                      <div className="border border-slate-200 rounded-xl p-6 bg-[rgba(245,243,244,1)]">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">FONT FAMILY</p>
                        <h4
                          className="text-slate-800 text-3xl mb-2 font-semibold"
                          style={{ fontFamily: "Nunito Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
                        >
                          Nunito Sans
                        </h4>
                        <p className="text-slate-600 text-sm">Used throughout the website for headings and body copy</p>
                      </div>
                    </div>

                    {/* Design System Section */}
                    <div className={`stagger-item ${brandItems[1] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Design System</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        A compact design system with reusable components ensures consistency and speed while focusing on
                        resident tasks.
                      </p>

                      <div>
                        <h4 className="text-lg font-semibold text-[#0B132B] mb-4">Key Components</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Easy‑to‑tap buttons with clear labels and feedback</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Mobile‑first, guided forms for billing, usage tracking, and contact</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Persistent alert banner and notice cards for outages and boil orders</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }
                image={{
                  src: "/wpWater-colors.png",
                  alt: "West Prairie Water color palette",
                  height: "h-auto",
                  objectFit: "object-contain object-center w-full",
                }}
              />
            </div>

            <div
              ref={castRef<HTMLDivElement>(processAnimation.ref)}
              className={`animate-fade-in ${processAnimation.isVisible ? "visible" : ""}`}
            >
              <ContentBlock
                as="div"
                title="Process"
                paragraphs={[
                  "A resident‑first approach focused on quick access to billing, start/stop service, outages and boil notices, water quality reports, and clear contact — built fast, accessible, and easy to maintain.",
                ]}
                graphicProcess={[
                  {
                    number: "01",
                    title: "Resident Journey Mapping",
                    body: "Mapped billing, service, alerts, water quality, and contact paths.",
                  },
                  {
                    number: "02",
                    title: "Information Architecture",
                    body: "Navigation: Pay Bill, Service, Alerts, Water Quality, Contact.",
                  },
                  {
                    number: "03",
                    title: "Wireframes & Prototypes",
                    body: "Mobile‑first flows; persistent outage/boil alert patterns.",
                  },
                  {
                    number: "04",
                    title: "Accessible Visual Design",
                    body: "WCAG AA contrast, clear type, large tap targets.",
                  },
                  {
                    number: "05",
                    title: "Rapid Implementation",
                    body: "Lightweight build with alerts, forms, CMS in four weeks.",
                  },
                ]}
              />
            </div>

            <div
              ref={castRef<HTMLDivElement>(highlightsAnimation.ref)}
              className={`animate-slide-up ${highlightsAnimation.isVisible ? "visible" : ""}`}
            >
              <ContentBlock
                as="div"
                title="UI/UX Highlights"
                bullets={[
                  "Resident-first navigation",
                  "Accessible color and type system",
                  "Concise, plain-language content",
                  "Fast paths to contact and billing",
                ]}
                image={{
                  src: "/wpLaptop.png",
                  alt: "West Prairie Water site on a laptop",
                  objectFit: "object-contain mr-auto max-w-lg",
                  height: "h-auto",
                }}
                imageWrapperClassName="bg-transparent p-0 border-0 shadow-none"
              />
            </div>

            <div
              ref={castRef<HTMLDivElement>(resultsAnimation.ref)}
              className={`animate-slide-up ${resultsAnimation.isVisible ? "visible" : ""}`}
            >
              <ContentBlock
                as="div"
                title="Results"
                paragraphs={[
                  "The site feels familiar and easy to use. People can pay their bill, check for alerts, or reach support in just a few moments. The utility now has a simple platform that is easy to update and ready to grow.",
                ]}
              />
              <div ref={castRef<HTMLDivElement>(resultsRef)} className="mt-16 space-y-12">
                <div className={`space-y-6 stagger-item ${resultItems[0] ? "visible" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                    <img
                      src="/wpHero.png"
                      alt="Trust-building hero with clear CTAs"
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                      onClick={() => setLightboxIndex(0)}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-4">A Hero That Builds Trust</h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      A familiar photo of the local river sets the tone. Clear calls to action make it obvious where to begin.
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 stagger-item ${resultItems[1] ? "visible" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                    <img
                      src="/wpBill.png"
                      alt="Simple billing entry point"
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                      onClick={() => setLightboxIndex(1)}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-4">Paying a Bill Is Straightforward</h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      The Pay Bill action is easy to spot. Clear steps guide residents through payment without any second guessing.
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 stagger-item ${resultItems[2] ? "visible" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                    <img
                      src="/wpAlert.png"
                      alt="Persistent alerts for outages and boil orders"
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                      onClick={() => setLightboxIndex(2)}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-4">Alerts You Can’t Miss</h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      Outages and boil orders are clearly called out. A banner and notice cards keep everyone informed right away.
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 stagger-item ${resultItems[3] ? "visible" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                    <img
                      src="/wpAbout.png"
                      alt="Clear About page content"
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                      onClick={() => setLightboxIndex(3)}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-4">About Page in Plain Language</h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      No jargon. The About page clearly explains who West Prairie Water is, the area they serve, and what residents can expect.
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 stagger-item ${resultItems[4] ? "visible" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                    <img
                      src="/wpContact.png"
                      alt="Streamlined contact page"
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                      onClick={() => setLightboxIndex(4)}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-4">Getting in Touch Is Easy</h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      Residents can call, email, or use a short form. Whatever they choose, they get a quick response.
                    </p>
                  </div>
                </div>
              </div>
              {/* Lightbox */}
              <Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) setLightboxIndex(null) }}>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-none sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none 2xl:max-w-none w-screen" showCloseButton>
                  {lightboxIndex !== null && (
                    <div className="relative">
                      <button
                        aria-label="Close lightbox"
                        onClick={() => setLightboxIndex(null)}
                        className="absolute inset-0 cursor-zoom-out"
                      />
                      <img
                        src={gallery[lightboxIndex].src}
                        alt={gallery[lightboxIndex].alt}
                        className="relative z-10 mx-auto max-h-[85vh] w-[min(95vw,1400px)] object-contain rounded-md"
                      />
                      <div className="relative z-10 mt-2 text-center text-white/90 text-sm">
                        {lightboxIndex + 1} of {gallery.length}
                      </div>
                      <button
                        aria-label="Previous image"
                        onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length))}
                        className="fixed left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3 hover:bg-black/70"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        aria-label="Next image"
                        onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % gallery.length))}
                        className="fixed right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3 hover:bg-black/70"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Visit live site */}
            <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2">See it live</h3>
                  <p className="font-sans text-slate-600">Explore the production site in the wild.</p>
                </div>
                <a
                  href="https://www.wpwaterco.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-4 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all"
                >
                  Visit wpwaterco.com
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M13 5h6v6h-2V8.414l-8.293 8.293-1.414-1.414L15.586 7H13V5z" />
                    <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-6h-2v6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">On this page</p>
              <nav className="space-y-3 text-sm">
                {[
                  ["the-challenge", "The Challenge"],
                  ["brand-system", "Brand & System"],
                  ["process", "Process"],
                  ["ui-ux-highlights", "UI/UX Highlights"],
                  ["results", "Results"],
                  ["contact", "Drop Us a Line"],
                ].map(([sectionId, label]) => (
                  <button
                    key={sectionId}
                    onClick={() => scrollToSection(sectionId)}
                    className="block w-full text-left rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6 text-sm">
                <p className="font-serif font-semibold text-[#0B132B] mb-2">Have a similar project?</p>
                <p className="font-sans text-[#3A506B] mb-4">Let's chat about timelines, scope, and budget.</p>
                <a
                  href="/contact"
                  className="inline-block rounded-lg bg-[#D4AF37] text-[#0B132B] px-6 py-3 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all"
                >
                  Get a quote
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Next case study teaser */}
      <section
        ref={castRef<HTMLDivElement>(nextCaseAnimation.ref)}
        className={`border-slate-200 bg-gradient-to-b from-slate-50 to-white border-t-0 animate-slide-up ${nextCaseAnimation.isVisible ? "visible" : ""}`}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="grid items-center justify-center place-items-center gap-4 md:gap-6 md:grid-cols-2">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Next Case Study</p>
              <h3 className="font-serif text-3xl font-bold mb-4">Innovations MFG – Website Redesign</h3>
              <p className="font-sans text-slate-600 mb-3 leading-relaxed md:text-lg">
                A complete redesign for a precision metal‑fabrication company, elevating credibility and creating a conversion‑focused experience.
              </p>
              <a href="/case-studies/innovations-mfg" className="inline-block rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-3 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all">
                View case study
              </a>
            </div>
            <img src="/mfgLaptop.png" alt="MFG mockup" className="w-full h-auto max-h-72 max-w-lg object-contain mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        ref={castRef<HTMLDivElement>(ctaAnimation.ref)}
        className={`bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#3A506B] text-white animate-scale-in ${ctaAnimation.isVisible ? "visible" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <h3 className="font-serif text-3xl font-bold mb-4">Let's create something remarkable</h3>
          <p className="font-sans mx-auto max-w-2xl text-slate-200 mb-8 leading-relaxed">
            Tell us about your goals and we'll map the fastest path to launch.
          </p>
          <div className="inline-flex gap-4">
            <Button
              type="button"
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={goToFunnel}
            >
              Start a project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] bg-transparent font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => (window.location.href = "/#work")}
            >
              See more work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#F5F3F4]">
        <div
          ref={castRef<HTMLDivElement>(contactAnimation.ref)}
          className={`max-w-4xl mx-auto animate-fade-in ${contactAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#0B132B]">Drop Us a Line</h2>
            <p className="font-sans text-lg text-[#3A506B]">
              Prefer to start with a message? No problem! Tell us a bit about your project and we'll get back to you
              within a few hours (usually much sooner).
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#D4AF37] bg-white/10 backdrop-blur-xl shadow-2xl">
            <div className="p-8 md:p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Your Name *</label>
                    <Input
                      placeholder="Your name"
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Best email to reach you *</label>
                    <Input type="email" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Phone (if you prefer calls)</label>
                    <Input type="tel" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Your business name</label>
                    <Input className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Tell us about your project</label>
                  <Textarea
                    placeholder="What kind of business do you have? What are you hoping to achieve with a new website? Any specific ideas or concerns? We'd love to hear it all!"
                    className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 min-h-[140px] rounded-lg bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    Send Our Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-[#0B132B] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company info */}
            <div className="md:col-span-2">
              <div className="font-serif text-3xl font-bold mb-4">
                West Wave <span className="text-[#D4AF37]">Creative</span>
              </div>
              <p className="font-sans text-[#F5F3F4]/80 mb-6 leading-relaxed max-w-md">
                We help small businesses and tradespeople look professional online and win more jobs. No fluff, no
                hidden fees—just clean, effective websites built fast and priced fairly.
              </p>
              <div className="flex gap-4">
                <Button size="sm" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold" onClick={goToFunnel}>
                  Get My Quote
                </Button>
                <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] bg-transparent" onClick={() => (window.location.href = "/#work")}>
                  View Our Work
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 text-[#F5F3F4]">Navigation</h4>
              <ul className="space-y-3 font-sans text-[#F5F3F4]/70">
                <li><a href="/" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Home</a></li>
                <li><a href="/#options" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Options</a></li>
                <li><a href="/#about" className="hover:text-[#D4AF37] transition-colors cursor-pointer">About</a></li>
                <li><a href="/#services" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Process</a></li>
                <li><a href="/#work" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Work</a></li>
                <li><a href="/#reviews" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Reviews</a></li>
                <li><a href="/#contact" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>

            {/* Contact & Services */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 text-[#F5F3F4]">Get In Touch</h4>
              <div className="space-y-3 font-sans text-[#F5F3F4]/70">
                <div>
                  <p className="text-[#D4AF37] font-semibold">Email</p>
                  <p>dave@westwavecreative.com</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-semibold">Phone</p>
                  <p>(530) 338-7829</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-semibold">Hours</p>
                  <p>Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#1C2541] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-[#F5F3F4]/50">© 2025 West Wave Creative. All rights reserved.</p>
            <div className="flex gap-6 font-sans text-sm text-[#F5F3F4]/50">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

type ContentBlockProps = {
  as?: 'section' | 'div'
  title: string
  paragraphs?: string[]
  bullets?: string[]
  steps?: { title: string; body: string }[]
  graphicProcess?: { number: string; title: string; body: string }[]
  image?: { src?: string; alt: string; height?: string; objectFit?: string; aspectRatio?: string }
  customContent?: ReactNode
  imageWrapperClassName?: string
}

function ContentBlock({ as = 'section', title, paragraphs = [], bullets = [], steps = [], graphicProcess = [], image, customContent, imageWrapperClassName }: ContentBlockProps) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^ui-ux/, "ui-ux")
  const Wrapper = as
  const totalGraphicSteps = Array.isArray(graphicProcess) ? graphicProcess.length : 0
  const { containerRef: stepContainerRef, visibleItems: stepVisible } = useStaggeredAnimation(totalGraphicSteps, 150)
  return (
    <Wrapper id={id} className="scroll-mt-32">
      <h2 className="font-serif text-2xl font-bold md:text-3xl mb-6">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="font-sans mb-4 text-slate-600 leading-relaxed">
          {p}
        </p>
      ))}
      {bullets.length > 0 && (
        <ul className="font-sans mt-6 list-disc space-y-3 pl-6 text-slate-700">
          {bullets.map((b, i) => (
            <li key={i} className="leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}
      {customContent && customContent}
      {steps.length > 0 && (
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-serif font-semibold mb-2">{s.title}</p>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      )}
      {graphicProcess.length > 0 && (
        <div ref={stepContainerRef as unknown as React.RefObject<HTMLDivElement>} className="mt-8 relative">
          <div className="space-y-8">
            {graphicProcess.map((step, i) => (
              <div key={i} className={`relative flex items-start gap-6 stagger-item ${stepVisible[i] ? 'visible' : ''}`}>
                {/* Number circle */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <span className="font-serif text-[#0B132B] font-bold text-lg">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-serif font-semibold text-lg mb-2 text-[#0B132B]">{step.title}</h3>
                  <p className="font-sans text-slate-600 leading-relaxed">{step.body}</p>
                </div>

                {i < graphicProcess.length - 1 && (
                  <div
                    className="absolute left-8 w-0.5 bg-[#D4AF37]/50 hidden md:block"
                    style={{ top: '4rem', height: 'calc(100% + 2rem)' }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {image && (
        <div className={`mt-8 overflow-hidden ${imageWrapperClassName ?? "border-slate-200 bg-white p-2 shadow-sm px-0 py-0 border-0 rounded-3xl"}`}>
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className={`w-full rounded-xl ${image.objectFit || "object-cover"} ${image.height || "h-72 md:h-80"} ${image.aspectRatio || ""}`}
          />
        </div>
      )}
    </Wrapper>
  )
}


