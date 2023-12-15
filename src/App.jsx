import React, { useState } from 'react';
import './App.css';
import { useGetGoodsQuery, useAddProductMutation } from './redux';

function App() {
	//строка для хука
	const [newProduct, setNewProduct] = useState('');
	const [count, setCount] = useState('');
	//хук при вызове будет возвращать обьект
	//произойдёт запрос к серверу за данными в baseUrl + query ('goods')
	//селект будет выбирать и сетать локал стор, а затем каунт после сета закидываем в хук
	const { data = [], isLoading } = useGetGoodsQuery(count);
	//хук,на мутацию не требует делать запрос сразу, а только при необходимости
	//произвольное имя и чет ещё
	const [addProduct, { isError }] = useAddProductMutation(); //асинхрон
	//функция для добавления
	const handleAddProduct = async () => {
		if (newProduct) {
			//вот тебе имя товара, которое юзер вбил, отправь запрос мутации в базу данных
			await addProduct({ name: newProduct }).unwrap(); //для корректной работы всех дополнительных пропсов(в данном случае{isError})
			setNewProduct(''); //очистка поля ввода
		}
	};

	if (isLoading) return <h1>Loading...</h1>;
	return (
		<div className="App">
			<div>
				<div>
					<input
						type="text"
						value={newProduct}
						onChange={(e) => setNewProduct(e.target.value)}
					/>
					<button onClick={handleAddProduct}>Add Product</button>
				</div>
				<select
					value={count}
					onChange={(e) => setCount(e.target.value)}
					name=""
					id="">
					<option value="''">all</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
			</div>
			<ul>
				{data.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
