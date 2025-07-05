import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProdutoEspecifico.module.css';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProdutosItemsCompacto from '../../components/features/ProdutosItemsCompacto/';

const ensureArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return String(data).split(',').map(item => item.trim());
};

const QuestionModal = ({ isOpen, onClose, productId, onQuestionPosted }) => {
    const [questionText, setQuestionText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!questionText.trim() || !token) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:8080/api/products/${productId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ questionText })
            });

            if (response.ok) {
                alert('Pergunta enviada com sucesso!');
                onQuestionPosted();
                setQuestionText('');
                onClose();
            } else {
                const errorText = await response.text();
                alert(`Erro ao enviar pergunta: ${errorText}`);
            }
        } catch (error) {
            alert('Erro de rede ao enviar pergunta.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.questionModalContent} onClick={e => e.stopPropagation()}>
                <h2>Faça sua pergunta</h2>
                <p>Sua pergunta será enviada ao vendedor e, se respondida, ficará visível para outros clientes.</p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Escreva sua pergunta aqui..."
                        rows="5"
                        required
                        className={styles.modalTextarea}
                    />
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.btnSecundario}>Cancelar</button>
                        <button type="submit" className={styles.btnPrincipal} disabled={isSubmitting}>
                            {isSubmitting ? 'A enviar...' : 'Enviar Pergunta'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AnswerForm = ({ questionId, onAnswerPosted }) => {
    const [answerText, setAnswerText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!answerText.trim() || !token) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:8080/api/questions/${questionId}/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ answerText })
            });

            if (response.ok) {
                onAnswerPosted();
            } else {
                alert('Erro ao enviar resposta.');
            }
        } catch (error) {
            alert('Erro de rede ao enviar resposta.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.answerForm}>
            <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Digite sua resposta aqui..."
                rows="3"
                required
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Responder'}
            </button>
        </form>
    );
};


function ProdutoEspecifico() {
    const { productId } = useParams();
    const { addToCart } = useCart();
    const { products } = useProducts();
    const { user, isLoggedIn } = useAuth();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [activeTab, setActiveTab] = useState('avaliacoes');
    const [displayThumbnails, setDisplayThumbnails] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

    const fetchQuestions = useCallback(async () => {
        if (!productId) return;
        try {
            const response = await fetch(`http://localhost:8080/api/products/${productId}/questions`);
            if (response.ok) {
                setQuestions(await response.json());
            }
        } catch (error) {
            console.error("Erro ao buscar perguntas:", error);
        }
    }, [productId]);

    useEffect(() => {
        if (!products || products.length === 0) return;
        const foundProduct = products.find(p => String(p.id) === String(productId));
        setProduct(foundProduct);

        if (foundProduct) {
            setMainImage(foundProduct.imageUrl);
            const allImages = [foundProduct.imageUrl, ...(ensureArray(foundProduct.galleryImages))].filter(Boolean);
            setDisplayThumbnails(allImages.slice(0, 4));
            setQuantity(1);
            setActiveTab('avaliacoes');
            fetchQuestions();
        }
    }, [productId, products, fetchQuestions]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);

    if (!product) {
        return <div className={styles.notFound}>Produto não encontrado ou carregando...</div>;
    }

    const handleAskQuestion = () => {
        if (!isLoggedIn) {
            alert("Você precisa estar logado para fazer uma pergunta.");
            return;
        }
        setIsQuestionModalOpen(true);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleThumbnailClick = (clickedImage, index) => {
        const previousMainImage = mainImage;
        setMainImage(clickedImage);
        const newThumbnails = [...displayThumbnails];
        newThumbnails[index] = previousMainImage;
        setDisplayThumbnails(newThumbnails);
    };

    const companyId = product.businessId;
    const isOwner = user?.id === product.ownerId;

    const featuresList = ensureArray(product.features);
    const totalReviews = ensureArray(product.reviews).length;
    const relatedProductsList = products.filter(p => ensureArray(product.relatedProducts).includes(p.id) && p.id !== product.id);
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
                        {displayThumbnails.map((img, index) => (
                            <li key={index}>
                                <button onClick={() => handleThumbnailClick(img, index)} className={mainImage === img ? styles.thumbnailActive : ''}>
                                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.infoProduto}>
                    <h1 id="product-title">{product.productName}</h1>
                    <div className={styles.avaliacaoResumo}>
                        <span className={styles.stars}>★★★★★</span>
                        <a href="#opinioes">(Avaliações)</a>
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

                </div>
            </section>

            <section className={styles.carrosselSection}>
                {relatedProductsList.length > 0 && <h2>Produtos Relacionados</h2>}
                <div className={styles.carrosselContainer}>
                    {relatedProductsList.map(p => (
                        <ProdutosItemsCompacto key={p.id} product={p} />
                    ))}
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
                        <ul>{featuresList.map((feature, index) => <li key={index}>{feature}</li>)}</ul>
                    </article>
                </div>
                <aside className={styles.infoVendedor}>
                    <h3>Vendido por</h3>
                    <p>{product.companyName}</p>
                    {companyId && <Link to={`/pagina-vendedor/${companyId}`} className={styles.btnPrincipal}>Ir para a página do vendedor</Link>}
                    <button type="button" onClick={handleAskQuestion} className={styles.btnSecundario}>Fazer pergunta ao vendedor</button>
                </aside>
            </section>

            <section id="opinioes" className={styles.opinioesSection}>
                <div className={styles.midiaClientes}>
                    {ensureArray(product.customerMedia).map((media, index) => <img key={index} src={media} alt={`Foto do cliente ${index + 1}`} />)}
                </div>

                <nav className={styles.abasOpinioes}>
                    <button onClick={() => setActiveTab('avaliacoes')} className={activeTab === 'avaliacoes' ? styles.abaAtiva : ''}>Avaliações ({totalReviews})</button>
                    <button onClick={() => setActiveTab('perguntas')} className={activeTab === 'perguntas' ? styles.abaAtiva : ''}>Perguntas ({questions.length})</button>
                </nav>

                <div className={styles.conteudoAbas}>
                    {activeTab === 'avaliacoes' && (
                        <div className={styles.listaAvaliacoes}>
                            {ensureArray(product.reviews).map(review => (
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
                            {totalReviews === 0 && <p>Este produto ainda não possui avaliações.</p>}
                            {totalReviews > 0 && <button className={styles.btnCarregarMais}>Carregar mais avaliações</button>}
                        </div>
                    )}
                    {activeTab === 'perguntas' && (
                        <div className={styles.listaPerguntas}>
                            {questions.length > 0 ? (
                                questions.map(q => (
                                    <article key={q.id} className={styles.perguntaItem}>
                                        <p className={styles.perguntaTexto}><strong>P:</strong> {q.questionText}</p>
                                        {q.answerText ? (
                                            <p className={styles.respostaTexto}><strong>R:</strong> {q.answerText}</p>
                                        ) : (
                                            isOwner && <AnswerForm questionId={q.id} onAnswerPosted={fetchQuestions} />
                                        )}
                                    </article>
                                ))
                            ) : (
                                <p>Nenhuma pergunta ainda. Seja o primeiro a perguntar!</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <QuestionModal
                isOpen={isQuestionModalOpen}
                onClose={() => setIsQuestionModalOpen(false)}
                productId={productId}
                onQuestionPosted={fetchQuestions}
            />
        </div>
    );
}

export default ProdutoEspecifico;
