import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const getLiked = async (id_user, token) =>
    await axios.get(`${base_url}/zules/${id_user}/like`
        , { headers: { 'Authorization': `Bearer ${token}` } }
    )

export const getTeaserHistory = async (id_user, token) =>
    await axios.get(`${base_url}/user/${id_user}/history`
        , { headers: { 'Authorization': `Bearer ${token}` } }
    )

export const updateTeaserHistory = async (id_user, id_zule, type, token) =>
    await axios.post(`${base_url}/user/${id_user}/history`, { id_user, id_zule, type }
        , { headers: { 'Authorization': `Bearer ${token}` } }
    )
