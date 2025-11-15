import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (in production, use a database or Redis)
// This will reset on server restart, but works for now
const formStorage = new Map<string, any>()

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
    
    // Store the form data
    formStorage.set(shortId, {
      ...formData,
      createdAt: new Date().toISOString(),
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
      { success: false, error: 'Form not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ success: true, data: formData })
}

