export const fetchZulesReducer = (state, action) => [...state, ...action.payload]

export const likeZuleTeaserReducer = (state, action) => {
    const { activeIndex, id_user } = action.payload
    if (state[activeIndex].reviews.likes.includes(id_user)) {
        state[activeIndex].reviews = { comments: state[activeIndex].reviews.comments, likes: [...state[activeIndex].reviews.likes.filter(like => like !== id_user)] }
    } else {
        state[activeIndex].reviews = { comments: state[activeIndex].reviews.comments, likes: [...state[activeIndex].reviews.likes, id_user] }
    }
    return state
}