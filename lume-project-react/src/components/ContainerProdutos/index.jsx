import styles from './ContainerProdutos.module.css';
import ProdutosItemsCompletos2 from '../../components/ProdutosItemsCompletos2/';

function ContainerProdutos({ ordenacao, setOrdenacao, produtosFiltrados }) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <p>{produtosFiltrados.length} produtos encontrados</p>
        <select onChange={e => setOrdenacao(e.target.value)} value={ordenacao}>
          <option value="relevancia">Mais relevantes</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="novidades">Mais recentes</option>
          <option value="mais-vendidos">Mais vendidos</option>
          <option value="melhor-avaliacao">Melhor avaliação</option>
          <option value="maior-desconto">Maiores Descontos</option>
          <option value="nome-az">Nome (A-Z)</option>
          <option value="nome-za">Nome (Z-A)</option>
          <option value="verificados-primeiro">Verificados Primeiro</option>
        </select>
      </div>

      <div className={styles.gridProdutos}>
        {produtosFiltrados.map(produto => (
          <ProdutosItemsCompletos2 key={produto.id} product={produto} />
        ))}
      </div>
    </section>
  );
}

export default ContainerProdutos;