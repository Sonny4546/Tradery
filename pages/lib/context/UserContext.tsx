import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getUserDataById, TraderyProfiles } from "../../lib/UserProfile";
import { getUser } from "../appwrite";
import { TraderyUser } from "../GetUser";

interface TraderyUserContext {
    userData?: TraderyUser;
    userdb?: TraderyProfiles;
}

const UserContext = createContext<TraderyUserContext | undefined>(undefined);

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

export const userContextState = () => {
    const [userData, setUserData] = useState<TraderyUser>();
    const [userdb, setUserdb] = useState<TraderyProfiles>();

    useEffect(() => {
        const fetchData = async () => {
            if (!userData) {  // Fetch only if not already in context
                const userData = await getUser();
                setUserData(userData);
                if (userData?.$id) {
                    const { userdb } = await getUserDataById(userData.$id);
                    setUserdb(userdb);
                }
            }
        };
        fetchData();
    }, [userData]);

    return { userData, userdb };
};

export function userInfo() {
    const user = useContext(UserContext);
    if ( !user ) {
        throw new Error('useAuth cant be used outside')
    }
    return user
}