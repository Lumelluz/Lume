import styles from './ContainerLogin.module.css';
import logoGoogle from '../../../assets/img/logoGoogle.png';

const ContainerLogin = ({ email, setEmail, onAvancar }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        onAvancar();
    };
    return (
        <section className={styles.loginPrincipal}>
            <div className={styles.loginInitial}>
                <h1>Faça o seu <span className={styles.loginSpan}>login</span></h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputEmail}>
                        <label htmlFor="userEmail">E-mail:</label>
                        <input id="userEmail" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.buttonStyle}>Continuar</button>
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
        </section>
    );
};

export default ContainerLogin;