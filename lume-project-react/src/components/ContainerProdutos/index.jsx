import styles from '../ContainerProdutos/ContainerProdutos.module.css';
import ProdutosItemsCompletos from '../ProdutosItemsCompletos';

function ContainerProdutos({ ordenacao, setOrdenacao, produtosFiltrados }) {
    return (
        <section className={styles.container}>

            <select onChange={e => setOrdenacao(e.target.value)} value={ordenacao}>
                <option value="relevancia">Mais relevantes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="novidades">Mais recentes</option>
                <option value="mais-vendidos">Mais vendidos</option>
                <option value="melhor-avaliacao">Melhor avaliação</option>
            </select>

            <ProdutosItemsCompletos produtosFiltrados={produtosFiltrados}/>
            
        </section>
    );
}

export default ContainerProdutos;
