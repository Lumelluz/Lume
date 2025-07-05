import { Link as RouterLink, useNavigate } from 'react-router-dom';
import modalStyles from '../../layout/Header/HeaderModals.module.css';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';

export function UserActionsModal({ isOpen, onClose }) {
    const { isLoggedIn, user, logout } = useAuth();
    const { toggleCart, itemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onClose();
        navigate('/');
    };

    const handleCartClick = () => {
        toggleCart();
        onClose();
    };

    const menuOptions = {
        ROLE_ADMIN: [
            { label: 'Painel do Administrador', path: '/admin-dashboard' },
            { label: 'Painel da Empresa', path: '/perfil-empresa' },
            { label: 'Meu Perfil', path: '/perfil' },
        ],
        ROLE_BUSINESS: [
            { label: 'Painel da Empresa', path: '/perfil-empresa' },
            { label: 'Meu Perfil', path: '/perfil' },
        ],
        ROLE_USER: [
            { label: 'Meu Perfil', path: '/perfil' },
        ]
    };

    const optionsToShow = isLoggedIn ? menuOptions[user?.role] || [] : [];

    return (
        <div className={`${modalStyles.modalOverlay} ${isOpen ? modalStyles.open : ''}`} onClick={onClose}>
            <div className={`${modalStyles.modalContent} ${modalStyles.userModal}`} onClick={(e) => e.stopPropagation()}>
                <div className={modalStyles.modalHeader}>
                    <h3>Menu</h3>
                    <button onClick={onClose} className={modalStyles.closeButton} aria-label="Fechar menu">&times;</button>
                </div>
                <nav className={modalStyles.modalNav}>
                    <ul>
                        {!isLoggedIn ? (
                            <>
                                <li><RouterLink to="/login" onClick={onClose}>Login</RouterLink></li>
                                <li><RouterLink to="/cadastro" onClick={onClose}>Registro</RouterLink></li>
                            </>
                        ) : (
                            <>
                                {optionsToShow.map(option => (
                                    <li key={option.path}>
                                        <RouterLink to={option.path} onClick={onClose}>{option.label}</RouterLink>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={handleCartClick} className={modalStyles.cartButton}>
                                        <span>Carrinho</span>
                                        {itemCount > 0 && <span className={modalStyles.badgeCarrinho}>{itemCount}</span>}
                                    </button>
                                </li>
                            </>
                        )}
                        <li><RouterLink to="/assinatura-lume-clientes" onClick={onClose}>Clube Lume+</RouterLink></li>
                        {isLoggedIn && (
                            <li><button onClick={handleLogout} className={modalStyles.logoutButton}>Sair</button></li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default UserActionsModal;