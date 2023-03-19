import data from '/home/devvm/Documents/dev/eshop/frontend/src/data.js';

function HomePage() {
  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {data.products.map((prod) => (
          <div key={prod.token} className="prod">
            <a href={`/product/${prod.token}`}>
              <img src={prod.image} alt={prod.name}></img>
            </a>
            <div className="prod-desc">
              <a href={`/product/${prod.token}`}>
                <p>{prod.name}</p>
              </a>
              <p>
                <strong>{prod.price}$</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
