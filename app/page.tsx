"use client"

import { useState, useEffect, useRef, type RefObject } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Star, ArrowRight, Menu, X } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { useScroll } from "framer-motion"

// Narrow ref types from HTMLElement to specific elements to satisfy TS
const castRef = <T extends HTMLElement>(ref: unknown) => ref as RefObject<T>

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const heroImageAnimation = useScrollAnimation({ threshold: 0.1 })
  const optionsAnimation = useScrollAnimation({ threshold: 0.1 })
  const aboutAnimation = useScrollAnimation({ threshold: 0.1 })
  const servicesAnimation = useScrollAnimation({ threshold: 0.1 })
  const testimonialsAnimation = useScrollAnimation({ threshold: 0.1 })
  const ctaAnimation = useScrollAnimation({ threshold: 0.1 })
  const contactAnimation = useScrollAnimation({ threshold: 0.1 })

  const cs1LabelAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs1TitleAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs1DescAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs1ButtonAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs1InfoAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })

  const cs2LabelAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs2TitleAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs2DescAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs2ButtonAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs2InfoAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })

  const cs3LabelAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs3TitleAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs3DescAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs3ButtonAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })
  const cs3InfoAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: false })

  const { containerRef: testimonialsRef, visibleItems: testimonialItems } = useStaggeredAnimation(3, 150)
  const { containerRef: servicesRef, visibleItems: serviceItems } = useStaggeredAnimation(5, 100)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToFunnel = () => {
    window.location.href = "/funnel"
  }

  return (
    <div className="min-h-screen">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div
            onClick={scrollToTop}
            role="button"
            aria-label="Scroll to top"
            className={`font-serif text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-[#0B132B]" : "text-white"
            } cursor-pointer`}
          >
            West Wave <span className={isScrolled ? "text-[#D4AF37]" : "text-[#D4AF37]"}>Creative</span>
          </div>
          {/* Desktop nav (xl and up) */}
          <div className="hidden xl:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("options")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              Options
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`font-sans hover:text-[#D4AF37] transition-colors cursor-pointer ${
                isScrolled ? "text-[#0B132B]" : "text-white"
              }`}
            >
              Contact
            </button>
            <Button
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold px-6 py-2"
              onClick={goToFunnel}
            >
              Get My Quote
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            className={`xl:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors ${
              isScrolled ? "text-[#0B132B] hover:bg-black/5" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="xl:hidden fixed top-16 left-4 right-4 z-50 rounded-xl border border-black/10 bg-white/95 backdrop-blur-md shadow-xl">
          <div className="p-3 divide-y divide-black/5">
            <div className="flex flex-col py-1">
              <button onClick={() => { setMobileOpen(false); scrollToSection("about") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">About</button>
              <button onClick={() => { setMobileOpen(false); scrollToSection("options") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">Options</button>
              <button onClick={() => { setMobileOpen(false); scrollToSection("services") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">Process</button>
              <button onClick={() => { setMobileOpen(false); scrollToSection("work") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">Work</button>
              <button onClick={() => { setMobileOpen(false); scrollToSection("reviews") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">Reviews</button>
              <button onClick={() => { setMobileOpen(false); scrollToSection("contact") }} className="text-left px-3 py-3 rounded-md hover:bg-black/5">Contact</button>
            </div>
            <div className="p-3">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold" onClick={() => { setMobileOpen(false); goToFunnel() }}>
                Get My Quote
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative text-white px-4 overflow-hidden min-h-screen">
        {/* Video with mobile-safe settings and fallback */}
        {(() => {
          const videoRef = useRef<HTMLVideoElement | null>(null)
          const [videoFailed, setVideoFailed] = useState(false)

          useEffect(() => {
            const v = videoRef.current
            if (!v) return
            const tryPlay = async () => {
              try {
                // Ensure iOS Safari sees these flags before attempting playback
                v.muted = true
                v.setAttribute("muted", "")
                v.playsInline = true
                v.setAttribute("playsinline", "")
                v.setAttribute("webkit-playsinline", "")
                v.autoplay = true
                // Reload after setting attributes to make Safari re-evaluate autoplay
                v.load()
                await v.play()
              } catch {
                // On iOS Safari, programmatic play() may reject even when
                // muted+autoplay would still work. Ignore this error and
                // only fall back when the video truly errors (onError).
              }
            }
            // If already can play, attempt autoplay
            if (v.readyState >= 2) tryPlay()
            else v.addEventListener("canplay", tryPlay, { once: true })
            const interactionPlay = () => v.play().catch(() => {})
            document.addEventListener("touchstart", interactionPlay, { once: true, passive: true })
            document.addEventListener("click", interactionPlay, { once: true })
            document.addEventListener("visibilitychange", () => {
              if (!document.hidden) interactionPlay()
            })
            return () => {
              v.removeEventListener("canplay", tryPlay)
              document.removeEventListener("touchstart", interactionPlay)
              document.removeEventListener("click", interactionPlay)
              document.removeEventListener("visibilitychange", interactionPlay as any)
            }
          }, [])

          return !videoFailed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={() => setVideoFailed(true)}
              onLoadedMetadata={() => {
                const v = videoRef.current
                if (!v) return
                v.muted = true
                v.setAttribute("muted", "")
                v.playsInline = true
                v.setAttribute("playsinline", "")
                v.setAttribute("webkit-playsinline", "")
                v.autoplay = true
                v.play().catch(() => {})
              }}
              onTouchStart={() => {
                const v = videoRef.current
                if (!v) return
                v.play().catch(() => {})
              }}
            >
              <source src="/WestWaveHero.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src="/AdobeStock_1106750259.jpeg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        })()}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 min-h-screen flex items-center px-4 md:px-6">
          {/* Centered hero content group */}
          <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
            {/* Logo image */}
            <div className="flex-shrink-0">
              <img src="/WWC.com (3).png" alt="West Wave Creative logo" className="w-full h-auto max-w-[240px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none 2xl:max-w-none mx-auto" />
            </div>

            {/* Headline + CTAs (right-aligned text) */}
            <div className="text-center xl:text-right">
              <div ref={castRef<HTMLDivElement>(heroAnimation.ref)} className={`animate-fade-in ${heroAnimation.isVisible ? "visible" : ""}`}>
                <h1 className="font-serif font-extrabold leading-tight mb-5 text-[clamp(26px,3.6vw,52px)] 2xl:text-[60px]">
                  Pro Websites, Built Fast.<br />
                  <span className="text-[#D4AF37]">for Your Budget</span>
                </h1>
                <p className="font-sans text-white/90 text-[clamp(14px,2.2vw,20px)] 2xl:text-[22px] leading-relaxed mb-6 max-w-2xl mx-auto xl:ml-auto">
                  Get a professional, mobile‑friendly website in 2–4 weeks—optimized for SEO, speed, and conversions. Clear pricing, personal service, and results tailored to your budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center xl:justify-end">
                  <a
                    href="/funnel"
                    className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    Get Your Free Quote
                  </a>
                  <button
                    onClick={() => scrollToSection("work")}
                    className="relative inline-flex items-center justify-center bg-white/10 backdrop-blur-xl border border-[#D4AF37]/60 text-white hover:bg-white/20 hover:border-[#D4AF37] font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-black/20 w-full sm:w-auto"
                  >
                    See What We've Built
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#F5F3F4]">
        <div
          ref={castRef<HTMLDivElement>(aboutAnimation.ref)}
          className={`max-w-6xl mx-auto text-center animate-fade-in ${aboutAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#0B132B]">
              Professional websites with a <span className="text-[#D4AF37]">personal touch</span>
            </h2>
            <p className="font-sans text-xl text-[#3A506B] max-w-4xl mx-auto leading-relaxed">
              At West Wave Creative, we believe every small business deserves a website they can be proud of. We're a
              boutique studio — which means you'll never get lost in the shuffle or treated like "just another client."
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6 text-[#0B132B]">
                Small enough to care, <span className="text-[#D4AF37]">positioned for growth</span>
              </h3>
              <p className="font-sans text-lg text-[#3A506B] mb-6 leading-relaxed">
                We're small enough to care about every detail, but positioned for growth with the skills, tools, and
                vision to scale alongside your business. Whether you need a simple site to get started or a full digital
                strategy, we're here to make the process smooth, personal, and effective.
              </p>
              <p className="font-sans text-lg text-[#3A506B] mb-8 leading-relaxed">
                Our team brings together strategy, design, and hospitality in a way that's rare in the digital world.
                It's this combination of professionalism and personal care that defines West Wave Creative.
              </p>
            </div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-[#D4AF37] shadow-xl shadow-black/20">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src="/dave-profile.jpg"
                      alt="Dave - Business Development"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-xl font-bold text-[#0B132B] mb-1">Dave</h4>
                      <p className="font-sans text-[#3A506B] text-sm mb-2">Business Development & Sales</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src="/jordan-profile.jpg"
                      alt="Jordan - Product Development"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-xl font-bold text-[#0B132B] mb-1">Jordan</h4>
                      <p className="font-sans text-[#3A506B] text-sm mb-2">Product Development & Website Builds</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src="/barb-profile.jpg"
                      alt="Barb - Chief Hospitality Officer"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-xl font-bold text-[#0B132B] mb-1">Barb</h4>
                      <p className="font-sans text-[#3A506B] text-sm mb-2">Chief Hospitality Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Options Section */}
      <section id="options" className="relative px-4 pt-[calc(5rem+50px)] pb-[calc(5rem+50px)] bg-[url('/nature%20shot.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          ref={castRef<HTMLDivElement>(optionsAnimation.ref)}
          className={`relative z-10 max-w-7xl mx-auto animate-slide-up ${optionsAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
              Your Website Options, <span className="text-[#D4AF37]">Simplified</span>
            </h2>
            <p className="font-sans text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              When it comes to getting a professional website, you have three main paths. We've laid out the honest
              comparison so you can make the best choice for your business.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Primary card (West Wave Creative) */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative rounded-2xl border-2 border-[#D4AF37] bg-white p-6 shadow-xl md:p-8 mt-6 min-w-0 sm:min-w-96">
                <div className="absolute -top-3 left-6 select-none rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                  BEST CHOICE
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-2">West Wave Creative</h3>
                    <p className="font-sans text-[#3A506B] mb-6">
                      Professional design, small‑business pricing. We handle everything from content to launch.
                    </p>

                    {/* Benefits list */}
                    <ul className="space-y-3">
                      {[
                        "Personal, overwhelm‑free process",
                        "Custom website that reflects your brand",
                        "One‑time investment, no ongoing retainers",
                        "Most projects completed in 2–4 weeks",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#D4AF37] text-[#0B132B]">
                            ✓
                          </span>
                          <span className="font-sans text-[#1C2541]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA column */}
                  <div className="mt-4 w-full max-w-xs rounded-xl border border-[#F5F3F4] bg-[#F5F3F4] p-4 md:mt-0">
                    <p className="font-sans text-xs uppercase tracking-wider text-[#3A506B] mb-1 text-center">
                      Typical Project
                    </p>
                    <p className="font-serif text-2xl font-semibold text-[#0B132B] text-center mb-4">$1,500 – $3,000</p>

                    <Button
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                      onClick={goToFunnel}
                    >
                      Get My Quote
                    </Button>
                    <p className="font-sans text-center text-xs text-[#3A506B] mt-2">No obligation • Friendly advice</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context column (de‑emphasized alternatives) */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-white/80">
                Other paths
              </div>
              <div className="flex flex-col gap-6">
                {/* Agencies card */}
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 shadow-xl shadow-black/20">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-serif text-lg font-semibold text-white">Marketing Agencies</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> High‑end, full service
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> Great for large/complex builds
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> Premium price tag & retainers
                    </li>
                  </ul>
                  <div className="mt-3 font-sans text-sm text-white/80">
                    Typically <span className="font-medium text-[#D4AF37]">$5,000+</span>
                  </div>
                </div>

                {/* DIY card */}
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 shadow-xl shadow-black/20">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-serif text-lg font-semibold text-white">DIY Builders</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> Low upfront cost
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> Templates & drag‑and‑drop
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60">•</span> Time‑consuming & often frustrating
                    </li>
                  </ul>
                  <div className="mt-3 font-sans text-sm text-white/80">$20–50/mo + your time</div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#3A506B] rounded-2xl p-12 text-center text-white">
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              We don't just build websites — we build <span className="text-[#D4AF37]">relationships</span>
            </h3>
            <p className="font-sans text-xl mb-8 text-[#F5F3F4]/90 max-w-3xl mx-auto leading-relaxed">
              Ready to work with a team that genuinely cares about your success? Let's start a conversation about how we
              can help your business thrive online.
            </p>
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all mb-4"
              onClick={goToFunnel}
            >
              Start Our Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-[#F5F3F4]">
        <div
          ref={castRef<HTMLDivElement>(servicesAnimation.ref)}
          className={`max-w-6xl mx-auto text-center animate-slide-up ${servicesAnimation.isVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-3xl font-bold text-[#0B132B] mb-4 text-balance md:text-5xl">
            A Simple Process, <span className="text-[#D4AF37]">Start to Finish</span>
          </h2>
          <p className="font-sans text-slate-600 mb-16 max-w-3xl mx-auto text-pretty text-xl">
            We've taken the overwhelm out of building a website. Here's exactly what you can expect when you work with
            West Wave Creative:
          </p>

          <div className="text-left">
              <div ref={castRef<HTMLDivElement>(servicesRef)} className="grid gap-8 md:gap-12">
              {/* Step 1 */}
              <div
                className={`flex flex-col md:flex-row items-center gap-8 stagger-item ${serviceItems[0] ? "visible" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl font-bold text-[#0B132B]">1</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#0B132B]">Get Started</h3>
                  <p className="font-sans text-lg text-[#3A506B] leading-relaxed">
                    Fill out our quick survey and request your quote. We'll learn about your business, your goals, and
                    what success looks like for you.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0"></div>
              </div>

              {/* Step 2 */}
              <div
                className={`flex flex-col md:flex-row items-center gap-8 stagger-item ${serviceItems[1] ? "visible" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl font-bold text-[#0B132B]">2</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#0B132B]">Approve & Onboard</h3>
                  <p className="font-sans text-lg text-[#3A506B] leading-relaxed">
                    Accept your proposal, pay your deposit, and join us for a kickoff call. We'll dive deeper into your
                    vision and set clear expectations.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0"></div>
              </div>

              {/* Step 3 */}
              <div
                className={`flex flex-col md:flex-row items-center gap-8 stagger-item ${serviceItems[2] ? "visible" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl font-bold text-[#0B132B]">3</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#0B132B]">Design & Build</h3>
                  <p className="font-sans text-lg text-[#3A506B] leading-relaxed">
                    We create your site concept, you give feedback, and we refine it together. Ou collaborative approach
                    ensures you love the final result.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0"></div>
              </div>

              {/* Step 4 */}
              <div
                className={`flex flex-col md:flex-row items-center gap-8 stagger-item ${serviceItems[3] ? "visible" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl font-bold text-[#0B132B]">4</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#0B132B]">Launch</h3>
                  <p className="font-sans text-lg text-[#3A506B] leading-relaxed">
                    Your new website goes live! We handle all the technical details, test everything thoroughly, and
                    make sure you're ready to start attracting customers.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div
                className={`flex flex-col md:flex-row items-center gap-8 stagger-item ${serviceItems[4] ? "visible" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-2xl font-bold text-[#0B132B]">5</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#0B132B]">Support & Grow</h3>
                  <p className="font-sans text-lg text-[#3A506B] leading-relaxed">
                    Stay supported with monthly updates and explore tools like JobDock. We're here for the long haul,
                    helping your business grow online.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-xl px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                onClick={goToFunnel}
              >
                Start This Simple Process
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <p className="font-sans text-sm text-[#3A506B] mt-4">Most projects completed in 2-4 weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 1: BNB Breeze */}
      <section
        id="work"
        className="relative w-full overflow-hidden bg-[#0B132B] py-28 md:py-40"
      >
        <div className="absolute inset-0">
          <img
            src="/bnb-card-background.jpeg"
            alt="Luxury vacation rental property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div
                ref={castRef<HTMLDivElement>(cs1LabelAnimation.ref)}
                className={`transition-all duration-700 ${
                  cs1LabelAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <p className="inline-block rounded-full bg-[#D4AF37]/20 px-4 py-1 font-sans text-sm uppercase tracking-widest text-[#D4AF37] mb-6">portfolio</p>
              </div>
              <h2
                ref={castRef<HTMLHeadingElement>(cs1TitleAnimation.ref)}
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
                  cs1TitleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                BNB Breeze
              </h2>
              <p
                ref={castRef<HTMLParagraphElement>(cs1DescAnimation.ref)}
                className={`font-sans text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
                  cs1DescAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Redesigned the Homeowner Information page for a short-term rental management company, creating a clear
                path for property owners to understand services and get started.
              </p>
              <div
                ref={castRef<HTMLDivElement>(cs1ButtonAnimation.ref)}
                className={`transition-all duration-700 delay-300 ${
                  cs1ButtonAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => (window.location.href = "/case-studies/bnb-breeze")}
                >
                  View Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div
                ref={castRef<HTMLDivElement>(cs1InfoAnimation.ref)}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-sm ml-auto transition-all duration-700 delay-300 ${
                  cs1InfoAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <div className="space-y-6">
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Category</p>
                    <p className="font-serif text-2xl text-white font-semibold">Property Management</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Impact</p>
                    <p className="font-serif text-2xl text-[#D4AF37] font-semibold">+85% Lead Quality</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Timeline</p>
                    <p className="font-serif text-2xl text-white font-semibold">6 Weeks</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 2: Innovations MFG */}
      <section className="relative w-full overflow-hidden bg-[#0B132B] py-28 md:py-40">
        <div className="absolute inset-0">
          <img
            src="/plasma-cutter.webp"
            alt="Industrial manufacturing equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div
                ref={castRef<HTMLDivElement>(cs2LabelAnimation.ref)}
                className={`transition-all duration-700 ${
                  cs2LabelAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <p className="inline-block rounded-full bg-[#D4AF37]/20 px-4 py-1 font-sans text-sm uppercase tracking-widest text-[#D4AF37] mb-6">portfolio</p>
              </div>
              <h2
                ref={castRef<HTMLHeadingElement>(cs2TitleAnimation.ref)}
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
                  cs2TitleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Innovations MFG
              </h2>
              <p
                ref={castRef<HTMLParagraphElement>(cs2DescAnimation.ref)}
                className={`font-sans text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
                  cs2DescAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                A complete redesign for a precision metal-fabrication company, elevating their credibility and creating
                a conversion-focused experience that showcases their expertise.
              </p>
              <div
                ref={castRef<HTMLDivElement>(cs2ButtonAnimation.ref)}
                className={`transition-all duration-700 delay-300 ${
                  cs2ButtonAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    window.location.href = "/case-studies/innovations-mfg"
                  }}
                >
                  View Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div
                ref={castRef<HTMLDivElement>(cs2InfoAnimation.ref)}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-sm ml-auto transition-all duration-700 delay-300 ${
                  cs2InfoAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <div className="space-y-6">
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Category</p>
                    <p className="font-serif text-2xl text-white font-semibold">Manufacturing</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Impact</p>
                    <p className="font-serif text-2xl text-[#D4AF37] font-semibold">First Digital Presence</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Timeline</p>
                    <p className="font-serif text-2xl text-white font-semibold">2 Weeks</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 3: West Prairie Water Co */}
      <section className="relative w-full overflow-hidden bg-[#0B132B] py-28 md:py-40">
        <div className="absolute inset-0">
          <img
            src="/prairie-river-background.jpeg"
            alt="Prairie river natural landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div
                ref={castRef<HTMLDivElement>(cs3LabelAnimation.ref)}
                className={`transition-all duration-700 ${
                  cs3LabelAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <p className="inline-block rounded-full bg-[#D4AF37]/20 px-4 py-1 font-sans text-sm uppercase tracking-widest text-[#D4AF37] mb-6">portfolio</p>
              </div>
              <h2
                ref={castRef<HTMLHeadingElement>(cs3TitleAnimation.ref)}
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
                  cs3TitleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                West Prairie Water
              </h2>
              <p
                ref={castRef<HTMLParagraphElement>(cs3DescAnimation.ref)}
                className={`font-sans text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
                  cs3DescAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Created the first website for a water utility company, delivering a clear, accessible platform that
                helps residents access information and services with ease.
              </p>
              <div
                ref={castRef<HTMLDivElement>(cs3ButtonAnimation.ref)}
                className={`transition-all duration-700 delay-300 ${
                  cs3ButtonAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => (window.location.href = "/case-studies/west-prairie-water")}
                >
                  View Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div
                ref={castRef<HTMLDivElement>(cs3InfoAnimation.ref)}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-sm ml-auto transition-all duration-700 delay-300 ${
                  cs3InfoAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <div className="space-y-6">
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Category</p>
                    <p className="font-serif text-2xl text-white font-semibold">Utilities</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Impact</p>
                    <p className="font-serif text-2xl text-[#D4AF37] font-semibold">First Digital Presence</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white/60 mb-2">Timeline</p>
                    <p className="font-serif text-2xl text-white font-semibold">4 Weeks</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Chat CTA (moved above Reviews) */}
      <section className="py-20 px-4 bg-[#F5F3F4]">
        <div
          ref={castRef<HTMLDivElement>(ctaAnimation.ref)}
          className={`max-w-7xl mx-auto animate-scale-in ${ctaAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#0B132B] leading-tight">
                Ready to <span className="text-[#D4AF37]">Chat</span> About Your Project?
              </h2>
              <p className="font-sans text-xl mb-8 text-[#3A506B]">
                We'd love to hear about your business and see how we can help you grow online. No pressure, no sales
                pitch - just a friendly conversation about your goals.
              </p>
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-xl px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all mb-4"
                onClick={goToFunnel}
              >
                Let's Talk
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
            <div className="rounded-2xl p-8 border-2 border-[#D4AF37] bg-white/10 backdrop-blur-xl shadow-xl">
              <h3 className="font-serif text-2xl font-bold mb-6 text-[#0B132B]">Here's What We'll Cover:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-[#0B132B] mb-1">Your Business Goals</p>
                    <p className="font-sans text-sm text-[#3A506B]">
                      What you want to achieve and how a website can help
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-[#0B132B] mb-1">Quick Ideas & Suggestions</p>
                    <p className="font-sans text-sm text-[#3A506B]">Some initial thoughts on what might work well</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-[#0B132B] mb-1">Next Steps (If You Want Them)</p>
                    <p className="font-sans text-sm text-[#3A506B]">
                      How we could work together, if it feels like a good fit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (moved below CTA) */}
      <section id="reviews" className="relative py-24 px-4 bg-[url('/Reviews-bkg.webp')] bg-cover bg-center min-h-[85vh] md:min-h-[95vh] flex items-center">
        <div className="absolute inset-0 bg-black/55"></div>
        <div
          ref={castRef<HTMLDivElement>(testimonialsAnimation.ref)}
          className={`relative z-10 max-w-7xl mx-auto animate-slide-up ${testimonialsAnimation.isVisible ? "visible" : ""}`}
        >
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-stretch w-full">
            {/* Left: Big review card */}
            <div className="md:col-span-7">
              <div className="relative h-full rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-8 md:p-10 shadow-2xl min-h-[460px] md:min-h-[560px]">
                <div className="flex items-center gap-1 text-[#D4AF37] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <blockquote className="font-sans text-white/95 text-lg md:text-xl leading-relaxed italic">
                  "West Wave helped me create a web page for my company. They brought ideas and professionalism to the table, 
                  and they were able to deliver a great result very efficiently. I would recommend working with West Wave. 
                  Throughout the process they were engaged and professional. "
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img src="/marc-profile.jpg" alt="Reviewer" className="w-14 h-14 rounded-full object-cover border-2 border-white/30" />
                  <div>
                    <p className="font-sans text-white font-semibold">Marc Catalano</p>
                    <p className="font-sans text-white/70 text-sm">Innovations Manufacturing</p>
                  </div>
                </div>
                
                <div className="pointer-events-none select-none absolute bottom-6 right-8 text-[#D4AF37]">
                  <span className="block leading-none text-7xl md:text-8xl font-black">”</span>
                </div>
              </div>
            </div>

            {/* Right: Heading and copy */}
            <div className="md:col-span-5 flex items-center">
              <div className="text-left">
                <div className="font-sans text-sm uppercase tracking-widest text-white/80 mb-3">Testimonials</div>
                <h2 className="font-serif text-5xl md:text-6xl font-extrabold leading-[1.05] text-white mb-6">
                  What our
                  <br />
                  <span className="text-[#D4AF37]">Clients</span> say...
                </h2>
                <p className="font-sans text-white/90 text-lg leading-relaxed max-w-md">
                  We're proud to share feedback from our loyal clients who continue to support and enjoy our work. Their
                  stories and experiences inspire us to keep bringing fresh, engaging, and high-quality content to the
                  community.
                </p>
              </div>
            </div>
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
                      page: "/",
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
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">
                      Best email to reach you *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">
                      Phone (if you prefer calls)
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">
                      Your business name
                    </label>
                    <Input name="business" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm" />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-sm font-semibold text-[#0B132B] mb-3 block">
                    Tell us about your project
                  </label>
                  <Textarea
                    name="message"
                    placeholder="What kind of business do you have? What are you hoping to achieve with a new website? Any specific ideas or concerns? We'd love to hear it all!"
                    className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 min-h-[140px] rounded-lg bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
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
                <Button
                  size="sm"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                  onClick={goToFunnel}
                >
                  Get My Quote
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] bg-transparent"
                  onClick={() => scrollToSection("work")}
                >
                  View Our Work
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 text-[#F5F3F4]">Navigation</h4>
              <ul className="space-y-3 font-sans text-[#F5F3F4]/70">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("options")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Options
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("work")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {"Work"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("reviews")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
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

          {/* Services offered */}

          {/* Copyright */}
          <div className="border-t border-[#1C2541] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-[#F5F3F4]/50">© 2025 West Wave Creative. All rights reserved.</p>
            <div className="flex gap-6 font-sans text-sm text-[#F5F3F4]/50">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
