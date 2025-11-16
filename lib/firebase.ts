import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'

let app: FirebaseApp | undefined
let db: Firestore | undefined

// Initialize Firebase Client SDK
function getFirebaseClient(): { app: FirebaseApp; db: Firestore } {
  if (app && db) {
    return { app, db }
  }

  // Check if Firebase is already initialized
  const existingApps = getApps()
  if (existingApps.length > 0) {
    app = existingApps[0]
    db = getFirestore(app)
    return { app, db }
  }

  // Initialize Firebase Client SDK
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  if (!firebaseConfig.projectId) {
    throw new Error(
      'Firebase Client SDK not configured. Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable.'
    )
  }

  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  return { app, db }
}

export function getFirestoreClient(): Firestore {
  const { db } = getFirebaseClient()
  return db
}

export function getFirebaseClientApp(): FirebaseApp {
  const { app } = getFirebaseClient()
  return app
}

