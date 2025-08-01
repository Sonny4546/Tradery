import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getUserDataById, TraderyProfiles } from "../../lib/UserProfile";
import { getUser } from "../appwrite";
import { TraderyUser } from "../GetUser";
import { useLocation } from "react-router-dom";

interface TraderyUserContext {
    userData?: TraderyUser | undefined;
    userdb?: TraderyProfiles | undefined;
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
    const [userData, setUserData] = useState<TraderyUser | undefined>();
    const [userdb, setUserdb] = useState<TraderyProfiles | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                if (user) {
                    setUserData(user);
                    const { userdb } = await getUserDataById(user.$id);
                    setUserdb(userdb);
                } else {
                    setUserData(undefined);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData();
    }, []);

    return { userData, userdb };
}

export function userInfo() {
    const user = useContext(UserContext);
    if (!user) {
        throw new Error("⚠️ userInfo() is being used outside of UserProvider.");
    }
    return user;
}