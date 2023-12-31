import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleStatus } from '../store/todoSlice';

const TodoItem = ({ id, completed, title }) => {
	const dispatch = useDispatch();

	return (
		<li key={id}>
			<input
				type="checkbox"
				checked={completed}
				onChange={() => dispatch(toggleStatus(id))}
			/>
			<span>{title}</span>
			<span
				className="delete"
				onClick={() => dispatch(deleteTodo({ id }))}>
				&#8722;
			</span>
		</li>
	);
};

export default TodoItem;
