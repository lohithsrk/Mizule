import { createContext, useState, useEffect } from 'react'
import { getUser } from '../persist/auth.persist';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => { getUser(setUser) }, [setUser])

    return <AuthContext.Provider value={[user, setUser]} >
        {children}
    </AuthContext.Provider >
}