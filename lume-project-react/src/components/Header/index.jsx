import styles from './Header.module.css';
import globoIcon from '../../assets/icons/globoIcon.svg';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import { Link } from 'react-router-dom';
import engrenagem from '../../assets/icons/engrenagem.svg';

function Header({isLoggedIn, userName}) {


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
                            <img src={engrenagem} alt="" />
                        </ul>
                    </nav>
                </div>
                <div className={styles.clubeComLoginRegistro}>
                    <li className={`${styles.headerListItens}`}><Link className={styles.headerListItens3}>Clube de assinatura Lume+</Link></li>
                    {!isLoggedIn ? (
                        <div className={styles.loginRegistro}>
                            {console.log(isLoggedIn)}
                            <li>Login</li>
                            <li>Registro</li>
                        </div>
                    ) : (
                        <div className={styles.loginRegistro}>
                            <li><Link>Acessar Perfil </Link> <img src={globoIcon} alt="" /></li>
                        </div>
                    )}

                </div>
            </ul>

        </header>
    )
}

export default Header;