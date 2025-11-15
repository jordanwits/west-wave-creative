import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (in production, use a database or Redis)
// This will reset on server restart, but works for now
const formStorage = new Map<string, any>()

// Form expiration time: 10 days (in milliseconds)
const FORM_EXPIRATION_MS = 10 * 24 * 60 * 60 * 1000

// Cleanup expired forms (called on each request to avoid needing background jobs)
function cleanupExpiredForms() {
  const now = Date.now()
  for (const [id, data] of formStorage.entries()) {
    if (data.expiresAt && now > data.expiresAt) {
      formStorage.delete(id)
    }
  }
}

// Generate a short random ID
function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Generate a short ID
    let shortId = generateShortId()
    
    // Ensure ID is unique (very unlikely collision, but just in case)
    while (formStorage.has(shortId)) {
      shortId = generateShortId()
    }
    
    // Store the form data with expiration
    const expiresAt = Date.now() + FORM_EXPIRATION_MS
    formStorage.set(shortId, {
      ...formData,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt,
    })
    
    return NextResponse.json({ 
      success: true, 
      id: shortId,
      url: `/forms/client/${shortId}`
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to store form' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Cleanup expired forms on each request
  cleanupExpiredForms()
  
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID required' },
      { status: 400 }
    )
  }
  
  const formData = formStorage.get(id)
  
  if (!formData) {
    return NextResponse.json(
      { success: false, error: 'Form not found or has expired' },
      { status: 404 }
    )
  }
  
  // Check if form has expired
  if (formData.expiresAt && Date.now() > formData.expiresAt) {
    formStorage.delete(id)
    return NextResponse.json(
      { success: false, error: 'Form has expired' },
      { status: 410 } // 410 Gone
    )
  }
  
  return NextResponse.json({ success: true, data: formData })
}

