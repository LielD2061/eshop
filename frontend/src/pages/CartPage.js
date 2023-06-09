import { useContext } from "react";
import { Store } from "../store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/messageBox";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;

  const updateCarthandler = async (item, quantity) => {
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

  const removeItemhandler = async (item) => {
    ctxDispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  }

  const checkoutHandler = async () => {
    navigate("/signin?redirect=/shipping");
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your Cart is empty.
              {"   "}
              <Link to='/'>To Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      ></img>{" "}
                      <Link to={`/product/${item.token}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant='light'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCarthandler(item, item.quantity - 1)
                        }
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>
                      <Button
                        variant='light'
                        disabled={item.quantity === item.countinstock}
                        onClick={() =>
                          updateCarthandler(item, item.quantity + 1)
                        }
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button variant='light' onClick={() => removeItemhandler(item)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='primary'
                      disabled={cartItems.length === 0}
                      onClick={() => checkoutHandler()}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
