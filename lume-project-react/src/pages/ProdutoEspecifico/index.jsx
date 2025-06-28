import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProdutoEspecifico.module.css';
import { listaDeProdutos } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProdutosItemsCompacto from '../../components/ProdutosItemsCompacto/';

function ProdutoEspecifico() {
    const { productId } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [activeTab, setActiveTab] = useState('avaliacoes');

    useEffect(() => {
        const foundProduct = listaDeProdutos.find(p => String(p.id) === String(productId));
        setProduct(foundProduct);

        if (foundProduct) {
            setMainImage(foundProduct.imageUrl);
            setQuantity(1);
            setActiveTab('avaliacoes');
        }
    }, [productId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product) {
        return <div className={styles.notFound}>Produto não encontrado ou carregando...</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        console.log(`Adicionado ${quantity}x "${product.productName}" ao carrinho.`);
    };

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const totalReviews = product.reviews?.length || 0;
    const relatedProductsList = listaDeProdutos.filter(p => product.relatedProducts?.includes(p.id) && p.id !== product.id);
    const ratingSummaryArray = Object.entries(product.ratingSummary || {}).sort((a, b) => b[0] - a[0]);
    const totalRatingCount = ratingSummaryArray.reduce((sum, [, count]) => sum + count, 0);

    return (
        <div className={styles.pageWrapper}>
            <section className={styles.produtoPrincipalContainer} aria-labelledby="product-title">
                <div className={styles.galeriaProduto}>
                    <div className={styles.imagemPrincipal}>
                        <img src={mainImage || product.imageUrl} alt={product.imageAlt} />
                    </div>
                    <ul className={styles.thumbnailsProduto}>
                        {(product.galleryImages || []).map((img, index) => (
                            <li key={index}>
                                <button onClick={() => handleThumbnailClick(img)} className={mainImage === img ? styles.thumbnailActive : ''}>
                                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.infoProduto}>
                    <h1 id="product-title">{product.productName}</h1>
                    <div className={styles.avaliacaoResumo}>
                        <span>★★★★☆</span> {/* Pode ser dinâmico com product.rating */}
                        <a href="#opinioes">({totalReviews} avaliações)</a>
                    </div>
                    <div className={styles.precoInfo}>
                        {product.originalPrice > product.currentPrice && <p className={styles.precoAntigo}>de R$ {product.originalPrice?.toFixed(2).replace('.', ',')}</p>}
                        <p className={styles.precoAtual}>R$ {product.currentPrice?.toFixed(2).replace('.', ',')}</p>
                        {product.installments && <p className={styles.parcelamento}>{product.installments}</p>}
                    </div>
                    <div className={styles.controleQuantidade}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <div className={styles.inputQuantidadeWrapper}>
                            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <input type="number" id="quantidade" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
                            <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                    </div>
                    <button type="button" onClick={handleAddToCart} className={styles.btnPrincipal}>Adicionar ao Carrinho</button>
                    <form className={styles.calculoFrete}>
                        <label htmlFor="cep">Calcular Frete:</label>
                        <input type="text" id="cep" placeholder="Digite seu CEP" />
                        <button type="submit">Calcular</button>
                    </form>
                </div>
            </section>

            <section className={styles.carrosselSection}>
                <h2>Produtos Relacionados</h2>
                <div className={styles.carrosselContainer}>
                    {relatedProductsList.map(p => <ProdutosItemsCompacto key={p.id} product={p} />)}
                </div>
            </section>

            <section id="detalhes-produto" className={styles.detalhesGrid}>
                <div className={styles.infoDetalhada}>
                    <article>
                        <h2>Descrição do Produto</h2>
                        <p>{product.description}</p>
                    </article>
                    <article>
                        <h2>Características</h2>
                        <ul>{(product.features || []).map((feature, index) => <li key={index}>{feature}</li>)}</ul>
                    </article>
                </div>
                <aside className={styles.infoVendedor}>
                    <h3>Vendido por</h3>
                    <p>{product.companyName}</p>
                    <button type="button" className={styles.btnPrincipal}>Ir para a página do vendedor</button>
                    <button type="button" className={styles.btnSecundario}>Fazer pergunta ao vendedor</button>
                </aside>
            </section>

            <section id="opinioes" className={styles.opinioesSection}>
                <h2>Opiniões sobre o Produto</h2>
                <div className={styles.resumoAvaliacoesGrid}>
                    <div className={styles.resumoGeral}>
                        <span className={styles.notaGeral}>{product.rating}</span>
                        <span>de 5</span>
                        <div className={styles.estrelasGeral}>★★★★★</div>
                        <p>{totalRatingCount} avaliações</p>
                    </div>
                    <div className={styles.barrasResumo}>
                        <ul>
                            {ratingSummaryArray.map(([stars, count]) => (
                                <li key={stars}>
                                    <span>{stars} Estrelas</span>
                                    <progress value={count} max={totalRatingCount}></progress>
                                    <span>{count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h3>Fotos e vídeos de clientes</h3>
                <div className={styles.midiaClientes}>
                    {(product.customerMedia || []).map((media, index) => <img key={index} src={media} alt={`Foto do cliente ${index + 1}`} />)}
                </div>

                <nav className={styles.abasOpinioes}>
                    <button onClick={() => setActiveTab('avaliacoes')} className={activeTab === 'avaliacoes' ? styles.abaAtiva : ''}>Avaliações ({totalReviews})</button>
                    <button onClick={() => setActiveTab('perguntas')} className={activeTab === 'perguntas' ? styles.abaAtiva : ''}>Perguntas (2)</button>
                </nav>

                <div className={styles.conteudoAbas}>
                    {activeTab === 'avaliacoes' && (
                        <div className={styles.listaAvaliacoes}>
                            {(product.reviews || []).map(review => (
                                <article key={review.id} className={styles.avaliacaoItem}>
                                    <header>
                                        <div className={styles.avaliacaoEstrelas}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                                        <time dateTime={review.date}>{review.date}</time>
                                    </header>
                                    <p className={styles.avaliacaoTitulo}>{review.title}</p>
                                    <footer>Por {review.author}</footer>
                                    <p className={styles.avaliacaoTexto}>{review.text}</p>
                                </article>
                            ))}
                            {totalReviews > 0 && <button className={styles.btnCarregarMais}>Carregar mais avaliações</button>}
                        </div>
                    )}
                    {activeTab === 'perguntas' && <div className={styles.listaPerguntas}><p>Nenhuma pergunta ainda.</p></div>}
                </div>
            </section>
        </div>
    );
}

export default ProdutoEspecifico;