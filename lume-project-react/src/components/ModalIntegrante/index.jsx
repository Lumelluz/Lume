import styles from './ModalIntegrante.module.css';

function ModalIntegrante({ open, onClose, nome, descricao }) {
    return (
        <div
          className={`${styles.modalOverlay} ${open ? styles.open : ''}`}
          onClick={onClose}
        >
            <div
              className={styles.modalContent}
              onClick={e => e.stopPropagation()} // impede o clique dentro do modal fechar
            >
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>{nome}</h2>
                <p>{descricao}</p>
            </div>
        </div>
    );
}

export default ModalIntegrante;
