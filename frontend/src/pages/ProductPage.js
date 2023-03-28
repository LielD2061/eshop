import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_REQUEST':
			return { ...state, loading: true };
		case 'GET_SUCCESS':
			return { ...state, product: action.payload, loading: false };
		case 'GET_FAILED':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function ProductPage() {
	const params = useParams();
	const { token } = params;

	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
		product: [],
	});

	useEffect(() => {
		const getProd = async () => {
			dispatch({ type: 'GET_REQUEST' });

			try {
				const res = await axios.get(`/api/v1/product/token/${token}`);
				dispatch({ type: 'GET_SUCCESS', payload: res.data });
			} catch (err) {
				dispatch({ type: 'GET_FAILED', payload: err.message });
			}
		};

		getProd();
	}, [token]);

	return (
		<div>
			{loading ? (
				<h1>LOADING...</h1>
			) : error ? (
				<h1>{error}</h1>
			) : (
				<div>
					<Row>
						<Col md={6}>
							<img
								className='img-large'
								src={product.image}
								alt={product.name}></img>
						</Col>
						<Col md={3}></Col>
						<Col md={3}></Col>
					</Row>
				</div>
			)}
		</div>
	);
}

export default ProductPage;
