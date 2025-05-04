import styles from './Header.module.css';
import instagramIcon from '../../assets/icons/instagramIcon.svg';
import carrinhoIcon from '../../assets/icons/carrinhoIcon.svg';
import sinoIcon from '../../assets/icons/sinoIcon.svg';
import duvidaIcon from '../../assets/icons/duvidaIcon.svg';
import globoIcon from '../../assets/icons/globoIcon.svg';
import perfilIcon from '../../assets/icons/perfilIcon.svg';
import logoLume from '../../assets/icons/logoLume.svg';
import menuHamburger from '../../assets/icons/menuHamburger.svg';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import darkModeIcon from '../../assets/icons/darkModeIcon.svg';
import bolaPontilhada from '../../assets/icons/bolaPontilhada.svg';

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>Central do Vendedor |</li>
                    <li> Vender na Lume |</li>
                    <li> Siga-nos no</li>
                    <li><img src={instagramIcon} /></li>
                </ul>
                
                <ul className={`${styles.navList} ${styles.navList2}`}>
                    <img src={bolaPontilhada} alt="" className={styles.bolaPontilhada}/>
                    <li><img src={carrinhoIcon} alt="" /></li>
                    <li><img src={sinoIcon} alt="" /></li>
                    <li><img src={duvidaIcon} alt="" /></li>
                    <li><img src={globoIcon} alt="" /></li>
                    <li><img src={perfilIcon} alt="" /></li>
                </ul>
            </nav>
            <ul className={styles.headerList}>
                <li className={`${styles.headerListItens} ${styles.headerListItens1}`}>
                    <img src={logoLume} alt="Logo Lume" className={styles.logo} />
                </li>
                <li className={`${styles.headerListItens} ${styles.headerListItens2}`}>
                    <input type="text" placeholder="PESQUISAR..." />
                    <img src={lupaIcon} alt="" />
                    <img src={darkModeIcon} alt="" />
                </li>
                <li className={`${styles.headerListItens} ${styles.headerListItens3}`}>Categorias<img src={menuHamburger}></img></li>
            </ul>
        </header>
    )
}

export default Header;