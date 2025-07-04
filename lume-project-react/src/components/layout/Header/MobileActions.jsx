import perfilIconBranco from '../../../assets/icons/perfilIconBranco.svg';
import styles from './Header.module.css';

function MobileActions({ onProfileClick }) {
    return (
        <div className={styles.clubeComLoginRegistroMobile}>
            <button onClick={onProfileClick} aria-label="Abrir menu do utilizador">
                <img src={perfilIconBranco} alt="Ícone de perfil" />
            </button>
        </div>
    );
}

export default MobileActions;