import { configureStore } from '@reduxjs/toolkit';
import { goodsApi } from './goodsApi';

export const store = configureStore({
	reducer: {
		//имя динамическое из ключа reducerPath
		//за счет createApi добавляется reducer и будет иметь ендпоинты
		[goodsApi.reducerPath]: goodsApi.reducer,
	},
	//логика которая выполняется в момент экшена до их выполнения
	//getDefaultMiddleware - по умолчанию
	//вызов создаст пустой массив
	//и туда concat() добавит ещё мидлвееры которые лежать в гудсАпи
	//их не создавали(RTKquery автоматом создаёт )
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(goodsApi.middleware),
});
