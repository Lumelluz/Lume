import React from 'react';
import styles from './ContainerCategoriasComFiltros.module.css';

// Estrutura de dados para as categorias (pode vir de props ou ser definida aqui)
const categoriasPrincipais = [
    {
        nome: 'Casa Sustentável',
        subcategorias: [
            'Casa e decoração',
            'Festas',
            'Produtos de limpeza ecológicos',
            'Itens de cozinha',
            'Composteiras domésticas',
            'Purificadores e filtros de água',
        ],
    },
    {
        nome: 'Moda Sustentável',
        subcategorias: [
            'Roupas ecológicas',
            'Calçados veganos',
            'Acessórios recicláveis ou biodegradáveis',
            'Bolsas e mochilas sustentáveis',
        ],
    },
    {
        nome: 'Comidas',
        // A imagem mostra "Veja nosso catálogo de alimentos!"
        // Podemos manter subcategorias ou um link para uma página de catálogo
        subcategorias: ['Vegano', 'Vegetariano', 'Bebidas', 'Lanche', 'Almoço/Janta'],
    },
];

const faixasDePreco = [
    { label: 'Até R$ 20,00', min: 0, max: 20 },
    { label: 'R$ 20 a R$ 100', min: 20, max: 100 },
    { label: 'Mais de R$ 100', min: 100, max: Infinity },
];

const ContainerCategoriasComFiltros = ({
    query,
    isModalView,
    filtrosAtivos, // Ex: { categoria: 'Roupas ecológicas', precoMin: 0, precoMax: 100 }
    onCategoriaChange, // Função para mudar a categoria
    onPrecoChange, // Função para mudar a faixa de preço
    onPrecoRangeChange, // Função para mudar o range min/max customizado
}) => {
    // Funções para lidar com cliques e mudanças de input
    const handleCategoriaClick = (categoria, subcategoria) => {
        // Lógica para tratar se é uma categoria principal ou subcategoria
        onCategoriaChange(subcategoria || categoria);
    };

    const handlePrecoClick = (faixa) => {
        onPrecoChange(faixa.min, faixa.max);
    };

    // Estados para os inputs de preço mínimo e máximo
    const [precoMinInput, setPrecoMinInput] = React.useState(filtrosAtivos?.precoMin || '');
    const [precoMaxInput, setPrecoMaxInput] = React.useState(filtrosAtivos?.precoMax || '');

    const handlePrecoMinChange = (e) => {
        setPrecoMinInput(e.target.value);
        // Chama onPrecoRangeChange com delay (debounce) ou ao perder foco para não sobrecarregar
    };

    const handlePrecoMaxChange = (e) => {
        setPrecoMaxInput(e.target.value);
    };

    // Função para aplicar o range de preço customizado
    const aplicarRangePreco = () => {
        const min = parseFloat(precoMinInput);
        const max = parseFloat(precoMaxInput);
        onPrecoRangeChange(isNaN(min) ? null : min, isNaN(max) ? null : max);
    }


    return (
        <aside className={`${styles.container} ${isModalView ? styles.modalView : ''}`}>
            {query && <h1 className={styles.resultadoPara}>Resultado para: "{query}"</h1>}

            <h2 className={styles.tituloSecao}>Categorias</h2>
            {categoriasPrincipais.map((catPrincipal) => (
                <div key={catPrincipal.nome} className={styles.grupoCategoria}>
                    {/* ALTERAÇÃO AQUI: Mudamos de <button> para <h3> */}
                    {/* Também removemos onClick e a lógica da classe 'ativo' para o título principal */}
                    <h3 className={styles.categoriaPrincipalTitulo}>
                        {catPrincipal.nome}
                    </h3>
                    {catPrincipal.subcategorias && (
                        <ul className={styles.listaSubcategoria}>
                            {catPrincipal.subcategorias.map((sub) => (
                                <li key={sub}>
                                    <button
                                        className={`${styles.itemSubcategoria} ${filtrosAtivos?.categoria === sub ? styles.ativo : ''}`}
                                        // O onClick agora só passa a subcategoria
                                        onClick={() => handleCategoriaClick(sub)}
                                    >
                                        {sub}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            <h2 className={styles.tituloSecao}>Preço</h2>
            {/* ... o resto do seu JSX para Preço continua igual ... */}
            <ul className={styles.listaPreco}>
                {faixasDePreco.map((faixa) => (
                    <li key={faixa.label}>
                        <button
                            className={`${(filtrosAtivos?.precoMin === faixa.min && filtrosAtivos?.precoMax === faixa.max) ? styles.ativo : ''}`}
                            onClick={() => handlePrecoClick(faixa)}
                        >
                            {faixa.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className={styles.rangePrecoContainer}>
                <input
                    type="number"
                    placeholder="Mínimo"
                    value={precoMinInput}
                    onChange={handlePrecoMinChange}
                    className={styles.inputPreco}
                />
                <span className={styles.divisorPreco}>-</span>
                <input
                    type="number"
                    placeholder="Máximo"
                    value={precoMaxInput}
                    onChange={handlePrecoMaxChange}
                    className={styles.inputPreco}
                />
                <button onClick={aplicarRangePreco} className={styles.btnAplicarPreco}>Ok</button>
            </div>
        </aside>
    );
};

export default ContainerCategoriasComFiltros;