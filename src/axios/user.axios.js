import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const updateTeaserHistory = async (id_user, id_zule, type) =>
    await axios.post(`${base_url}/user/history`, { id_user, id_zule, type }
        // , { headers: { 'Authorization': `Bearer ${token}` } }
    )
