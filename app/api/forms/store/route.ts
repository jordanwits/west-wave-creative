import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

// Form expiration time: 10 days (in milliseconds)
const FORM_EXPIRATION_MS = 10 * 24 * 60 * 60 * 1000

// Generate a short random ID
function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Check if a form ID already exists in Firestore
async function formIdExists(db: any, id: string): Promise<boolean> {
  const formRef = db.collection('forms').doc(id)
  const doc = await formRef.get()
  return doc.exists
}

export async function POST(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const formData = await request.json()
    
    // Generate a short ID
    let shortId = generateShortId()
    
    // Ensure ID is unique (very unlikely collision, but just in case)
    let attempts = 0
    while (await formIdExists(db, shortId) && attempts < 10) {
      shortId = generateShortId()
      attempts++
    }
    
    if (attempts >= 10) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate unique form ID' },
        { status: 500 }
      )
    }
    
    // Store the form data with expiration in Firestore
    const expiresAt = Date.now() + FORM_EXPIRATION_MS
    const formRef = db.collection('forms').doc(shortId)
    
    await formRef.set({
      ...formData,
      createdAt: Timestamp.now(),
      expiresAt: Timestamp.fromMillis(expiresAt),
    })
    
    return NextResponse.json({ 
      success: true, 
      id: shortId,
      url: `/forms/client/${shortId}`
    })
  } catch (error) {
    console.error('Failed to store form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to store form' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID required' },
        { status: 400 }
      )
    }
    
    const formRef = db.collection('forms').doc(id)
    const doc = await formRef.get()
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Form not found or has expired' },
        { status: 404 }
      )
    }
    
    const formData = doc.data()
    
    if (!formData) {
      return NextResponse.json(
        { success: false, error: 'Form not found or has expired' },
        { status: 404 }
      )
    }
    
    // Check if form has expired
    const expiresAt = formData.expiresAt?.toMillis?.() || formData.expiresAt
    if (expiresAt && Date.now() > expiresAt) {
      // Delete expired form
      await formRef.delete()
      return NextResponse.json(
        { success: false, error: 'Form has expired' },
        { status: 410 } // 410 Gone
      )
    }
    
    // Convert Firestore Timestamps to ISO strings for JSON serialization
    const responseData = {
      ...formData,
      createdAt: formData.createdAt?.toDate?.()?.toISOString() || formData.createdAt,
      expiresAt: expiresAt,
    }
    
    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error('Failed to retrieve form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve form' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID required' },
        { status: 400 }
      )
    }
    
    const formRef = db.collection('forms').doc(id)
    const doc = await formRef.get()
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Form not found' },
        { status: 404 }
      )
    }
    
    // Delete associated submissions
    const submissionsRef = db.collection('formSubmissions')
    const submissionsSnapshot = await submissionsRef
      .where('formId', '==', id)
      .get()
    
    const deletePromises = submissionsSnapshot.docs.map(submissionDoc => 
      submissionDoc.ref.delete()
    )
    
    // Delete the form
    await formRef.delete()
    
    // Wait for all submissions to be deleted
    await Promise.all(deletePromises)
    
    return NextResponse.json({ 
      success: true,
      message: 'Form and associated submissions deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete form' },
      { status: 500 }
    )
  }
}

