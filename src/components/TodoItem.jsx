import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodoCompleted } from '../store/todoSlice';

const TodoItem = ({ id, completed, text }) => {
	const dispatch = useDispatch();

	return (
		<li key={id}>
			<input
				type="checkbox"
				checked={completed}
				onChange={() => dispatch(toggleTodoCompleted({ id }))}
			/>
			<span>{text}</span>
			<span
				className="delete"
				onClick={() => dispatch(removeTodo({ id }))}>
				&#8722;
			</span>
		</li>
	);
};

export default TodoItem;
