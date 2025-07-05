import ContainerPerguntasFrequentes from '../../components/features/ContainerPerguntasFrequentes';
import styles from './PerguntasFrequentes.module.css';

function PerguntasFrequentes() {
  return (
    <main className={styles.container}>
      <section className={styles.faqSection}>
        <ContainerPerguntasFrequentes />
      </section>
    </main>
  );
}

export default PerguntasFrequentes;
