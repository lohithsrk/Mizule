import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers/root-reducer';

const persistConfig = {
	key: 'root',
	whitelist: ['user', 'zules'],
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	})
})
export const persistor = persistStore(store);

export default store;


