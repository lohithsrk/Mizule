import { useContext } from 'react'

import { AuthContext } from '../context/auth.context';

import MainNavigation from './Main.navigation';
import AuthNavigation from './Auth.navigation';

const AppNav = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            {
                user ? <MainNavigation /> : <AuthNavigation />
            }
        </>
    )
}

export default AppNav