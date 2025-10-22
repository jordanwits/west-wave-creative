"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, User, Building, Target, Clock, Globe, ArrowLeft } from "lucide-react"

interface Question {
  id: number
  question: string
  type: "intro" | "text" | "single" | "multi" | "contact"
  options?: string[]
  maxSelected?: number
  required: boolean
  icon: React.ReactNode
}

const questions: Question[] = [
  {
    id: 1,
    question: "Let’s start planning your new website! Answer a few quick questions so we can prepare your custom quote.",
    type: "intro",
    required: false,
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 2,
    question: "What's your business all about? (This helps us tailor your site to what you do.)",
    type: "single",
    options: [
      "Contractor (e.g., plumber, electrician)",
      "Salon/Beauty Services",
      "Cleaning/Home Services",
      "Lawn Care/Landscaping",
      "Other Small Business (specify)",
    ],
    required: true,
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 3,
    question: "Where's your online presence at right now?",
    type: "single",
    options: [
      "No website yet",
      "Using a DIY tool like Wix/Squarespace (but frustrated)",
      "Have an old/outdated site",
      "Other (specify)",
    ],
    required: true,
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: 4,
    question: "What do you want your website to do for your business? (Select up to 3)",
    type: "multi",
    options: [
      "Generate more leads/calls",
      "Showcase services/portfolio",
      "Enable online bookings",
      "Sell products (e-commerce)",
      "Build credibility",
      "Other (specify)",
    ],
    maxSelected: 3,
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 5,
    question: "What must-have features are you looking for? (Select up to 5)",
    type: "multi",
    options: [
      "Contact form/lead capture",
      "Photo gallery/portfolio",
      "Blog/news section",
      "Mobile optimization",
      "SEO setup",
      "Online booking/calendar",
      "Payment integration",
      "Testimonials section",
      "Other (specify)",
    ],
    maxSelected: 5,
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 6,
    question: "How many pages do you think you'll need? (We can adjust this later.)",
    type: "single",
    options: [
      "1-3 (Basic: Home, About, Contact)",
      "4-6 (Standard: Plus services/portfolio)",
      "7+ (Expanded: With blog/e-commerce)",
      "Not sure - guide me!",
    ],
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 7,
    question: "What vibe are you going for with the design?",
    type: "single",
    options: [
      "Clean and professional",
      "Modern and bold",
      "Simple and straightforward",
      "Industry-specific (e.g., rugged for contractors)",
      "Not sure - surprise me!",
    ],
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 8,
    question: "When do you need this site live?",
    type: "single",
    options: ["ASAP (within 2 weeks)", "In the next month", "1-3 months from now", "No rush"],
    required: true,
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: 9,
    question:
      "What's your budget range? (Our sites start at $1,500 and go up to $4,000 based on features.)",
    type: "single",
    options: [
      "$1,500 - $2,500",
      "$2,500 - $4,000",
      "Under $1,500 (we might not be the best fit)",
      "Over $4,000 (we can refer you)",
      "Not sure",
    ],
    required: true,
    icon: <DollarSignPlaceholder />,
  },
  {
    id: 10,
    question: "Need anything else to make your site shine? (Select any)",
    type: "multi",
    options: [
      "Logo/branding design",
      "Content writing",
      "Domain/hosting setup",
      "Ongoing maintenance",
      "None - just the site!",
    ],
    maxSelected: 5,
    required: false,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 11,
    question: "Almost done! Share your details, and we'll send a personalized quote in 24 hours.",
    type: "contact",
    required: true,
    icon: <User className="h-5 w-5" />,
  },
]

// Placeholder icon to keep types simple without adding new import
function DollarSignPlaceholder() {
  return (
    <span className="inline-block w-5 h-5 rounded-sm bg-[#D4AF37]/30 text-[#0B132B] align-middle text-center leading-5 font-semibold">
      $
    </span>
  )
}

const stepLabels = [
  "Getting started",
  "Business type",
  "Website status",
  "Main goals",
  "Key features",
  "Pages",
  "Design style",
  "Timeline",
  "Budget",
  "Extras",
  "Contact info",
]

export default function DiscoveryPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[] | Record<string, string>>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [multiSelection, setMultiSelection] = useState<string[]>([])
  const [otherText, setOtherText] = useState("")
  const [otherMultiText, setOtherMultiText] = useState("")

  const transitionToNext = () => {
    setIsTransitioning(true)
    setShowContent(false)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setIsComplete(true)
      }
      setUserInput("")
      setShowContent(true)
      setIsTransitioning(false)
    }, 300)
  }

  const transitionToPrevious = () => {
    setIsTransitioning(true)
    setShowContent(false)

    setTimeout(() => {
      setCurrentQuestion((prev) => prev - 1)
      const prevQuestion = questions[currentQuestion - 1]
      const prevAnswer = userAnswers[prevQuestion.id]
      if (prevQuestion.type === "text" && typeof prevAnswer === "string") {
        setUserInput(prevAnswer)
      }
      setShowContent(true)
      setIsTransitioning(false)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const currentQ = questions[currentQuestion]
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: userInput }))
    transitionToNext()
  }

  const handleOptionSelect = (option: string) => {
    const currentQ = questions[currentQuestion]
    // single select flow
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
    // if option includes Other, wait for text input
    if (option.includes("(specify)")) {
      return
    }
    transitionToNext()
  }

  const toggleMultiOption = (option: string) => {
    const q = questions[currentQuestion]
    const max = q.maxSelected ?? 99
    setMultiSelection((prev) => {
      const exists = prev.includes(option)
      if (exists) {
        return prev.filter((o) => o !== option)
      }
      if (prev.length >= max) return prev
      return [...prev, option]
    })
  }

  const handleMultiNext = () => {
    if (multiSelection.length === 0) return
    const q = questions[currentQuestion]
    const processed = multiSelection.map((opt) =>
      opt.includes("(specify)") && otherMultiText.trim() ? `${opt.split(" (")[0]}: ${otherMultiText}` : opt
    )
    setUserAnswers((prev) => ({ ...prev, [q.id]: processed }))
    setMultiSelection([])
    setOtherText("")
    setOtherMultiText("")
    transitionToNext()
  }

  const handleIntroNext = () => {
    transitionToNext()
  }

  const currentQ = questions[currentQuestion]

  const getPersonalizedQuestion = (question: string) => {
    const rawFirstName = userAnswers[2]
    const firstNameOnly = typeof rawFirstName === "string" ? rawFirstName.split(" ")[0] : ""
    return question.replace("{firstName}", firstNameOnly)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-[#D4AF37] mx-auto mb-4 sm:mb-6" />
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] mb-3 sm:mb-4 px-4">
            Perfect! We'll be in touch soon.
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#3A506B] mb-6 sm:mb-8 px-4">
            We'll review your information and get back to you with a personalized proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold px-6 sm:px-8 py-3 w-full sm:w-auto"
              onClick={() => (window.location.href = "/")}
            >
              Back to Homepage
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#3A506B] text-[#3A506B] hover:bg-[#3A506B] hover:text-white px-6 sm:px-8 py-3 bg-transparent w-full sm:w-auto"
              onClick={() => (window.location.href = "/#portfolio")}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3F4] flex flex-col lg:flex-row">
      <div className="lg:hidden bg-white border-b border-[#3A506B]/10 p-4 flex items-center justify-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="font-serif text-xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300"
        >
          West Wave <span className="text-[#D4AF37]">Creative</span>
        </button>
      </div>

      <div className="lg:hidden bg-white border-b border-[#3A506B]/10 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-[#3A506B]">
          <span>
            Step {currentQuestion + 1} of {stepLabels.length}
          </span>
          <span>{Math.round(((currentQuestion + 1) / stepLabels.length) * 100)}% complete</span>
        </div>
        <div className="mt-2 w-full bg-[#3A506B]/10 rounded-full h-2">
          <div
            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / stepLabels.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="hidden lg:block lg:w-80 bg-white border-r border-[#3A506B]/10 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300 cursor-pointer"
          >
            West Wave <span className="text-[#D4AF37]">Creative</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < currentQuestion
                    ? "bg-[#D4AF37] text-[#0B132B]"
                    : index === currentQuestion
                      ? "bg-[#D4AF37] text-[#0B132B] scale-110"
                      : "bg-[#3A506B]/20 text-[#3A506B]/60"
                }`}
              >
                {index < currentQuestion ? "✓" : index + 1}
              </div>
              <span
                className={`font-sans text-sm transition-all duration-300 ${
                  index <= currentQuestion ? "text-[#0B132B] font-medium" : "text-[#3A506B]/60"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-120px)] lg:min-h-screen">
        <div className="max-w-2xl w-full">
          <div
            className={`transition-all duration-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/dave-profile.jpg"
                  alt="Dave from West Wave Creative"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans text-xs sm:text-sm text-[#3A506B]/60">Dave from West Wave Creative</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B132B] leading-tight">
                  {getPersonalizedQuestion(currentQ.question)}
                </h2>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {currentQ.type === "intro" ? (
                <div className="ml-0 sm:ml-16">
                  <Button
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold px-6 sm:px-8 py-3 rounded-lg w-full sm:w-auto"
                    onClick={handleIntroNext}
                  >
                    Start My Free Quote Now
                  </Button>
                </div>
              ) : (
            <div className="space-y-3">
              {currentQ.type === "single" && currentQ.options?.map((option, index) => (
                <div key={index} className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 border-2 border-[#3A506B]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#0B132B] transition-all duration-200 bg-white text-[#0B132B] font-sans hover:scale-[1.02] hover:shadow-md text-sm sm:text-base"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </Button>
                  {userAnswers[currentQ.id] === option && option.includes("(specify)") && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (!otherText.trim()) return
                        const label = option.startsWith("Other") ? "Other" : option
                        setUserAnswers((prev) => ({ ...prev, [currentQ.id]: `${label}: ${otherText}` }))
                        transitionToNext()
                      }}
                      className="ml-2"
                    >
                      <Input
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="Type here..."
                        className="mt-1 border-2 border-[#3A506B]/20 focus:border-[#D4AF37]"
                      />
                      <Button type="submit" className="mt-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B]">Continue</Button>
                    </form>
                  )}
                </div>
              ))}

              {currentQ.type === "multi" && (
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 border-2 transition-all duration-200 bg-white text-[#0B132B] font-sans text-sm sm:text-base ${
                          multiSelection.includes(option)
                            ? "border-[#D4AF37] bg-[#D4AF37]/10 hover:text-[#0B132B]"
                            : "border-[#3A506B]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:scale-[1.02] hover:shadow-md hover:text-[#0B132B]"
                        }`}
                        onClick={() => toggleMultiOption(option)}
                      >
                        {option}
                      </Button>
                      {option.includes("(specify)") && multiSelection.includes(option) && (
                        <Input
                          value={otherMultiText}
                          onChange={(e) => setOtherMultiText(e.target.value)}
                          placeholder="Type here..."
                          className="ml-2 border-2 border-[#3A506B]/20 focus:border-[#D4AF37]"
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#3A506B] font-sans">
                      Selected {multiSelection.length}{currentQ.maxSelected ? ` / ${currentQ.maxSelected}` : ""}
                    </span>
                    <Button
                      onClick={handleMultiNext}
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B]"
                      disabled={multiSelection.length === 0}
                    >
                      Next →
                    </Button>
                  </div>
                </div>
              )}

              {currentQ.type === "contact" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const fd = new FormData(form)
                    const name = (fd.get("name") as string) || ""
                    const email = (fd.get("email") as string) || ""
                    const phone = (fd.get("phone") as string) || ""
                    const business = (fd.get("business") as string) || ""
                    const notes = (fd.get("notes") as string) || ""

                    // Flatten answers
                    const flat: Record<string, string> = {}
                    Object.entries(userAnswers).forEach(([qid, ans]) => {
                      const q = questions.find((x) => x.id.toString() === qid)
                      const key = `Q${qid}_${q?.question?.slice(0, 40) || ""}`
                      if (Array.isArray(ans)) flat[key] = ans.join(", ")
                      else if (typeof ans === "object" && ans) flat[key] = JSON.stringify(ans)
                      else flat[key] = String(ans ?? "")
                    })

                    try {
                      const { submitWeb3Form } = await import("@/lib/web3forms")
                      const res = await submitWeb3Form({
                        form_name: "discovery",
                        subject: "New Discovery Submission",
                        page: "/discovery",
                        name,
                        email,
                        reply_to: email,
                        phone,
                        business,
                        notes,
                        ...flat,
                      })
                      if (res.success) {
                        ;(await import("@/hooks/use-toast")).toast({ title: "Thanks!", description: "We’ll send your quote within 24 hours." })
                        setIsComplete(true)
                        form.reset()
                      } else {
                        ;(await import("@/hooks/use-toast")).toast({ title: "Failed to submit", description: "Please try again.", variant: "destructive" as any })
                      }
                    } catch (err) {
                      ;(await import("@/hooks/use-toast")).toast({ title: "Error", description: "Please try again.", variant: "destructive" as any })
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Your name *" required className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" />
                    <Input name="email" type="email" placeholder="Email *" required className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" />
                    <Input name="phone" type="tel" placeholder="Phone (optional)" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" />
                    <Input name="business" placeholder="Business name *" required className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" />
                  </div>
                  <Input name="notes" placeholder="Any additional notes?" className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs sm:text-sm text-[#3A506B]">Your info stays private - we only use it for your quote.</p>
                    <Button type="submit" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold">Get My Quote Now</Button>
                  </div>
                </form>
              )}
            </div>
              )}
            </div>

            {currentQuestion > 0 && (
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#3A506B]/10">
                <Button
                  variant="ghost"
                  onClick={transitionToPrevious}
                  className="text-[#3A506B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200 text-sm sm:text-base p-2 sm:p-3"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go back to previous question
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


