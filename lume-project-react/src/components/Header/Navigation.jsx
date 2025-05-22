import styles from './Header.module.css';
import engrenagem from '../../assets/icons/engrenagem.svg';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className={styles.nav} aria-label="Menu de navegação principal">
            <ul>
                <li><Link to="/categorias" className={styles.linkNavigation}>Categorias</Link></li>
                <li><Link to="/ofertas" className={styles.linkNavigation}>Ofertas</Link></li>
                <li><Link to="/cupons" className={styles.linkNavigation}>Cupons</Link></li>
                <li><Link to="/contato" className={styles.linkNavigation}>Contato</Link></li>
                <li><Link to="/vender" className={styles.linkNavigation}>Vender</Link></li>
                <li><Link to="/sobre" className={styles.linkNavigation}>Sobre</Link></li>
                <li>
                    <button aria-label="Configurações">
                        <img src={engrenagem} alt="Ícone de engrenagem" />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
