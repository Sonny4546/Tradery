import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getUserDataById, TraderyProfiles } from "../../lib/UserProfile";
import { getUser } from "../appwrite";
import { TraderyUser } from "../GetUser";

interface TraderyUserContext {
    userData?: TraderyUser | null;
    userdb?: TraderyProfiles | null;
}

export const UserContext = createContext<TraderyUserContext | undefined>(undefined);

interface UserProviderProps {
    children?: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const user = userContextState();
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export function userContextState() {
    const [userData, setUserData] = useState<TraderyUser | null>(null);
    const [userdb, setUserdb] = useState<TraderyProfiles | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                if (user) {
                    setUserData(user);
                } else {
                    setUserData(null);
                }
                if (user?.$id) {
                    const { userdb } = await getUserDataById(user.$id);
                    setUserdb(userdb);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData();
    }, []);  // ✅ Runs only on mount

    return { userData, userdb };
}

export function userInfo() {
    const user = useContext(UserContext);
    if (!user) {
        console.warn("⚠️ userInfo() is being used outside of UserProvider.");
        return { userData: null, userdb: null };  // ✅ Return null instead of throwing
    }
    return user;
}
