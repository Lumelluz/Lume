import styles from '../Produtos/Produtos.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Produtos() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';

    const [ordenacao, setOrdenacao] = useState('relevancia');

    const produtosExemplo = [
        { id: 1, nome: 'Camiseta', preco: 50, avaliacao: 4.5, vendas: 120, data: '2024-05-01' },
        { id: 2, nome: 'Tênis', preco: 200, avaliacao: 4.8, vendas: 80, data: '2024-04-15' },
        { id: 3, nome: 'Boné', preco: 30, avaliacao: 4.2, vendas: 150, data: '2024-03-20' },
        { id: 4, nome: 'Calça', preco: 120, avaliacao: 4.7, vendas: 60, data: '2024-05-10' },
    ];

    const produtosFiltrados = produtosExemplo
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

    return (
        <section className={styles.container}>
            <h1>Resultado para: {query}</h1>

            <select onChange={e => setOrdenacao(e.target.value)} value={ordenacao}>
                <option value="relevancia">Mais relevantes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="novidades">Mais recentes</option>
                <option value="mais-vendidos">Mais vendidos</option>
                <option value="melhor-avaliacao">Melhor avaliação</option>
            </select>

            <ul>
                {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map(produto => (
                        <li key={produto.id}>
                            {produto.nome} - R${produto.preco} - ⭐ {produto.avaliacao}
                        </li>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </ul>
        </section>
    );
}

export default Produtos;
