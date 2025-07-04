import styles from './AssinaturaLumeClientes.module.css';
import iconVerde from '../../assets/icons/iconVerde.png';

function AssinaturaLumeClientes() {
    return (


        <div>

            <div className={styles['pagina-inteira']}>
                <h1 className={styles['titulo-lume-mais']}>
                    Conheça o <span className={styles['titulo-cor']}>Lume+</span>
                </h1>

                <div className={styles['planos-container']}>
                    <section className={styles['plano-lumezinho']}>
                        <h2 className={styles['h2-lume-mais']}>
                            <span className={styles['fundo-transparente']}>Lumezinho</span>
                        </h2>
                        <br />
                        <p className={styles['preco-lumezinho']}>
                            R$11,49 <span className={styles['mes']}>/mês</span>
                        </p>
                        <p className={styles['descricao']}>
                            Pequeno no nome, grande nas vantagens!<br />
                            O plano perfeito pra quem quer começar <br />
                            a viver de forma mais consciente, com <br />
                            benefícios que já fazem a diferença no <br />
                            seu carrinho
                        </p>
                        <br />
                        <ul className={styles['lista']}>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                1 cupom frete grátis
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                3 cupons de desconto, com até R$9,99 off
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                Acesso antecipado a promoções relâmpago (30m antes)
                            </li>
                        </ul>
                        <br />
                        <button className={styles['button-lumezinho']} onClick={() => alert("Funcionalidade indisponível no momento, estamos trabalhando nisso!")} type="button">Assinar Lumezinho</button>
                    </section>

                    <section className={styles['plano-lumezao']}>
                        <h2 className={styles['h2-lume-mais']}>
                            <span className={styles['fundo-transparente']}>Lumezão</span>
                        </h2>
                        <p className={styles['preco-lumezao']}>
                            R$14,99 <span className={styles['mes']}>/mês</span>
                        </p>
                        <p className={styles['descricao']}>
                            Se o Lumezinho já é bom, o Lumezão é tudo! <br />
                            Mais cupons, mais frete, mais tempo e mais <br />
                            vantagens pra quem quer abraçar o <br />
                            consumo consciente com força total.
                        </p>
                        <br />
                        <ul className={styles['lista']}>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                5 cupons de desconto, com até R$9,99 off
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                3 cupons frete grátis
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                Entrega em até 2 dias úteis (se viável logisticamente)
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                Acesso antecipado a promoções relâmpago (1h antes)
                            </li>
                            <li className={styles['li-lume-mais']}>
                                <img className={styles['icon']} src={iconVerde} alt="" />
                                Devolução de produtos estendidas (15d a mais que o normal)
                            </li>
                        </ul>
                        <button className={styles['button-lumezao']} onClick={() => alert("Funcionalidade indisponível no momento, estamos trabalhando nisso!")} type="button">
                            Assinar Lumezão
                        </button>
                    </section>
                </div>


            </div>
        </div>
    )
}

export default AssinaturaLumeClientes;