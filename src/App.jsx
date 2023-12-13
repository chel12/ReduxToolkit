import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, addTodo, fetchTodos } from './store/todoSlice';

function App() {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const { status, error } = useSelector((state) => state.todos);

	const handleAction = () => {
		if (text.trim().length) {
			dispatch(addNewTodo( text ));
			setText('');
		}
	};

	//ссанку для запроса
	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<div className="App">
			<InputField
				text={text}
				handleInput={setText}
				handleSubmit={handleAction}
			/>

			{status === 'loading' && <h2>Loading....</h2>}
			{error && <h2>An error occured: {error}</h2>}

			<TodoList />
		</div>
	);
}

export default App;
