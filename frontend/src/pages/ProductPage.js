import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Rating from "../components/rating";
import { Helmet } from "react-helmet-async";
import Loading from "../components/loading";
import MessageBox from "../components/messageBox";
import { getError } from "../utils";
import Badge from "react-bootstrap/Badge";
import { Store } from "../store";
import Button from "react-bootstrap/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true };
    case "GET_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "GET_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  useEffect(() => {
    const getProd = async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const res = await axios.get(`/api/v1/product/token/${token}`);
        dispatch({ type: "GET_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "GET_FAILED", payload: getError(err) });
      }
    };

    getProd();
  }, [token]);

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countinstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    cxtDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    navigate("/cart");
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                src={product.image}
                alt={product.name}
                className='img-large'
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countinstock > 0 ? (
                            <Badge bg='success'>In Stock</Badge>
                          ) : (
                            <Badge bg='danger'>Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countinstock > 0 && (
                      <ListGroup.Item>
                        <div className='d-grid'>
                          <Button onClick={addToCartHandler} variant='primary'>
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
