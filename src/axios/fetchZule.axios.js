import axios from 'axios';

import { base_URL } from '../utils/constants.util';

export const getRandomZules = async (offset, token) =>
    await axios.get(`${base_URL}/zules/random?offset=${offset}`, { headers: { 'Authorization': `Bearer ${token}` } })

export const getParticularZules = async (id_zule, token) =>
    await axios.get(`${base_URL}/zules/particular/${id_zule}`, { headers: { 'Authorization': `Bearer ${token}` } })

export const getRandomSimilarZules = async (categories, token) =>
    await axios.get(`${base_URL}/zules/random/similar?categories=${categories}`, { headers: { 'Authorization': `Bearer ${token}` } })