import ContainerPerguntasFrequentes from '../../components/ContainerPerguntasFrequentes';
import styles from './PerguntasFrequentes.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import { Link } from 'react-router-dom';

function PerguntasFrequentes() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link to="/"><img
          src={logoLumeNova}
          className={styles.logo}
          alt="Logo do Marketplace Lume Nova"
          loading="lazy"
        /></Link>
      </header>

      <section className={styles.faqSection}>
        <ContainerPerguntasFrequentes />
      </section>
    </main>
  );
}

export default PerguntasFrequentes;
