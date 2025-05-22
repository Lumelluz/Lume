import styles from './ContainerInicial.module.css';
import planteUmaArvore from '../../assets/img/planteUmaArvore.png';

function BannerCampanha() {
  return (
    <div className={styles.containerDireitaBannersCarrosel}>
      <img src={planteUmaArvore} alt="Banner da campanha: Plante uma árvore" />
    </div>
  );
}

export default BannerCampanha;
