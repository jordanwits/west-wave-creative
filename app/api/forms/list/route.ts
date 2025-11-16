import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    
    // Get all forms, ordered by creation date (newest first)
    const formsRef = db.collection('forms')
    const snapshot = await formsRef
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
    
    const forms = snapshot.docs.map(doc => {
      const data = doc.data()
      const expiresAt = data.expiresAt?.toMillis?.() || data.expiresAt
      const isExpired = expiresAt && Date.now() > expiresAt
      
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        questionCount: data.questions?.length || 0,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        expiresAt: expiresAt,
        isExpired: isExpired,
        url: `/forms/client/${doc.id}`,
      }
    })
    
    // Filter out expired forms
    const activeForms = forms.filter(form => !form.isExpired)
    
    return NextResponse.json({ 
      success: true, 
      forms: activeForms,
      count: activeForms.length
    })
  } catch (error) {
    console.error('Failed to list forms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to list forms' },
      { status: 500 }
    )
  }
}

