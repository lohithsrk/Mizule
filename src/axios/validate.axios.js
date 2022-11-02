import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const generateOTP = async (email) =>
    axios.post(`${base_URL}/user/validate`, { email })

export const validateUser = async (token) =>
    axios.get(`${base_URL}/user/validate`,
        { headers: { 'Authorization': `Bearer ${token}`  } }
    )