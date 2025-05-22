import styles from './ContainerInicial.module.css';
import ProdutosItems from '../ProdutosItems';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';

function CarrosselProdutos({ produtos }) {
  return (
    <div className={styles.containerDireitaSetasCarrousel}>
      <img src={setaEsquerda} alt="Voltar ao produto anterior" />
      <div className={styles.containerDireitaProdutosCarrosel}>
        {produtos.map((produto, index) => (
          <ProdutosItems key={index} {...produto} />
        ))}
      </div>
      <img src={setaDireita} alt="Avançar para o próximo produto" />
    </div>
  );
}

export default CarrosselProdutos;
