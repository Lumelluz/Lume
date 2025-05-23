import styles from '../CheckOutPagamento/check-out-pagamento.module.css'
import logoMastercard from '../../assets/img/logoMastercard.png'
import logoVisa from '../../assets/img/logoVisa.png'
import adicionarCartao from '../../assets/img/adicionarcartao.png'
import remover from '../../assets/img/remover.png'
import imgProduto from '../../assets/img/imgProduto.png'
import buttonRemover from '../../assets/img/buttonRemover.png'
import adicionarItems from '../../assets/img/adicionarItems.png'



function CheckOutPagamento () {
    return (
            <section className={styles.containerIniital}>
                <main>
                    <div className={styles.divisionOne}>
                        <div className={styles.headerOne}>
                        <h1>Bem vindo ao checkout</h1>
                        <h2>Métodos de pagamento</h2>
                        </div>
                        <div className={styles.PagamentoPix}><span>Pagar com pix</span></div>
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
                        <div className={styles.backgoundProduto}>
                            <h2>lista de itens</h2>
                            <div>
                                <img src={imgProduto} alt="imgproduto" /> <span>Kit utensilios 5 <br />peças Ecokitchen</span> <br /><span>R$23,56</span>
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
                        <h2>Detalhes de Pagamento</h2>
                        <div>Preço total</div>
                        <div><span>Endereço :</span></div>
                        <button>Pagar agora</button>
                    </div>
                </main>
            </section>
    )
}
export default CheckOutPagamento
