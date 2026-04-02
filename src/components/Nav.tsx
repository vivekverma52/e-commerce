
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Nav: React.FC = () => {
    const {totalItems} = useCart();
    const [cartopen, setcartopen] = useState(false);
    const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="logo-text">E-commerce</span>
          </Link>

          <div className="nav-actions">
            <button className="nav-home-btn" onClick={() => navigate('/')}>
              Home
            </button>
            <button className="cart-btn" onClick={() => setcartopen(true)} 
            aria-label="Open cart">
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && (
                <span className="cart-badge" 
                aria-label={`${totalItems} items in cart`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={cartopen} 
      onClose={() => setcartopen(false)} />
    </>
  );
};

export default Nav;