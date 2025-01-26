import { createContext, ReactNode, useContext } from "react";

import { Models } from "appwrite";

interface TraderyAuthContext {
    session?: Models.Session;
}

export const AuthContext = createContext<TraderyAuthContext | undefined>(undefined)

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return(
        <AuthContext.Provider value={{ session: undefined }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if ( !auth ) {
        throw new Error('useAuth cant be used outside')
    }
    return auth
}