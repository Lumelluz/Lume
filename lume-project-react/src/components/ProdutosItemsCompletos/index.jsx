import styles from '../ProdutosItemsCompletos/ProdutosItemsCompletos.module.css'
import produtosImg from '../../assets/img/ProdutosItemsCompletosImg.png'

function ProdutosItemsCompletos({ produtosFiltrados }) {
    return (
        <ul className={styles.listaProdutos}>
            {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map(produto => (
                    <li key={produto.id} className={styles.produtoEspecifico}>
                        <img className={styles.produtoImagem} src={produtosImg} alt={produto.nome} />
                        <p>{produto.nome.length > 20 ? produto.nome.slice(0, 20) + '...' : produto.nome}</p>
                        <p>{`R$ ${(Number(produto.preco) ?? 0).toFixed(2)}`}</p>
                        <p>{`⭐ ${produto.avaliacao}`}</p>
                    </li>
                ))
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </ul>
    )
}

export default ProdutosItemsCompletos
