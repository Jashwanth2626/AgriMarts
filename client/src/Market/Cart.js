import React from 'react';
import './Market.css';

const Cart = ({ cartItems, handleAddQuantity, handleRemoveQuantity, handleRemoveFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
      </div>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
              <div className="cart-item-quantity">
                <button 
                  className="quantity-button"
                  onClick={() => handleRemoveQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-button"
                  onClick={() => handleAddQuantity(item.id)}
                >
                  +
                </button>
                <button 
                  className="quantity-button"
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-total">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-row" style={{ fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </div>
      )}

      {cartItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default Cart;
