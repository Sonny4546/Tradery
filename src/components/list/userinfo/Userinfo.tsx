import React from "react"
import { useUserStore } from "../../../../pages/lib/userStore"
import styles from "./userInfo.module.css"

const Userinfo = () => {

  const {currentUser} = useUserStore() as {currentUser: {username: string}}
  return (
    <div className={styles.userInfo}>
      <div className={styles.user}>
        <h2>{currentUser.username} </h2>
      </div>
    </div>
  )
}

export default Userinfo