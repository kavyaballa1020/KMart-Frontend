// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  // Get token and userId from localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // 🔁 make sure this is being stored on login

  useEffect(() => {
    axios
      .get('http://localhost:8083/api/products')
      .then((res) => {
        console.log('Fetched products:', res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `http://localhost:8084/api/cart/${userId}/add`,
        null,
        {
          params: {
            productId: productId,
            quantity: 1,
          },
          headers: {
            Authorization: token, // ✅ Token sent here
          },
        }
      );
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart!');
    }
  };

  return (
    <section className="product-list-page">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => {
              const imageSrc =
                product.imageData && product.imageType
                  ? `data:${product.imageType};base64,${product.imageData}`
                  : 'https://via.placeholder.com/250';

              return (
                <div key={product.id} className="product-card">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.price}</p>

                 <div className="button-group">
  <Link
    to={`/products/${product.id}`}
    className="view-details-btn"
  >
    View Details
  </Link>

  <button
    className="add-to-cart-btn"
    onClick={() => handleAddToCart(product.id)}
  >
    Add to Cart
  </button>
</div>

                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
