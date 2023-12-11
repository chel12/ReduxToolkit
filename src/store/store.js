import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export default configureStore({
	reducer: {
		todos: todoReducer, //1 имя как обращаться будет, 2 имя это непосредственно имя редьюсера
	},
});
//редьсюеры в тулките это слайсы
//тоолкит помогает не допустить мутабельность в этом помогает прокси разруливать
