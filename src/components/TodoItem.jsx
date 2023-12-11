import React from 'react';

const TodoItem = ({ id, completed, text, toggleTodoComplete, removeTodo }) => {
	return (
		<li key={id}>
			{/* чтобы работал checked, нужно ещё добавить обработчик для этого onChange */}
			<input
				type="checkbox"
				checked={completed}
				onChange={() => {
					toggleTodoComplete(id);
				}}
			/>
			<span>{text}</span>
			<span
				className="delete"
				onClick={() => {
					removeTodo(id);
				}}>
				&#8722;
			</span>
		</li>
	);
};

export default TodoItem;
