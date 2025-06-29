import styles from './ContainerInicial.module.css';
import ScrollToTopLink from '../../ui/ScrollToTopLink'

function ContainerEsquerda({ isMobile }) {
  return (
    <div className={styles.containerEsquerda}>
      <h1 className={styles.titulo}>
        {isMobile ? 'Luz para o meio ambiente' : <>Luz para o<br />meio<br />ambiente.</>}
      </h1>
      <div className={styles.containerEsquerdaTextoComBotao}>
        <p>Diversos brindes ao<br />adquirir pontos em<br />nosso marketplace!</p>
        <ScrollToTopLink to="/produtos" className={styles.comeceAComprar}>
          Comece a Comprar
        </ScrollToTopLink>
      </div>
    </div>
  );
}

export default ContainerEsquerda;
