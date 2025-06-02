import styles from '../CheckOutPagamento/check-out-pagamento.module.css'
import logoMastercard from '../../assets/img/logoMastercard.png'
import logoVisa from '../../assets/img/logoVisa.png'
import adicionarCartao from '../../assets/img/adicionarcartao.png'
import remover from '../../assets/img/remover.png'
import imgProduto from '../../assets/img/imgProduto.png'
import buttonRemover from '../../assets/img/buttonRemover.png'
import adicionarItems from '../../assets/img/adicionarItems.png'
import endereçoMais from '../../assets/img/endereçoMais.png'



function CheckOutPagamento () {
    return (
            <section className={styles.containerIniital}>
                    <div className={styles.divisionOne}>
                        <div className={styles.headerOne}>
                        <h1>Bem vindo ao checkout</h1>
                        <h2>Métodos de pagamento</h2>
                        </div>
                        <div className={styles.PagamentoPix}><span>Pagar com pix</span></div>
                        <div className={styles.pagamentoBoleto}><span>Pagar com boleto</span></div>
                        <div className={styles.methodDebito}><span>Cartão de debito</span></div>
                        <div className={styles.containerPagament}>
                            <span className={styles.cardDebito}>Cartão de debito</span>
                            <div className={styles.cardMastercard}>                         
                                <img src= {logoMastercard} alt="logoMastercard" className={styles.imgMaster}/> <span>Mastercard **** **** *** 5567
                                </span> 
                                <label>
                                    <input type="radio"
                                    name='cartao'
                                    value='Mastercard' /> 
                                </label>                          
                            </div>
                            <div className={styles.cardVisa}>
                                <img src={logoVisa} alt="logoVisa" /> <span>Visa**** **** **** 4562</span>
                                <label>
                                    <input type="radio"
                                    name='cartao'
                                    value='Visa'/> 
                                </label> 
                            </div>
                            <div className={styles.adicionarCard}>
                                <button><img src={adicionarCartao} alt="adicionarcartao" /></button>
                                <span>Adicionar cartão</span>                          
                            </div>
                        </div>
                    </div>
                    <div className={styles.divisionTwo}>
                        <div className={styles.secondColum}>
                            <div className={styles.tester}>
                                <h2 className={styles.itensProduto}>lista de itens</h2>
                                <div className={styles.centralizadorProduto}></div>
                                <div className={styles.backgoundProduto}> 
                                    <img src={imgProduto} alt="imgproduto" />
                                    <div className={styles.infoProduto}>
                                        <span>Kit 5 utensilios <br/>
                                            peças Ecokitchen</span> <span className={styles.preçoproduto}>R$23,56
                                        </span>                                 
                                    </div>
                                    <div className={styles.junção}>
                                        <div className={styles.grupButton}>
                                            <button className={styles.iconsAdd}>
                                                <img src={remover} alt="" />
                                            </button>         
                                            <button>                        
                                                <img src={adicionarItems} alt="" />
                                            </button>  
                                        </div>
                                    <span>Quantidade 1</span>    
                                    </div>
                                </div>
                                <div className={styles.produtoFinal}>
                                    <div className={styles.divisionGroupOne}>
                                        <h2>Detalhes de Pagamento</h2>
                                        <div className={styles.divisionGroupTwo}></div>
                                    </div>
                                    <div className={styles.produtoPreço}>
                                        <div className={styles.preçoTotal}>Preço total</div>
                                    </div>
                                        <div className={styles.endereço}>
                                            <span>Endereço:<span className={styles.endereçoRua}>Rua Lima campos, 748</span></span>
                                            <img src={endereçoMais} alt="maisopções" className={styles.imgEndereço} />
                                        </div>
                                        <button className={styles.pagarAgora}>Pagar agora</button>
                                        {/* <img src={endereçoMais} alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
    )
}
export default CheckOutPagamento
