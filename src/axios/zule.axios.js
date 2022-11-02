import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const getRandomZules = async (offset, token) =>
    await axios.get(`${base_URL}/zules/random?offset=${offset}`, { headers: { 'Authorization': `Bearer ${token}` } })
