import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { getCurrentSession, DeleteSession } from "./appwrite";
import { Models } from "appwrite";

interface TraderyAuthContext {
    session?: Models.Session;
    logOut: Function;
}

export const AuthContext = createContext<TraderyAuthContext | undefined>(undefined)

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuthState();
    return (
      <AuthContext.Provider value={auth}>
        { children }
      </AuthContext.Provider>
    )
  }

export function useAuthState() {
    const [session, setSession] = useState<Models.Session>();

    useEffect(() => {
        (async function run() {
          const data = await getCurrentSession();
          setSession(data.session);
        })();
      }, [])
    
    async function logOut() {
        await DeleteSession();
        setSession(undefined);
    }

    return{
        session,
        logOut
    }
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if ( !auth ) {
        throw new Error('useAuth cant be used outside')
    }
    return auth
}