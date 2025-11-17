"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Eye, FileText, Search, X, ArrowLeft, LogOut, List, Copy, ExternalLink, Trash2, Edit, Plus, Minus, XSquare } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkAuth, logout } from "@/lib/auth"

// Question data structure
interface Question {
  id: string
  text: string
  type: "long-answer" | "short-answer" | "multiple-choice" | "other"
  category: string
  placeholder?: string
  required?: boolean
  options?: string[] // For multiple-choice type
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
const getQuestionOptions = (questionText: string): { type: "long-answer" | "short-answer" | "multiple-choice" | "other", options?: string[] } => {
  const lowerText = questionText.toLowerCase()
  
  // Project Overview & Goals
  if (questionText.includes("main goals or outcomes")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for unique value props
  }
  
  if (questionText.includes("key message")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific names
  }
  
  // Brand & Creative Direction
  if (questionText.includes("brand's tone or personality")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific preferences
  }
  
  if (questionText.includes("brands or websites you admire")) {
    return { type: "long-answer" } // Keep as textarea for URLs and descriptions
  }
  
  if (questionText.includes("school or church websites")) {
    return { type: "long-answer" } // Keep as textarea for specific examples
  }
  
  if (questionText.includes("professional photography")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
      options: [
        "Maintain current brand look",
        "Update/refresh current brand",
        "Complete rebrand",
        "Not sure"
      ]
    }
  }
  
  if (questionText.includes("taglines or mission statements")) {
    return { type: "long-answer" } // Keep as textarea for specific text
  }
  
  if (questionText.includes("tone best fits your audience")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific expectations
  }
  
  if (questionText.includes("hard deadline")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific features
  }
  
  if (questionText.includes("areas you want to handle internally")) {
    return {
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific items
  }
  
  if (questionText.includes("handle new requests")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
    return { type: "long-answer" } // Keep as textarea for specific risks
  }
  
  if (questionText.includes("include time for training")) {
    return {
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
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
      type: "multiple-choice",
      options: ["Yes", "No", "Maybe", "Not sure"]
    }
  }
  
  // Default to textarea for longer responses
  if (lowerText.includes("describe") || 
      lowerText.includes("tell us") || 
      lowerText.includes("explain") ||
      lowerText.includes("what are") ||
      questionText.length > 60) {
    return { type: "long-answer" }
  }
  
  return { type: "short-answer" }
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
    if (questionConfig.type === "multiple-choice" && questionConfig.options) {
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
  const [viewMode, setViewMode] = useState<"builder" | "preview" | "share" | "my-forms">("builder")
  const [formTitle, setFormTitle] = useState("Client Onboarding Form")
  const [formDescription, setFormDescription] = useState("Please fill out this form to help us understand your needs and get started on your project.")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [previewCurrentQuestion, setPreviewCurrentQuestion] = useState(0)
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>({})
  const [previewIsTransitioning, setPreviewIsTransitioning] = useState(false)
  const [previewShowContent, setPreviewShowContent] = useState(true)
  const [previewTextInput, setPreviewTextInput] = useState("")
  const [savedForms, setSavedForms] = useState<any[]>([])
  const [loadingForms, setLoadingForms] = useState(false)
  const [formSubmissions, setFormSubmissions] = useState<Record<string, any[]>>({})
  const [expandedFormId, setExpandedFormId] = useState<string | null>(null)
  const [savedFormId, setSavedFormId] = useState<string | null>(null)
  const [savingForm, setSavingForm] = useState(false)
  const [savedFormUrl, setSavedFormUrl] = useState<string | null>(null)
  const [editedQuestions, setEditedQuestions] = useState<Record<string, Question>>({})
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<Question>>({})
  const [copiedFormId, setCopiedFormId] = useState<string | null>(null)

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

  // Fetch saved forms when switching to my-forms view
  useEffect(() => {
    if (viewMode === "my-forms" && isAuthenticated) {
      fetchSavedForms()
    }
  }, [viewMode, isAuthenticated])

  const fetchSavedForms = async () => {
    setLoadingForms(true)
    try {
      // Note: We'll need to create an API endpoint to list all forms
      // For now, we'll fetch forms individually or create a list endpoint
      // Since Firestore doesn't have a direct "list all" without auth, 
      // we'll create an API endpoint for this
      const response = await fetch('/api/forms/list')
      if (response.ok) {
        const data = await response.json()
        setSavedForms(data.forms || [])
      }
    } catch (error) {
      console.error('Failed to fetch forms:', error)
    } finally {
      setLoadingForms(false)
    }
  }

  const fetchFormSubmissions = async (formId: string) => {
    try {
      const response = await fetch(`/api/forms/submissions?formId=${formId}`)
      if (response.ok) {
        const data = await response.json()
        setFormSubmissions(prev => ({
          ...prev,
          [formId]: data.submissions || []
        }))
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    }
  }

  const deleteForm = async (formId: string) => {
    try {
      const response = await fetch(`/api/forms/store?id=${formId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Remove form from local state
        setSavedForms(prev => prev.filter(form => form.id !== formId))
        // Remove submissions from local state
        setFormSubmissions(prev => {
          const updated = { ...prev }
          delete updated[formId]
          return updated
        })
        // Close expanded form if it was the deleted one
        if (expandedFormId === formId) {
          setExpandedFormId(null)
        }
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete form')
      }
    } catch (error) {
      console.error('Failed to delete form:', error)
      alert('An error occurred while deleting the form')
    }
  }

  const copyFormLink = (formId?: string) => {
    const formIdToUse = formId || savedFormId
    if (!formIdToUse) return
    
    const shareUrl = `${window.location.origin}/forms/client/${formIdToUse}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      // Show copied state
      setCopiedFormId(formIdToUse)
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedFormId(null)
      }, 2000)
    }).catch(() => {
      alert("Failed to copy link. Please try again.")
    })
  }

  const saveForm = async () => {
    if (selectedQuestions.size === 0) {
      ;(async () => {
        const { toast } = await import("@/hooks/use-toast")
        toast({ 
          title: "No questions selected", 
          description: "Please select at least one question before saving.",
          variant: "destructive" as any
        })
      })()
      return
    }

    setSavingForm(true)
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
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.id) {
        setSavedFormId(result.id)
        setSavedFormUrl(`${window.location.origin}${result.url}`)
        
        ;(async () => {
          const { toast } = await import("@/hooks/use-toast")
          toast({ 
            title: "Form saved!", 
            description: "Your form has been saved. You can now copy the link to share it." 
          })
        })()
        
        // Refresh forms list if in my-forms view
        if (viewMode === "my-forms") {
          fetchSavedForms()
        }
      } else {
        throw new Error(result.error || 'Failed to save form')
      }
    } catch (error) {
      console.error("Failed to save form:", error)
      ;(async () => {
        const { toast } = await import("@/hooks/use-toast")
        toast({ 
          title: "Failed to save form", 
          description: "Please try again.",
          variant: "destructive" as any
        })
      })()
    } finally {
      setSavingForm(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/forms/login")
  }

  // Get question (edited version if exists, otherwise original)
  const getQuestion = (questionId: string): Question => {
    if (editedQuestions[questionId]) {
      return editedQuestions[questionId]
    }
    const original = allQuestions.find(q => q.id === questionId)
    if (!original) {
      throw new Error(`Question ${questionId} not found`)
    }
    return original
  }

  // Open edit dialog
  const openEditDialog = (question: Question) => {
    setEditingQuestionId(question.id)
    setEditFormData({
      text: question.text,
      type: question.type,
      placeholder: question.placeholder || "",
      required: question.required || false,
      options: question.options ? [...question.options] : []
    })
  }

  // Save edited question
  const saveEditedQuestion = () => {
    if (!editingQuestionId) return
    
    const originalQuestion = allQuestions.find(q => q.id === editingQuestionId)
    if (!originalQuestion) return

    const newType = editFormData.type || originalQuestion.type
    const editedQuestion: Question = {
      ...originalQuestion,
      text: editFormData.text || originalQuestion.text,
      type: newType,
      placeholder: editFormData.placeholder || undefined,
      required: editFormData.required || false,
      options: newType === "multiple-choice" && editFormData.options && editFormData.options.length > 0 
        ? editFormData.options.filter(opt => opt.trim() !== "")
        : undefined
    }

    setEditedQuestions(prev => ({
      ...prev,
      [editingQuestionId]: editedQuestion
    }))

    // Reset saved state when form changes
    if (savedFormId) {
      setSavedFormId(null)
      setSavedFormUrl(null)
    }

    setEditingQuestionId(null)
    setEditFormData({})
  }

  // Add option to select question
  const addOption = () => {
    setEditFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), ""]
    }))
  }

  // Remove option from select question
  const removeOption = (index: number) => {
    setEditFormData(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }))
  }

  // Update option value
  const updateOption = (index: number, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt)
    }))
  }

  const filteredQuestions = allQuestions.map(q => getQuestion(q.id)).filter(q => 
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
    // Reset saved state when form changes
    if (savedFormId) {
      setSavedFormId(null)
      setSavedFormUrl(null)
    }
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
    // Reset saved state when form changes
    if (savedFormId) {
      setSavedFormId(null)
      setSavedFormUrl(null)
    }
  }

  const unselectAllQuestions = () => {
    setSelectedQuestions(new Set())
    // Reset saved state when form changes
    if (savedFormId) {
      setSavedFormId(null)
      setSavedFormUrl(null)
    }
  }

  const selectedQuestionsList = allQuestions
    .filter(q => selectedQuestions.has(q.id))
    .map(q => getQuestion(q.id))

  const renderFormField = (question: Question) => {
    const fieldId = `field-${question.id}`
    
    switch (question.type) {
      case "long-answer":
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
      
      case "multiple-choice":
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
      
      case "short-answer":
      case "other":
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
              type="text"
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
        if (lastAnswer && lastQuestion.type !== "multiple-choice") {
          setPreviewTextInput(lastAnswer)
        }
      } else {
        const prevQuestion = selectedQuestionsList[previewCurrentQuestion - 1]
        const prevAnswer = previewAnswers[prevQuestion.id]
        if (prevAnswer && prevQuestion.type !== "multiple-choice") {
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
                    {currentQ.type === "multiple-choice" && currentQ.options ? (
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
                    ) : currentQ.type === "long-answer" ? (
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
                          type="text"
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

  // My Forms View
  if (viewMode === "my-forms") {
    return (
      <div className="min-h-screen bg-[#F5F3F4] py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B132B] mb-3 sm:mb-4 break-words">
                My <span className="text-[#D4AF37]">Forms</span>
              </h1>
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#3A506B] max-w-3xl break-words mx-auto sm:mx-0">
                View and manage all your saved forms and their submissions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-shrink-0 justify-center sm:justify-start">
              <Button
                onClick={() => setViewMode("builder")}
                variant="outline"
                size="sm"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] flex-1 sm:flex-none"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Builder</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-[#3A506B]/20 text-[#3A506B] hover:bg-[#3A506B]/10 flex-1 sm:flex-none"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Forms List */}
          {loadingForms ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
                <p className="font-sans text-[#3A506B]">Loading forms...</p>
              </div>
            </div>
          ) : savedForms.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
              <CardContent className="py-8 sm:py-12 text-center px-4 sm:px-6">
                <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-[#3A506B]/30 mx-auto mb-4" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] mb-2 break-words">No Forms Yet</h2>
                <p className="font-sans text-sm sm:text-base text-[#3A506B] mb-6 break-words">
                  Create your first form using the form builder.
                </p>
                <Button
                  onClick={() => setViewMode("builder")}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold w-full sm:w-auto"
                >
                  Go to Form Builder
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedForms.map((form) => {
                const submissions = formSubmissions[form.id] || []
                const isExpanded = expandedFormId === form.id
                
                return (
                  <Card key={form.id} className="bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="font-serif text-xl sm:text-2xl text-[#0B132B] mb-2 break-words">
                            {form.title}
                          </CardTitle>
                          <CardDescription className="font-sans text-sm sm:text-base text-[#3A506B] mb-2 break-words">
                            {form.description}
                          </CardDescription>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#3A506B] mt-2">
                            <span>{form.questionCount} questions</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Expires {new Date(form.expiresAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button
                            onClick={() => copyFormLink(form.id)}
                            variant={copiedFormId === form.id ? "default" : "outline"}
                            size="sm"
                            className={`w-full sm:w-auto ${
                              copiedFormId === form.id
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B]"
                            }`}
                          >
                            {copiedFormId === form.id ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => window.open(form.url, '_blank')}
                            variant="outline"
                            size="sm"
                            className="border-[#3A506B]/20 text-[#3A506B] hover:bg-[#3A506B]/10 w-full sm:w-auto"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Form</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{form.title}"? This action cannot be undone. All associated submissions will also be deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteForm(form.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => {
                          if (!isExpanded) {
                            setExpandedFormId(form.id)
                            if (!formSubmissions[form.id]) {
                              fetchFormSubmissions(form.id)
                            }
                          } else {
                            setExpandedFormId(null)
                          }
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-[#3A506B] hover:text-[#D4AF37]"
                      >
                        {isExpanded ? 'Hide' : 'Show'} Submissions ({submissions.length})
                      </Button>
                      
                      {isExpanded && (
                        <div className="mt-4 space-y-4">
                          {submissions.length === 0 ? (
                            <p className="text-sm text-[#3A506B] italic">No submissions yet.</p>
                          ) : (
                            submissions.map((submission: any, index: number) => (
                              <div
                                key={submission.id || index}
                                className="bg-white/50 rounded-lg border border-[#3A506B]/10 p-4"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-[#0B132B] break-words">
                                      {submission.name || 'Anonymous'}
                                    </p>
                                    <p className="text-sm text-[#3A506B] break-words">{submission.email}</p>
                                  </div>
                                  <span className="text-xs text-[#3A506B] flex-shrink-0">
                                    {new Date(submission.submittedAt).toLocaleString()}
                                  </span>
                                </div>
                                <div className="mt-3 space-y-2">
                                  {Object.entries(submission.answers || {}).map(([key, value]: [string, any]) => {
                                    if (key === 'name' || key === 'email') return null
                                    return (
                                      <div key={key} className="text-sm break-words">
                                        <span className="font-medium text-[#0B132B]">{key}:</span>{' '}
                                        <span className="text-[#3A506B]">{String(value)}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3F4] py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B132B] mb-3 sm:mb-4 break-words">
              Form <span className="text-[#D4AF37]">Builder</span>
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#3A506B] max-w-3xl break-words mx-auto sm:mx-0">
              Select questions from the categories below to build your custom client onboarding form. 
              Once you're done, preview and generate the form.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-shrink-0 justify-center sm:justify-start">
            <Button
              onClick={() => setViewMode("my-forms")}
              variant="outline"
              size="sm"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] flex-1 sm:flex-none"
            >
              <List className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Forms</span>
              <span className="sm:hidden">Forms</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-[#3A506B]/20 text-[#3A506B] hover:bg-[#3A506B]/10 flex-1 sm:flex-none"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Form Title & Description Editor */}
        <Card className="mb-6 sm:mb-8 bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-xl sm:text-2xl text-[#0B132B] break-words">Form Settings</CardTitle>
            <CardDescription className="font-sans text-sm sm:text-base text-[#3A506B] break-words">
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
                onChange={(e) => {
                  setFormTitle(e.target.value)
                  // Reset saved state when form changes
                  if (savedFormId) {
                    setSavedFormId(null)
                    setSavedFormUrl(null)
                  }
                }}
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
                onChange={(e) => {
                  setFormDescription(e.target.value)
                  // Reset saved state when form changes
                  if (savedFormId) {
                    setSavedFormId(null)
                    setSavedFormUrl(null)
                  }
                }}
                className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 min-h-[100px] rounded-lg bg-white/80 backdrop-blur-sm"
              />
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
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-3 sm:gap-4 items-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-[#D4AF37]/30 px-4 sm:px-6 py-3 flex-1 min-w-[140px]">
            <div className="font-sans text-xs sm:text-sm text-[#3A506B]">Selected Questions</div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B]">{selectedQuestions.size}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-[#D4AF37]/30 px-4 sm:px-6 py-3 flex-1 min-w-[140px]">
            <div className="font-sans text-xs sm:text-sm text-[#3A506B]">Total Questions</div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B]">{allQuestions.length}</div>
          </div>
          {selectedQuestions.size > 0 && (
            <Button
              onClick={unselectAllQuestions}
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-600 flex-shrink-0"
            >
              <XSquare className="h-4 w-4 mr-2" />
              Unselect All
            </Button>
          )}
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
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="font-serif text-xl sm:text-2xl text-[#0B132B] mb-2 break-words">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="font-sans text-sm sm:text-base text-[#3A506B] break-words">
                        {category.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategory(category.id)}
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] flex-shrink-0 w-full sm:w-auto"
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
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                            isSelected
                              ? "bg-[#D4AF37]/10 border-[#D4AF37]"
                              : "bg-white/50 border-[#3A506B]/10 hover:border-[#D4AF37]/30"
                          }`}
                        >
                          <div
                            className="mt-1 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleQuestion(question.id)}
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <Label
                                htmlFor={`checkbox-${question.id}`}
                                className="font-sans font-semibold text-[#0B132B] cursor-pointer select-none pointer-events-none break-words"
                              >
                                {question.text}
                              </Label>
                              {question.required && (
                                <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-semibold pointer-events-none flex-shrink-0">
                                  Required
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#3A506B] pointer-events-none">
                              <span className="capitalize">{question.type}</span>
                              {question.placeholder && (
                                <>
                                  <span>•</span>
                                  <span className="italic break-words">{question.placeholder}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-[#D4AF37] pointer-events-none" />
                            )}
                            <Dialog open={editingQuestionId === question.id} onOpenChange={(open) => {
                              if (!open) {
                                setEditingQuestionId(null)
                                setEditFormData({})
                              }
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEditDialog(question)
                                  }}
                                  className="h-8 w-8 p-0 text-[#3A506B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Edit Question</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3 py-2">
                                  <div>
                                    <Textarea
                                      value={editFormData.text || ""}
                                      onChange={(e) => setEditFormData(prev => ({ ...prev, text: e.target.value }))}
                                      className="min-h-[60px]"
                                      placeholder="Question text"
                                    />
                                  </div>
                                  <div className="flex gap-3">
                                    <Select
                                      value={editFormData.type || "short-answer"}
                                      onValueChange={(value: Question["type"]) => setEditFormData(prev => ({ ...prev, type: value }))}
                                    >
                                      <SelectTrigger className="flex-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="short-answer">Short Answer</SelectItem>
                                        <SelectItem value="long-answer">Long Answer</SelectItem>
                                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <div className="flex items-center gap-2 px-3 border rounded-md">
                                      <Checkbox
                                        checked={editFormData.required || false}
                                        onCheckedChange={(checked) => setEditFormData(prev => ({ ...prev, required: !!checked }))}
                                      />
                                      <Label className="text-sm cursor-pointer">Required</Label>
                                    </div>
                                  </div>
                                  <Input
                                    value={editFormData.placeholder || ""}
                                    onChange={(e) => setEditFormData(prev => ({ ...prev, placeholder: e.target.value }))}
                                    placeholder="Placeholder (optional)"
                                  />
                                  {editFormData.type === "multiple-choice" && (
                                    <div className="space-y-2 pt-1">
                                      {editFormData.options?.map((option, index) => (
                                        <div key={index} className="flex gap-2">
                                          <Input
                                            value={option}
                                            onChange={(e) => updateOption(index, e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                            className="flex-1"
                                          />
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeOption(index)}
                                            className="h-9 w-9 p-0 text-red-500 hover:text-red-700"
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addOption}
                                        className="w-full"
                                      >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Option
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setEditingQuestionId(null)
                                      setEditFormData({})
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={saveEditedQuestion}>
                                    Save
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Saved Form Info */}
        {savedFormId && (
          <Card className="mt-6 sm:mt-8 mb-6 sm:mb-8 bg-[#D4AF37]/10 backdrop-blur-xl border-2 border-[#D4AF37] shadow-lg">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B132B] break-words">Form Saved Successfully</h3>
                  </div>
                  <p className="font-sans text-sm text-[#3A506B] mb-2 break-words">
                    Your form has been saved. Copy the link below to share it with your client.
                  </p>
                  {savedFormUrl && (
                    <p className="font-sans text-xs text-[#3A506B]/70 font-mono bg-white/50 px-3 py-2 rounded border border-[#3A506B]/10 break-all">
                      {savedFormUrl}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => copyFormLink()}
                    className={`w-full sm:w-auto ${
                      copiedFormId === savedFormId
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B]"
                    } font-semibold`}
                  >
                    {copiedFormId === savedFormId ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => window.open(savedFormUrl || '', '_blank')}
                    variant="outline"
                    className="border-[#3A506B]/20 text-[#3A506B] hover:bg-[#3A506B]/10 w-full sm:w-auto"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {selectedQuestions.size > 0 && (
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                setPreviewCurrentQuestion(0)
                setPreviewAnswers({})
                setPreviewTextInput("")
                setFormSubmitted(false)
                setViewMode("preview")
              }}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-bold text-base sm:text-lg px-6 sm:px-12 py-5 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <Eye className="mr-2 h-5 w-5" />
              <span className="whitespace-nowrap">Preview & Test Form</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={saveForm}
              disabled={savingForm || savedFormId !== null}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] font-bold text-base sm:text-lg px-6 sm:px-12 py-5 sm:py-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {savingForm ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#D4AF37] mr-2"></div>
                  Saving...
                </>
              ) : savedFormId ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Form Saved
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Save Form
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                // Generate standalone HTML
                const formFieldsHTML = selectedQuestionsList.map(question => {
                  const fieldId = `field-${question.id}`
                  const label = `${question.text}${question.required ? ' <span style="color: #D4AF37;">*</span>' : ''}`
                  
                  if (question.type === "long-answer") {
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
                  } else if (question.type === "multiple-choice") {
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
                    // short-answer or other - both render as text input
                    return `
                      <div style="margin-bottom: 1.5rem;">
                        <label for="${fieldId}" style="display: block; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #0B132B; margin-bottom: 0.5rem;">
                          ${label}
                        </label>
                        <input
                          id="${fieldId}"
                          name="${question.id}"
                          type="text"
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
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B132B] font-bold text-base sm:text-lg px-6 sm:px-12 py-5 sm:py-6 rounded-lg w-full sm:w-auto"
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

