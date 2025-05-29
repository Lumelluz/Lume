import styles from './Header.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import menuHamburguerBranco from '../../assets/icons/menuHamburguerBranco.svg';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <div className={`${styles.headerListItens} ${styles.headerListItens1}`}>
            <Link to="/"><img src={logoLumeNova} alt="Logo da Lume" className={styles.logo} /></Link>
            <img src={menuHamburguerBranco} alt="Menu de opções" className={styles.menuHamburguerMobile} role="button" aria-label="Abrir menu" tabIndex="0"/>
        </div>
    )
}

export default Logo;
