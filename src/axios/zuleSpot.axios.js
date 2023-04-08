import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const createZuleSpot = async (id_user, title, token) =>
    await axios.post(`${base_url}/zulespot/create`, { id_user, title }
        , { headers: { 'Authorization': `Bearer ${token}` } }
    )

export const getMyZules = async (id_zuleSpot, id_user, token) =>
    await axios.post(`${base_url}/zulespot/myzules`, { id_zuleSpot, id_user }
        , { headers: { 'Authorization': `Bearer ${token}` } }
    )
