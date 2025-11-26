import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/api";
import "./Checkout.css";

function Checkout({ cartItems, cartTotal, clearCart }) {
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerEmail || cartItems.length === 0) {
      setError("Please provide an email and ensure cart is not empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const order = await createOrder(customerEmail, cartItems);
      clearCart();
      navigate(`/order/success?orderId=${order.id}`);
    } catch (err) {
      setError("Failed to create order. Please try again.");
      console.error("Order creation error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Checkout</h2>
        
        <div className="checkout-sections">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.product.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <div className="item-price">
                    ${(
                      (item.product.isOnSale ? item.product.salePrice : item.product.price) *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <strong>Total: ${cartTotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form-section">
            <h3>Customer Information</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className="checkout-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;