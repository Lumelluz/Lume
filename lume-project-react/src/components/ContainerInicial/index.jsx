import styles from './ContainerInicial.module.css';
import { Link } from 'react-router-dom';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import gifVagalume from '../../assets/gifVagalume.gif';
import imagemProduto1 from '../../assets/img/imagemProduto1.png';
import imagemProduto2 from '../../assets/img/imagemProduto2.png';
import imagemProduto3 from '../../assets/img/imagemProduto3.png';
import imagemProduto4 from '../../assets/img/imagemProduto4.png';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';
import planteUmaArvore from '../../assets/img/planteUmaArvore.png';


function ContainerInicial() {
    return (
        <section className={styles.sectionQueAgrupaTodosOsElementos}>
            <div className={styles.containerEsquerda}>
                <h1>Luz para o<br />meio<br />ambiente</h1>
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
                            <figure className={styles.containerDireitaProdutosCarroselItem}>
                                <img src={imagemProduto1} alt="" />
                                <figcaption>Item 1</figcaption>
                            </figure>
                            <figure className={styles.containerDireitaProdutosCarroselItem}>
                                <img src={imagemProduto2} alt="" />
                                <figcaption>Item 2</figcaption>
                            </figure>
                            <figure className={styles.containerDireitaProdutosCarroselItem}>
                                <img src={imagemProduto3} alt="" />
                                <figcaption>Item 3</figcaption>
                            </figure>
                            <figure className={styles.containerDireitaProdutosCarroselItem}>
                                <img src={imagemProduto4} alt="" />
                                <figcaption>Item 4</figcaption>
                            </figure>
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