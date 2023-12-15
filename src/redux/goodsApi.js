import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const goodsApi = createApi({
	//отображение в общем стори
	reducerPath: 'goodsApi',
	//для обновления после мутации
	//конкретизация сущностей с которыми работаем в рамках этого API. то есть имя сущности для АПИ
	tagTypes: ['Products'],
	//базовый запрос
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
	//поинты
	endpoints: (build) => ({
		//build обьек с встроенным методом
		//query({передать обьект, с чем работаю})
		getGoods: build.query({
			//функция будет возвращать гудс - это дополнение к базовому адресу
			query: (/*лимит, чтобы не все товарыф получать */ limit = '') =>
				//проверка, есть ли лимит, если есть, то передаём строку с лимитом который передаём парамтером
				//_limit служебн имя для лимита
				//после запроса будет кэширование которые хранится несколько минут
				`goods?${limit && `_limit=${limit}`}`,
			//уточнение с чем работаем. ProvidesTag в гугле и сюда
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'Products',
								id,
							})), //все эл результата(goods) и каждому добавляем тип(Products)
							{ type: 'Products', id: 'LIST' },
					  ]
					: [{ type: 'Products', id: 'LIST' }], //иначе пустой
		}),
		//новый поинт для добавления, для этого мутация нужна
		addProduct: build.mutation({
			query: (body) => ({
				//с каким урл работаем
				//запрост на саму сущность без уточнения
				url: 'goods',
				method: 'POST',
				body,
			}),
			//уточнить с чем работал для синхрона после изменения ключ invalidatesTags
			invalidatesTags: [{ type: 'Products', id: 'LIST' }], // то есть говорим что изменился список сущности, и тогда он заного запрос за продуктами делает
			//не надо делать синхрон состояний, оно живёт у нас на сервере и перерисовывает. Сервер как источник истины
		}),
	}),
});
//сделать деструктр и вытащить хуки
//use хук GetGoods наш запрос Query (без мутации )
//use хук AddProductMutation наш запрос mutation (с мутацией )
export const { useGetGoodsQuery, useAddProductMutation } = goodsApi;
