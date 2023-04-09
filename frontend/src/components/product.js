import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './rating';

function Product(props) {
	const { prod } = props;
	return (
		<Card className='product-card'>
			<div className='card-image-wrapper'>
			<Link to={`/product/${prod.token}`}>
				<img className='card-img-top card-image' src={prod.image} alt={prod.name}></img>
			</Link>
			</div>
			<div>
			<Card.Body>
				<Link to={`/product/${prod.token}`}>
					<Card.Title>{prod.name}</Card.Title>
				</Link>
				<Rating rating={prod.rating} numreviews={prod.numReviews}></Rating>
				<Card.Text>{prod.price}$</Card.Text>
				<Button>Add to Cart</Button>
			</Card.Body>
			</div>
		</Card>
	);
}

export default Product;
