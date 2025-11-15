import { useState, useEffect } from 'react';
import { getProducts, searchProducts } from '../services/api';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      // If search term is empty, fetch all products
      try {
        setIsSearching(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    try {
      setIsSearching(true);
      const data = await searchProducts(searchTerm);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to search products. Please try again later.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm('');
    try {
      setIsSearching(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No products available</h2>
        <p>Check back soon for new items!</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1>Our Products</h1>
      
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="search-btn"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            {searchTerm && (
              <button 
                type="button"
                onClick={handleClearSearch}
                disabled={isSearching}
                className="clear-btn"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;