import styles from '../ContainerCadastrarEmpresa/ContainerCadastrarEmpresa.module.css'
import logoLumeNova from '../../assets/img/logoLumeNova.svg'
import { useState } from 'react'

function ContainerCadastrarEmpresa({ campos = [], dadosIniciais = {}, onAvancar, onVoltar, titulo }) {
    // Inicializa o estado com dadosIniciais ou vazio para cada campo
    const [formData, setFormData] = useState(() => {
        const initial = {}
        if (Array.isArray(campos)) {
            campos.forEach(({ name }) => {
                initial[name] = dadosIniciais[name] || ''
            })
        }
        return initial
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Validação poderia ser feita aqui
        onAvancar(formData)
    }

    return (
        <section className={styles.section_bg}>
            <div className={styles.container}>

                {/* Logo */}
                <div className={styles.logo}>
                    <img src={logoLumeNova} alt="Logo Lume" className={styles.logo_img} />
                </div>

                {/* Título principal */}
                <h1 className={styles.title}>
                    Cadastre sua empresa na <span className={styles.highlight}>Lume</span>
                </h1>

                {/* Formulário */}
                <div className={styles.form_wrapper}>
                    <h2 className={styles.form_title}>{titulo}</h2>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {campos.map(({ placeholder, type = 'text', name }) => {
                            const isTextarea = type === 'textarea'

                            return isTextarea ? (
                                <textarea
                                    key={name}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                    className={styles.input_field}
                                    required={placeholder.includes('*')}
                                    rows={4}
                                />

                            ) : (
                                <input
                                    key={name}
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                    className={styles.input_field}
                                    required={placeholder.includes('*')}
                                />

                            )
                        })}

                        <div className={styles.botoes}>
                            <button type="button" className={styles.btn_submit} onClick={onVoltar}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.btn_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                                Voltar
                            </button>

                            <button type="submit" className={styles.btn_submit}>
                                Avançar
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.btn_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContainerCadastrarEmpresa
