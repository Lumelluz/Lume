import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Produtos.module.css';
import ContainerProdutos from '../../components/features/ContainerProdutos/';
import ContainerCategoriasComFiltros from '../../components/features/ContainerCategoriasComFiltros/';
import { useProducts } from '../../context/ProductContext';

function Produtos() {
    const location = useLocation();
    const params = new URLSearchParams(location?.search);
    const queryParam = params.get('q') || '';
    const sortParam = params.get('sort') || 'relevancia';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordenacao, setOrdenacao] = useState(sortParam); 

    const [filtros, setFiltros] = useState({
        query: queryParam,
        categoria: null,
        precoMin: null,
        precoMax: null,
    });

    useEffect(() => {
        setFiltros(prevFiltros => ({ ...prevFiltros, query: queryParam }));
        setOrdenacao(sortParam);
    }, [queryParam, sortParam]);


    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (isModalOpen) document.body.classList.add(styles.noScroll);
        else document.body.classList.remove(styles.noScroll);
        return () => document.body.classList.remove(styles.noScroll);
    }, [isModalOpen]);

    const { products } = useProducts();

    const handleCategoriaChange = (categoriaSelecionada) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            categoria: prevFiltros.categoria === categoriaSelecionada ? null : categoriaSelecionada,
        }));
    };

    const handlePrecoChange = (min, max) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            precoMin: (prevFiltros.precoMin === min && prevFiltros.precoMax === max) ? null : min,
            precoMax: (prevFiltros.precoMin === min && prevFiltros.precoMax === max) ? null : max,
        }));
    };

    const handlePrecoRangeChange = (min, max) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            precoMin: min,
            precoMax: max,
        }));
    };

    const produtosFiltrados = useMemo(() => {
        return [...products]
            .filter(produto => {
                const correspondeQuery = produto.productName.toLowerCase().includes(filtros.query.toLowerCase());
                const correspondeCategoria = filtros.categoria ? produto.categoria === filtros.categoria : true;
                const correspondePrecoMin = filtros.precoMin !== null ? produto.currentPrice >= filtros.precoMin : true;
                const correspondePrecoMax = filtros.precoMax !== null ? (filtros.precoMax === Infinity ? true : produto.currentPrice <= filtros.precoMax) : true;
                return correspondeQuery && correspondeCategoria && correspondePrecoMin && correspondePrecoMax;
            })
            .sort((a, b) => {
                switch (ordenacao) {
                    case 'menor-preco':
                        return a.currentPrice - b.currentPrice;
                    case 'maior-preco':
                        return b.currentPrice - a.currentPrice;
                    case 'mais-vendidos':
                        return b.sells - a.sells;
                    case 'melhor-avaliacao':
                        return b.rating - a.rating;
                    case 'novidades':
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    case 'nome-az':
                        return a.productName.localeCompare(b.productName);
                    case 'nome-za':
                        return b.productName.localeCompare(a.productName);
                    case 'maior-desconto':
                        return b.discountPercentage - a.discountPercentage;
                    case 'verificados-primeiro':
                        return b.isVerified - a.isVerified;
                    default: // 'relevancia' ou qualquer outro caso
                        return 0; // Não altera a ordem
                }
            });
    }, [filtros, ordenacao, products]);

    return (
        <>
            <div className={styles.conteudoPagina}>
                <button className={styles.btnAbrirFiltrosMobile} onClick={toggleModal}>
                    Filtros
                </button>
                <div className={styles.containerFiltrosDesktop}>
                    <ContainerCategoriasComFiltros
                        query={filtros.query}
                        isModalView={false}
                        filtrosAtivos={filtros}
                        onCategoriaChange={handleCategoriaChange}
                        onPrecoChange={handlePrecoChange}
                        onPrecoRangeChange={handlePrecoRangeChange}
                    />
                </div>
                <ContainerProdutos
                    ordenacao={ordenacao}
                    setOrdenacao={setOrdenacao}
                    produtosFiltrados={produtosFiltrados}
                />
            </div>
            {isModalOpen && (
                <div
                    className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}
                    onClick={toggleModal}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={toggleModal}>&times;</button>
                        <ContainerCategoriasComFiltros
                            query={filtros.query}
                            isModalView={true}
                            filtrosAtivos={filtros}
                            onCategoriaChange={handleCategoriaChange}
                            onPrecoChange={handlePrecoChange}
                            onPrecoRangeChange={handlePrecoRangeChange}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Produtos;
