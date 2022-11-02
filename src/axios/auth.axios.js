import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const loginUser = async (values) =>
    await axios.post(`${base_URL}/login`, {
        ...values
    })

export const signUpUser = async (values) =>
    await axios.post(`${base_URL}/signup`, {
        ...values
    })


