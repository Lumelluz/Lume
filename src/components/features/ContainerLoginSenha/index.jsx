import styles from './ContainerLoginSenha.module.css';
import logoGoogle from '../../../assets/img/logoGoogle.png';
import { useState } from 'react'

const ContainerLoginSenha = ({ email, onVoltar, onLogin }) => {
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(senha);
  };

  return (
    <section className={styles.loginPrincipal}>
      <div className={styles.loginInitial}>
        <h1>Faça o seu <span className={styles.loginSpan}>login</span></h1>
        <p className={styles.email}>E-mail: <strong>{email}</strong></p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputEmail}>
            <label htmlFor="userPassword">Senha:</label>
            <input type="password" id="userPassword" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className={styles.buttonStyle}>Iniciar sessão</button>
        </form>
        <button onClick={onVoltar} className={styles.voltarButton}>Voltar</button>
        <div className={styles.lineDivision} aria-hidden="true"></div>

        <div className={styles.twoLine}>
          <span className={styles.createAccont}>
            <span className={styles.styleAccont}>Criar</span> conta
          </span>
          <span>ou</span>

          <button className={styles.loginGoogle} type="button" aria-label="Fazer login com Google">
            <img
              src={logoGoogle}
              alt="Logo Google"
              className={styles.imgLogoGoogle}
              role="img"
            />
            Fazer login com Google
          </button>
        </div>
      </div>
    </section>

  );
};

export default ContainerLoginSenha;