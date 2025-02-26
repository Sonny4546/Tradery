import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { OAuthProvider, account } from "./appwrite";
import { useState } from "react"
import { useUserStore } from "./userStore"

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

//Add user call

export async function AddUser() {
  const [user, setUser] = useState(null)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) 

  const { currentUser } = useUserStore()

  async function handleAdd() {
    if (!user || added || loading) return;
  
    setLoading(true);
    setError(null);
  
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    const currentUserChatsRef = doc(userChatsRef, currentUser.id);
    const targetUserChatsRef = doc(userChatsRef, user.id);
  
    try {
        // Fetch user chat documents for both users
        const [currentUserChatsSnap, targetUserChatsSnap] = await Promise.all([
            getDoc(currentUserChatsRef),
            getDoc(targetUserChatsRef),
        ]);

        // Ensure the userchats document exists for both users
        if (!currentUserChatsSnap.exists()) {
            await setDoc(currentUserChatsRef, { chats: [] });
        }
        if (!targetUserChatsSnap.exists()) {
            await setDoc(targetUserChatsRef, { chats: [] });
        }

        // Get current chats for both users
        const currentUserChats = currentUserChatsSnap.exists() ? currentUserChatsSnap.data().chats || [] : [];
        const targetUserChats = targetUserChatsSnap.exists() ? targetUserChatsSnap.data().chats || [] : [];

        // Check if the chat already exists for either user
        const alreadyAddedByCurrentUser = currentUserChats.some(chat => chat.receiverId === user.id);
        const alreadyAddedByTargetUser = targetUserChats.some(chat => chat.receiverId === currentUser.id);

        if (alreadyAddedByCurrentUser || alreadyAddedByTargetUser) {
            setError("User already added!");
            setLoading(false);
            return;
        }

        // Create new chat document
        const newChatRef = doc(chatRef);
        await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: [],
        });

        const chatData = {
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
        };

        // Add chat reference for both users
        await updateDoc(currentUserChatsRef, {
            chats: arrayUnion(chatData),
        });

        await updateDoc(targetUserChatsRef, {
            chats: arrayUnion({
                ...chatData,
                receiverId: currentUser.id, // Swap receiverId for the target user
            }),
        });

        console.log("Chat created:", newChatRef.id);
        setAdded(true);
        setTimeout(() => setUser(null), 1000); // Hide the user container after 1 second
    } catch (err) {
        console.error(err);
        setError("An error occurred while adding the user.");
    } finally {
        setLoading(false);
    }
};
}