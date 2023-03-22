import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_REQUEST':
			return { ...state, loading: true };
		case 'GET_SUCCESS':
			return { ...state, products: action.payload, loading: false };
		case 'GET_FAILED':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function HomePage() {
	const [{ loading, error, products }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
		products: [],
	});

	useEffect(() => {
		const getProd = async () => {
			dispatch({ type: 'GET_REQUEST' });

			try {
				const res = await axios.get('/api/v1/products');
				dispatch({ type: 'GET_SUCCESS', payload: res.data });
			} catch (err) {
				dispatch({ type: 'GET_FAILED', payload: err.message });
			}
		};

		getProd();
	}, []);

	return (
		<div>
			<h1>Products</h1>
			<div className='products'>
				{loading ? (
					<h1>LOADING...</h1>
				) : error ? (
					<h1>{error}</h1>
				) : (
					products.map((prod) => (
						<div key={prod.token} className='prod'>
							<a href={`/product/${prod.token}`}>
								<img src={prod.image} alt={prod.name}></img>
							</a>
							<div className='prod-desc'>
								<a href={`/product/${prod.token}`}>
									<p>{prod.name}</p>
								</a>
								<p>
									<strong>{prod.price}$</strong>
								</p>
								<button>Add to Cart</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default HomePage;
