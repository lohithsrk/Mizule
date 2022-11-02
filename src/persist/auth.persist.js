import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateUser } from '../axios/validate.axios';

const USER_STORAGE_KEY = 'USER_DATA'

export const getUser = async (setUser) => {
    try {
        const user = await AsyncStorage.getItem(USER_STORAGE_KEY)
        if (user) {
            await validateUser(JSON.parse(user).token).then(res => {
                return setUser(res.data)
            }).catch(err => {
                console.log(err);
                setUser(USER_STORAGE_KEY, null)
            })
        } else {
            return null
        }
    } catch (e) {
        console.log(e);
    }
}

export const setUser = async (userData) => {
    try {
        const userDataJSON = JSON.stringify(userData)
        await AsyncStorage.setItem(USER_STORAGE_KEY, userDataJSON)
        return 'ok'
    } catch (e) {
        console.log(e);
    }
}