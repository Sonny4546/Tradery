import styles from "./chat.module.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from 'react';
import { db } from "../../../pages/lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../../pages/lib/userStore";
import { Button } from "react-bootstrap";
import React from "react";

const Chat = ({ openDetail, goBackToChatList }) => {
    const [chat, setChat] = useState<any>();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState<any>("");
    const [cooldownActive, setCooldownActive] = useState(false);

    const { currentUser } = useUserStore() as { currentUser: { id: string } };
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    const endRef = useRef<any>(null);
    const emojiRef = useRef<any>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);

    useEffect(() => {
        setChat(null);
        if (!chatId) return;

        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => unSub();
    }, [chatId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleSend = async () => {
        if (text === "" || cooldownActive) return;

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                }),
            });

            setText("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.chat}>
            <div className={styles.top}>
                <div className={styles.user}>
                    <Button variant="link" onClick={openDetail} className={styles.userButton}>
                        {user?.username}
                    </Button>
                    <Button variant="secondary" onClick={goBackToChatList} className={`${styles['back-button']} d-md-none`}>
                        Back
                    </Button>
                </div>
            </div>
            <div className={styles.center}>
                {chat?.messages?.map((message, index) => (
                    <div key={index} className={`${styles.message} ${message.senderId === currentUser.id ? styles.own : ""}`}>
                        <div className={styles.texts}>
                            <p>{message.text}</p>
                            <span>
                                {message.createdAt?.seconds 
                                    ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                    : "Unknown Time"}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className={styles.bottom}>
                <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className={cooldownActive ? styles.cooldown : ""}
                />
                <div className={styles.emoji} ref={emojiRef}>
                    <img 
                        src="./emoji.png" 
                        alt="emoji"
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    {open && (
                        <div className={styles.picker}>
                            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className={`${styles.sendButton} d-none d-md-block`} onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;