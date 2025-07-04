import { useState } from 'react';
import styles from './ContainerLogin.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import logoGoogle from '../../assets/img/logoGoogle.png';
import { Link } from 'react-router-dom';

export default function ContainerLogin({ email, setEmail, onAvancar }) {
    const [erroLocal, setErroLocal] = useState('');

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErroLocal(''); 

        if (!email.trim() || !validarEmail(email)) {
            setErroLocal('Por favor, insira um e-mail válido.');
            return;
        }
        
        onAvancar();
    };

    return (
        <section className={styles.loginPrincipal}>
            <Link to="/"><img src={logoLumeNova} alt="Logo Lume" className={styles.imgLogoLume} /></Link>
            <div className={styles.loginInitial}>
                <div className={styles.oneLine}>
                    <h1>Faça o seu <span className={styles.loginSpan}>login</span></h1>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputEmail}>
                            <label htmlFor="userEmail" className={styles.emailLabel}>E-mail:</label>
                            <input
                                id="userEmail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                            {erroLocal && <span className={styles.mensagemErro}>{erroLocal}</span>}
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.buttonStyle}>Continuar</button>
                        </div>
                    </form>

                    <div className={styles.lineDivision} />

                    <div className={styles.twoLine}>
                        <Link to="/cadastro" className={styles.styleAccont}>Criar conta</Link>
                        <span>ou</span>
                        <button type="button" className={styles.loginGoogle} onClick={() => alert('Login com Google não implementado')}>
                            <img src={logoGoogle} alt="Logo Google" className={styles.imgLogoGoogle} />
                            Fazer login com Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}