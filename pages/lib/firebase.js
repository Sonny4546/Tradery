import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "traderymessenger.firebaseapp.com",
  projectId: "traderymessenger",
  storageBucket: "traderymessenger.firebasestorage.app",
  messagingSenderId: "693590502885",
  appId: "1:693590502885:web:658531b928cc1f40b1930c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

export async function firegoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                id: user.uid,
                email: user.email,
                username: user.displayName || "New User",
                createdAt: new Date(),
                blocked: []
            });
            await setDoc(doc(db, "userchats", user.uid), {
                chats: [],
            });
        }
    }catch (error) {
      console.error("Error during Google sign-in:", error);
  }
};