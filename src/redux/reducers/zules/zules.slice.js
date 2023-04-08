import { createSlice } from "@reduxjs/toolkit"

import { fetchZulesReducer, likeZuleTeaserReducer } from './zules.reducer'

const zulesSlice = createSlice({
    name: "zules",
    initialState: [],
    reducers: {
        fetchZules: fetchZulesReducer,
        likeZuleTeaser: likeZuleTeaserReducer,
    }
})

const { reducer, actions } = zulesSlice;

export const { fetchZules, likeZuleTeaser } = actions

export default reducer