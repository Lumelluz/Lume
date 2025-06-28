import styles from './ContainerInicial.module.css';
import CarrosselProdutos from './CarrosselProdutos';
import BannerCampanha from './BannerCampanha';

function ContainerDireita({ produtos }) {
  return (
    <div className={styles.containerDireita}>
      <div className={styles.containerDireitaTituloComProdutos}>
        <h2>Alguns de nossos produtos</h2>
        <CarrosselProdutos produtos={produtos} />
      </div>
      <BannerCampanha />
    </div>
  );
}

export default ContainerDireita;