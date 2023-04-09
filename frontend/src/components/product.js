import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Rating from "./rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../store";

function Product(props) {
  const { prod } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    debugger;
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${item._id}`);
    if (data.countinstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  console.log(prod);

  return (
    <Card className='product-card'>
      <div className='card-image-wrapper'>
        <Link to={`/product/${prod.token}`}>
          <img
            className='card-img-top card-image'
            src={prod.image}
            alt={prod.name}
          ></img>
        </Link>
      </div>
      <div>
        <Card.Body>
          <Link to={`/product/${prod.token}`}>
            <Card.Title>{prod.name}</Card.Title>
          </Link>
          <Card.Text>{prod.price}$</Card.Text>
          <Rating rating={prod.rating} numreviews={prod.numReviews}></Rating>
          {prod.countinstock === 0 ? (
            <Button variant='light' disabled>
              Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(prod)}>Add to Cart</Button>
          )}
        </Card.Body>
      </div>
    </Card>
  );
}

export default Product;
