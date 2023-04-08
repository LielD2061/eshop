import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "../components/rating";
import { Helmet } from "react-helmet-async";
import Loading from "../components/loading";
import MessageBox from "../components/messageBox";
import { getError } from "../utils";

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
                className='img-large'
                src={product.image}
                alt={product.name}
              ></img>
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
              </ListGroup>
              s
            </Col>
            <Col md={3}></Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
