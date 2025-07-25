import { useEffect, useState } from "react"
import styles from "./chatList.module.css"
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../../pages/lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../pages/lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import React from "react";

const ChatList = () => {
    const [chats, setChats]= useState<any>([]);
    const [addMode, setAddMode]= useState(false);
    const [input, setInput]= useState("");

    const { currentUser } = useUserStore() as  { currentUser: { id: string } };
    const { changeChat} = useChatStore()
    
    useEffect(()=>{

        if (!currentUser?.id) return

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) =>{
            const items = res.data()?.chats

            const promises = items.map( async(item) =>{
                const userDocRef = doc(db, "users", item.receiverId)
                const userDocSnap = await getDoc(userDocRef)

                const user = userDocSnap.data()

                return {...item, user}
            })

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt))
        })
    
        return () => {
            unSub()
        }
    }, [currentUser.id])

    const handleSelect = async (chat) =>{
        const userChats = chats.map(item=>{
            const {user, ...rest } = item
            return rest
        })

        const chatIndex = userChats.findIndex(item=>item.chatId === chat.chatId)

        userChats[chatIndex].isSeen = true

        const userChatsRef = doc(db, "userchats", currentUser.id)

        
        try{
            
            await updateDoc(userChatsRef,{
                chats:userChats, 
            })
            changeChat(chat.chatId,chat.user)
        }catch(err){
            console.log(err)
        }
    }

    const filteredChats = chats.filter(c=> c.user.username.toLowerCase().includes(input.toLowerCase())
    )

  return (
    <div className={styles.chatList}>
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <img src="./search.png" alt="" />
                <input type="text" placeholder="Search" onChange={(e)=>setInput(e.target.value)}/>
            </div>
            <img src={addMode ? "./minus.png" : "./plus.png"} 
            alt="" 
            className={styles.add} 
            onClick={() => setAddMode((prev) => !prev)}
            />
        </div>
        {filteredChats.map((chat) => (
        <div 
            className={styles.item} 
            key={chat.chatId} 
            onClick={()=>handleSelect(chat)}
            style={{
                backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
        >
            <div className={styles.texts}>
                <span>{chat.user.blocked.includes(currentUser.id) 
                ? "User" 
                : chat.user.username}</span>
                <p>{chat.lastMessage}</p>
            </div>
        </div>
    ))}
        {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList