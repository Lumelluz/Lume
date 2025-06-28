import { Link } from 'react-router-dom';
import styles from './ParceriasCarrosel.module.css';
import vagalumeLaranja from '../../assets/img/vagalumeLaranja.png'
import globoLaranja from '../../assets/img/globoLaranja.png'
import reciclagemLaranja from '../../assets/img/reciclagemLaranja.png'
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';
import logoPontoNorteTransparente from '../../assets/img/logoPontoNorteTransparente.png'
import montanha from '../../assets/img/montanha.png'
import arvore from '../../assets/img/arvore.png'
import trilha from '../../assets/img/trilha.png'


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
                <img src={logoPontoNorteTransparente} alt="Logo da Lume" />
            </div>
            <div className={styles.containerParceiroMobile}>
              <h3 className={styles.parceiroTitulo}>
                Conheça mais
                <br />
                sobre a 
                <br />Ponto Norte!
              </h3>
              <div className={styles.parceriasCarroselDireita}>
                <div className={styles.parceriasCarroselDireitaImagens}>
                  <img src={montanha} alt="Imagem de uma montanha" />
                  <img src={arvore} alt="Imagem de uma árvore" />
                  <img src={trilha} alt="Imagem de uma trilha" />
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
