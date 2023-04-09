import axios from 'axios';

import { base_url } from '../utils/constants.util';

// export const getRandomZules = async (offset, token) =>
//     await axios.get(`${base_url}/zules/random?offset=${offset}`, { headers: { 'Authorization': `Bearer ${token}` } })
export const getRandomZules = async (offset) =>
    await axios.get(`${base_url}/zules/random?offset=${offset}`)

export const getParticularZules = async (id_zule, token) =>
    await axios.get(`${base_url}/zules/particular/${id_zule}`, { headers: { 'Authorization': `Bearer ${token}` } })

export const getRandomSimilarZules = async (categories, token) =>
    await axios.get(`${base_url}/zules/random/similar?categories=${categories}`, { headers: { 'Authorization': `Bearer ${token}` } })