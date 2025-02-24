import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCurrentSession, DeleteSession, OAuthProvider, account } from "./appwrite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "traderymessenger.firebaseapp.com",
  projectId: "traderymessenger",
  storageBucket: "traderymessenger.firebasestorage.app",
  messagingSenderId: "693590502885",
  appId: "1:693590502885:web:658531b928cc1f40b1930c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()

// export async function firegoogle() {
//     try {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;

//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);

//         if (!userSnap.exists()) {
//             await setDoc(userRef, {
//                 id: user.uid,
//                 email: user.email,
//                 username: user.displayName || "New User",
//                 createdAt: new Date(),
//                 blocked: []
//             });
//             await setDoc(doc(db, "userchats", user.uid), {
//                 chats: [],
//             });
//         }
//         console.log("User logged in successfully.");
//     } catch (error) {
//         console.error("Error during Google sign-in:", error);
//         alert(`Login failed: ${error.message}`);
//     }
// }skibidi

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