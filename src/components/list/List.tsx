import React from "react";
import ChatList from "./chatList/ChatList"
import styles from "./list.module.css"
import Userinfo from "./userinfo/Userinfo"

const List = ({onChatSelect}) => {
  return (
    <div className={styles.list}>
      {onChatSelect && (
        <>
        <Userinfo />
        <ChatList />
        </>
      )}
    </div>
  );
};

export default List