import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from './config';

// Google Sign In
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Facebook Sign In
export async function signInWithFacebook() {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Apple Sign In
export async function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Sign Out
export async function signOut() {
  await firebaseSignOut(auth);
}

// Get Current User
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Get ID Token
export async function getIdToken(): Promise<string | null> {
  const user = getCurrentUser();
  if (!user) return null;
  return await user.getIdToken();
}
