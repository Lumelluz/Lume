import styles from './ContainerInicial.module.css';
import { Link } from 'react-router-dom';

function ContainerEsquerda({ isMobile }) {
  return (
    <div className={styles.containerEsquerda}>
      <h1 className={styles.titulo}>
        {isMobile ? 'Luz para o meio ambiente' : <>Luz para o<br />meio<br />ambiente.</>}
      </h1>
      <div className={styles.containerEsquerdaTextoComBotao}>
        <p>Diversos brindes ao<br />adquirir pontos em<br />nosso marketplace!</p>
        <Link className={styles.comeceAComprar} to="/shop">
          Comece a Comprar
        </Link>
      </div>
    </div>
  );
}

export default ContainerEsquerda;
