"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, ArrowLeft } from "lucide-react"

interface Question {
  id: string
  text: string
  type: "text" | "textarea" | "email" | "tel" | "url" | "number" | "select"
  placeholder?: string
  required?: boolean
  options?: string[]
}

export default function ClientFormPage() {
  const [formData, setFormData] = useState<{ title: string; description: string; questions: Question[] } | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [textInput, setTextInput] = useState("")

  useEffect(() => {
    // Get form data from URL
    const params = new URLSearchParams(window.location.search)
    const encodedData = params.get("data")
    
    if (encodedData) {
      try {
        // Decode URL encoding first, then base64
        const urlDecoded = decodeURIComponent(encodedData)
        const decoded = JSON.parse(atob(urlDecoded))
        setFormData(decoded)
        
        // Update page title and meta tags for link previews
        if (decoded.title) {
          document.title = `${decoded.title} | West Wave Creative`
          
          // Update Open Graph tags
          const ogTitle = document.querySelector('meta[property="og:title"]')
          const ogDescription = document.querySelector('meta[property="og:description"]')
          const metaDescription = document.querySelector('meta[name="description"]')
          
          if (ogTitle) ogTitle.setAttribute('content', `${decoded.title} | West Wave Creative`)
          if (ogDescription) ogDescription.setAttribute('content', decoded.description || 'Please fill out this form to help us understand your needs and get started on your project.')
          if (metaDescription) metaDescription.setAttribute('content', decoded.description || 'Please fill out this form to help us understand your needs and get started on your project.')
        }
      } catch (err) {
        console.error("Failed to decode form data:", err)
      }
    }
    setIsLoading(false)
  }, [])

  // Pre-fill text input when question changes
  useEffect(() => {
    if (formData && currentQuestion < formData.questions.length) {
      const currentQ = formData.questions[currentQuestion]
      const existingAnswer = userAnswers[currentQ.id]
      if (existingAnswer) {
        setTextInput(existingAnswer)
      } else {
        setTextInput("")
      }
    } else {
      setTextInput("")
    }
  }, [currentQuestion, formData, userAnswers])

  const transitionToNext = () => {
    setIsTransitioning(true)
    setShowContent(false)

    setTimeout(() => {
      if (formData && currentQuestion < formData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else if (formData && currentQuestion === formData.questions.length - 1) {
        // Move to contact form step (one past the last question)
        setCurrentQuestion((prev) => prev + 1)
      }
      setTextInput("")
      setShowContent(true)
      setIsTransitioning(false)
    }, 300)
  }

  const transitionToPrevious = () => {
    setIsTransitioning(true)
    setShowContent(false)

    setTimeout(() => {
      setCurrentQuestion((prev) => prev - 1)
      if (formData) {
        // If going back from contact form, go to last question
        if (currentQuestion === formData.questions.length) {
          const lastQuestion = formData.questions[formData.questions.length - 1]
          const lastAnswer = userAnswers[lastQuestion.id]
          if (lastAnswer && lastQuestion.type !== "select") {
            setTextInput(lastAnswer)
          }
        } else {
          const prevQuestion = formData.questions[currentQuestion - 1]
          const prevAnswer = userAnswers[prevQuestion.id]
          if (prevAnswer && prevQuestion.type !== "select") {
            setTextInput(prevAnswer)
          }
        }
      }
      setShowContent(true)
      setIsTransitioning(false)
    }, 300)
  }

  const handleOptionSelect = (option: string) => {
    if (!formData) return
    
    const currentQ = formData.questions[currentQuestion]
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
    transitionToNext()
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    const currentQ = formData.questions[currentQuestion]
    if (currentQ.required && !textInput.trim()) return
    
    if (textInput.trim()) {
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: textInput }))
    }
    transitionToNext()
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    const form = e.currentTarget as HTMLFormElement
    const formDataObj = new FormData(form)
    const name = (formDataObj.get("name") as string) || ""
    const email = (formDataObj.get("email") as string) || ""
    
    // Combine all answers
    const submissionData: Record<string, string> = {
      name,
      email,
      ...userAnswers
    }

    // Extract formId from URL if available (for forms accessed via /forms/client/[id])
    const pathParts = window.location.pathname.split('/')
    const formId = pathParts[pathParts.length - 1] !== 'client' ? pathParts[pathParts.length - 1] : null

    try {
      // Submit to Web3Forms (for email notifications)
      const { submitWeb3Form } = await import("@/lib/web3forms")
      const web3FormRes = await submitWeb3Form({
        form_name: "client_onboarding",
        subject: `New Client Onboarding: ${formData.title}`,
        page: window.location.href,
        name,
        email,
        reply_to: email,
        ...Object.entries(submissionData).reduce((acc, [key, value]) => {
          // Format question answers nicely
          const question = formData.questions.find(q => q.id === key)
          if (question) {
            acc[question.text] = value
          } else {
            acc[key] = value
          }
          return acc
        }, {} as Record<string, string>),
        _form_title: formData.title,
        _form_description: formData.description,
      })
      
      // Also save to Firebase if formId is available
      if (formId) {
        try {
          const submissionResponse = await fetch('/api/forms/submissions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formId: formId,
              formTitle: formData.title,
              formDescription: formData.description,
              name,
              email,
              answers: submissionData,
              pageUrl: window.location.href,
            }),
          })
          
          if (!submissionResponse.ok) {
            console.error('Failed to save submission to Firebase')
          }
        } catch (firebaseErr) {
          console.error('Error saving to Firebase:', firebaseErr)
          // Don't fail the form submission if Firebase save fails
        }
      }
      
      if (web3FormRes.success) {
        setFormSubmitted(true)
        form.reset()
      } else {
        alert("Failed to submit form. Please try again.")
      }
    } catch (err) {
      alert("An error occurred. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="font-sans text-[#3A506B]">Loading form...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold text-[#0B132B] mb-4">Form Not Found</h1>
          <p className="font-sans text-[#3A506B]">
            This form link is invalid or has expired. Please contact the person who sent you this link.
          </p>
        </div>
      </div>
    )
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-[#D4AF37] mx-auto mb-4 sm:mb-6" />
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] mb-3 sm:mb-4 px-4">
            Thank you!
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#3A506B] mb-6 sm:mb-8 px-4">
            Your form has been submitted successfully. We'll review your responses and get back to you soon.
          </p>
        </div>
      </div>
    )
  }

  const isContactStep = currentQuestion === formData.questions.length
  const currentQ = isContactStep ? null : formData.questions[currentQuestion]
  const totalQuestions = formData.questions.length + 1 // +1 for contact form
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-[#F5F3F4] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-[#3A506B]/10 p-4 flex items-center justify-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="font-serif text-xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300"
        >
          West Wave <span className="text-[#D4AF37]">Creative</span>
        </button>
      </div>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden bg-white border-b border-[#3A506B]/10 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-[#3A506B]">
          <span>
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="mt-2 w-full bg-[#3A506B]/10 rounded-full h-2">
          <div
            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-80 bg-white border-r border-[#3A506B]/10 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300 cursor-pointer"
          >
            West Wave <span className="text-[#D4AF37]">Creative</span>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="font-serif text-lg font-bold text-[#0B132B] mb-2">{formData.title}</h2>
          <p className="font-sans text-sm text-[#3A506B]">{formData.description}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {formData.questions.map((question, index) => (
            <div key={question.id} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < currentQuestion
                    ? "bg-[#D4AF37] text-[#0B132B]"
                    : index === currentQuestion && !isContactStep
                      ? "bg-[#D4AF37] text-[#0B132B] scale-110"
                      : "bg-[#3A506B]/20 text-[#3A506B]/60"
                }`}
              >
                {index < currentQuestion ? "✓" : index + 1}
              </div>
              <span
                className={`font-sans text-sm transition-all duration-300 line-clamp-1 ${
                  index < currentQuestion || (index === currentQuestion && !isContactStep) ? "text-[#0B132B] font-medium" : "text-[#3A506B]/60"
                }`}
              >
                {question.text.length > 40 ? question.text.substring(0, 40) + "..." : question.text}
              </span>
            </div>
          ))}
          {/* Contact form step indicator */}
          <div className="flex items-center gap-3 pt-2 border-t border-[#3A506B]/10">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                isContactStep
                  ? "bg-[#D4AF37] text-[#0B132B] scale-110"
                  : currentQuestion > formData.questions.length - 1
                    ? "bg-[#D4AF37] text-[#0B132B]"
                    : "bg-[#3A506B]/20 text-[#3A506B]/60"
              }`}
            >
              {isContactStep ? formData.questions.length + 1 : currentQuestion > formData.questions.length - 1 ? "✓" : formData.questions.length + 1}
            </div>
            <span
              className={`font-sans text-sm transition-all duration-300 ${
                isContactStep ? "text-[#0B132B] font-medium" : currentQuestion > formData.questions.length - 1 ? "text-[#0B132B] font-medium" : "text-[#3A506B]/60"
              }`}
            >
              Contact Information
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-120px)] lg:min-h-screen">
        <div className="max-w-2xl w-full">
          <div
            className={`transition-all duration-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {isContactStep ? (
              <>
                {/* Contact Form Step */}
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      src="/Dave.jpg"
                      alt="Dave from West Wave Creative"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-sans text-xs sm:text-sm text-[#3A506B]/60">West Wave Creative</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B132B] leading-tight">
                      Almost done! Just need your contact info.
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input 
                      name="name" 
                      placeholder="Your name *" 
                      required 
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" 
                    />
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email *" 
                      required 
                      className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37]" 
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs sm:text-sm text-[#3A506B]">Your info stays private - we only use it for your project.</p>
                    <Button 
                      type="submit" 
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                    >
                      Submit Form
                    </Button>
                  </div>
                </form>

                {/* Back Button */}
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
              </>
            ) : currentQ ? (
              <>
                {/* Question Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      src="/Dave.jpg"
                      alt="Dave from West Wave Creative"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-sans text-xs sm:text-sm text-[#3A506B]/60">West Wave Creative</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B132B] leading-tight">
                      {currentQ.text}
                      {currentQ.required && <span className="text-[#D4AF37] ml-1">*</span>}
                    </h2>
                  </div>
                </div>

                {/* Question Input */}
                <div className="space-y-3 sm:space-y-4">
                  {currentQ.type === "select" && currentQ.options ? (
                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 border-2 border-[#3A506B]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#0B132B] transition-all duration-200 bg-white text-[#0B132B] font-sans hover:scale-[1.02] hover:shadow-md text-sm sm:text-base"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  ) : currentQ.type === "textarea" ? (
                    <form onSubmit={handleTextSubmit} className="space-y-4">
                      <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={currentQ.placeholder || "Type your answer here..."}
                        required={currentQ.required}
                        className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] min-h-[120px] text-sm sm:text-base"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                          disabled={currentQ.required && !textInput.trim()}
                        >
                          Continue →
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleTextSubmit} className="space-y-4">
                      <Input
                        type={currentQ.type === "email" ? "email" : currentQ.type === "tel" ? "tel" : currentQ.type === "url" ? "url" : currentQ.type === "number" ? "number" : "text"}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={currentQ.placeholder || "Type your answer here..."}
                        required={currentQ.required}
                        className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] h-12 text-sm sm:text-base"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                          disabled={currentQ.required && !textInput.trim()}
                        >
                          Continue →
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Back Button */}
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
