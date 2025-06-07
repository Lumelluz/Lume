import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Produtos.module.css';
import ContainerProdutos from '../../components/ContainerProdutos/';
import ContainerCategoriasComFiltros from '../../components/ContainerCategoriasComFiltros/';

function Produtos() {
    const location = useLocation();
    const params = new URLSearchParams(location?.search);
    const queryParam = params.get('q') || '';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordenacao, setOrdenacao] = useState('relevancia');

    const [filtros, setFiltros] = useState({
        query: queryParam,
        categoria: null,
        precoMin: null,
        precoMax: null,
    });

    useEffect(() => {
        setFiltros(prevFiltros => ({ ...prevFiltros, query: queryParam }));
    }, [queryParam]);


    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (isModalOpen) document.body.classList.add(styles.noScroll);
        else document.body.classList.remove(styles.noScroll);
        return () => document.body.classList.remove(styles.noScroll);
    }, [isModalOpen]);

    const listaDeProdutos = [
        {
            id: 1,
            productName: 'Camiseta Orgânica Branca',
            companyName: 'EcoVest',
            isVerified: true,
            rating: 4.9,
            originalPrice: 99.90, // deve ser maior que currentPrice
            currentPrice: 89.90,
            discountPercentage: 10,
            sells: 50,
            date: '2025-06-03T12:00:00Z',
            imageUrl: 'https://placehold.co/300x300/9d4edd/ffffff?text=Camiseta',
            imageAlt: 'Camiseta Orgânica',
            installments: 'em 3x R$ 29,97',
            specialDiscount: '10% OFF na primeira compra',
            shippingInfo: 'gratuito',
            benefits: ['Algodão Orgânico', 'Sustentável'],
            categoria: 'Roupas ecológicas'
        },
        {
            id: 2,
            productName: 'Sabonete Artesanal de Lavanda',
            companyName: 'Aroma Natural',
            isVerified: true,
            rating: 4.7,
            // originalPrice: Omitir ou ter o valor igual ao currentPrice, para dessa forma não ter desconto.
            currentPrice: 19.50,
            discountPercentage: 0,
            sells: 150,
            date: '2025-05-20T12:00:00Z',
            imageUrl: 'https://placehold.co/300x300/4a69bd/ffffff?text=Sabonete',
            imageAlt: 'Sabonete de Lavanda',
            installments: null,
            specialDiscount: null,
            shippingInfo: 'R$ 5,00',
            benefits: ['Natural', 'Vegano'],
            categoria: 'Casa e decoração'
        },
        {
            id: 3,
            productName: 'Tênis Vegano Urbano',
            companyName: 'Pé Leve',
            isVerified: false,
            rating: 4.5,
            currentPrice: 249.00,
            discountPercentage: 0,
            sells: 25,
            date: '2025-04-10T12:00:00Z',
            imageUrl: 'https://placehold.co/300x300/5cb85c/ffffff?text=T%C3%AAnis',
            imageAlt: 'Tênis Vegano',
            installments: 'em 6x R$ 41,50',
            specialDiscount: null,
            shippingInfo: 'gratuito',
            benefits: ['Material Reciclado', 'Cruelty-free'],
            categoria: 'Calçados veganos'
        },
        {
            id: 4,
            productName: 'Kit Limpeza Ecológico Concentrado',
            companyName: 'Casa Limpa Verde',
            isVerified: true,
            rating: 5.0,
            originalPrice: 140.00,
            currentPrice: 120.00,
            discountPercentage: 14.28,
            sells: 70,
            date: '2025-06-01T12:00:00Z',
            imageUrl: 'https://placehold.co/300x300/f0ad4e/ffffff?text=Limpeza',
            imageAlt: 'Kit Limpeza Ecológico',
            installments: 'em 4x R$ 30,00',
            specialDiscount: null,
            shippingInfo: 'gratuito',
            benefits: ['Biodegradável', 'Rende Mais'],
            categoria: 'Produtos de limpeza ecológicos'
        },
        {
            id: 5,
            productName: 'Granola Artesanal Vegana',
            companyName: 'Sabor da Terra',
            isVerified: true,
            rating: 4.8,
            currentPrice: 25.00,
            discountPercentage: 0,
            sells: 200,
            date: '2025-06-10T10:00:00Z',
            imageUrl: 'https://placehold.co/300x300/d9534f/ffffff?text=Granola',
            imageAlt: 'Granola Vegana',
            installments: null,
            specialDiscount: null,
            shippingInfo: 'R$ 8,00',
            benefits: ['Sem glúten', 'Integral'],
            categoria: 'Vegano'
        }
    ];

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
        return listaDeProdutos
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
                        // Compara booleano
                        return b.isVerified - a.isVerified;

                    default: // 'relevancia' ou qualquer outro caso
                        return 0; // Não altera a ordem
                }
            });
    }, [filtros, ordenacao, listaDeProdutos]);

    return (
        <>
            <div className={styles.conteudoPagina}>
                <button className={styles.btnAbrirFiltrosMobile} onClick={toggleModal}>
                    Filtros
                </button>
                <div className={styles.containerFiltrosDesktop}>
                    <ContainerCategoriasComFiltros
                        query={filtros.query} // Passa a query do estado de filtros
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