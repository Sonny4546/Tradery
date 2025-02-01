import { useState, useEffect } from "react";
import { client, account, getUser } from "./appwrite";

export async function User() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const checkUser = async () => {
          try {
            const userData = await getUser()
            setUser(user)
            console.log(userData)
          } catch (error) {
            setUser(null)
          }
        }
    
        checkUser()
    }, [])
    return user
};