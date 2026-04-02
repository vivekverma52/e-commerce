import React from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { cartItems, totalPrice, totalItems, removeFromCart,  } = useCart();

     return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} 
      role="dialog" aria-label="Shopping cart">
        <div className="cart-header">
        <h2>Cart <span className="cart-count">({totalItems})</span></h2>
          <button className="cart-close" 
          onClick={onClose} 
          aria-label="Close cart">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛍️</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className="cart-items" role="list">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <img src={product.images[0]} alt={product.title}
                  className="cart-item-img" />
                  <div className="cart-item-info">
                   <p className="cart-item-title">{product.title}</p>
                  <p className="cart-item-meta">
                    <span className="cart-item-qty">×{quantity}</span>
                    <span className="cart-item-price">
                        Rs{(product.price * quantity).toFixed(2)}
                    </span>
                    </p>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.title} from cart`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-price">Rs{totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
