import styles from './Header.module.css';
import globoIcon from '../../assets/icons/globoIcon.svg';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import { Link } from 'react-router-dom';
import engrenagem from '../../assets/icons/engrenagem.svg';
import perfilIconBranco from '../../assets/icons/perfilIconBranco.svg';
import menuHamburguerBranco from '../../assets/icons/menuHamburguerBranco.svg';

function Header({isLoggedIn, userName}) {

    return (
        <header className={styles.header}>
            <ul className={styles.headerList}>
                <li className={`${styles.headerListItens} ${styles.headerListItens1}`}>
                    <img src={logoLumeNova} alt="Logo da Lume" className={styles.logo} />
                    <img src={menuHamburguerBranco} alt="Menu de opções" className={styles.menuHamburguerMobile}/>
                </li>
                <div className={styles.navComSearch}>
                    <div className={`${styles.headerListItens} ${styles.headerListItens2}`}>
                        <input type="text" placeholder="Pesquisar produtos, categorias, marcas..." />
                        <img src={lupaIcon} alt="" />
                    </div>
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
                    <div className={`${styles.headerListItens}`}><Link className={styles.headerListItens3}>Clube de assinatura Lume+</Link></div>
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
                <div className={styles.clubeComLoginRegistroMobile}>
                    <img src={perfilIconBranco}/>
                </div>
            </ul>

        </header>
    )
}

export default Header;