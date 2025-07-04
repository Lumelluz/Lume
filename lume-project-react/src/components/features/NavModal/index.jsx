import { Link } from 'react-router-dom';
import styles from '../../layout/Header/HeaderModals.module.css';
import logoLumeNova from '../../../assets/img/logoLumeNova.svg';
import engrenagem from '../../../assets/icons/engrenagem.svg';

export function NavModal({ isOpen, onClose, onSettingsClick }) {
    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent} ${styles.navModal}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <Link to="/" onClick={onClose}><img src={logoLumeNova} alt="Logo Lume" className={styles.modalLogo} /></Link>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Fechar menu">&times;</button>
                </div>
                <nav className={styles.modalNav}>
                    <ul>
                        <li><Link to="/produtos" onClick={onClose}>Categorias</Link></li>
                        <li><Link to="/produtos" onClick={onClose}>Ofertas</Link></li>
                        <li><Link to="/produtos" onClick={onClose}>Cupons</Link></li>
                        <li><Link to="/fale-conosco" onClick={onClose}>Contato</Link></li>
                        <li><Link to="/cadastrar-empresa" onClick={onClose}>Vender</Link></li>
                        <li><Link to="/sobre-nos" onClick={onClose}>Sobre</Link></li>
                        <li>
                            <button onClick={() => { onSettingsClick(); onClose(); }}>
                                <img src={engrenagem} alt="Ícone de engrenagem" />
                                <span>Configurações</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavModal;