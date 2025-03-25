import React from "react";
import ChatList from "./chatList/ChatList"
import styles from "./list.module.css"
import Userinfo from "./userinfo/Userinfo"

const List = () => {
  return (
    <div className={styles.list}>
      <Userinfo />
      <ChatList />
    </div>
  );
};

export default List