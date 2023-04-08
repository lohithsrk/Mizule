import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const getRandomZules = async (offset, token) =>
    await axios.get(`${base_url}/zules/random?offset=${offset}`, { headers: { 'Authorization': `Bearer ${token}` } })

export const likeZule = async (id_user, id_zule, token) =>
    await axios.post(`${base_url}/zules/${id_user}/like`, {  id_zule }, { headers: { 'Authorization': `Bearer ${token}` } })

export const createZule = async (data, token) =>
    await axios.post(`${base_url}/zules/create`, data
        , { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
    )
