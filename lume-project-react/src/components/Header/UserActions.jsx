import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import globoIcon from '../../assets/icons/globoIcon.svg';

function UserActions({ isLoggedIn }) {
    return (
        <div className={styles.clubeComLoginRegistro}>
            <div className={styles.headerListItens}>
                <Link to="/lumePlus" className={styles.headerListItens3}>Clube de assinatura Lume+</Link>
            </div>
            {!isLoggedIn ? (
                <div className={styles.loginRegistro}>
                    <Link to='/login' className={styles.loginRegistroLink}>Login</Link>
                    <Link to='/cadastro' className={styles.loginRegistroLink}>Registro</Link>
                </div>
            ) : (
                <div className={styles.loginRegistro}>
                    <Link to="/perfil">Acessar Perfil</Link>
                    <img src={globoIcon} alt="Ícone do perfil" />
                </div>
            )}
        </div>
    )
}

export default UserActions;
