import { createSlice } from '@reduxjs/toolkit';
const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload.text, //текст это - взять из экшена в полезной загрузке. что взять?  -{текст}
				completed: false,
			});
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload.id
			);
		},
		toggleTodoCompleted(state, action) {
			const toggledTodo = state.todos.find(
				(todo) => todo.id === action.payload.id
			);
			toggledTodo.completed = !toggledTodo.completed;
		},
	},
});

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions;
//чтобы юзать экшены. Нужно обратиться к слайсу.экшен
//экшены автоматом делаюются в тоолките
//нам нужно только деструктизировать их

//! Кроме этого нужно достать ещё редьюсер
export default todoSlice.reducer;
//в пейлоад приходит то что отдаём в фунукцию
