import React from 'react';
import styles from '../ContainerLoginSenha/ContainerLoginSenha.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';
import logoGoogle from '../../assets/img/logoGoogle.png';

function ContainerLoginSenha({ onVoltar, email }) {
  return (
    <section className={styles.loginPrincipal} aria-label="Área de login com senha">
      <img
        src={logoLumeNova}
        alt="Logo Lume"
        className={styles.imgLogoLume}
        role="img"
      />

      <div className={styles.loginInitial}>
        <section className={styles.oneLine}>
          <h1>
            Faça o seu <span className={styles.loginSpan}>login</span>
          </h1>

          <p className={styles.email} aria-live="polite">
            E-mail: <strong>{email}</strong>
          </p>

          <form onSubmit={(e) => e.preventDefault()} aria-label="Formulário de login por senha">
            <div className={styles.inputEmail}>
              <label htmlFor="userPassword" className={styles.emailSpan}>
                Senha:
              </label>
              <input
                type="password"
                id="userPassword"
                name="password"
                placeholder="Digite sua senha"
                aria-required="true"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className={styles.buttonStyle}
            >
              Iniciar sessão
            </button>
          </form>

          <button
            onClick={onVoltar}
            className={styles.voltarButton}
            aria-label="Voltar para a tela anterior"
            type="button"
          >
            Voltar
          </button>

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
        </section>
      </div>
    </section>
  );
}

export default ContainerLoginSenha;
