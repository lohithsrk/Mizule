export const createUserReducer = (state, action) => action.payload

export const logoutUserReducer = (state) => null

export const updateHistoryReducer = (state, action) => {
    const { history, type } = action.payload
    return ({
        ...state, history: type === 'teaser' ? { ...state.history, teasers: history } : { ...state.history, zules: history }
    })
}