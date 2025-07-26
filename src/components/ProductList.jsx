// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8083/api/products')
      .then((res) => {
        console.log('Fetched products:', res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

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
                  <Link
                    to={`/products/${product.id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
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
