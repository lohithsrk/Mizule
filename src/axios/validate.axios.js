import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const generateOTP = async (email) =>
    axios.post(`${base_url}/user/validate`, { email })

export const validateUser = async (token) =>
    axios.get(`${base_url}/user/validate`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    )