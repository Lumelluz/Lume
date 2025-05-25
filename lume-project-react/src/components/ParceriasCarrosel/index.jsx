import { Link } from 'react-router-dom';
import styles from './ParceriasCarrosel.module.css';
import aguaNaCaixa from '../../assets/img/aguaNaCaixa.png';
import vagalumeSpriteLuminoso from '../../assets/img/vagalumeSpriteLuminoso.png';
import vagalumeLaranja from '../../assets/img/vagalumeLaranja.png'
import globoLaranja from '../../assets/img/globoLaranja.png'
import reciclagemLaranja from '../../assets/img/reciclagemLaranja.png'
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';
import logoLumeNova from '../../assets/img/logoLumeNova.svg'

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
                <img src={logoLumeNova} alt="Logo da parceira Água na Caixa" />
            </div>
            <div className={styles.containerParceiroMobile}>
              <h3 className={styles.parceiroTitulo}>
                Conheça mais
                <br />
                sobre a Lume!
              </h3>
              <div className={styles.parceriasCarroselDireita}>
                <div className={styles.parceriasCarroselDireitaImagens}>
                  <img src={vagalumeLaranja} alt="Produto Água 1" />
                  <img src={globoLaranja} alt="Produto Água 2" />
                  <img src={reciclagemLaranja} alt="Produto Água 3" />
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
