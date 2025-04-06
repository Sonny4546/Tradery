import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getUserDataById, TraderyProfiles } from "../../lib/UserProfile";
import { getUser, client, database } from "../appwrite"; // client & databases from Appwrite SDK setup
import { TraderyUser } from "../GetUser";

interface TraderyUserContext {
  userData?: TraderyUser;
  userdb?: TraderyProfiles;
}

export const UserContext = createContext<TraderyUserContext | undefined>(undefined);

interface UserProviderProps {
  children?: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<TraderyUser>();
  const [userdb, setUserdb] = useState<TraderyProfiles>();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUserData(user);
          const { userdb } = await getUserDataById(user.$id);
          setUserdb(userdb);

          // Subscribe to real-time changes on this user's profile document
          unsubscribe = client.subscribe(
            [`database.${process.env.VITE_APPWRITE_DATABASE_ID}.collections.${process.env.VITE_APPWRITE_COLLECTION_USER_ID}.documents.${user.$id}`],
            async (res) => {
              console.log("🔄 Realtime update received:", res);
              const { userdb } = await getUserDataById(user.$id);
              setUserdb(userdb);
            }
          );
        } else {
          setUserData(undefined);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, userdb }}>
      {children}
    </UserContext.Provider>
  );
};

export function userInfo() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("⚠️ userInfo() is being used outside of UserProvider.");
  }
  return user;
}