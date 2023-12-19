import React from 'react';
import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';


function App() {
	const dispatch = useDispatch();

	const addTask = () => {
		dispatch(addTodo({ text }));
		setText('');
	};

	const [text, setText] = useState('');

	return (
		<div className="App">
			<InputField
				text={text}
				handleInput={setText}
				handleSubmit={addTask}
			/>
			<TodoList />
		</div>
	);
}

export default App;

//redux persist - синхронизация с локал сторе, после обновы страницы чтобы не пропадала инфа
//кеширование в локал сторе
