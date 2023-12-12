import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//API запрос
export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos', //имя в санка надо писать вручную
	async function () {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/todos'
		);
		const data = await response.json();
		return data;
	}
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload.text,
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
	extraReducers: {
		//динамический ключ с названием метода (pending - загрузка)
		//прелоадер например
		[fetchTodos.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		//успешно полученные данные
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'; //статус после загрузки
			state.todos = action.payload; //действие загрузить в тудушку массив из пейлоада
		},
		//ошибка
		[fetchTodos.rejected]: (state, action) => {},
	},
});

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions;
export default todoSlice.reducer;
