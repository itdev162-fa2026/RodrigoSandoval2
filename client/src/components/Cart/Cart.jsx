import { useCart } from '../../App';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${getTotalItems()} items totaling $${getTotalPrice().toFixed(2)}`);
    // Here you would typically integrate with a payment processor
  };

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button 
            className="close-btn"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button 
                className="continue-shopping-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Items: {getTotalItems()}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total: ${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="clear-cart-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;