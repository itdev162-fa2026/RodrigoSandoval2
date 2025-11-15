import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../App';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.currentStock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.currentStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product, quantity);
      // You could add a success message here
      setTimeout(() => setIsAdding(false), 500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setIsAdding(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const displayPrice = product.isOnSale ? product.salePrice : product.price;
  const hasDiscount = product.isOnSale && product.salePrice < product.price;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={product.name}
          />
          {hasDiscount && (
            <span className="sale-badge-large">SALE</span>
          )}
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <div className="product-detail-pricing">
            {hasDiscount && (
              <span className="original-price-large">${product.price.toFixed(2)}</span>
            )}
            <span className="current-price-large">${displayPrice.toFixed(2)}</span>
          </div>

          <div className="product-detail-stock">
            {product.currentStock > 0 ? (
              <span className="in-stock-large">✓ In Stock ({product.currentStock} available)</span>
            ) : (
              <span className="out-of-stock-large">✗ Out of Stock</span>
            )}
          </div>

          <div className="product-detail-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          {product.currentStock > 0 && (
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.currentStock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button 
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.currentStock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="add-to-cart-btn"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          )}

          <div className="product-detail-meta">
            <p><strong>Product ID:</strong> {product.id}</p>
            <p><strong>Added:</strong> {new Date(product.createdDate).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(product.lastUpdatedDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;