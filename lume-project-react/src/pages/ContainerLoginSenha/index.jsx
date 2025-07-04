import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../ContainerLogin/ContainerLogin.module.css'; 
import logoLumeNova from '../../assets/img/logoLumeNova.svg';

export default function ContainerLoginSenha({ email, senha, setSenha, onVoltar, onLogin }) {
    const [erroLocal, setErroLocal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErroLocal('');

        if (!senha) {
            setErroLocal('Por favor, digite sua senha.');
            return;
        }
        onLogin(); 
    };

    return (
        <section className={styles.loginPrincipal}>
            <Link to="/"><img src={logoLumeNova} alt="Logo Lume" className={styles.imgLogoLume} /></Link>
            <div className={styles.loginInitial}>
                <div className={styles.oneLine}>
                    <h1>Olá! Digite sua <span className={styles.loginSpan}>senha</span></h1>
                    <p className={styles.emailIdentificado}>Logando como: <strong>{email}</strong></p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputEmail}>
                            <label htmlFor="userSenha" className={styles.emailLabel}>Senha:</label>
                            <input
                                id="userSenha"
                                type="password"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                autoFocus
                            />
                            {erroLocal && <span className={styles.mensagemErro}>{erroLocal}</span>}
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.buttonStyle}>Entrar</button>
                        </div>
                    </form>
                    <div className={styles.lineDivision} />
                    <div className={styles.twoLine}>
                        <button type="button" onClick={onVoltar} className={styles.linkVoltar}>
                            Voltar e trocar e-mail
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}