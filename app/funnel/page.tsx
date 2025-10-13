"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, User, Building, Target, Clock, DollarSign, Globe, ArrowLeft } from "lucide-react"

interface Question {
  id: number
  question: string
  type: "intro" | "text" | "select" | "pricing"
  options?: string[]
  required: boolean
  icon: React.ReactNode
}

const questions: Question[] = [
  {
    id: 1,
    question: "Hey, let's plan your new website together! Ready to get started?",
    type: "intro",
    required: false,
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 2,
    question: "Great! Let's start with your name.",
    type: "text",
    required: true,
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 3,
    question: "Hi {firstName}, do you already have a website, or are we starting fresh?",
    type: "select",
    options: ["I already have one.", "I'll be starting from scratch."],
    required: true,
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: 4,
    question: "Perfect! Can you tell me what kind of business you are running?",
    type: "text",
    required: true,
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 5,
    question: "What is the #1 thing you want your site to do for your business?",
    type: "select",
    options: [
      "Get more leads/customers",
      "Sell more products",
      "Showcase your work/portfolio",
      "Provide info on your business",
      "Other",
    ],
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 6,
    question:
      "Cool, do you already have your own branding and content ready to go (like logo, photos colors), or do you need help with that as well?",
    type: "select",
    options: [
      "I have everything ready.",
      "I have some, but I need help with the rest.",
      "No, I'll need help with branding and content.",
    ],
    required: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 7,
    question: "When are you hoping to have your site live?",
    type: "select",
    options: ["ASAP", "In the next 1-2 months", "Just exploring for now"],
    required: true,
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: 8,
    question:
      "Thanks! Based on the information you shared, a site like yours usually lands around $3,500-$7,500. Would you like me to send you a full proposal with details?",
    type: "pricing",
    options: ["Yes, send me a proposal!", "I'd like to discuss this first", "Not ready yet, just exploring"],
    required: true,
    icon: <DollarSign className="h-5 w-5" />,
  },
]

const stepLabels = [
  "Getting started",
  "Your name",
  "Current website",
  "Your business",
  "Main goal",
  "Branding & content",
  "Timeline",
  "Proposal",
]

export default function SalesFunnel() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)

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
      if (prevAnswer && prevQuestion.type === "text") {
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
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
    transitionToNext()
  }

  const handleIntroNext = () => {
    transitionToNext()
  }

  const currentQ = questions[currentQuestion]

  const getPersonalizedQuestion = (question: string) => {
    const firstName = userAnswers[2]
    const firstNameOnly = firstName ? firstName.split(" ")[0] : ""
    return question.replace("{firstName}", firstNameOnly)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-[#D4AF37] mx-auto mb-4 sm:mb-6" />
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] mb-3 sm:mb-4 px-4">
            Perfect! I'll be in touch soon.
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#3A506B] mb-6 sm:mb-8 px-4">
            I'll review your information and get back to you with a personalized proposal within 24 hours.
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
                    Let's get started!
                  </Button>
                </div>
              ) : currentQ.type === "select" || currentQ.type === "pricing" ? (
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 border-2 border-[#3A506B]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 bg-white text-[#0B132B] font-sans hover:scale-[1.02] hover:shadow-md text-sm sm:text-base"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={
                      currentQuestion === 1
                        ? "Enter your name..."
                        : currentQuestion === 3
                          ? "Tell me about your business..."
                          : "Your answer..."
                    }
                    className="w-full border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 sm:h-14 rounded-lg bg-white text-[#0B132B] font-sans px-4 transition-all duration-200 text-sm sm:text-base"
                    required={currentQ.required}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                    disabled={!userInput.trim()}
                  >
                    Next →
                  </Button>
                </form>
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
