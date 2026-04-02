import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-page-empty">
          <span>🛍️</span>
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <header className="cart-page-header">
        <h1>Your Cart <span>({totalItems} items)</span></h1>
        <Link to="/" className="continue-link">← Continue Shopping</Link>
      </header>

      <div className="cart-page-layout">
        <ul className="cart-page-items" role="list">
          {cartItems.map(({ product, quantity }) => (
            <li key={product.id} className="cart-page-item">
              <img src={product.images[0]} alt={product.title} className="cart-page-img" />
              <div className="cart-page-item-info">
                <Link to={`/product/${product.id}`} className="cart-page-item-title">
                  {product.title}
                </Link>
                <span className="cart-page-item-cat">{product.category.name}</span>
                <div className="cart-page-item-bottom">
                  <span className="cart-page-qty">Qty: {quantity}</span>
                  <span className="cart-page-subtotal">${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
              <button
                className="cart-page-remove"
                onClick={() => removeFromCart(product.id)}
                aria-label={`Remove ${product.title}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="checkout-btn-lg">Proceed to Checkout</button>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
