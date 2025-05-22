import styles from './Header.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import menuHamburguerBranco from '../../assets/icons/menuHamburguerBranco.svg';

function Logo() {
    return (
        <div className={`${styles.headerListItens} ${styles.headerListItens1}`}>
            <img src={logoLumeNova} alt="Logo da Lume" className={styles.logo} />
            <img src={menuHamburguerBranco} alt="Menu de opções" className={styles.menuHamburguerMobile} role="button" aria-label="Abrir menu" tabIndex="0"/>
        </div>
    )
}

export default Logo;
