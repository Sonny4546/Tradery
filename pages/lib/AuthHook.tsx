import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { getCurrentSession, OAuthProvider, account } from "./appwrite";
import { Models } from "appwrite";
import { useNavigate } from 'react-router'

interface TraderyAuthContext {
    session?: Models.Session;
    logOut: Function;
    logIn: Function;
    NoSessionCheck: Function;
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
        await account.deleteSession('current')
        console.log("account deleted!");
        setSession(undefined);
    }

    async function logIn() {
      try {
        await account.createOAuth2Session(
          OAuthProvider.Google,
          'https://sonny4546.github.io/Tradery/#/Home',
          'https://sonny4546.github.io/Tradery')
      } catch (error) {
        console.error(error)
      }
    }

    async function NoSessionCheck(){
      if (!session) {
        const navigate = useNavigate()
        return navigate('https://sonny4546.github.io/Tradery/')
      }
    }
    return{
        session,
        logOut,
        NoSessionCheck,
        logIn
    }
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if ( !auth ) {
        throw new Error('useAuth cant be used outside')
    }
    return auth
}