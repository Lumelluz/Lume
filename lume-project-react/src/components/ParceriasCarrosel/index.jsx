import { Link } from 'react-router-dom';
import styles from './ParceriasCarrosel.module.css';

function ParceriasCarrosel() {
  return (
    <section className={styles.parcerias}>
      <h2>Nossos parceiro</h2>
      <div className={styles.parceriasCarrosel}>
        <div className={styles.parceriasCarroselEsquerda}>
          <img src="" alt="vagalume" />
          <img src="" alt="logoDaParceira" />
          <h3>A melhor opção<br />para beber<br />
            água</h3>
        </div>
        <div className={styles.parceriasCarroselDireita}>
          <div className={styles.parceriasCarroselDireitaImagens}>
            <img src="" alt="imagem1" />
            <img src="" alt="imagem2" />
            <img src="" alt="imagem3" />
          </div>
          <Link>Saiba mais</Link>
        </div>
      </div>
    </section>
  )
}

export default ParceriasCarrosel;