import styles from '../ContainerCategoriasComFiltros/ContainerCategoriasComFiltros.module.css';

function ContainerCategoriasComFiltros({ query, ordenacao, setOrdenacao, produtosFiltrados }) {
    return (
        <section className={styles.container}>
            <h1>Resultado para: {query}</h1>
            <p>Esta seção pode conter filtros de categorias, como por exemplo:</p>
            <ul>
                <li>Categoria 1</li>
                <li>Categoria 2</li>
                <li>Categoria 3</li>
            </ul>
            <p>Você pode adicionar mais filtros conforme necessário.</p>
        </section>
    );
}

export default ContainerCategoriasComFiltros;