import logoLumeNova from '../../assets/img/logoLumeNova.svg'
import styles from '../CadastrarEmpresa/CadastrarEmpresa.module.css'

function CadastrarEmpresa() {
    return (
        <section className={styles.section_bg}>
            <p className>oi mundo</p>
            <div className={styles.container}>

                {/* <!-- Logo --> */}
                <div className={styles.logo}>
                    <img src={logoLumeNova} alt="Logo Lume" className={styles.logo_img} />
                </div>

                {/* <!-- Título principal --> */}
                <h1 className={styles.title}>
                    Cadastre sua empresa na <span className={styles.highlight}>Lume</span>
                </h1>

                {/* <!-- Formulário --> */}
                <div className={styles.form_wrapper}>
                    <h2 className={styles.form_title}>Dados da Empresa</h2>

                    <form className={styles.form}>
                        <input type="text" placeholder="Razão Social*" className={styles.input_field} />
                        <input type="text" placeholder="Nome Fantasia*" className={styles.input_field} />
                        <input type="text" placeholder="CNPJ*" className={styles.input_field} />
                        <input type="text" placeholder="Endereço Comercial*" className={styles.input_field} />
                        <input type="text" placeholder="Site ou Redes Sociais" className={styles.input_field} />

                        <button type="submit" className={styles.btn_submit}>
                            Avançar
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.btn_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </section>

    )
}

export default CadastrarEmpresa