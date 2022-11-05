import { createContext, useState, useEffect } from 'react'
import { getPersistedUser, persistUser } from '../persist/auth.persist';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const isLoggedIn = () => {
        getPersistedUser(setUser)
    }

    useEffect(() => { isLoggedIn(setUser) }, [])

    return <AuthContext.Provider value={{ user, isLoggedIn, persistUser }} >
        {children}
    </AuthContext.Provider >
}