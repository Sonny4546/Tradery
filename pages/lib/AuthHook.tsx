import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { getCurrentSession, DeleteSession, OAuthProvider, account } from "./appwrite";
import { Models } from "appwrite";
import { useNavigate } from 'react-router'
import { getTeams } from "./User";
import {bothlogin} from "./firebase";

interface TraderyAuthContext {
    session?: Models.Session;
    isAdmin?: boolean;
    logIn: Function;
    logOut: Function;
    logInAdmin: Function;
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
    const [isAdmin, setIsAdmin] = useState<boolean>();

    useEffect(() => {
        (async function run() {
          const data = await getCurrentSession();
          setSession(data.session);
        })();
      }, [])
    
    useEffect(() => {
        if ( !session?.$id ) return;
        (async function run() {
          const { teams } = await getTeams();
          const isAdmin = !!teams.find(team => team.$id === import.meta.env.VITE_APPWRITE_TEAM_ADMIN_ID)
          setIsAdmin(isAdmin);
        })();
      }, [session?.$id])
    
      async function logIn() {
        await bothlogin()
      }
      

    async function logInAdmin(email: string, password: string) {
      try {
        await account.createEmailPasswordSession(
          email, password
        )
      } catch (error) {
        console.error(error)
      }
    }

    async function logOut() {
      await DeleteSession();
      setSession(undefined);
    }
    return{
        session,
        isAdmin,
        logOut,
        logIn,
        logInAdmin
    }
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if ( !auth ) {
        throw new Error('useAuth cant be used outside')
    }
    return auth
}