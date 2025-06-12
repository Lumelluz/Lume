import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import perfilIconBranco from '../../assets/icons/perfilIconBranco.svg';
import carrinhoIconBranco from '../../assets/icons/carrinhoIconBranco.svg';
import { useCart } from '../../context/CartContext';

function UserActions({ isLoggedIn }) {
  const { toggleCart, itemCount } = useCart();

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
          <Link to="/perfil" className={styles.linkPerfil}>
            <span>Acessar Perfil</span>
          </Link>
          <img src={perfilIconBranco} alt="Ícone do perfil" />
          <button onClick={toggleCart} className={styles.btnCarrinho}>
            <img src={carrinhoIconBranco} alt="Ícone do carrinho de compras" width={30} />
            {itemCount > 0 && <span className={styles.badgeCarrinho}>{itemCount}</span>}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserActions;
