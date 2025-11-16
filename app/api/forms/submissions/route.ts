import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const submissionData = await request.json()
    
    // Validate required fields
    if (!submissionData.formId) {
      return NextResponse.json(
        { success: false, error: 'Form ID is required' },
        { status: 400 }
      )
    }
    
    // Store the submission in Firestore
    const submissionsRef = db.collection('formSubmissions')
    
    const submission = {
      formId: submissionData.formId,
      formTitle: submissionData.formTitle || '',
      formDescription: submissionData.formDescription || '',
      name: submissionData.name || '',
      email: submissionData.email || '',
      answers: submissionData.answers || {},
      submittedAt: Timestamp.now(),
      pageUrl: submissionData.pageUrl || '',
    }
    
    const docRef = await submissionsRef.add(submission)
    
    return NextResponse.json({ 
      success: true, 
      submissionId: docRef.id
    })
  } catch (error) {
    console.error('Failed to store form submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to store form submission' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getFirestoreAdmin()
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('formId')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    let query = db.collection('formSubmissions').orderBy('submittedAt', 'desc')
    
    if (formId) {
      query = query.where('formId', '==', formId)
    }
    
    query = query.limit(limit)
    
    const snapshot = await query.get()
    const submissions = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString() || data.submittedAt,
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      submissions,
      count: submissions.length
    })
  } catch (error) {
    console.error('Failed to retrieve form submissions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve form submissions' },
      { status: 500 }
    )
  }
}

