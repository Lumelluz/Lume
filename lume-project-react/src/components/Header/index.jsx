import styles from './Header.module.css';
import instagramIcon from '../../assets/icons/instagramIcon.svg';
import carrinhoIcon from '../../assets/icons/carrinhoIcon.svg';
import sinoIcon from '../../assets/icons/sinoIcon.svg';
import duvidaIcon from '../../assets/icons/duvidaIcon.svg';
import globoIcon from '../../assets/icons/globoIcon.svg';
import perfilIcon from '../../assets/icons/perfilIcon.svg';
import logoLume from '../../assets/icons/logoLume.svg';
import logoLumeNova from '../../assets/icons/logoLumeNova.svg';
import logoLumeSemVagalume from '../../assets/icons/logoLumeSemVagalume.svg';
import gifVagalume from '../../assets/icons/gifVagalume.gif';
import menuHamburger from '../../assets/icons/menuHamburger.svg';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import darkModeIcon from '../../assets/icons/darkModeIcon.svg';
import bolaPontilhada from '../../assets/icons/bolaPontilhada.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <ul className={styles.headerList}>
                <li className={`${styles.headerListItens} ${styles.headerListItens1}`}>
                    <img src={logoLumeNova} alt="Logo Lume" className={styles.logo} />
                </li>
                <div className={styles.navComSearch}>
                    <li className={`${styles.headerListItens} ${styles.headerListItens2}`}>
                        <input type="text" placeholder="Pesquisar produtos, categorias, marcas..." />
                        <img src={lupaIcon} alt="" />
                    </li>
                    <nav className={styles.nav}>
                        <ul>
                            <li>Categorias</li>
                            <li>Ofertas</li>
                            <li>Cupons</li>
                            <li>Contato</li>
                            <li>Vender</li>
                            <li>Sobre</li>
                            <img src={globoIcon} alt="" />
                        </ul>
                    </nav>
                </div>
                <div className={styles.clubeComLoginRegistro}>
                    <li className={`${styles.headerListItens}`}><Link className={styles.headerListItens3}>Clube de assinatura Lume+</Link></li>
                    <div className={styles.loginRegistro}>
                        <li>Login</li>
                        <li>Registro</li>
                    </div>
                </div>
            </ul>

        </header>
    )
}

export default Header;