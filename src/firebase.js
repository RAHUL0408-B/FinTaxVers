import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics is optional and loaded after the essentials so it does not delay
// authentication, Firestore, or the first visible page.
export let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    import('firebase/analytics')
        .then(({ getAnalytics }) => {
            analytics = getAnalytics(app);
        })
        .catch(() => {
            // Analytics must never prevent the client portal from loading.
        });
}

export { app, auth, db };
