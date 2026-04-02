import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id,
    title,
    price,
    images,
    category,
  } = product;

  const imageUrl = images?.[0] || '/placeholder.png';

  return (
    <article className="product-card">
      <Link to={`/product/${id}`}
        className="product-card-link"
        aria-label={`${title} details`}
      >
        <div className="product-img-wrap">
        <img
        src={imageUrl}
        alt={title}
        className="product-img"
        loading="lazy"
          />

          <div className="product-overlay">
            <span className="product-view-button">
              View Details
            </span>
          </div>
        </div>
        <div className="product-info">
          <span className="product-category">
            {category?.name || 'Unknown'}
          </span>

          <h3 className="product-title" 
          title={title}>
            {title}
          </h3>

          <div className="product-meta">
            <span className="product-price">
              ₹{price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default React.memo(ProductCard);