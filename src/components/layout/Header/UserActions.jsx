import { Link } from 'react-router-dom';
import headerStyles from '../../layout/Header/Header.module.css';
import perfilIconBranco from '../../../assets/icons/perfilIconBranco.svg';
import carrinhoIconBranco from '../../../assets/icons/carrinhoIconBranco.svg';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

function UserActions({ onProfileClick }) {
  const { toggleCart, itemCount } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <div className={headerStyles.clubeComLoginRegistro}>
      <div className={headerStyles.headerListItens}>
        <Link to="/assinatura-lume-clientes" className={headerStyles.headerListItens3}>Clube de assinatura Lume+</Link>
      </div>
      {!isLoggedIn ? (
        <div className={headerStyles.loginRegistro}>
          <Link to='/login' className={headerStyles.loginRegistroLink}>Login</Link>
          <Link to='/cadastro' className={headerStyles.loginRegistroLink}>Registro</Link>
        </div>
      ) : (
        <div className={headerStyles.loginRegistro}>
          <button onClick={onProfileClick} className={headerStyles.linkPerfil} aria-label="Abrir menu do perfil">
            <img src={perfilIconBranco} alt="Ícone do perfil" />
            <p>Perfil</p>
          </button>
          
          <button onClick={toggleCart} className={headerStyles.btnCarrinho}>
            <img src={carrinhoIconBranco} alt="Ícone do carrinho de compras" width={30} />
            {itemCount > 0 && <span className={headerStyles.badgeCarrinho}>{itemCount}</span>}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserActions