import { useContext } from 'react'
import { StatusBar } from 'react-native';

import { AuthContext } from '../context/auth.context';

import MainNavigation from './Main.navigation';
import AuthNavigation from './Auth.navigation';

const AppNav = () => {
    const [user, setUser] = useContext(AuthContext)
    return (
        <>
            <StatusBar translucent={true} backgroundColor='rgba(0,0,0,0)' />
            {
                user ? <MainNavigation /> : <AuthNavigation />
            }
        </>
    )
}

export default AppNav