import ContainerPerguntasFrequentes from '../../components/ContainerPerguntasFrequentes';
import styles from './PerguntasFrequentes.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';

function PerguntasFrequentes() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img
          src={logoLumeNova}
          className={styles.logo}
          alt="Logo do Marketplace Lume Nova"
          loading="lazy"
        />
      </header>

      <section className={styles.faqSection}>
        <ContainerPerguntasFrequentes />
      </section>
    </main>
  );
}

export default PerguntasFrequentes;
