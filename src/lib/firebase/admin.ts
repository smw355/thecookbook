import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

let app: App;

// Initialize Firebase Admin SDK (server-side only)
if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_ADMIN_KEY
    ? JSON.parse(process.env.FIREBASE_ADMIN_KEY)
    : undefined;

  app = initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export const adminStorage = getStorage(app);

export default app;
