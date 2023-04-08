import { combineReducers } from 'redux';
import userReducer from './users/user.slice';
import zulesReducer from './zules/zules.slice';

export const rootReducer = combineReducers({
    user: userReducer,
    zules: zulesReducer
});

