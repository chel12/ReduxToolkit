import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//API запрос
export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos', //имя в санка надо писать вручную
	async function (_, { rejectWithValue }) {
		//_ параметры переданные в вызове функц; {} опции которые нужны и есть 3 ещё аргумент
		//штобы ловить ошибку, берём
		// 1) try catch.
		// 2) если запрос не окей - тогда делаем новую ошибку с сообщением
		// 3) передать параметры в функцию асинк
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos?_limit=10'
			);

			if (!response.ok) {
				throw new Error('Server Error!');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			//ошибку сообщения ловим
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	'todo/deleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{ method: 'DELETE' }
			);
			
			if (!response.ok) {
				throw new Error('Can `t delete task. Server error.');
			}

			dispatch(removeTodo({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
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
	//новый синтаксис через билдер
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.todos = action.payload;
			})
			//обработка отловленной ошибки
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			});
	},

	//Старый синтаксис
	// extraReducers: {
	// 	//динамический ключ с названием метода (pending - загрузка)
	// 	//прелоадер например
	// 	[fetchTodos.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.error = null;
	// 	},
	// 	//успешно полученные данные
	// 	[fetchTodos.fulfilled]: (state, action) => {
	// 		state.status = 'resolved'; //статус после загрузки
	// 		state.todos = action.payload; //действие загрузить в тудушку массив из пейлоада
	// 	},
	// 	//ошибка
	// 	[fetchTodos.rejected]: (state, action) => {},
	// },
});

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions;
export default todoSlice.reducer;
