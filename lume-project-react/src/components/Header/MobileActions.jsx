import styles from './Header.module.css';
import perfilIconBranco from '../../assets/icons/perfilIconBranco.svg';

function MobileActions() {
    return (
        <div className={styles.clubeComLoginRegistroMobile}>
            <button aria-label="Acessar perfil">
                <img src={perfilIconBranco} alt="Ícone de perfil" />
            </button>
        </div>
    )
}

export default MobileActions;
