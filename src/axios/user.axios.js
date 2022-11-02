export const updateTeaserHistory = async (user_id, userHistory, id_zule, token, type) =>
    await axios.post(`${base_URL}/user/history`, { user_id, userHistory, id_zule, type }, { headers: { 'Authorization': `Bearer ${token}` } })
