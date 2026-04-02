import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name A–Z' },
];

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const { products, loading, error } = useProducts(
    category === 'all' ? '' : category,
    sort,
    search
  );
  const categories = useCategories();

  const updateParam = useCallback((key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  }, [setSearchParams]);

  const handleCategoryToggle = (cat: string) => {
    updateParam('category', cat === category ? 'all' : cat);
  };

  return (
    <main className="home-page">
      <div className="filters-bar">
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={e => updateParam('search', e.target.value)}
            className="search-input"
            aria-label="Search products"
          />
        </div>

        <div className="filter-categories" role="group" aria-label="Filter by category">
          <button
            className={`cat-chip ${category === 'all' ? 'active' : ''}`}
            onClick={() => updateParam('category', '')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-chip ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={e => updateParam('sort', e.target.value)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="error-msg" role="alert">
          Failed to load products: {error}
        </div>
      )}

      {loading ? (
        <div className="grid-skeleton">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" aria-hidden="true" />
          ))}
        </div>
      ) : (
        <>
          <p className="results-count">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
          <div className="products-grid" role="list">
            {products.map(product => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {products.length === 0 && !loading && (
            <div className="no-results">
              <span>🔍</span>
              <p>No products match your filters.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
