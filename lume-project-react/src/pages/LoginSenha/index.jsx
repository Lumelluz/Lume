import styles from '../LoginSenha/LoginSenha.module.css'
import logoLumeNova from '../../assets/img/logoLumeNova.svg'
import logoGoogle from '../../assets/img/logoGoogle.png'


function LoginSenha() {
    return (
            <div className={styles.loginPrincipal}>
              <img src={logoLumeNova} alt="logo lume" className={styles.imgLogoLume}/>
              <div className={styles.loginInitial}>
                <section className={styles.oneLine}>
                  <h1>Faça o seu <span className={styles.loginSpan}>login</span></h1>
                  <form>
                    <label htmlFor="password"> <span className={styles.emailSpan}>Senha :</span></label>
                    <div className={styles.inputEmail}>
                      <input type="password" placeholder='' id='userPassword' name='password' />
                    </div>
                    <button type="submit" className={styles.buttonStyle}>Iniciar sessão</button>
                  </form>
                  <div className={styles.lineDivision}></div>
                  <div className={styles.twoLine}>
                    <span className={styles.createAccont}><span className={styles.styleAccont}>Criar</span> conta</span>
                    <span>ou</span>
                    <button className={styles.loginGoogle}> <img src={logoGoogle} alt="logo Google" className={styles.imgLogoGoogle} />Fazer login com google</button>
                  </div>
                </section>
              </div>
            </div>

    )
}

export default LoginSenha