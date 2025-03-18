import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, arrayUnion, collection, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { OAuthProvider, account } from "./appwrite";
import { useEffect, useState } from "react"
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

export const auth = getAuth(app)
export const db = getFirestore(app)

//search
export async function searchUser(username) {
  try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
          return querySnapShot.docs[0].data();
      } else {
          throw new Error("User not found!");
      }
  } catch (err) {
      console.error("Search Error:", err);
      throw new Error("An error occurred while searching.");
  }
}

//Add
export async function addUserToChat(targetUser, currentUser) {
  if (!targetUser || !currentUser) return;

  const chatRef = collection(db, "chats");
  const userChatsRef = collection(db, "userchats");
  const currentUserChatsRef = doc(userChatsRef, currentUser.id);
  const targetUserChatsRef = doc(userChatsRef, targetUser.id);

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

      // Check if the chat already exists
      const alreadyAddedByCurrentUser = currentUserChats.some(chat => chat.receiverId === targetUser.id);
      const alreadyAddedByTargetUser = targetUserChats.some(chat => chat.receiverId === currentUser.id);

      if (alreadyAddedByCurrentUser || alreadyAddedByTargetUser) {
          throw new Error("User already added!");
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
          receiverId: targetUser.id,
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

      return newChatRef.id;
  } catch (err) {
      console.error("Add User Error:", err);
      throw new Error("An error occurred while adding the user.");
  }
}

export function useAutoSearchAndAdd(username) {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (!username) return;

      async function fetchAndAddUser() {
          try {
              const foundUser = await searchUser(username);
              setUser(foundUser);
              await addUserToChat(foundUser, currentUser);
              console.log("found and added")
          } catch (err) {
              setError(err.message);
          }
      }

      fetchAndAddUser();
  }, [username, currentUser]);

  return { user, error };
}