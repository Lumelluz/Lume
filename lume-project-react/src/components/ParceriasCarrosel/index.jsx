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
    <section className={styles.parcerias} aria-label="Carrossel de parceiros">
      <h2>Nossos parceiros</h2>
      <div className={styles.parceriasCarroselComSetas}>
        <img
          src={setaEsquerda}
          alt=""
          role="button"
          tabIndex={0}
          aria-label="Seta para a esquerda"
          className={styles.seta}
        />
        <div className={styles.parceriasCarrosel}>
          <div className={styles.parceriasCarroselComTexto}>
            <div className={styles.parceriasCarroselEsquerda}>
              <div className={styles.vagalumeAbsolute}>
                <img
                  src={vagalumeSpriteLuminoso}
                  alt="Vagalume brilhando"
                  className={styles.vagalumeCarrosel}
                />
                <img src={aguaNaCaixa} alt="Logo da parceira Água na Caixa" />
              </div>
            </div>
            <div className={styles.containerParceiroMobile}>
              <h3 className={styles.parceiroTitulo}>
                A melhor opção
                <br />
                para beber
                <br />
                água
              </h3>
              <div className={styles.parceriasCarroselDireita}>
                <div className={styles.parceriasCarroselDireitaImagens}>
                  <img src={agua1} alt="Produto Água 1" />
                  <img src={agua2} alt="Produto Água 2" />
                  <img src={agua3} alt="Produto Água 3" />
                </div>
                <Link to="#" className={styles.botaoSaibaMais}>
                  Saiba mais
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img
          src={setaDireita}
          alt=""
          role="button"
          tabIndex={0}
          aria-label="Seta para a direita"
          className={styles.seta}
        />
      </div>
    </section>
  );
}

export default ParceriasCarrosel;
