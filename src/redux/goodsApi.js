import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const goodsApi = createApi({
	//отображение в общем стори
	reducerPath: 'goodsApi',
	//базовый запрос
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
	//поинты
	endpoints: (build) => ({
		//build обьек с встроенным методом
		//query({передать обьект, с чем работаю})
		getGoods: build.query({
			//функция будет возвращать гудс - это дополнение к базовому адресу
			query: () => `goods`,
		}),
	}),
});
//сделать деструктр и вытащить хуки 
//use хук GetGoods наш запрос Query (без мутации )
export const {useGetGoodsQuery}=goodsApi