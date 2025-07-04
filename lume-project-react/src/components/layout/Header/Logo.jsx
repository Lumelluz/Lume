import { Link } from 'react-router-dom';
import logoLumeNova from '../../../assets/img/logoLumeNova.svg';
import menuHamburguerBranco from '../../../assets/icons/menuHamburguerBranco.svg';
import styles from './Header.module.css';

function Logo({ onMenuClick }) {
    return (
        <div className={`${styles.headerListItens} ${styles.headerListItens1}`}>
            <Link to="/"><img src={logoLumeNova} alt="Logo da Lume" className={styles.logo} /></Link>
            <button onClick={onMenuClick} className={styles.menuHamburguerMobile} aria-label="Abrir menu de navegação">
                <img src={menuHamburguerBranco} alt="Menu" />
            </button>
        </div>
    );
}

export default Logo;