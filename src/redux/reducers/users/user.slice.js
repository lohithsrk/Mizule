import { createSlice } from "@reduxjs/toolkit"

import { createUserReducer, logoutUserReducer, updateHistoryReducer } from './user.reducer';

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        createUser: createUserReducer,
        logoutUser: logoutUserReducer,
        updateHistory: updateHistoryReducer
    }
})

const { reducer, actions } = userSlice;

export const { createUser, logoutUser, updateHistory } = actions

export default reducer