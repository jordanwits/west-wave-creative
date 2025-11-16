import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let app: App | undefined
let db: Firestore | undefined

// Initialize Firebase Admin SDK
function getFirebaseAdmin(): { app: App; db: Firestore } {
  if (app && db) {
    return { app, db }
  }

  // Check if Firebase Admin is already initialized
  const existingApps = getApps()
  if (existingApps.length > 0) {
    app = existingApps[0]
    db = getFirestore(app)
    return { app, db }
  }

  // Initialize with service account credentials
  // For production, use environment variables
  // For development, you can use a service account JSON file
  let serviceAccount: any = undefined
  
  // Always log for debugging
  console.log('🔍 Firebase Admin Initialization:')
  console.log('  - FIREBASE_SERVICE_ACCOUNT_KEY exists:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  console.log('  - FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID)
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      // Remove surrounding quotes if present
      const keyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim()
      const cleanedKey = keyString.startsWith("'") && keyString.endsWith("'")
        ? keyString.slice(1, -1)
        : keyString.startsWith('"') && keyString.endsWith('"')
        ? keyString.slice(1, -1)
        : keyString
      
      console.log('  - Key length:', cleanedKey.length)
      console.log('  - Key starts with:', cleanedKey.substring(0, 50))
      
      serviceAccount = JSON.parse(cleanedKey)
      
      console.log('✅ Successfully parsed FIREBASE_SERVICE_ACCOUNT_KEY')
      console.log('  - Project ID:', serviceAccount.project_id)
      console.log('  - Client Email:', serviceAccount.client_email)
    } catch (error) {
      console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error)
      if (error instanceof Error) {
        console.error('  - Error message:', error.message)
        console.error('  - Error stack:', error.stack?.substring(0, 200))
      }
      throw new Error(
        `Invalid FIREBASE_SERVICE_ACCOUNT_KEY format: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure it is valid JSON.`
      )
    }
  } else {
    console.warn('⚠️  FIREBASE_SERVICE_ACCOUNT_KEY not found in environment variables')
    console.warn('  - Available env vars:', Object.keys(process.env).filter(k => k.includes('FIREBASE')).join(', '))
  }

  if (!serviceAccount && !process.env.FIREBASE_PROJECT_ID) {
    throw new Error(
      'Firebase Admin SDK not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID environment variables.'
    )
  }

  if (serviceAccount) {
    try {
      console.log('🔧 Initializing Firebase Admin with service account credentials...')
      app = initializeApp({
        credential: cert(serviceAccount),
      })
      console.log('✅ Firebase Admin initialized successfully with service account')
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin with service account:', error)
      if (error instanceof Error) {
        console.error('  - Error message:', error.message)
      }
      throw error
    }
  } else {
    // Initialize with project ID (for emulator or when using Application Default Credentials)
    console.warn('⚠️  Initializing Firebase Admin with project ID only (will use Application Default Credentials)')
    console.warn('  - This will fail unless you have Application Default Credentials configured')
    app = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  }

  db = getFirestore(app)
  return { app, db }
}

export function getFirestoreAdmin(): Firestore {
  const { db } = getFirebaseAdmin()
  return db
}

export function getFirebaseApp(): App {
  const { app } = getFirebaseAdmin()
  return app
}

