import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
//persistStore обертка, persistReducer преобразовать редьюсеры для, принимает конфиг и редьюсеры
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	//комбайн  для редусов которые пойдут в персист
	todos: todoReducer,
});

//где хранить
const persistConfig = {
	key: 'root',
	storage, //стор
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	//теперь редьюсер описывается не здесь
	// reducer: {
	//	todos: todoReducer,
	// },
	//подготовление редьюсер на базе персиста
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});
//это нужно для того чтобы приложение могло работать с персистом как надо
export const persistor = persistStore(store);

export default store;
