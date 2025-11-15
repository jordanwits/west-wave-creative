"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Eye, FileText, Search, X, ArrowLeft, LogOut } from "lucide-react"
import { checkAuth, logout } from "@/lib/auth"

// Question data structure
interface Question {
  id: string
  text: string
  type: "text" | "textarea" | "email" | "tel" | "url" | "number" | "select"
  category: string
  placeholder?: string
  required?: boolean
  options?: string[] // For select type
}

// Helper function to create category ID from name
const createCategoryId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const questionCategories = [
  {
    id: "project-overview-goals",
    name: "Project Overview & Goals",
    description: "Understanding project objectives and desired outcomes"
  },
  {
    id: "brand-creative-direction",
    name: "Brand & Creative Direction",
    description: "Brand identity, design preferences, and creative vision"
  },
  {
    id: "content-deliverables",
    name: "Content & Deliverables",
    description: "Content requirements, materials, and deliverables"
  },
  {
    id: "functionality-technical-requirements",
    name: "Functionality & Technical Requirements",
    description: "Technical features, integrations, and functionality needs"
  },
  {
    id: "roles-responsibilities-communication",
    name: "Roles, Responsibilities & Communication",
    description: "Team structure, communication preferences, and responsibilities"
  },
  {
    id: "timeline-milestones",
    name: "Timeline & Milestones",
    description: "Project timeline, deadlines, and milestone planning"
  },
  {
    id: "budget-priorities",
    name: "Budget & Priorities",
    description: "Budget considerations and project priorities"
  },
  {
    id: "scope-boundaries-change-management",
    name: "Scope Boundaries & Change Management",
    description: "Project scope, boundaries, and change management processes"
  },
  {
    id: "post-launch-long-term-support",
    name: "Post-Launch & Long-Term Support",
    description: "Ongoing support, maintenance, and post-launch needs"
  }
]

// Question options mapping - comprehensive options for each question
const getQuestionOptions = (questionText: string): { type: "text" | "textarea" | "email" | "tel" | "url" | "number" | "select", options?: string[] } => {
  const lowerText = questionText.toLowerCase()
  
  // Project Overview & Goals
  if (questionText.includes("main goals or outcomes")) {
    return {
      type: "select",
      options: [
        "Increase online visibility and brand awareness",
        "Generate more leads or inquiries",
        "Sell products or services online",
        "Provide information and resources",
        "Improve user experience and engagement",
        "Modernize outdated website",
        "Improve search engine rankings (SEO)",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("prompted you to start")) {
    return {
      type: "select",
      options: [
        "Current website is outdated or not working well",
        "Starting a new business or organization",
        "Need to reach more customers",
        "Competitors have better online presence",
        "Rebranding or major organizational change",
        "Need better functionality (e-commerce, booking, etc.)",
        "Mobile experience is poor",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("specific problem")) {
    return {
      type: "select",
      options: [
        "Website looks outdated or unprofessional",
        "Not generating enough leads or sales",
        "Hard to update or manage content",
        "Poor mobile experience",
        "Slow loading times",
        "Not ranking well in search engines",
        "Lacks key functionality we need",
        "Don't have a website yet",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("target audience")) {
    return {
      type: "select",
      options: [
        "Local consumers/customers",
        "Businesses/B2B clients",
        "Students and families",
        "Donors and supporters",
        "Members or subscribers",
        "General public",
        "Specific demographic (age, income, etc.)",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("want users to do")) {
    return {
      type: "select",
      options: [
        "Contact us / Request a quote",
        "Make a purchase",
        "Book an appointment",
        "Learn about our services/products",
        "Download resources or forms",
        "Sign up for newsletter/updates",
        "View portfolio or past work",
        "Find location or contact info",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("currently working or not working")) {
    return {
      type: "select",
      options: [
        "Design looks outdated",
        "Not mobile-friendly",
        "Hard to navigate",
        "Content is outdated",
        "Forms don't work properly",
        "Slow loading times",
        "Not generating leads",
        "Can't update it ourselves",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("makes your organization unique")) {
    return { type: "textarea" } // Keep as textarea for unique value props
  }
  
  if (questionText.includes("key message")) {
    return {
      type: "select",
      options: [
        "Quality and professionalism",
        "Affordability and value",
        "Community involvement and values",
        "Innovation and expertise",
        "Trust and reliability",
        "Personalized service",
        "Sustainability and responsibility",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("measure success")) {
    return {
      type: "select",
      options: [
        "Number of leads or inquiries",
        "Online sales or revenue",
        "Website traffic and visitors",
        "Form submissions",
        "Phone calls",
        "Email signups",
        "Social media engagement",
        "Search engine rankings",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("competitors or peers")) {
    return { type: "textarea" } // Keep as textarea for specific names
  }
  
  // Brand & Creative Direction
  if (questionText.includes("brand's tone or personality")) {
    return {
      type: "select",
      options: [
        "Professional and corporate",
        "Friendly and approachable",
        "Creative and artistic",
        "Modern and innovative",
        "Traditional and established",
        "Playful and fun",
        "Serious and authoritative",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("existing logo or brand guide")) {
    return {
      type: "select",
      options: [
        "Yes, we have a complete brand guide",
        "Yes, we have a logo but no guide",
        "Yes, but we want to update it",
        "No, we need help creating one",
        "No, we'll create our own"
      ]
    }
  }
  
  if (questionText.includes("colors, styles, or design elements you want to avoid")) {
    return { type: "textarea" } // Keep as textarea for specific preferences
  }
  
  if (questionText.includes("brands or websites you admire")) {
    return { type: "textarea" } // Keep as textarea for URLs and descriptions
  }
  
  if (questionText.includes("school or church websites")) {
    return { type: "textarea" } // Keep as textarea for specific examples
  }
  
  if (questionText.includes("professional photography")) {
    return {
      type: "select",
      options: [
        "Yes, we have professional photos",
        "Some photos, may need more",
        "No, we'll need stock imagery",
        "No, we'll need photography services",
        "Not sure yet"
      ]
    }
  }
  
  if (questionText.includes("emotions or impressions")) {
    return {
      type: "select",
      options: [
        "Trust and reliability",
        "Excitement and energy",
        "Calm and peaceful",
        "Professional and competent",
        "Warm and welcoming",
        "Innovative and cutting-edge",
        "Traditional and stable",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("maintain or change your brand look")) {
    return {
      type: "select",
      options: [
        "Maintain current brand look",
        "Update/refresh current brand",
        "Complete rebrand",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("taglines or mission statements")) {
    return { type: "textarea" } // Keep as textarea for specific text
  }
  
  if (questionText.includes("tone best fits your audience")) {
    return {
      type: "select",
      options: [
        "Friendly and casual",
        "Professional and formal",
        "Creative and artistic",
        "Educational and informative",
        "Inspirational and motivational",
        "Other"
      ]
    }
  }
  
  // Content & Deliverables
  if (questionText.includes("Who will provide written content")) {
    return {
      type: "select",
      options: [
        "We'll provide all content",
        "We'll provide some, need help with rest",
        "We need help with all content",
        "Not sure yet"
      ]
    }
  }
  
  if (questionText.includes("existing content we should reuse")) {
    return {
      type: "select",
      options: [
        "Yes, we have content to reuse",
        "Some content, but needs updating",
        "No, starting fresh",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("help with copywriting")) {
    return {
      type: "select",
      options: [
        "Yes, we need copywriting help",
        "Some pages need help",
        "No, we'll write it ourselves",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("photography or stock imagery")) {
    return {
      type: "select",
      options: [
        "We have our own photos",
        "We'll use stock imagery",
        "We need photography services",
        "Mix of our photos and stock",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("blog/news functionality")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Maybe, in the future",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("downloadable forms, brochures")) {
    return {
      type: "select",
      options: [
        "Yes, we need downloadable forms",
        "Yes, we need brochures/PDFs",
        "Yes, we need applications",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("highlight past projects")) {
    return {
      type: "select",
      options: [
        "Yes, portfolio is important",
        "Yes, but not a priority",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("video embedded")) {
    return {
      type: "select",
      options: [
        "Yes, we have videos to embed",
        "Yes, we'll create videos",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("multiple team members contributing")) {
    return {
      type: "select",
      options: [
        "Yes, multiple people will contribute",
        "Maybe, 2-3 people",
        "No, single person",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("testimonials or reviews")) {
    return {
      type: "select",
      options: [
        "Yes, we have testimonials ready",
        "Some, but could use more",
        "No testimonials yet",
        "Not sure"
      ]
    }
  }
  
  // Functionality & Technical Requirements
  if (questionText.includes("online forms or quote requests")) {
    return {
      type: "select",
      options: [
        "Yes, contact forms",
        "Yes, quote request forms",
        "Yes, both",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("appointment booking")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Maybe, in the future",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("users need to log in")) {
    return {
      type: "select",
      options: [
        "Yes, member accounts",
        "Yes, student/parent portals",
        "Yes, admin access",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("sell products or take payments")) {
    return {
      type: "select",
      options: [
        "Yes, e-commerce store",
        "Yes, accept donations",
        "Yes, accept payments for services",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("integration with a CRM")) {
    return {
      type: "select",
      options: [
        "Yes, Salesforce",
        "Yes, HubSpot",
        "Yes, Mailchimp/Constant Contact",
        "Yes, other CRM",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("Google Maps, galleries, or calendars")) {
    return {
      type: "select",
      options: [
        "Yes, Google Maps",
        "Yes, photo galleries",
        "Yes, event calendars",
        "Yes, multiple of these",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("analytics or traffic tracking")) {
    return {
      type: "select",
      options: [
        "Yes, Google Analytics",
        "Yes, other analytics",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("multi-language support")) {
    return {
      type: "select",
      options: [
        "Yes, 2 languages",
        "Yes, 3+ languages",
        "Maybe, in the future",
        "No, English only"
      ]
    }
  }
  
  if (questionText.includes("mobile-optimized")) {
    return {
      type: "select",
      options: [
        "Yes, critical - most visitors use mobile",
        "Yes, very important",
        "Yes, but desktop is primary",
        "Not a priority"
      ]
    }
  }
  
  if (questionText.includes("accessibility standards")) {
    return {
      type: "select",
      options: [
        "Yes, WCAG 2.1 AA required",
        "Yes, ADA compliance",
        "Yes, basic accessibility",
        "No specific requirements",
        "Not sure"
      ]
    }
  }
  
  // Roles, Responsibilities & Communication
  if (questionText.includes("main point of contact")) {
    return { type: "text" } // Keep as text for name
  }
  
  if (questionText.includes("approve deliverables")) {
    return { type: "text" } // Keep as text for name/role
  }
  
  if (questionText.includes("How often would you like updates")) {
    return {
      type: "select",
      options: [
        "Daily",
        "Weekly",
        "Bi-weekly",
        "Monthly",
        "At key milestones only",
        "As needed"
      ]
    }
  }
  
  if (questionText.includes("preferred communication method")) {
    return {
      type: "select",
      options: [
        "Email",
        "Phone calls",
        "Video calls (Zoom/Teams)",
        "In-person meetings",
        "Text/SMS",
        "Project management tool",
        "Mix of methods"
      ]
    }
  }
  
  if (questionText.includes("other decision-makers")) {
    return {
      type: "select",
      options: [
        "Yes, board/committee",
        "Yes, multiple stakeholders",
        "Yes, 1-2 other people",
        "No, single decision maker"
      ]
    }
  }
  
  if (questionText.includes("manage content updates post-launch")) {
    return {
      type: "select",
      options: [
        "We'll manage it ourselves",
        "We'll need training first",
        "We'll need ongoing support",
        "You'll manage it for us",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("internal IT or web person")) {
    return {
      type: "select",
      options: [
        "Yes, we have IT staff",
        "Yes, we have a web person",
        "No, we don't have IT staff",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("other vendors")) {
    return {
      type: "select",
      options: [
        "Yes, marketing agency",
        "Yes, other designers/developers",
        "Yes, hosting provider",
        "No other vendors",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("record training videos")) {
    return {
      type: "select",
      options: [
        "Yes, that would be helpful",
        "Maybe",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("time zone and hours")) {
    return {
      type: "select",
      options: [
        "Pacific (PST/PDT) - Business hours",
        "Mountain (MST/MDT) - Business hours",
        "Central (CST/CDT) - Business hours",
        "Eastern (EST/EDT) - Business hours",
        "Flexible/varies",
        "Other"
      ]
    }
  }
  
  // Timeline & Milestones
  if (questionText.includes("When do you want to launch")) {
    return {
      type: "select",
      options: [
        "ASAP / Within 2 weeks",
        "Within 1 month",
        "Within 2-3 months",
        "Within 4-6 months",
        "Flexible timeline",
        "Just exploring options"
      ]
    }
  }
  
  if (questionText.includes("events or campaigns tied")) {
    return {
      type: "select",
      options: [
        "Yes, specific event date",
        "Yes, campaign launch",
        "Yes, season/holiday",
        "No specific event",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("phased launch")) {
    return {
      type: "select",
      options: [
        "Yes, phased approach works",
        "Maybe, if needed",
        "No, all at once",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("deadlines for content submission")) {
    return {
      type: "select",
      options: [
        "Yes, we have deadlines",
        "We'll work around your timeline",
        "No specific deadlines",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("earliest you'd like to begin")) {
    return {
      type: "select",
      options: [
        "Immediately",
        "Within 1-2 weeks",
        "Within 1 month",
        "Within 2-3 months",
        "Flexible",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("dependencies or approvals")) {
    return {
      type: "select",
      options: [
        "Yes, board approval needed",
        "Yes, budget approval needed",
        "Yes, other approvals",
        "No dependencies",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("timeline expectations")) {
    return { type: "textarea" } // Keep as textarea for specific expectations
  }
  
  if (questionText.includes("hard deadline")) {
    return {
      type: "select",
      options: [
        "Yes, school term start",
        "Yes, trade show/event",
        "Yes, product launch",
        "Yes, other deadline",
        "No hard deadline"
      ]
    }
  }
  
  if (questionText.includes("detailed milestone plan")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Yes, would be helpful",
        "No, not necessary",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("How soon can you provide initial materials")) {
    return {
      type: "select",
      options: [
        "Immediately / Within 1 week",
        "Within 2-3 weeks",
        "Within 1 month",
        "Will take longer",
        "Not sure"
      ]
    }
  }
  
  // Budget & Priorities
  if (questionText.includes("budget range")) {
    return {
      type: "select",
      options: [
        "Under $1,000",
        "$1,000 - $2,500",
        "$2,500 - $5,000",
        "$5,000 - $10,000",
        "$10,000 - $25,000",
        "$25,000+",
        "Prefer not to say",
        "Need guidance"
      ]
    }
  }
  
  if (questionText.includes("Which is more important")) {
    return {
      type: "select",
      options: [
        "Timeline - need it done fast",
        "Quality - want the best result",
        "Budget - cost is primary concern",
        "All equally important",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("make this investment worthwhile")) {
    return {
      type: "select",
      options: [
        "More leads and customers",
        "Increased sales/revenue",
        "Professional online presence",
        "Time savings",
        "Competitive advantage",
        "Better user experience",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("budget is tight")) {
    return {
      type: "select",
      options: [
        "Reduce number of pages",
        "Simplify design",
        "Phase features",
        "Reduce custom functionality",
        "Extend timeline",
        "Other"
      ]
    }
  }
  
  if (questionText.includes("hosting and domain setup")) {
    return {
      type: "select",
      options: [
        "Yes, include hosting",
        "Yes, include domain",
        "Yes, include both",
        "No, we'll handle it",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("retainer or support plan")) {
    return {
      type: "select",
      options: [
        "Yes, monthly retainer",
        "Yes, pay-as-needed support",
        "Maybe, in the future",
        "No, one-time project",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("multiple pricing options")) {
    return {
      type: "select",
      options: [
        "Yes, basic and premium",
        "Yes, multiple tiers",
        "No, single package",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("apply for grants")) {
    return {
      type: "select",
      options: [
        "Yes, planning to apply",
        "Maybe, considering it",
        "No, not applicable",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("suggest cost-saving measures")) {
    return {
      type: "select",
      options: [
        "Yes, please suggest options",
        "Maybe, if needed",
        "No, we have budget",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("payments be handled")) {
    return {
      type: "select",
      options: [
        "Business/Organization",
        "Individual",
        "Both",
        "Not sure"
      ]
    }
  }
  
  // Scope Boundaries & Change Management
  if (questionText.includes("must-have vs nice-to-have")) {
    return { type: "textarea" } // Keep as textarea for specific features
  }
  
  if (questionText.includes("areas you want to handle internally")) {
    return {
      type: "select",
      options: [
        "Content writing",
        "Photography",
        "Social media",
        "SEO/marketing",
        "Hosting/maintenance",
        "None, you handle everything",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("considered out of scope")) {
    return { type: "textarea" } // Keep as textarea for specific items
  }
  
  if (questionText.includes("handle new requests")) {
    return {
      type: "select",
      options: [
        "Add to current scope if possible",
        "Create change orders",
        "Save for future phase",
        "Discuss case-by-case",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("anticipate future phases")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Maybe, possibly",
        "No, one-time project",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("version control or documentation")) {
    return {
      type: "select",
      options: [
        "Yes, version control",
        "Yes, documentation",
        "Yes, both",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("approval layers")) {
    return {
      type: "select",
      options: [
        "Yes, multiple approvals needed",
        "Yes, board approval",
        "Yes, 1-2 approvals",
        "No, single approval",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("known risks or challenges")) {
    return { type: "textarea" } // Keep as textarea for specific risks
  }
  
  if (questionText.includes("include time for training")) {
    return {
      type: "select",
      options: [
        "Yes, training is important",
        "Maybe, if needed",
        "No, we'll figure it out",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("change-order process")) {
    return {
      type: "select",
      options: [
        "Yes, please define process",
        "Maybe, if needed",
        "No, not necessary",
        "Not sure"
      ]
    }
  }
  
  // Post-Launch & Long-Term Support
  if (questionText.includes("ongoing maintenance or support")) {
    return {
      type: "select",
      options: [
        "Yes, monthly support",
        "Yes, quarterly support",
        "Yes, as-needed support",
        "No, we'll handle it",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("training on how to manage")) {
    return {
      type: "select",
      options: [
        "Yes, comprehensive training",
        "Yes, basic training",
        "Yes, video tutorials",
        "No, we'll figure it out",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("staff who will update")) {
    return {
      type: "select",
      options: [
        "Yes, dedicated staff",
        "Yes, multiple staff members",
        "No, we'll need help",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("monthly analytics reports")) {
    return {
      type: "select",
      options: [
        "Yes, monthly reports",
        "Yes, quarterly reports",
        "Maybe, in the future",
        "No, not needed",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("help with marketing")) {
    return {
      type: "select",
      options: [
        "Yes, SEO help",
        "Yes, social media",
        "Yes, email marketing",
        "Yes, paid advertising",
        "No, we'll handle it",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("SEO or Google Business")) {
    return {
      type: "select",
      options: [
        "Yes, SEO setup",
        "Yes, Google Business setup",
        "Yes, both",
        "Maybe, in the future",
        "No, not needed"
      ]
    }
  }
  
  if (questionText.includes("backup and security monitoring")) {
    return {
      type: "select",
      options: [
        "Yes, automated backups",
        "Yes, security monitoring",
        "Yes, both",
        "No, we'll handle it",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("post-launch review meeting")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Yes, would be helpful",
        "No, not necessary",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("add new features after launch")) {
    return {
      type: "select",
      options: [
        "Yes, definitely",
        "Maybe, possibly",
        "No, complete as-is",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("recommendations for hosting")) {
    return {
      type: "select",
      options: [
        "Yes, hosting recommendations",
        "Yes, email service recommendations",
        "Yes, both",
        "No, we have providers",
        "Not sure"
      ]
    }
  }
  
  // Default fallback for questions not specifically mapped
  if (lowerText.startsWith("do you") || 
      lowerText.startsWith("are you") || 
      lowerText.startsWith("will you") ||
      lowerText.startsWith("would you") ||
      lowerText.startsWith("should") ||
      lowerText.startsWith("can you") ||
      lowerText.startsWith("have you")) {
    return {
      type: "select",
      options: ["Yes", "No", "Maybe", "Not sure"]
    }
  }
  
  // Default to textarea for longer responses
  if (lowerText.includes("describe") || 
      lowerText.includes("tell us") || 
      lowerText.includes("explain") ||
      lowerText.includes("what are") ||
      questionText.length > 60) {
    return { type: "textarea" }
  }
  
  return { type: "text" }
}

// Parse CSV data into questions
const csvData = `Category,Question,Use Case Tags,Include?
Project Overview & Goals,What are the main goals or outcomes you want from this project?,All,
Project Overview & Goals,What prompted you to start this project?,All,
Project Overview & Goals,What specific problem are you trying to solve?,All,
Project Overview & Goals,Who is your target audience or ideal visitor?,All,
Project Overview & Goals,What do you want users to do when they visit your site?,All,
Project Overview & Goals,What's currently working or not working about your existing site?,Redesign,
Project Overview & Goals,What makes your organization unique?,All,
Project Overview & Goals,What key message should your site communicate?,All,
Project Overview & Goals,How will you measure success?,All,
Project Overview & Goals,Are there any competitors or peers you want to stand apart from?,All,
Brand & Creative Direction,How would you describe your brand's tone or personality?,All,
Brand & Creative Direction,Do you have an existing logo or brand guide?,All,
Brand & Creative Direction,"Are there colors, styles, or design elements you want to avoid?",All,
Brand & Creative Direction,Are there brands or websites you admire? What do you like about them?,All,
Brand & Creative Direction,Are there school or church websites you admire?,School / Nonprofit,
Brand & Creative Direction,Do you have professional photography or brand imagery?,All,
Brand & Creative Direction,What emotions or impressions do you want your site to create?,All,
Brand & Creative Direction,Do you want to maintain or change your brand look from the old site?,Redesign,
Brand & Creative Direction,Do you have any taglines or mission statements we should include?,All,
Brand & Creative Direction,"What kind of tone best fits your audience (friendly, professional, creative)?",All,
Content & Deliverables,Who will provide written content and photos?,All,
Content & Deliverables,Do you have existing content we should reuse?,Redesign,
Content & Deliverables,Will you need help with copywriting?,All,
Content & Deliverables,Will you need photography or stock imagery?,All,
Content & Deliverables,Do you want blog/news functionality?,All,
Content & Deliverables,"Do you need downloadable forms, brochures, or applications?","School / Nonprofit, Service Business",
Content & Deliverables,Do you want to highlight past projects or portfolios?,"Product Business, Service Business",
Content & Deliverables,Do you need video embedded on the site?,All,
Content & Deliverables,Will there be multiple team members contributing to content?,School / Nonprofit,
Content & Deliverables,Do you have testimonials or reviews to include?,All,
Functionality & Technical Requirements,Do you need online forms or quote requests?,"Service Business, Product Business",
Functionality & Technical Requirements,Do you need appointment booking or scheduling?,"Service Business, School / Nonprofit",
Functionality & Technical Requirements,Will users need to log in or have accounts?,"School / Nonprofit, E-commerce",
Functionality & Technical Requirements,Do you plan to sell products or take payments online?,"E-commerce, Product Business",
Functionality & Technical Requirements,Do you need integration with a CRM or email system?,All,
Functionality & Technical Requirements,"Do you need Google Maps, galleries, or calendars?",All,
Functionality & Technical Requirements,Do you want analytics or traffic tracking?,All,
Functionality & Technical Requirements,Do you need multi-language support?,School / Nonprofit,
Functionality & Technical Requirements,Should the site be mobile-optimized or responsive?,All,
Functionality & Technical Requirements,"Are there accessibility standards you need to meet (ADA, WCAG)?",School / Nonprofit,
"Roles, Responsibilities & Communication",Who will be our main point of contact?,All,
"Roles, Responsibilities & Communication",Who will approve deliverables?,All,
"Roles, Responsibilities & Communication",How often would you like updates?,All,
"Roles, Responsibilities & Communication",What's your preferred communication method?,All,
"Roles, Responsibilities & Communication",Will other decision-makers need to review drafts?,All,
"Roles, Responsibilities & Communication",Who will manage content updates post-launch?,All,
"Roles, Responsibilities & Communication",Do you have an internal IT or web person?,"Redesign, School / Nonprofit",
"Roles, Responsibilities & Communication",Are there any other vendors we'll coordinate with?,All,
"Roles, Responsibilities & Communication",Would you like us to record training videos for your team?,All,
"Roles, Responsibilities & Communication",What time zone and hours are best for communication?,All,
Timeline & Milestones,When do you want to launch your new website?,All,
Timeline & Milestones,Do you have any events or campaigns tied to that date?,All,
Timeline & Milestones,Are you open to a phased launch (core pages first)?,All,
Timeline & Milestones,Do you have deadlines for content submission?,All,
Timeline & Milestones,What's the earliest you'd like to begin the project?,All,
Timeline & Milestones,Are there dependencies or approvals that might affect timing?,All,
Timeline & Milestones,What timeline expectations should we be aware of?,All,
Timeline & Milestones,Is there a hard deadline (like a school term or trade show)?,"School / Nonprofit, Product Business",
Timeline & Milestones,Would you like a detailed milestone plan?,All,
Timeline & Milestones,"How soon can you provide initial materials (logo, text, images)?",All,
Budget & Priorities,Do you have a budget range in mind?,All,
Budget & Priorities,"Which is more important: timeline, quality, or budget?",All,
Budget & Priorities,What would make this investment worthwhile for you?,All,
Budget & Priorities,"If the budget is tight, what could we postpone or scale back?",All,
Budget & Priorities,Do you need hosting and domain setup included?,New Website,
Budget & Priorities,Are you open to a retainer or support plan after launch?,All,
Budget & Priorities,Would you like multiple pricing options (basic/premium)?,All,
Budget & Priorities,Do you plan to apply for grants or funding for this project?,School / Nonprofit,
Budget & Priorities,Would you like us to suggest cost-saving measures?,All,
Budget & Priorities,Will payments be handled by a business or individual?,All,
Scope Boundaries & Change Management,What features or pages are must-have vs nice-to-have?,All,
Scope Boundaries & Change Management,Are there areas of the project you want to handle internally?,All,
Scope Boundaries & Change Management,What would be considered out of scope?,All,
Scope Boundaries & Change Management,How should we handle new requests that come up later?,All,
Scope Boundaries & Change Management,Do you anticipate future phases of the project?,All,
Scope Boundaries & Change Management,Would you like version control or documentation for changes?,All,
Scope Boundaries & Change Management,Do you have approval layers for scope changes?,School / Nonprofit,
Scope Boundaries & Change Management,Are there any known risks or challenges?,All,
Scope Boundaries & Change Management,Should we include time for training or testing?,All,
Scope Boundaries & Change Management,Would you like a change-order process defined?,All,
Post-Launch & Long-Term Support,Will you need ongoing maintenance or support?,All,
Post-Launch & Long-Term Support,Do you want training on how to manage your site?,All,
Post-Launch & Long-Term Support,Do you have staff who will update the site?,All,
Post-Launch & Long-Term Support,Would you like monthly analytics reports?,All,
Post-Launch & Long-Term Support,Do you need help with marketing after launch?,All,
Post-Launch & Long-Term Support,Would you like SEO or Google Business setup?,All,
Post-Launch & Long-Term Support,Would you like backup and security monitoring?,All,
Post-Launch & Long-Term Support,Should we schedule a post-launch review meeting?,All,
Post-Launch & Long-Term Support,Do you plan to add new features after launch?,All,
Post-Launch & Long-Term Support,Would you like recommendations for hosting or email services?,"New Website, Redesign"`

const parseCSVQuestions = (): Question[] => {
  const lines = csvData.split('\n').slice(1) // Skip header
  const questions: Question[] = []
  let questionIndex = 0

  lines.forEach((line) => {
    if (!line.trim()) return
    
    // Parse CSV line (handling quoted fields)
    const parts: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    parts.push(current.trim())
    
    if (parts.length < 2) return
    
    const category = parts[0]
    const questionText = parts[1]
    
    if (!category || !questionText) return
    
    const categoryId = createCategoryId(category)
    const questionConfig = getQuestionOptions(questionText)
    const questionId = `q-${questionIndex++}-${questionText.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30)}`
    
    const question: Question = {
      id: questionId,
      text: questionText,
      type: questionConfig.type,
      category: categoryId,
    }
    
    // Add options for select type questions
    if (questionConfig.type === "select" && questionConfig.options) {
      question.options = questionConfig.options
    }
    
    questions.push(question)
  })
  
  return questions
}

const allQuestions: Question[] = parseCSVQuestions()

export default function FormsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"builder" | "preview" | "share">("builder")
  const [formTitle, setFormTitle] = useState("Client Onboarding Form")
  const [formDescription, setFormDescription] = useState("Please fill out this form to help us understand your needs and get started on your project.")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [notificationEmail, setNotificationEmail] = useState("")
  const [previewCurrentQuestion, setPreviewCurrentQuestion] = useState(0)
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>({})
  const [previewIsTransitioning, setPreviewIsTransitioning] = useState(false)
  const [previewShowContent, setPreviewShowContent] = useState(true)
  const [previewTextInput, setPreviewTextInput] = useState("")

  // Check authentication on mount
  useEffect(() => {
    checkAuth().then((authenticated) => {
      if (!authenticated) {
        router.push("/forms/login")
      } else {
        setIsAuthenticated(true)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push("/forms/login")
  }

  const filteredQuestions = allQuestions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions)
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId)
    } else {
      newSelected.add(questionId)
    }
    setSelectedQuestions(newSelected)
  }

  const toggleCategory = (categoryId: string) => {
    const categoryQuestions = allQuestions
      .filter(q => q.category === categoryId)
      .map(q => q.id)
    
    const allSelected = categoryQuestions.every(id => selectedQuestions.has(id))
    
    const newSelected = new Set(selectedQuestions)
    if (allSelected) {
      categoryQuestions.forEach(id => newSelected.delete(id))
    } else {
      categoryQuestions.forEach(id => newSelected.add(id))
    }
    setSelectedQuestions(newSelected)
  }

  const selectedQuestionsList = allQuestions.filter(q => selectedQuestions.has(q.id))

  const renderFormField = (question: Question) => {
    const fieldId = `field-${question.id}`
    
    switch (question.type) {
      case "textarea":
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={fieldId} className="font-sans text-sm font-semibold text-[#0B132B]">
              {question.text}
              {question.required && <span className="text-[#D4AF37] ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              name={question.id}
              placeholder={question.placeholder}
              required={question.required}
              className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 min-h-[120px] rounded-lg bg-white/80 backdrop-blur-sm"
            />
          </div>
        )
      
      case "select":
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={fieldId} className="font-sans text-sm font-semibold text-[#0B132B]">
              {question.text}
              {question.required && <span className="text-[#D4AF37] ml-1">*</span>}
            </Label>
            <select
              id={fieldId}
              name={question.id}
              required={question.required}
              className="flex h-12 w-full rounded-lg border-2 border-[#3A506B]/20 bg-white/80 backdrop-blur-sm px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            >
              <option value="">Select an option...</option>
              {question.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )
      
      default:
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={fieldId} className="font-sans text-sm font-semibold text-[#0B132B]">
              {question.text}
              {question.required && <span className="text-[#D4AF37] ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              name={question.id}
              type={question.type}
              placeholder={question.placeholder}
              required={question.required}
              className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
            />
          </div>
        )
    }
  }

  // Preview mode funnel flow functions
  const previewTransitionToNext = () => {
    setPreviewIsTransitioning(true)
    setPreviewShowContent(false)

    setTimeout(() => {
      if (previewCurrentQuestion < selectedQuestionsList.length - 1) {
        setPreviewCurrentQuestion((prev) => prev + 1)
      } else if (previewCurrentQuestion === selectedQuestionsList.length - 1) {
        // Move to contact form step
        setPreviewCurrentQuestion((prev) => prev + 1)
      }
      setPreviewTextInput("")
      setPreviewShowContent(true)
      setPreviewIsTransitioning(false)
    }, 300)
  }

  const previewTransitionToPrevious = () => {
    setPreviewIsTransitioning(true)
    setPreviewShowContent(false)

    setTimeout(() => {
      setPreviewCurrentQuestion((prev) => prev - 1)
      if (previewCurrentQuestion === selectedQuestionsList.length) {
        // Going back from contact form
        const lastQuestion = selectedQuestionsList[selectedQuestionsList.length - 1]
        const lastAnswer = previewAnswers[lastQuestion.id]
        if (lastAnswer && lastQuestion.type !== "select") {
          setPreviewTextInput(lastAnswer)
        }
      } else {
        const prevQuestion = selectedQuestionsList[previewCurrentQuestion - 1]
        const prevAnswer = previewAnswers[prevQuestion.id]
        if (prevAnswer && prevQuestion.type !== "select") {
          setPreviewTextInput(prevAnswer)
        }
      }
      setPreviewShowContent(true)
      setPreviewIsTransitioning(false)
    }, 300)
  }

  const previewHandleOptionSelect = (option: string) => {
    const currentQ = selectedQuestionsList[previewCurrentQuestion]
    setPreviewAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
    previewTransitionToNext()
  }

  const previewHandleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentQ = selectedQuestionsList[previewCurrentQuestion]
    if (currentQ.required && !previewTextInput.trim()) return
    
    if (previewTextInput.trim()) {
      setPreviewAnswers((prev) => ({ ...prev, [currentQ.id]: previewTextInput }))
    }
    previewTransitionToNext()
  }

  const previewHandleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formDataObj = new FormData(form)
    const name = (formDataObj.get("name") as string) || ""
    const email = (formDataObj.get("email") as string) || ""
    
    const submissionData: Record<string, string> = {
      name,
      email,
      ...previewAnswers
    }

    try {
      const { submitWeb3Form } = await import("@/lib/web3forms")
      const res = await submitWeb3Form({
        form_name: "client_onboarding",
        subject: `New Client Onboarding: ${formTitle}`,
        page: window.location.href,
        name,
        email,
        reply_to: email,
        ...Object.entries(submissionData).reduce((acc, [key, value]) => {
          const question = selectedQuestionsList.find(q => q.id === key)
          if (question) {
            acc[question.text] = value
          } else {
            acc[key] = value
          }
          return acc
        }, {} as Record<string, string>),
        _form_title: formTitle,
        _form_description: formDescription,
      })
      
      if (res.success) {
        setFormSubmitted(true)
        form.reset()
        ;(await import("@/hooks/use-toast")).toast({ 
          title: "Form submitted!", 
          description: "Thank you! We'll review your responses and get back to you soon." 
        })
      } else {
        ;(await import("@/hooks/use-toast")).toast({ 
          title: "Failed to submit", 
          description: "Please try again.", 
          variant: "destructive" as any 
        })
      }
    } catch (err) {
      ;(await import("@/hooks/use-toast")).toast({ 
        title: "Error", 
        description: "Please try again.", 
        variant: "destructive" as any 
      })
    }
  }

  // Pre-fill text input when question changes in preview
  useEffect(() => {
    if (viewMode === "preview" && selectedQuestionsList.length > 0) {
      if (previewCurrentQuestion < selectedQuestionsList.length) {
        const currentQ = selectedQuestionsList[previewCurrentQuestion]
        const existingAnswer = previewAnswers[currentQ.id]
        if (existingAnswer) {
          setPreviewTextInput(existingAnswer)
        } else {
          setPreviewTextInput("")
        }
      } else {
        setPreviewTextInput("")
      }
    }
  }, [previewCurrentQuestion, previewAnswers, viewMode, selectedQuestionsList])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="font-sans text-[#3A506B]">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (viewMode === "preview") {
    if (selectedQuestionsList.length === 0) {
      return (
        <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <FileText className="h-16 w-16 text-[#3A506B]/30 mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-[#0B132B] mb-4">No Questions Selected</h1>
            <p className="font-sans text-[#3A506B] mb-6">Please select questions in the builder to preview the form.</p>
            <Button
              onClick={() => setViewMode("builder")}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
            >
              Back to Builder
            </Button>
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
            <Button
              onClick={() => {
                setFormSubmitted(false)
                setPreviewCurrentQuestion(0)
                setPreviewAnswers({})
                setViewMode("builder")
              }}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
            >
              Back to Builder
            </Button>
          </div>
        </div>
      )
    }

    const isContactStep = previewCurrentQuestion === selectedQuestionsList.length
    const currentQ = isContactStep ? null : selectedQuestionsList[previewCurrentQuestion]
    const totalQuestions = selectedQuestionsList.length + 1
    const progressPercentage = ((previewCurrentQuestion + 1) / totalQuestions) * 100

    return (
      <div className="min-h-screen bg-[#F5F3F4] flex flex-col lg:flex-row">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-[#3A506B]/10 p-4 flex items-center justify-between">
          <button
            onClick={() => setViewMode("builder")}
            className="font-serif text-xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300"
          >
            West Wave <span className="text-[#D4AF37]">Creative</span>
          </button>
          <Button
            onClick={() => setViewMode("builder")}
            variant="ghost"
            size="sm"
            className="text-[#3A506B]"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden bg-white border-b border-[#3A506B]/10 px-4 py-3">
          <div className="flex items-center justify-between text-sm text-[#3A506B]">
            <span>
              Question {previewCurrentQuestion + 1} of {totalQuestions}
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
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <button
              onClick={() => setViewMode("builder")}
              className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] hover:text-[#3A506B] transition-colors duration-300 cursor-pointer"
            >
              West Wave <span className="text-[#D4AF37]">Creative</span>
            </button>
            <Button
              onClick={() => setViewMode("builder")}
              variant="ghost"
              size="sm"
              className="text-[#3A506B]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="font-serif text-lg font-bold text-[#0B132B] mb-2">{formTitle}</h2>
            <p className="font-sans text-sm text-[#3A506B]">{formDescription}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {selectedQuestionsList.map((question, index) => (
              <div key={question.id} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index < previewCurrentQuestion
                      ? "bg-[#D4AF37] text-[#0B132B]"
                      : index === previewCurrentQuestion && !isContactStep
                        ? "bg-[#D4AF37] text-[#0B132B] scale-110"
                        : "bg-[#3A506B]/20 text-[#3A506B]/60"
                  }`}
                >
                  {index < previewCurrentQuestion ? "✓" : index + 1}
                </div>
                <span
                  className={`font-sans text-sm transition-all duration-300 line-clamp-1 ${
                    index < previewCurrentQuestion || (index === previewCurrentQuestion && !isContactStep) ? "text-[#0B132B] font-medium" : "text-[#3A506B]/60"
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
                    : previewCurrentQuestion > selectedQuestionsList.length - 1
                      ? "bg-[#D4AF37] text-[#0B132B]"
                      : "bg-[#3A506B]/20 text-[#3A506B]/60"
                }`}
              >
                {isContactStep ? selectedQuestionsList.length + 1 : previewCurrentQuestion > selectedQuestionsList.length - 1 ? "✓" : selectedQuestionsList.length + 1}
              </div>
              <span
                className={`font-sans text-sm transition-all duration-300 ${
                  isContactStep ? "text-[#0B132B] font-medium" : previewCurrentQuestion > selectedQuestionsList.length - 1 ? "text-[#0B132B] font-medium" : "text-[#3A506B]/60"
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
              className={`transition-all duration-300 ${previewShowContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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

                  <form onSubmit={previewHandleFinalSubmit} className="space-y-4">
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
                  {previewCurrentQuestion > 0 && (
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#3A506B]/10">
                      <Button
                        variant="ghost"
                        onClick={previewTransitionToPrevious}
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
                            onClick={() => previewHandleOptionSelect(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    ) : currentQ.type === "textarea" ? (
                      <form onSubmit={previewHandleTextSubmit} className="space-y-4">
                        <Textarea
                          value={previewTextInput}
                          onChange={(e) => setPreviewTextInput(e.target.value)}
                          placeholder={currentQ.placeholder || "Type your answer here..."}
                          required={currentQ.required}
                          className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] min-h-[120px] text-sm sm:text-base"
                        />
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                            disabled={currentQ.required && !previewTextInput.trim()}
                          >
                            Continue →
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={previewHandleTextSubmit} className="space-y-4">
                        <Input
                          type={currentQ.type === "email" ? "email" : currentQ.type === "tel" ? "tel" : currentQ.type === "url" ? "url" : currentQ.type === "number" ? "number" : "text"}
                          value={previewTextInput}
                          onChange={(e) => setPreviewTextInput(e.target.value)}
                          placeholder={currentQ.placeholder || "Type your answer here..."}
                          required={currentQ.required}
                          className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] h-12 text-sm sm:text-base"
                        />
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold"
                            disabled={currentQ.required && !previewTextInput.trim()}
                          >
                            Continue →
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Back Button */}
                  {previewCurrentQuestion > 0 && (
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#3A506B]/10">
                      <Button
                        variant="ghost"
                        onClick={previewTransitionToPrevious}
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

  return (
    <div className="min-h-screen bg-[#F5F3F4] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0B132B] mb-4">
              Form <span className="text-[#D4AF37]">Builder</span>
            </h1>
            <p className="font-sans text-xl text-[#3A506B] max-w-3xl">
              Select questions from the categories below to build your custom client onboarding form. 
              Once you're done, preview and generate the form.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-[#3A506B]/20 text-[#3A506B] hover:bg-[#3A506B]/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Form Title & Description Editor */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-[#0B132B]">Form Settings</CardTitle>
            <CardDescription className="font-sans text-[#3A506B]">
              Customize the title and description that will appear on the client form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="form-title" className="font-sans text-sm font-semibold text-[#0B132B]">
                Form Title
              </Label>
              <Input
                id="form-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-description" className="font-sans text-sm font-semibold text-[#0B132B]">
                Form Description
              </Label>
              <Textarea
                id="form-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 min-h-[100px] rounded-lg bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-email" className="font-sans text-sm font-semibold text-[#0B132B]">
                Notification Email (Optional)
              </Label>
              <Input
                id="notification-email"
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="email@example.com"
                className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
              />
              <p className="font-sans text-xs text-[#3A506B]">
                Where to receive form submissions (defaults to your Web3Forms email)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3A506B]/50" />
            <Input
              placeholder="Search questions or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-[#D4AF37]/30 px-6 py-3">
            <div className="font-sans text-sm text-[#3A506B]">Selected Questions</div>
            <div className="font-serif text-2xl font-bold text-[#0B132B]">{selectedQuestions.size}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-[#D4AF37]/30 px-6 py-3">
            <div className="font-sans text-sm text-[#3A506B]">Total Questions</div>
            <div className="font-serif text-2xl font-bold text-[#0B132B]">{allQuestions.length}</div>
          </div>
        </div>

        {/* Questions by Category */}
        <div className="space-y-8">
          {questionCategories.map(category => {
            const categoryQuestions = filteredQuestions.filter(q => q.category === category.id)
            if (categoryQuestions.length === 0) return null

            const categorySelected = categoryQuestions.every(q => selectedQuestions.has(q.id))
            const someSelected = categoryQuestions.some(q => selectedQuestions.has(q.id))

            return (
              <Card key={category.id} className="bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-serif text-2xl text-[#0B132B] mb-2">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="font-sans text-[#3A506B]">
                        {category.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategory(category.id)}
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B]"
                    >
                      {categorySelected ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryQuestions.map(question => {
                      const isSelected = selectedQuestions.has(question.id)
                      return (
                        <div
                          key={question.id}
                          onClick={() => toggleQuestion(question.id)}
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#D4AF37]/10 border-[#D4AF37]"
                              : "bg-white/50 border-[#3A506B]/10 hover:border-[#D4AF37]/30"
                          }`}
                        >
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 pointer-events-none"
                          >
                            <Checkbox
                              checked={isSelected}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Label
                                htmlFor={`checkbox-${question.id}`}
                                className="font-sans font-semibold text-[#0B132B] cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {question.text}
                              </Label>
                              {question.required && (
                                <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-semibold">
                                  Required
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#3A506B]">
                              <span className="capitalize">{question.type}</span>
                              {question.placeholder && (
                                <>
                                  <span>•</span>
                                  <span className="italic">{question.placeholder}</span>
                                </>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        {selectedQuestions.size > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                setPreviewCurrentQuestion(0)
                setPreviewAnswers({})
                setPreviewTextInput("")
                setFormSubmitted(false)
                setViewMode("preview")
              }}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Eye className="mr-2 h-5 w-5" />
              Preview & Test Form
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={async () => {
                // Store form data and get short ID
                const formData = {
                  title: formTitle,
                  description: formDescription,
                  questions: selectedQuestionsList.map(q => ({
                    id: q.id,
                    text: q.text,
                    type: q.type,
                    placeholder: q.placeholder,
                    required: q.required,
                    options: q.options
                  }))
                }
                
                try {
                  const response = await fetch('/api/forms/store', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  })
                  
                  const result = await response.json()
                  
                  if (result.success) {
                    const shareUrl = `${window.location.origin}${result.url}`
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(shareUrl).then(() => {
                      ;(async () => {
                        const { toast } = await import("@/hooks/use-toast")
                        toast({ 
                          title: "Link copied!", 
                          description: "Share this short link with your client to fill out the form." 
                        })
                      })()
                    })
                  } else {
                    throw new Error(result.error || 'Failed to create short link')
                  }
                } catch (error) {
                  ;(async () => {
                    const { toast } = await import("@/hooks/use-toast")
                    toast({ 
                      title: "Failed to create link", 
                      description: "Please try again.", 
                      variant: "destructive" as any 
                    })
                  })()
                }
              }}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg"
            >
              <FileText className="mr-2 h-5 w-5" />
              Copy Shareable Link
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                // Generate standalone HTML
                const formFieldsHTML = selectedQuestionsList.map(question => {
                  const fieldId = `field-${question.id}`
                  const label = `${question.text}${question.required ? ' <span style="color: #D4AF37;">*</span>' : ''}`
                  
                  if (question.type === "textarea") {
                    return `
                      <div style="margin-bottom: 1.5rem;">
                        <label for="${fieldId}" style="display: block; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #0B132B; margin-bottom: 0.5rem;">
                          ${label}
                        </label>
                        <textarea
                          id="${fieldId}"
                          name="${question.id}"
                          placeholder="${question.placeholder || ''}"
                          ${question.required ? 'required' : ''}
                          style="width: 100%; min-height: 120px; padding: 0.75rem; border: 2px solid rgba(58, 80, 107, 0.2); border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); font-family: 'Inter', sans-serif; font-size: 0.875rem;"
                        ></textarea>
                      </div>
                    `
                  } else if (question.type === "select") {
                    const optionsHTML = question.options?.map(opt => `<option value="${opt}">${opt}</option>`).join('') || ''
                    return `
                      <div style="margin-bottom: 1.5rem;">
                        <label for="${fieldId}" style="display: block; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #0B132B; margin-bottom: 0.5rem;">
                          ${label}
                        </label>
                        <select
                          id="${fieldId}"
                          name="${question.id}"
                          ${question.required ? 'required' : ''}
                          style="width: 100%; height: 3rem; padding: 0.75rem; border: 2px solid rgba(58, 80, 107, 0.2); border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); font-family: 'Inter', sans-serif; font-size: 0.875rem;"
                        >
                          <option value="">Select an option...</option>
                          ${optionsHTML}
                        </select>
                      </div>
                    `
                  } else {
                    return `
                      <div style="margin-bottom: 1.5rem;">
                        <label for="${fieldId}" style="display: block; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #0B132B; margin-bottom: 0.5rem;">
                          ${label}
                        </label>
                        <input
                          id="${fieldId}"
                          name="${question.id}"
                          type="${question.type}"
                          placeholder="${question.placeholder || ''}"
                          ${question.required ? 'required' : ''}
                          style="width: 100%; height: 3rem; padding: 0.75rem; border: 2px solid rgba(58, 80, 107, 0.2); border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); font-family: 'Inter', sans-serif; font-size: 0.875rem;"
                        />
                      </div>
                    `
                  }
                }).join('')

                const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #F5F3F4;
      color: #0B132B;
      padding: 3rem 1rem;
      min-height: 100vh;
    }
    .container {
      max-width: 56rem;
      margin: 0 auto;
    }
    h1 {
      font-family: 'Poppins', serif;
      font-size: 2.25rem;
      font-weight: 700;
      color: #0B132B;
      margin-bottom: 0.5rem;
    }
    .description {
      font-family: 'Inter', sans-serif;
      font-size: 1.125rem;
      color: #3A506B;
      margin-bottom: 2rem;
    }
    .form-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 2px solid #D4AF37;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #D4AF37;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
    }
    button {
      width: 100%;
      background: #D4AF37;
      color: #0B132B;
      font-weight: 700;
      font-size: 1.125rem;
      padding: 1.5rem 3rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      margin-top: 1.5rem;
      transition: all 0.2s;
    }
    button:hover {
      background: rgba(212, 175, 55, 0.9);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${formTitle}</h1>
    <p class="description">${formDescription}</p>
    <div class="form-card">
      <form onsubmit="event.preventDefault(); alert('Form submitted! (This is a demo form)');">
        ${formFieldsHTML}
        <button type="submit">Submit Form</button>
      </form>
    </div>
  </div>
</body>
</html>`

                const blob = new Blob([htmlContent], { type: "text/html" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "client-form.html"
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] font-bold text-lg px-12 py-6 rounded-lg"
            >
              <FileText className="mr-2 h-5 w-5" />
              Export Form
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}

