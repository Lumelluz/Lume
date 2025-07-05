import { useState } from 'react';
import styles from './CheckoutPagamento.module.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import logoMastercard from '../../assets/img/logoMastercard.png';
import logoVisa from '../../assets/img/logoVisa.png';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';

const ConfirmationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2>🎉 Sucesso! 🎉</h2>
                <p>{message}</p>
                <button onClick={onClose} className={styles.modalButton}>Fechar</button>
            </div>
        </div>
    );
};


function CheckoutPagamento() {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        subtotal,
        clearCart
    } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleFinalizePurchase = () => {
        if (cartItems.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const hasSoap = cartItems.some(item =>
            item.productName.toLowerCase().includes('sabonete')
        );

        if (hasSoap) {
            setModalMessage("Muito obrigado por comprar na Lume, você ganhou um brinde! Fale com um dos integrantes para obter seu sabonete!");
        } else {
            setModalMessage("Muito obrigado por comprar na Lume, você participou da validação do nosso MVP.");
        }
        setIsModalOpen(true);
    };

    const closeModalAndRedirect = () => {
        setIsModalOpen(false);
        navigate('/');
        clearCart();

    };

    return (
        <>
            <section className={styles.pageContainer}>
                <div className={styles.gridContainer}>
                    <div className={styles.paymentColumn}>
                        <Link to="/" className={styles.logoLink}>
                            <img src={logoLumeNova} alt="Logo Lume" className={styles.logoLume} />
                        </Link>
                        <h1 className={styles.title}>Finalizar Compra</h1>

                        <div className={styles.paymentSection}>
                            <h2>1. Endereço de Entrega</h2>
                            <div className={styles.addressBox}>
                                <p><strong>{user?.nomeCompleto}</strong></p>
                                <p>{user?.logradouro}, {user?.numero}</p>
                                <p>{user?.bairro}, {user?.cidade} - {user?.estado}</p>
                                <p>{user?.cep}</p>
                                <button className={styles.changeAddressButton}>Alterar Endereço</button>
                            </div>
                        </div>

                        <div className={styles.paymentSection}>
                            <h2>2. Método de Pagamento</h2>
                            <div className={styles.paymentOptions}>
                                <button
                                    className={`${styles.paymentOption} ${selectedPaymentMethod === 'pix' ? styles.active : ''}`}
                                    onClick={() => setSelectedPaymentMethod('pix')}>
                                    Pagar com Pix
                                </button>
                                <button
                                    className={`${styles.paymentOption} ${selectedPaymentMethod === 'boleto' ? styles.active : ''}`}
                                    onClick={() => setSelectedPaymentMethod('boleto')}>
                                    Pagar com Boleto
                                </button>
                                <button
                                    className={`${styles.paymentOption} ${selectedPaymentMethod === 'card' ? styles.active : ''}`}
                                    onClick={() => setSelectedPaymentMethod('card')}>
                                    Cartão de Crédito
                                </button>
                            </div>
                            {selectedPaymentMethod === 'card' && (
                                <div className={styles.cardDetails}>
                                    <div className={styles.savedCard}>
                                        <img src={logoMastercard} alt="Mastercard" />
                                        <span>Mastercard **** 5567</span>
                                        <input type="radio" name="savedCard" defaultChecked />
                                    </div>
                                    <div className={styles.savedCard}>
                                        <img src={logoVisa} alt="Visa" />
                                        <span>Visa **** 4562</span>
                                        <input type="radio" name="savedCard" />
                                    </div>
                                    <button className={styles.addCardButton}>
                                        <span>Adicionar novo cartão</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.summaryColumn}>
                        <div className={styles.summaryCard}>
                            <h2>Resumo do Pedido</h2>
                            <div className={styles.itemList}>
                                {cartItems.length > 0 ? cartItems.map(item => (
                                    <div key={item.id} className={styles.item}>
                                        <img src={item.imageUrl} alt={item.productName} className={styles.itemImage} />
                                        <div className={styles.itemDetails}>
                                            <p className={styles.itemName}>{item.productName}</p>
                                            <p className={styles.itemPrice}>R$ {item.currentPrice.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        <div className={styles.quantityControls}>
                                            <button onClick={() => decreaseQuantity(item.id)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className={styles.removeItemButton}>×</button>
                                    </div>
                                )) : (
                                    <p>Seu carrinho está vazio.</p>
                                )}
                            </div>
                            <div className={styles.summaryTotals}>
                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                    <span>Total</span>
                                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                            <button className={styles.payButton} onClick={handleFinalizePurchase}>
                                Pagar agora
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModalAndRedirect}
                message={modalMessage}
            />
        </>
    );
}

export default CheckoutPagamento;
