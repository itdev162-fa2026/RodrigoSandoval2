import { useCart } from '../../App';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={decrementQuantity}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button 
            className="quantity-btn"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
        
        <button 
          className="remove-btn"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
      
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;