"use client"

import { useState, useEffect, type ReactNode, type RefObject } from "react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useStickyWithinParent } from "@/hooks/use-sticky-within-parent"

export default function AletheiaLifeCaseStudy() {
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

  const { containerRef: resultsRef, visibleItems: resultItems } = useStaggeredAnimation(8, 200)
  const { containerRef: metaRef, visibleItems: metaItems } = useStaggeredAnimation(4, 120)
  const { containerRef: brandRef, visibleItems: brandItems } = useStaggeredAnimation(2, 150)
  const sticky = useStickyWithinParent({ topOffset: 96 })

  const gallery = [
    { src: "/Aletheia-Hero.png", alt: "Hero headline: Complete Healing Is God's Promise with primary calls to action" },
    { src: "/Aletheia-Message.png", alt: "Message section: Heaven in Healthcare with supporting mission copy and CTA" },
    { src: "/Aletheia-Services.png", alt: "Services card: Heaven in Health Conferences with bullet points and Get Started CTA" },
    { src: "/Aletheia-Testimonials.png", alt: "Testimonies of Healing carousel with featured quote and navigation dots" },
    { src: "/Aletheia-Founder.png", alt: "Founder spotlight: Kate Hamilton profile card with story and photo" },
    { src: "/Aletheia-Beliefs.png", alt: "Our Beliefs section with numbered belief statements and clear hierarchy" },
    { src: "/Aletheia-CTA.png", alt: "CTA panel: Ready to Begin Your Healing Journey with Contact and Get Involved buttons" },
    { src: "/Aletheia-Contact.png", alt: "Get In Touch contact form with clear fields, background imagery, and Send Message CTA" },
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
            src="/AletheiaCaseHero.jpg"
            alt="Aletheia Life hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 25%' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div
          ref={castRef<HTMLDivElement>(heroAnimation.ref)}
          className={`max-w-7xl mx-auto relative z-10 animate-fade-in ${heroAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Portfolio</p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Aletheia Life <span className="text-[#D4AF37]">Website</span>
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 text-[#F5F3F4]/90 leading-relaxed max-w-3xl mx-auto">
              Launched Aletheia Life’s first digital presence—a health & wellness website built for clarity, trust, and conversion-focused flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
              <a
                href="/discovery"
                className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Get Your Free Quote
              </a>
              <a
                href="https://aletheialife.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                View Live Site
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M13 5h6v6h-2V8.414l-8.293 8.293-1.414-1.414L15.586 7H13V5z" />
                  <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6z" />
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
                This project launched Aletheia Life’s first digital presence—a clear, credible home base to communicate their mission, explain their services, and guide visitors toward action.
              </p>
              <p className="leading-relaxed">
                We centered the experience on clarity and trust: streamlined messaging, intuitive navigation, and obvious next steps throughout the journey—so visitors can understand Aletheia quickly and reach out with confidence.
              </p>
            </div>
          </div>

          {/* Right column - Metadata */}
          <div ref={castRef<HTMLDivElement>(metaRef)} className="space-y-8">
            <div className={`stagger-item ${metaItems[0] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">CLIENT</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">Aletheia Life</p>
            </div>

            <div className={`stagger-item ${metaItems[1] ? "visible" : ""}`}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">TIMELINE</h3>
              <p className="font-sans text-slate-800 text-lg font-medium">4 weeks</p>
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
                  "As Aletheia Life’s first website, the challenge was to establish clear messaging and a trustworthy experience that communicates their values well.",
                ]}
                bullets={[
                  "Most of the written copy and messaging came directly from the client—our job was to translate it into a clear, scannable website experience.",
                  "Information hierarchy and navigation had to be designed from scratch so visitors could quickly find what they need and understand the offering.",
                  "Calls to action needed consistent placement and flow throughout the pages so the next step always felt obvious.",
                  "Trust signals (founder story, beliefs, and testimonies) needed thoughtful layout and emphasis to build confidence without overwhelming the reader.",
                ]}
              />
            </div>

            <div ref={castRef<HTMLDivElement>(brandAnimation.ref)} className={`animate-slide-up ${brandAnimation.isVisible ? "visible" : ""}`}>
              <ContentBlock
                as="div"
                title="Brand & System"
                paragraphs={[
                  "We developed a cohesive visual system that keeps attention on key messages and makes navigation intuitive across all devices.",
                ]}
                customContent={
                  <div ref={castRef<HTMLDivElement>(brandRef)} className="mt-8 grid gap-12 lg:grid-cols-2">
                    {/* Typography */}
                    <div className={`stagger-item ${brandItems[0] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Typography</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        Clean, modern typography that supports clear hierarchy and readability throughout the experience.
                      </p>
                      <div className="border border-slate-200 rounded-xl p-6 bg-[rgba(245,243,244,1)]">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">TYPOGRAPHY</p>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                              Headers
                            </p>
                            <h4
                              className="text-slate-800 text-3xl font-semibold leading-tight uppercase"
                              style={{ fontFamily: '"Figtree", system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
                            >
                              Figtree
                            </h4>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                              Body
                            </p>
                            <h4
                              className="text-slate-800 text-3xl font-normal leading-tight uppercase"
                              style={{ fontFamily: '"Lustria", ui-serif, Georgia, serif' }}
                            >
                              Lustria
                            </h4>
                            <p className="text-slate-600 text-sm mt-2">FIGTREE for headings, LUSTRIA for body copy.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Design System */}
                    <div className={`stagger-item ${brandItems[1] ? "visible" : ""}`}>
                      <h3 className="text-xl font-bold text-[#0B132B] mb-4">Design System</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        A focused set of reusable components ensures consistency and keeps the user journey clear.
                      </p>
                      <div>
                        <h4 className="text-lg font-semibold text-[#0B132B] mb-4">Key Components</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Value-first hero with clear primary call to action</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Intuitive navigation that guides users through the journey</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600">Services and benefits presented with scannable, clear copy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }
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
                  "A straightforward five-step flow—from discovery to launch—with clear communication and collaboration throughout.",
                ]}
                graphicProcess={[
                  {
                    number: "01",
                    title: "Discovery & Strategy",
                    body: "Identified key user questions and goals to shape the site structure and messaging.",
                  },
                  {
                    number: "02",
                    title: "Content Structure",
                    body: "Organized pages around user needs, value propositions, and clear calls to action.",
                  },
                  {
                    number: "03",
                    title: "Wireframes and Copy",
                    body: "Created wireframes and benefit-led messaging to validate flow and tone.",
                  },
                  {
                    number: "04",
                    title: "Visual Design",
                    body: "Applied the design system, optimized for mobile, and ensured accessibility.",
                  },
                  {
                    number: "05",
                    title: "Build and Launch",
                    body: "Developed, tested, and deployed the site with ongoing support options.",
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
                customContent={
                  <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:items-start">
                    <ul className="font-sans list-disc space-y-3 pl-6 text-slate-700">
                      {["Clear CTAs", "Intuitive navigation", "Mobile‑first design", "Fast, accessible experience"].map((b, i) => (
                        <li key={i} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-transparent p-0 border-0 shadow-none lg:-mt-15">
                      <img
                        src="/AletheiaLaptop.png"
                        alt="Aletheia Life site on a laptop"
                        className="w-full object-contain max-w-lg mx-auto lg:mx-0"
                      />
                    </div>
                  </div>
                }
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
                  "A clean, modern website that connects with visitors and reduces friction. Clear messaging and intuitive navigation guide users from first visit to conversion with confidence.",
                ]}
              />
              <div ref={castRef<HTMLDivElement>(resultsRef)} className="mt-16 space-y-12">
                {[ 
                  {
                    src: "/Aletheia-Hero.png",
                    title: "Promise‑Led Hero",
                    desc: "A simple, bold hero with a video background that immediately communicates the promise and offers clear primary actions without overwhelming the visitor.",
                  },
                  {
                    src: "/Aletheia-Message.png",
                    title: "Message‑First Storytelling",
                    desc: "A clean split layout that elevates the core message (“Heaven in Healthcare”) with generous spacing, readable long‑form copy, and a single CTA that guides visitors forward.",
                  },
                  {
                    src: "/Aletheia-Services.png",
                    title: "Scannable Services Cards",
                    desc: "A card-based services presentation with a clear heading, short description, and quick-scan bullet points—making it easy to understand each offering and click “Get Started.”",
                  },
                  {
                    src: "/Aletheia-Testimonials.png",
                    title: "Testimony Carousel",
                    desc: "Social proof delivered through a focused, readable slider that makes it easy to explore real stories and outcomes without distraction.",
                  },
                  {
                    src: "/Aletheia-Founder.png",
                    title: "Meet The Founder",
                    desc: "A personable founder spotlight that builds trust with a clear name/title, authentic portrait, and story-driven copy that connects the mission to real experience.",
                  },
                  {
                    src: "/Aletheia-Beliefs.png",
                    title: "Core Beliefs",
                    desc: "By weaving the company’s core beliefs into the site, visitors quickly understand what Aletheia stands for—building trust, reinforcing the mission, and creating alignment before they take the next step.",
                  },
                  {
                    src: "/Aletheia-CTA.png",
                    title: "Strategicly Placed Calls to Action",
                    desc: "Calls to action are placed intentionally throughout the experience, so when visitors feel ready, the next step is obvious (get involved, learn more, or reach out) without hunting for where to click.",
                  },
                  {
                    src: "/Aletheia-Contact.png",
                    title: "Frictionless Contact Form",
                    desc: "A clean, modern contact layout with intuitive fields and a clear submit action. The form is linked directly to the client’s CRM so new inquiries are captured and routed automatically.",
                  },
                ].map((item, i) => (
                  <div key={i} className={`space-y-6 stagger-item ${resultItems[i] ? "visible" : ""}`}>
                    <div>
                      <h4 className="font-serif text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="font-sans text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 hover:border-[#D4AF37]">
                      <img
                        src={item.src}
                        alt={`${item.title} section preview`}
                        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
                        onClick={() => setLightboxIndex(i)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Lightbox */}
              <Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) setLightboxIndex(null) }}>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-none sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none 2xl:max-w-none w-screen" showCloseButton>
                  <DialogTitle className="sr-only">
                    {lightboxIndex !== null ? gallery[lightboxIndex].alt : "Image gallery"}
                  </DialogTitle>
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
                  <p className="font-sans text-slate-600">There's much more to the site than what we've displayed here. Explore the production site live.</p>
                </div>
                <a
                  href="https://aletheialife.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-4 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all"
                >
                  Visit Site
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M13 5h6v6h-2V8.414l-8.293 8.293-1.414-1.414L15.586 7H13V5z" />
                    <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6z" />
                  </svg>
                </a>
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
              <h3 className="font-serif text-3xl font-bold mb-4">Innovations MFG – Website Redesign</h3>
              <p className="font-sans text-slate-600 mb-3 leading-relaxed md:text-lg">
                A complete redesign for a precision metal‑fabrication company, elevating credibility and creating a conversion‑focused experience.
              </p>
              <a href="/case-studies/innovations-mfg" className="inline-block rounded-xl bg-[#D4AF37] text-[#0B132B] px-6 py-3 font-semibold shadow-lg hover:bg-[#D4AF37]/90 hover:shadow-xl transition-all">
                View case study
              </a>
            </div>
            <img src="/mfgLaptop.png" alt="Innovations MFG mockup" className="w-full h-auto max-h-72 max-w-lg object-contain mx-auto" />
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
                  <p className="font-sans text-[#3A506B]">We'll get back to you shortly (usually within a few hours).</p>
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
                      page: "/case-studies/aletheia-life",
                      name,
                      email,
                      reply_to: email,
                      phone,
                      business,
                      message,
                    })
                    if (res.success) {
                      ;(await import("@/hooks/use-toast")).toast({ title: "Message sent!", description: "We'll be in touch soon." })
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

