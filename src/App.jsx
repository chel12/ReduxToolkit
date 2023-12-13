import React from 'react';
import './App.css';
import { useGetGoodsQuery } from './redux';

function App() {
	//хук при вызове будет возвращать обьект
	//произойдёт запрос к серверу за данными в baseUrl + query ('goods')
	const { data = [], isLoading } = useGetGoodsQuery();
	if (isLoading) return <h1>Loading...</h1>;
	return (
		<div className="App">
			<ul>
				{data.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
