import styles from './MaisInformacoes.module.css';
import maisInfo1 from '../../assets/img/maisInfo1.png';
import maisInfo2 from '../../assets/img/maisInfo2.png';
import { Link } from 'react-router-dom';

function MaisInformacoes() {
  return (
    <>
      <div className={styles.fundoDegrade}></div>

      <section className={styles.container}>
        <h2>Mais informações</h2>

        <div className={styles.conteudo}>

          <div className={styles.cadastrarEmpresa}>
            <h2>
              Cadastre sua<br />empresa!
            </h2>
            <Link to="/cadastrar-empresa" className={styles.linkCadastrar}>Cadastrar</Link>
          </div>

          <div className={styles.containerDireitaMaisInfo}>

            <div className={styles.info1}>
              <img src={maisInfo1} alt="Imagem de um entregador" />
              <div className={styles.info1Texto}>
                <h2>
                  Não se preocupe<br />com<br />entregas
                </h2>
                <p>
                  A <span className={styles.lumeNome}>Lume</span> já oferece serviço de<br />
                  entrega para seus clientes.<br />
                  Assim sua empresa não<br />precisa se preocupar!
                </p>
              </div>
            </div>

            <div className={styles.info2}>
              <img src={maisInfo2} alt="Imagem de um entregador" />
              <div className={styles.info2Texto}>
                <h2>
                  Sistemas de<br />pagamento<br />fornecido por<br />nosso<br />parceiro
                </h2>
              </div>
            </div>

            <div className={styles.cadastrarEmpresaMobile}>
              <h2>
                Cadastre sua<br />empresa!
              </h2>
              <Link to="/cadastrar-empresa" className={styles.linkCadastrar}>Cadastar</Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default MaisInformacoes;
