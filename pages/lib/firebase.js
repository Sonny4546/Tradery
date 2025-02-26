import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCurrentSession, DeleteSession, OAuthProvider, account } from "./appwrite";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "tradery-messenger-5e90e.firebaseapp.com",
    projectId: "tradery-messenger-5e90e",
    storageBucket: "tradery-messenger-5e90e.firebasestorage.app",
    messagingSenderId: "19382326863",
    appId: "1:19382326863:web:fff4f5b0813885b44d7c3a",
    measurementId: "G-F32QNSGEKC"
  };
  


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()

export async function bothlogin(){
    try {
        // Step 1: Log in with Firebase
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        if (!user) {
          console.error("Firebase login failed.");
          return;
        }
    
        // Step 2: Store user in Firestore if not exists
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
    
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            id: user.uid,
            email: user.email,
            username: user.displayName || "New User",
            createdAt: new Date(),
            blocked: [],
          });
          await setDoc(doc(db, "userchats", user.uid), {
            chats: [],
          });
        }
    
        // Step 3: Log in with Appwrite (OAuth session)
        await account.createOAuth2Session(
          OAuthProvider.Google,
          "https://sonny4546.github.io/Tradery/#/Home",
          "https://sonny4546.github.io/Tradery"
        );
    
        console.log("Login successful with Firebase and Appwrite.");
      } catch (error) {
        console.error("Error during login:", error);
        alert(`Login failed: ${error.message}`);
      }
}