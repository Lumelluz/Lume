import { Link } from 'react-router-dom';
import styles from './ParceriasCarrosel.module.css';
import aguaNaCaixa from '../../assets/img/aguaNaCaixa.png';
import vagalumeSpriteLuminoso from '../../assets/img/vagalumeSpriteLuminoso.png';
import agua1 from '../../assets/img/agua1.png';
import agua2 from '../../assets/img/agua2.png';
import agua3 from '../../assets/img/agua3.png';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';

function ParceriasCarrosel() {
  return (
    <section className={styles.parcerias}>
      <h2>Nossos parceiro</h2>
      <div className={styles.parceriasCarroselComSetas}>
        <img src={setaEsquerda} alt="" />
        <div className={styles.parceriasCarrosel}>
          <div className={styles.parceriasCarroselComTexto}>
            <div className={styles.parceriasCarroselEsquerda}>
              <img src={vagalumeSpriteLuminoso} alt="vagalume" className={styles.vagalumeCarrosel} />
              <img src={aguaNaCaixa} alt="logoDaParceira" />
            </div>
            <h3>A melhor opção<br />para beber<br />
              água</h3>
          </div>
          <div className={styles.parceriasCarroselDireita}>
            <div className={styles.parceriasCarroselDireitaImagens}>
              <img src={agua1} alt="imagem1" />
              <img src={agua2} alt="imagem2" />
              <img src={agua3} alt="imagem3" />
            </div>
            <Link className={styles.botaoSaibaMais}>Saiba mais</Link>
          </div>
        </div>
        <img src={setaDireita} alt="" />
      </div>
    </section>
  )
}

export default ParceriasCarrosel;