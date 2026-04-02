import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = product ? cartItems.some(i => i.product.id === product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <main className="detail-page">
        <div className="detail-skeleton">
          <div className="skel-img" />
          <div className="skel-content">
            <div className="skel-line short" />
            <div className="skel-line long" style={{ height: 36 }} />
            <div className="skel-line medium" style={{ height: 28 }} />
            <div className="skel-line long" />
            <div className="skel-line long" />
            <div className="skel-line medium" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="detail-page">
        <div className="error-state">
          <span>🔍</span>
          <p>{error || 'Product not found.'}</p>
          <Link to="/" className="continue-shopping-btn">← Back to products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="back-btn">← Products</Link>
        <span>/</span>
        <span className="breadcrumb-category">{product.category.name}</span>
        <span>/</span>
        <span style={{ color: 'var(--text-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
          {product.title}
        </span>
      </nav>

      <div className="detail-content">
        <div className="detail-img-wrap">
          <span className="detail-category-badge">{product.category.name}</span>
          <img
            src={product.images[0]}
            alt={product.title}
            className="detail-img"
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-price">Rs{product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <button
            className={`add-to-cart-btn${added ? ' added' : inCart ? ' in-cart' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? '✓ Added' : inCart ? 'Add Again' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
