import React from 'react';
import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

function App() {
	//состояние туду листа
	const [todos, setTodos] = useState([]);
	//состояния текста в инпуте
	const [text, setText] = useState('');
	//для добавления туду
	const addTodo = () => {
		if (text.trim().length) {
			setTodos([
				...todos,
				{ id: new Date().toISOString(), text, completed: false },
			]);
			setText('');
		}
	};
	//для удаления туду
	//установка значения нового списка дел, отфильтрованный предыдущий
	//все туду берутся и проверяется id. возвращает всё что неравно туду на который был клик
	const removeTodo = (todoId) => {
		setTodos(todos.filter((todo) => todo.id !== todoId));
	};
	//обработчик для checked
	//текущие туду мапим с условием если его id не равен нашему который мы получили из внешней функции
	//тогда будем его возвращать без изменений
	//то есть пробегаемся и ищем обьект на который нажали по id, если это не он, возвращаем его, иначе это он
	const toggleTodoComplete = (todoId) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id !== todoId) return todo;
				return {
					...todo,
					completed: !todo.completed,
				};
			})
		);
	};

	return (
		<div className="App">
			<InputField
				text={text}
				handleInput={setText}
				handleSubmit={addTodo}
			/>
			<TodoList
				todos={todos}
				toggleTodoComplete={toggleTodoComplete}
				removeTodo={removeTodo}
			/>
		</div>
	);
}

export default App;
