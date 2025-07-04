import styles from './ContainerCadastrarEmpresa.module.css';
import logoLumeNova from '../../../assets/img/logoLumeNova.svg';

function ContainerCadastrarEmpresa({ campos = [], formData, onFormChange, onAvancar, onVoltar, titulo, isLoading }) {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAvancar();
    };

    return (
        <section className={styles.section_bg}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={logoLumeNova} alt="Logo Lume" className={styles.logo_img} />
                </div>
                <h1 className={styles.title}>
                    Cadastre sua empresa na <span className={styles.highlight}>Lume</span>
                </h1>
                <div className={styles.form_wrapper}>
                    <h2 className={styles.form_title}>{titulo}</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {campos.map(({ placeholder, type = 'text', name }) => {
                            const isTextarea = type === 'textarea';
                            return isTextarea ? (
                                <textarea
                                    key={name}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name] || ''}
                                    onChange={onFormChange}
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
                                    onChange={onFormChange}
                                    className={styles.input_field}
                                    required={placeholder.includes('*')}
                                />
                            );
                        })}
                        <div className={styles.botoes}>
                            <button type="button" className={styles.btn_submit} onClick={onVoltar} disabled={isLoading}>
                                Voltar
                            </button>
                            <button type="submit" className={styles.btn_submit} disabled={isLoading}>
                                {isLoading ? 'Aguarde...' : 'Avançar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContainerCadastrarEmpresa;
