"use client"

import { useState, useEffect, type ReactNode, type RefObject } from "react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useStickyWithinParent } from "@/hooks/use-sticky-within-parent"

export default function BNBBreezeCaseStudy() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

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

  const { containerRef: resultsRef, visibleItems: resultItems } = useStaggeredAnimation(10, 200)
  const { containerRef: metaRef, visibleItems: metaItems } = useStaggeredAnimation(4, 120)
  const { containerRef: brandRef, visibleItems: brandItems } = useStaggeredAnimation(2, 150)
  const sticky = useStickyWithinParent({ topOffset: 96 })

  const gallery = [
    { src: "/bnbHero.png", alt: "BNB Breeze hero section" },
    { src: "/bnbAbout.png", alt: "About section overview" },
    { src: "/bnbSTR.png", alt: "Short term rentals responsibilities" },
    { src: "/bnbReviews.png", alt: "Reviews and testimonials" },
    { src: "/bnbStats.png", alt: "Performance stats" },
    { src: "/bnbServices.png", alt: "Services included" },
    { src: "/bnbProcess.png", alt: "Process steps" },
    { src: "/bnbExpectations.png", alt: "Expectations and what to expect" },
    { src: "/bnbAllstar.png", alt: "Allstar highlight" },
    { src: "/bnbContact.png", alt: "Contact section" },
  ]

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToFunnel = () => {
    window.location.href = "/discovery"
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <a
            href="/"
            className={`font-serif text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-[#0B132B]" : "text-white"
            } cursor-pointer`}
          >
            West Wave <span className="text-[#D4AF37]">Creative</span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className={`hidden md:inline-flex items-center gap-2 font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
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
              href="/discovery"
              className={`inline-flex items-center justify-center whitespace-nowrap bg-[#D4AF37] hover:bg-[#D4AF37]/90 hover:shadow-xl text-[#0B132B] font-semibold px-6 py-2 rounded-md transition-all ${
                isScrolled ? "" : "shadow-lg"
              }`}
            >
              <span className="sm:hidden">Free Quote</span>
              <span className="hidden sm:inline">Get My Quote</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-white py-36 px-4 overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img
            src="/bnb-card-background.jpeg"
            alt="BNB Breeze hero"
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
              BNB Breeze <span className="text-[#D4AF37]">Website Redesign</span>
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 text-[#F5F3F4]/90 leading-relaxed max-w-3xl mx-auto">
              Redesigned the Homeowner Information page for a short‑term rental management company, creating a clear
              path for property owners to understand services and get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
              <a
                href="/discovery"
                className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Get Your Free Quote
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
                BNB Breeze is a short-term rental management company. We were brought in to redesign one of their most
                important pages: the Homeowners sales page. This is where they earn the trust of property owners and
                convert interest into management inquiries.
              </p>
              <p className="leading-relaxed">
                The new page centers on homeowner outcomes and clear next steps. We simplified the story, clarified
                pricing and services, and made the primary action obvious so owners can confidently request a consult.
              </p>
            </div>
          </div>

          {/* Right column - Metadata */}
          <div ref={castRef<HTMLDivElement>(metaRef)} className="space-y-8">
            <div className={`stagger-item ${metaItems[0] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">CLIENT</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">BNB Breeze</p>
            </div>

            <div className={`stagger-item ${metaItems[1] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">TIMELINE</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">6 weeks</p>
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
                  "The prior page didn’t clearly convey value or make it easy for homeowners to take action.",
                ]}
                bullets={[
                  "Value propositions were buried, so homeowners struggled to quickly understand why BNB Breeze was the right partner.",
                  "The information hierarchy felt busy on desktop and cramped on mobile, which made the page hard to scan.",
                  "Calls to action were inconsistent and easy to miss, leaving visitors unsure of the next step.",
                  "Proof points like process clarity, pricing context, and social proof weren’t positioned to support decisions at the right moments.",
                ]}
              />
            </div>

            <div ref={castRef<HTMLDivElement>(brandAnimation.ref)} className={`animate-slide-up ${brandAnimation.isVisible ? "visible" : ""}`}>
              <ContentBlock
                as="div"
                title="Brand & System"
                paragraphs={[
                  "We developed a simple, trustworthy visual system that keeps attention on outcomes for homeowners and makes next steps obvious across devices.",
                ]}
                customContent={
                  <div ref={castRef<HTMLDivElement>(brandRef)} className="mt-8 grid gap-12 lg:grid-cols-2">
                    {/* Typography */}
                    <div className={`stagger-item ${brandItems[0] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Typography</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        Raleway is used as the primary typeface in this project. It’s clean and contemporary, supporting clear hierarchy
                        for headlines, benefits, and calls to action on the Homeowners sales page.
                      </p>
                      <div className="border border-slate-200 rounded-xl p-6 bg-[rgba(245,243,244,1)]">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">FONT FAMILY</p>
                        <h4
                          className="text-slate-800 text-3xl mb-2 font-semibold"
                          style={{ fontFamily: "Raleway, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
                        >
                          Raleway
                        </h4>
                        <p className="text-slate-600 text-sm">Used throughout for headings and emphasized body copy</p>
                      </div>
                    </div>

                    {/* Design System */}
                    <div className={`stagger-item ${brandItems[1] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Design System</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        A focused set of reusable components ensures consistency and keeps the path to inquiry effortless.
                      </p>
                      <div>
                        <h4 className="text-lg font-semibold text-[#0B132B] mb-4">Key Components</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Value-first hero with a primary CTA that guides owners to request a consult</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">STR responsibilities shown clearly so owners see what is handled for them</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Services and what's included presented with simple, scannable copy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }
                image={{
                  src: "/BNBcolors.png",
                  alt: "BNB Breeze color palette",
                  objectFit: "object-contain object-center w-full max-w-3xl mx-auto",
                  height: "h-auto",
                }}
                imageWrapperClassName="bg-transparent p-0 border-0 shadow-none"
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
                  "A straightforward five-step flow tailored to the Homeowners sales page—from clarifying questions to launching a mobile-first page with clear CTAs and proof.",
                ]}
                graphicProcess={[
                  {
                    number: "01",
                    title: "Clarify the Questions",
                    body: "Identified the top questions owners ask: earnings, fees, what is included, onboarding, guarantees.",
                  },
                  {
                    number: "02",
                    title: "Structure the Content",
                    body: "Organized the page around outcomes, services and pricing context, proof, and a persistent CTA.",
                  },
                  {
                    number: "03",
                    title: "Wireframes and Messaging",
                    body: "Created low-fi wireframes and benefit-led copy to validate flow and tone.",
                  },
                  {
                    number: "04",
                    title: "Visual Design and Trust",
                    body: "Applied the system, added testimonials and stats, and optimized for mobile scanning.",
                  },
                  {
                    number: "05",
                    title: "Implementation and Launch",
                    body: "Built and deployed the page and enabled easy edits going forward.",
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
                bullets={["Clear CTAs", "Readable sections", "Mobile‑first", "Faster path to conversion"]}
                image={{
                  src: "/bnb Laptop.png",
                  alt: "BNB page on laptop",
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
                  "A clear story that connects with homeowners and reduces friction. Stronger calls to action and a simple flow guide visitors from first glance to request a consult with confidence.",
                ]}
              />
              <div ref={castRef<HTMLDivElement>(resultsRef)} className="mt-16 space-y-12">
                {[ 
                  { src: "/bnbHero.png", title: "Hero", desc: "A welcoming hero that explains the value fast and points homeowners to the next step." },
                  { src: "/bnbAbout.png", title: "About", desc: "A short intro to who BNB Breeze is and how the team supports owners throughout the journey." },
                  { src: "/bnbSTR.png", title: "Short Term Rentals", desc: "A simple breakdown of what BNB Breeze handles for STRs so owners can relax and stay informed." },
                  { src: "/bnbReviews.png", title: "Reviews", desc: "Real homeowner feedback placed where it matters to build confidence before reaching out." },
                  { src: "/bnbStats.png", title: "Stats", desc: "Performance highlights that back up the story with numbers owners care about." },
                  { src: "/bnbServices.png", title: "Services", desc: "Clear list of what is included and how each service helps owners see results sooner." },
                  { src: "/bnbProcess.png", title: "Process", desc: "Three easy steps that show exactly what happens from hello to handoff." },
                  { src: "/bnbExpectations.png", title: "Expectations", desc: "A straightforward view of what owners can expect at each step so there are no surprises." },
                  { src: "/bnbAllstar.png", title: "Allstar Club", desc: "Exclusive club for owners with three or more properties. Members get added benefits and better rates." },
                  { src: "/bnbContact.png", title: "Contact", desc: "Multiple ways to reach the team and an easy path to request a consult." },
                ].map((item, i) => (
                  <div key={i} className={`space-y-6 stagger-item ${resultItems[i] ? "visible" : ""}`}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                      <img
                        src={item.src}
                        alt={`${item.title} section preview`}
                        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                        onClick={() => setLightboxIndex(i)}
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="font-sans text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-4 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all"
                >
                  Under maintinence
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M13 5h6v6h-2V8.414l-8.293 8.293-1.414-1.414L15.586 7H13V5z" />
                    <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-6h-2v6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-4 relative">
            <div ref={sticky.containerRef} style={sticky.style} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
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
                  href="/#contact"
                  className="inline-block rounded-lg bg-[#D4AF37] px-6 py-3 font-semibold hover:bg-[#D4AF37]/90 transition-colors"
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
              <h3 className="font-serif text-3xl font-bold mb-4">West Prairie Water – Website Launch</h3>
              <p className="font-sans text-slate-600 mb-3 leading-relaxed md:text-lg">
                Launching the first digital presence for a rural water utility with an accessible, clear experience.
              </p>
              <a href="/case-studies/west-prairie-water" className="inline-block rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-3 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all">
                View case study
              </a>
            </div>
            <img src="/wpLaptop.png" alt="West Prairie Water mockup" className="w-full h-auto max-h-72 max-w-lg object-contain mx-auto" />
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
              {contactSubmitted ? (
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.29a.75.75 0 1 0-1.22-.92l-3.487 4.626-1.69-1.69a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.132-.094l4.135-5.232Z" clipRule="evenodd" /></svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B]">Thanks—message received!</h3>
                  <p className="font-sans text-[#3A506B]">We’ll get back to you shortly (usually within a few hours).</p>
                </div>
              ) : (
              <form
                className="space-y-8"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget as HTMLFormElement
                  const formData = new FormData(form)
                  const name = (formData.get("name") as string) || ""
                  const email = (formData.get("email") as string) || ""
                  const phone = (formData.get("phone") as string) || ""
                  const business = (formData.get("business") as string) || ""
                  const message = (formData.get("message") as string) || ""

                  try {
                    const { submitWeb3Form } = await import("@/lib/web3forms")
                    const res = await submitWeb3Form({
                      form_name: "contact",
                      subject: "New Contact",
                      page: "/case-studies/bnb-breeze",
                      name,
                      email,
                      reply_to: email,
                      phone,
                      business,
                      message,
                    })
                    if (res.success) {
                      ;(await import("@/hooks/use-toast")).toast({ title: "Message sent!", description: "We’ll be in touch soon." })
                      setContactSubmitted(true)
                      form.reset()
                    } else {
                      ;(await import("@/hooks/use-toast")).toast({ title: "Failed to send", description: "Please try again.", variant: "destructive" as any })
                    }
                  } catch (err) {
                    ;(await import("@/hooks/use-toast")).toast({ title: "Error", description: "Please try again.", variant: "destructive" as any })
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Your Name *</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Best email to reach you *</label>
                    <Input name="email" type="email" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Phone (if you prefer calls)</label>
                    <Input name="phone" type="tel" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Your business name</label>
                    <Input name="business" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">Tell us about your project</label>
                  <Textarea
                    name="message"
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
              )}
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


