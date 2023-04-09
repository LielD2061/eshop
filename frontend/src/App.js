import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Store } from "./store";
import { useContext } from "react";
import CartPage from "./pages/CartPage";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allpage'>
        <header>
          <NavBar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <NavBar.Brand>eshop</NavBar.Brand>
              </LinkContainer>
              <nav className='ms-auto w-50 justify-content-end'>
                <Link to='/cart' className='nav-link'>
                  <i className='fas fa-shopping-cart text-white'></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </nav>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:token' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>ALL RIGHTS RESERVED</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
