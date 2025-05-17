import styles from './MaisInformacoes.module.css';
import maisInfo1 from '../../assets/img/maisInfo1.png';
import Container from './Container';

function MaisInformacoes() {
  return (
    <section className={styles.container}>
      <div className={styles.conteudo}>
        <div className={styles.partePrincipal}>
          <div>
            <h2 className={styles.sub}>Cadastre sua<br></br> empresa!</h2>
            <button>Cadastrar</button><img src={maisInfo1} alt="Imagem de um entregador" />
            <h2>Não se<br></br> preocupe com <br></br> entregas</h2>
            <p>A Lume já oferece serviço de <br></br>entrega parar seus clientes.<br></br>
              Assim sua empresa não<br></br> precisa se preocupar!</p>
            <Container></Container>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MaisInformacoes;