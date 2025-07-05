import { useNavigate } from 'react-router-dom';
import styles from './CartModal.module.css';
import { useCart } from '../../../context/CartContext';

const CartModal = () => {
  const { isCartOpen, toggleCart, cartItems, subtotal, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout-pagamento');
    toggleCart();
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className={`${styles.modalOverlay} ${isCartOpen ? styles.open : ''}`} onClick={toggleCart}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={toggleCart}>&times;</button>
        <h3 className={styles.modalTitle}>Meu Carrinho</h3>

        <div className={styles.cartItemsList}>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.productName} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.productName}</p>
                  <p className={styles.itemPrice}>
                    R$ {(item.currentPrice * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remover</button>
              </div>
            ))
          ) : (
            <p className={styles.emptyCartMessage}>Seu carrinho está vazio.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.cartSummary}>
            <div className={styles.subtotal}>
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Concluir Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
