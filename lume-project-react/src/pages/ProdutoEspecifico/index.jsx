import styles from './ProdutoEspecifico.module.css';
import imagemProdutoEspecifico1 from '../../assets/img/imagemProdutoEspecifico1.png'
import imagemProdutoEspecifico2 from '../../assets/img/imagemProdutoEspecifico2.png'
import imagemProdutoEspecificoGrande from '../../assets/img/imagemProdutoEspecificoGrande.png'
import produtosImg from '../../assets/img/ProdutosItemsCompletosImg.png' 

function ProdutoEspecifico() {
    return (
        <>
            <section className={styles.produtoPrincipalContainer} aria-labelledby="product-title">

                <div className={styles.galeriaProduto}>
                    <div className={styles.imagemPrincipal}>
                        <img src={imagemProdutoEspecificoGrande} alt="Sabonete vegano em barra em uma embalagem verde e branca." />
                    </div>
                    <ul className={styles.thumbnailsProduto}>
                        <li><button><img src={imagemProdutoEspecifico1} alt="Vista frontal do sabonete." /></button></li>
                        <li><button><img src={imagemProdutoEspecifico1} alt="Sabonete e embalagem." /></button></li>
                        <li><button><img src={imagemProdutoEspecifico1} alt="Detalhe da textura do sabonete." /></button></li>
                        <li><button><img src={imagemProdutoEspecifico1} alt="Sabonete na mão." /></button></li>
                    </ul>
                </div>

                <div className={styles.infoProduto}>
                    <h1 id="product-title">Sabonete Vegano em Barra</h1>
                    <div className={styles.avaliacaoResumo}>
                        {/* Aqui iriam os ícones de estrela */}
                        <span>★★★★☆</span>
                        <a href="#opinioes">(12)</a>
                    </div>
                    <div className={styles.precoInfo}>
                        <p className={styles.precoAtual}>R$ 24,90</p>
                        <p className={styles.parcelamento}>ou 3x de R$ 8,30</p>
                    </div>
                    <div className={styles.controleQuantidade}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <button type="button" aria-label="Diminuir quantidade">-</button>
                        <input type="number" id="quantidade" defaultValue="1" min="1" />
                        <button type="button" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <button type="submit" className={styles.btnComprar}>Pagar agora</button>

                    <form className={styles.calculoFrete}>
                        <label htmlFor="cep">Calcular Frete:</label>
                        <input type="text" id="cep" placeholder="Digite seu CEP" />
                        <button type="submit">Calcular</button>
                    </form>
                    <a href="#detalhes-produto" className={styles.linkDescricao}>Ir para descrição e características do Produto</a>
                </div>
            </section>

            <section className={styles.carrosselProdutos} aria-labelledby="related-title-1">
                <h2 id="related-title-1">Produtos relacionados</h2>
                <div className={styles.carrosselContainer}>
                    <button className={`${styles.arrow} ${styles.prev}`} aria-label="Produto anterior">‹</button>
                    <ul>
                        <li>
                            <article className={styles.cardProduto}>
                                <img src={produtosImg} alt="Produto Sustentável similar" />
                                <h3>Produto Sustentável</h3>
                                <div className={styles.avaliacaoResumo}>★★★★☆</div>
                                <p className={styles.precoAntigo}>R$ 30,00</p>
                                <p className={styles.precoAtual}>R$ 24,90 <span className={styles.desconto}>20% OFF</span></p>
                                <p className={styles.parcelamento}>3x de R$ 8,30</p>
                                <p className={styles.descontoCliente}>Desconto para clientes Lumex</p>
                            </article>
                        </li>
                        <li>
                            <article className={styles.cardProduto}>
                                <img src={produtosImg} alt="Produto Sustentável similar" />
                                <h3>Produto Sustentável</h3>
                                <div className={styles.avaliacaoResumo}>★★★★☆</div>
                                <p className={styles.precoAntigo}>R$ 30,00</p>
                                <p className={styles.precoAtual}>R$ 24,90 <span className={styles.desconto}>20% OFF</span></p>
                                <p className={styles.parcelamento}>3x de R$ 8,30</p>
                                <p className={styles.descontoCliente}>Desconto para clientes Lumex</p>
                            </article>
                        </li>
                        <li>
                            <article className={styles.cardProduto}>
                                <img src={produtosImg} alt="Produto Sustentável similar" />
                                <h3>Produto Sustentável</h3>
                                <div className={styles.avaliacaoResumo}>★★★★☆</div>
                                <p className={styles.precoAntigo}>R$ 30,00</p>
                                <p className={styles.precoAtual}>R$ 24,90 <span className={styles.desconto}>20% OFF</span></p>
                                <p className={styles.parcelamento}>3x de R$ 8,30</p>
                                <p className={styles.descontoCliente}>Desconto para clientes Lumex</p>
                            </article>
                        </li>
                        <li>
                            <a href="#" className={styles.propaganda}>
                                <p>Propaganda?</p>
                            </a>
                        </li>
                    </ul>
                    <button className={`${styles.arrow} ${styles.next}`} aria-label="Próximo produto">›</button>
                </div>
            </section>

            <section id="detalhes-produto" className={styles.detalhesGrid}>
                <div className={styles.infoDetalhada}>
                    <article>
                        <h2>Descrição do Produto</h2>
                        <p>Ideal para limpeza do corpo sutil e abertura de caminhos. O Sabonete 7 ervas, além de promover uma limpeza no corpo físico, também age no campo espiritual, equilibrando as energias. Combinação entre si, as ervas podem ter diferentes funções, como limpar, energizar e acalmar. Nosso sabonete de 7 ervas contém arruda, camomila, manjericão e guiné...</p>
                        <p>Essa poderosa combinação de ervas, além de ter um aroma fresco e agradável, também estimula a mediunidade e a intuição, te ajudando a se conectar com seu lado mais profundo e espiritual. Além disso, o sabonete é enriquecido com óleos essenciais que hidratam e nutrem a pele, deixando-a macia, equilibrada e com a inveja, e abrir os caminhos.</p>
                    </article>

                    <article>
                        <h2>Características</h2>
                        <ul>
                            <li>Sabonete Vegano em Barra</li>
                            <li>Aroma Floral</li>
                            <li>Com óleos essenciais e extratos naturais</li>
                            <li>Benefícios sensoriais | corpo e rosto</li>
                            <li>Embalagem reciclável e biodegradável</li>
                            <li>Ø 6,5 x 3cm | aproximadamente 100g</li>
                        </ul>
                    </article>
                </div>

                <aside className={styles.infoVendedor}>
                    <h3>Vendido por</h3>
                    <p>NomeDaEmpresa</p>
                    <button type="button" className={styles.btnPrincipal}>Ir para a página do vendedor</button>
                    <button type="button" className={styles.btnSecundario}>Fazer pergunta para o vendedor</button>
                </aside>
            </section>

            <section id="opinioes" className={styles.opinioes} aria-labelledby="opinioes-title">
                <h2 id="opinioes-title">Opiniões sobre o Produto</h2>

                <div className={styles.resumoAvaliacoes}>
                    <ul>
                        <li>5 Estrelas <progress value="80" max="100" /> 28</li>
                        <li>4 Estrelas <progress value="10" max="100" /> 2</li>
                        <li>3 Estrelas <progress value="5" max="100" /> 1</li>
                        <li>2 Estrelas <progress value="0" max="100" /> 0</li>
                        <li>1 Estrela <progress value="0" max="100" /> 0</li>
                    </ul>
                </div>

                <div className={styles.midiaClientes}>
                    <ul>
                        <li><img src="placeholder-review-img.jpg" alt="Foto do produto por um cliente" /></li>
                        <li><img src="placeholder-review-img.jpg" alt="Foto do produto por um cliente" /></li>
                        <li><img src="placeholder-review-img.jpg" alt="Foto do produto por um cliente" /></li>
                    </ul>
                </div>

                <nav className={styles.abasOpinioes}>
                    <button type="button" role="tab" aria-selected="true">Avaliações (12)</button>
                    <button type="button" role="tab" aria-selected="false">Perguntas (2)</button>
                </nav>

                <div className={styles.listaAvaliacoes}>
                    <article className={styles.avaliacaoItem}>
                        <header>
                            <div className={styles.avaliacaoEstrelas}>★★★★★</div>
                            <time dateTime="2025-05-21">21/05/2025</time>
                        </header>
                        <p className={styles.avaliacaoTitulo}>Gostei muito!</p>
                        <p className={styles.avaliacaoTexto}>Era exatamente o que eu estava precisando.</p>
                    </article>
                    <article className={styles.avaliacaoItem}>
                        <header>
                            <div className={styles.avaliacaoEstrelas}>★★★★★</div>
                            <time dateTime="2025-05-21">21/05/2025</time>
                        </header>
                        <p className={styles.avaliacaoTitulo}>Gostei muito!</p>
                        <p className={styles.avaliacaoTexto}>Era exatamente o que eu estava precisando.</p>
                    </article>
                    <article className={styles.avaliacaoItem}>
                        <header>
                            <div className={styles.avaliacaoEstrelas}>★★★★★</div>
                            <time dateTime="2025-05-21">21/05/2025</time>
                        </header>
                        <p className={styles.avaliacaoTitulo}>Gostei muito!</p>
                        <p className={styles.avaliacaoTexto}>Era exatamente o que eu estava precisando.</p>
                    </article>
                </div>
                <button className={styles.btnCarregarMais}>Carregar mais avaliações</button>
            </section>

            <section className={styles.carrosselProdutos} aria-labelledby="suggestion-title">
                <h2 id="suggestion-title">Você também pode gostar de...</h2>
            </section>

            <section className={styles.carrosselProdutos} aria-labelledby="related-title-2">
                <h2 id="related-title-2">Produtos Relacionados</h2>
            </section>
        </>
    )
}

export default ProdutoEspecifico;