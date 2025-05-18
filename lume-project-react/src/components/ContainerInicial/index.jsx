import styles from './ContainerInicial.module.css';
import { Link } from 'react-router-dom';
import imagemProduto1 from '../../assets/img/imagemProduto1.png';
import imagemProduto2 from '../../assets/img/imagemProduto2.png';
import imagemProduto3 from '../../assets/img/imagemProduto3.png';
import imagemProduto4 from '../../assets/img/imagemProduto4.png';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';
import planteUmaArvore from '../../assets/img/planteUmaArvore.png';
import ProdutosItems from '../ProdutosItems';
import { useEffect, useState } from 'react';

function ContainerInicial() {
    let valorAntesDoDesconto = 79.90
    let precoProduto = 44.90
    let precoProdutoParcelado = 8.98
    let parcelas = 5
    let porcentagemDoDesconto = 37.50

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const verificarTela = () => {
            setIsMobile(window.innerWidth <= 1220);
        };

        verificarTela();
        window.addEventListener('resize', verificarTela);
        return () => window.removeEventListener('resize', verificarTela);
    }, []);

    return (
        <section className={styles.sectionQueAgrupaTodosOsElementos}>
            <div className={styles.containerEsquerda}>
                <h1 className={styles.titulo}>
                    {isMobile
                        ? 'Luz para o meio ambiente'
                        : <>
                            Luz para o<br />
                            meio<br />
                            ambiente.
                        </>
                    }
                </h1>
                <div className={styles.containerEsquerdaTextoComBotao}>
                    <p>Diversos brindes ao<br />adquirir pontos em<br />nosso marketplace!</p>
                    <Link className={styles.comeceAComprar}>Comece a Comprar</Link>
                </div>
            </div>
            {/* <div className={styles.produtosEParcerias}> */}
            <div className={styles.containerDireita}>
                <div className={styles.containerDireitaTituloComProdutos}>
                    <h2>Alguns de nossos produtos</h2>
                    <div className={styles.containerDireitaSetasCarrousel}>
                        <img src={setaEsquerda} alt="Seta apontando para a esquerda" />
                        <div className={styles.containerDireitaProdutosCarrosel}>
                            <ProdutosItems imagemProduto={imagemProduto1} nomeProduto={'Toalha de banho macia de algodão'} deDescontoPor={`${valorAntesDoDesconto.toFixed(2)}`} preco={`R$ ${precoProduto.toFixed(2)}`} off={`${porcentagemDoDesconto.toFixed(2)}% OFF`} parcelas={`em ${parcelas} x R$ ${precoProdutoParcelado.toFixed(2)}`} />

                            <ProdutosItems imagemProduto={imagemProduto2} nomeProduto={'Toalha de banho macia de algodão'} deDescontoPor={`${valorAntesDoDesconto.toFixed(2)}`} preco={`R$ ${precoProduto.toFixed(2)}`} off={`${porcentagemDoDesconto.toFixed(2)}% OFF`} parcelas={`em ${parcelas} x R$ ${precoProdutoParcelado.toFixed(2)}`} />

                            <ProdutosItems imagemProduto={imagemProduto3} nomeProduto={'Toalha de banho macia de algodão'} deDescontoPor={`${valorAntesDoDesconto.toFixed(2)}`} preco={`R$ ${precoProduto.toFixed(2)}`} off={`${porcentagemDoDesconto.toFixed(2)}% OFF`} parcelas={`em ${parcelas} x R$ ${precoProdutoParcelado.toFixed(2)}`} />

                            <ProdutosItems imagemProduto={imagemProduto4} nomeProduto={'Toalha de banho macia de algodão'} deDescontoPor={`${valorAntesDoDesconto.toFixed(2)}`} preco={`R$ ${precoProduto.toFixed(2)}`} off={`${porcentagemDoDesconto.toFixed(2)}% OFF`} parcelas={`em ${parcelas} x R$ ${precoProdutoParcelado.toFixed(2)}`} />
                        </div>
                        <img src={setaDireita} alt="Seta apontando para a direita" />
                    </div>
                </div>
                <div className={styles.containerDireitaBannersCarrosel}>
                    <img src={planteUmaArvore} alt="" />
                </div>
            </div>

        </section>
    )
}

export default ContainerInicial;