/**
 * Firebase Client Initialization Module for ঔষধBox (OushodBox)
 * Safe for Next.js App Router / SSR environments.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDGf-lA-rr-W6hx9TN_pEB8O5KDkSe1VZM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "osudhbox.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "osudhbox",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "osudhbox.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "654688835279",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:654688835279:web:b05ad850db59a2178909ba",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GCB2EJH8YT",
};

// Initialize Firebase safely without duplicate app initialization on hot reload or SSR
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore instance
const db: Firestore = getFirestore(app);

// Initialize Auth instance
const auth: Auth = getAuth(app);

export { app, db, auth, firebaseConfig };

