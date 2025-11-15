import { useCart } from '../../App';
import './CartButton.css';

const CartButton = () => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  return (
    <button 
      className="cart-button"
      onClick={() => setIsCartOpen(true)}
    >
      🛒 Cart
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </button>
  );
};

export default CartButton;