import styles from './Header.module.css';
import engrenagem from '../../assets/icons/engrenagem.svg';
import { Link } from 'react-router-dom';

function Navigation({ onSettingsClick }) {
    return (
        <nav className={styles.nav} aria-label="Menu de navegação principal">
            <ul>
                <li><Link to="/produtos" className={styles.linkNavigation}>Categorias</Link></li>
                <li><Link to="/produtos" className={styles.linkNavigation}>Ofertas</Link></li>
                <li><Link to="/produtos" className={styles.linkNavigation}>Cupons</Link></li>
                <li><Link to="/fale-conosco" className={styles.linkNavigation}>Contato</Link></li>
                <li><Link to="/cadastrar-empresa" className={styles.linkNavigation}>Vender</Link></li>
                <li><Link to="/sobre-nos" className={styles.linkNavigation}>Sobre</Link></li>
                <li>
                    <button aria-label="Configurações" onClick={onSettingsClick}>
                        <img src={engrenagem} alt="Ícone de engrenagem" />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
