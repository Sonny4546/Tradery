import React from "react"
import { useUserStore } from "../../../lib/userStore"
import styles from "./userInfo.module.css"

const Userinfo = () => {

  const {currentUser} = useUserStore()
  return (
    <div className={styles.userInfo}>
      <div className={styles.user}>
        <h2>{currentUser.username} </h2>
      </div>
    </div>
  )
}

export default Userinfo