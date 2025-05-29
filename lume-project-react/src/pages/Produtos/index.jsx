import styles from '../Produtos/Produtos.module.css';
import ContainerProdutos from '../../components/ContainerProdutos/';
import ContainerCategoriasComFiltros from '../../components/ContainerCategoriasComFiltros/';
import { useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';

function Produtos() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';

    const [ordenacao, setOrdenacao] = useState('relevancia');

    const produtosExemplo = [
        { id: 1, nome: 'Produto Sustentável orgânico', empresa: 'Empresa1', avaliacao: 5, deDescontoPor: 49.90, preco: 30.90, parcelas: 3, lumePlus: 'Desconto para clientes Lume+', frete: 'gratuito', beneficios: 'Ecológico, biode...', vendas: 55, data: '2025-05-12' },
        { id: 2, nome: 'Toalha de banho', empresa: 'Empresa2', avaliacao: 3, deDescontoPor: 69.90, preco: 55.90, parcelas: 5, lumePlus: 'Desconto para clientes Lume+', frete: 'gratuito', beneficios: 'Ecológico, biode...', vendas: 95, data: '2025-05-12' },
        { id: 3, nome: 'Produto Sustentável orgânico', empresa: 'Empresa3', avaliacao: 5, deDescontoPor: 49.90, preco: 180, parcelas: 6, lumePlus: 'Desconto para clientes Lume+', frete: 'gratuito', beneficios: 'Ecológico, biode...', vendas: 12, data: '2025-05-12' },
        { id: 4, nome: 'Produto Sustentável orgânico', empresa: 'Empresa4', avaliacao: 5, deDescontoPor: 49.90, preco: 24.90, parcelas: 3, lumePlus: 'Desconto para clientes Lume+', frete: 'gratuito', beneficios: 'Ecológico, biode...', vendas: 50, data: '2025-05-12' },
    ];

    const produtosComDesconto = produtosExemplo.map(produto => ({
        ...produto,
        off: ((produto.deDescontoPor - produto.preco) / produto.deDescontoPor * 100).toFixed(2) + '%'
    }));

    // UseMemo para otimizar o filtro e ordenação
    const produtosFiltrados = useMemo(() => {
        return produtosComDesconto
            .filter(produto => produto.nome.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => {
                switch (ordenacao) {
                    case 'menor-preco': return a.preco - b.preco;
                    case 'maior-preco': return b.preco - a.preco;
                    case 'mais-vendidos': return b.vendas - a.vendas;
                    case 'melhor-avaliacao': return b.avaliacao - a.avaliacao;
                    case 'novidades': return new Date(b.data) - new Date(a.data);
                    default: return 0; // relevancia -> sem ordenação adicional
                }
            });
    }, [query, ordenacao]);

    return (
        <div className={styles.container}>
            {/* Passa dados e setOrdenacao para ContainerProdutos */}
            <ContainerProdutos
                ordenacao={ordenacao}
                setOrdenacao={setOrdenacao}
                produtosFiltrados={produtosFiltrados}
            />

            {/* Passa dados para ContainerCategoriasComFiltros (se precisar) */}
            <ContainerCategoriasComFiltros
                query={query}
                ordenacao={ordenacao}
                produtosFiltrados={produtosFiltrados}
            />
        </div>
    )
}

export default Produtos;
