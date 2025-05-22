import styles from './ContainerLogin.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import logoGoogle from '../../assets/img/logoGoogle.png';

export default function ContainerLogin({ email, setEmail, onAvancar }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        onAvancar();
    };

    return (
        <section className={styles.loginPrincipal} aria-label="Área de login">
            <img
                src={logoLumeNova}
                alt="Logo Lume"
                className={styles.imgLogoLume}
                aria-hidden="true"
            />
            <div className={styles.loginInitial}>
                <div className={styles.oneLine}>
                    <h1>
                        Faça o seu <span className={styles.loginSpan}>login</span>
                    </h1>

                    <form onSubmit={handleSubmit} aria-describedby="emailHelp">
                        <div className={styles.inputEmail}>
                            <label htmlFor="userEmail" className={styles.emailLabel}>
                                E-mail:
                            </label>
                            <input
                                id="userEmail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-required="true"
                                aria-describedby="emailHelp"
                            />
                            <span id="emailHelp" className={styles.emailSpan} hidden>
                                Insira seu endereço de e-mail para continuar
                            </span>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                type="submit"
                                className={styles.buttonStyle}
                                aria-label="Iniciar sessão com o e-mail informado"
                            >
                                Continuar
                            </button>
                        </div>
                    </form>

                    <div
                        className={styles.lineDivision}
                        role="separator"
                        aria-hidden="true"
                    />

                    <div className={styles.twoLine}>
                        <span className={styles.createAccont}>
                            <button
                                type="button"
                                className={styles.styleAccont}
                                aria-label="Criar conta"
                                onClick={() => alert('Funcionalidade criar conta não implementada')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    color: 'inherit',
                                    font: 'inherit',
                                }}
                            >
                                Criar
                            </button>{' '}
                            conta
                        </span>

                        <span>ou</span>

                        <button
                            type="button"
                            className={styles.loginGoogle}
                            aria-label="Fazer login com Google"
                            onClick={() => alert('Login com Google não implementado')}
                        >
                            <img
                                src={logoGoogle}
                                alt="Logo Google"
                                className={styles.imgLogoGoogle}
                                aria-hidden="true"
                            />
                            Fazer login com Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
