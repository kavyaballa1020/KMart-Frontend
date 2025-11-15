// src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8084/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const totalPrice = res.data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const enrichedCart = {
        ...res.data,
        totalPrice: totalPrice,
      };

      setCart(enrichedCart);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8084/api/cart/${userId}/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing product:', err);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `http://localhost:8084/api/cart/${userId}/update`,
        null,
        {
          params: {
            productId,
            quantity,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const updateQuantity = (productId, delta) => {
    const item = cart?.items?.find(item => item.productId === productId);
    if (item) {
      const newQuantity = (item.quantity || 1) + delta;
      if (newQuantity > 0) {
        handleQuantityChange(productId, newQuantity);
      }
    }
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  const subtotal = cart?.totalPrice || 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4"/>
            </svg>
            <h1>Shopping Cart</h1>
          </div>
          <p className="cart-subtitle">
            {cart?.items?.length > 0 
              ? `${cart.items.length} item${cart.items.length > 1 ? 's' : ''} in your cart`
              : 'Your cart is empty'
            }
          </p>
        </div>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="empty-cart">
            <svg className="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4"/>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Start shopping to add items to your cart</p>
            <button className="continue-shopping-btn">Continue Shopping</button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              {cart.items.map((item) => {
                const imageSrc =
                  item.imageData && item.imageType
                    ? `data:${item.imageType};base64,${item.imageData}`
                    : 'https://via.placeholder.com/120x120?text=Product';

                return (
                  <div key={item.productId} className="cart-item">
                    <div className="item-image">
                      <img src={imageSrc} alt={item.name || item.productName} />
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name || item.productName || 'Product'}</h3>
                      <p className="item-price">₹{(item.price || 0).toLocaleString('en-IN')} each</p>
                      
                      <div className="quantity-controls">
                        <span className="quantity-label">Quantity:</span>
                        <div className="quantity-wrapper">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.productId, -1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M5 12h14"/>
                            </svg>
                          </button>
                          <span className="quantity-display">{item.quantity || 1}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.productId, 1)}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M12 5v14M5 12h14"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="item-actions">
                      <p className="item-total">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.productId)}
                        title="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cart.items.reduce((acc, item) => acc + (item.quantity || 0), 0)} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button className="checkout-btn">Proceed to Checkout</button>
                <button className="continue-btn">Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
