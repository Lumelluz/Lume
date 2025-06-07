// Arquivo: ContainerDireita.jsx
import styles from './ContainerInicial.module.css'; // Usa o mesmo CSS
import CarrosselProdutos from './CarrosselProdutos'; // Importa o carrossel funcional
import BannerCampanha from './BannerCampanha'; // Seu componente de banner

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