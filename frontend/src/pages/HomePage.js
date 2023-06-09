import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/product";
import { Helmet } from "react-helmet-async";
import Loading from "../components/loading";
import MessageBox from "../components/messageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true };
    case "GET_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "GET_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    const getProd = async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const res = await axios.get("/api/v1/products");
        dispatch({ type: "GET_SUCCESS", payload: res.data });
        console.log(res.data)
      } catch (err) {
        dispatch({ type: "GET_FAILED", payload: getError(err) });
      }
    };

    getProd();
  }, []);

  return (
    <div>
      <Helmet>
        <title>EShop</title>
      </Helmet>
      <h1>Products</h1>
      <div className='products'>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((prod) => (
              <Col key={prod.token} lg={3} md={4} sm={6} className='mb-3'>
                <Product prod={prod} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
