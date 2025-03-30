import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, arrayUnion, collection, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

//Add
export async function addUserToChat(targetUserId: string, currentUserId: string) {
  if (!targetUserId || !currentUserId) return;

  const chatRef = collection(db, "chats");
  const userChatsRef = collection(db, "userchats");
  const currentUserChatsRef = doc(userChatsRef, currentUserId);
  const targetUserChatsRef = doc(userChatsRef, targetUserId);

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
      const alreadyAddedByCurrentUser = currentUserChats.some((chat: { receiverId: any; }) => chat.receiverId === targetUserId);
      const alreadyAddedByTargetUser = targetUserChats.some((chat: { receiverId: any; }) => chat.receiverId === currentUserId);

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
          receiverId: targetUserId,
          updatedAt: Date.now(),
      };

      // Add chat reference for both users
      await updateDoc(currentUserChatsRef, {
          chats: arrayUnion(chatData),
      });

      await updateDoc(targetUserChatsRef, {
          chats: arrayUnion({
              ...chatData,
              receiverId: currentUserId, // Swap receiverId for the target user
          }),
      });

      return newChatRef.id;
  } catch (err) {
      console.error("Add User Error:", err);
      throw new Error("An error occurred while adding the user.");
  }
}