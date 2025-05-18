import styles from './Footer.module.css';
import logoLumeNova from '../../assets/img/logoLumeNova.svg'
import logoInstagram from '../../assets/img/logoInstagram.png'
import logoGitHub from '../../assets/img/logoGitHub.png'
import logoLinkdln from '../../assets/img/logoLinkdln.png'


function Footer() {
    return (
        <section className={styles.container}>
            <div className={styles.conteudo}>
                <div className={styles.columOne}>
                    <div className={styles.columOneLogo}>
                    <img src={logoLumeNova} alt="logoLume" />
                    <p className={styles.suaLuz}>Sua luz faz a diferença</p>
                    </div>
                    <p className={styles.sigaNos}>Siga-nos</p>
                    <div className={styles.redesSociais}>
                        <a href="https://www.instagram.com/lumelluz/" target="_blank">
                            <img src={logoInstagram} alt="logo instagram" className={styles.imgInstagram} />
                        </a>
                        <a href="https://www.linkedin.com/company/lumelluz/" target="_blank">
                            <img src={logoLinkdln} alt="logo linkdln" className={styles.imgLinkdln} />
                        </a>
                        <a href="https://github.com/Lumelluz/Lume" target="_blank">
                            <img src={logoGitHub} alt="logo gitHub" className={styles.imgGitHub} />
                        </a>
                    </div>
                    <div className={styles.contornoIcons}></div>
                </div>
                <div className={styles.conjuntoColum}>
                    <div className={styles.columTwo}>
                        <h3>Sobre nós</h3>
                        <nav>
                            <ul>
                                <li><a href="#"> Quem somos</a></li>
                                <li><a href="#"> Nossa missão</a></li>
                                <li><a href="#"> Parcerias</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.columThree}>
                        <h3>Suporte</h3>
                        <nav>
                            <ul>
                                <li><a href="#">Perguntas frequentes</a></li>
                                <li><a href="#">Fale conosco</a></li>
                                <li><a href="#">Politicas de privacidade</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.columFour}>
                        <h3>Para empresa</h3>
                        <nav>
                            <ul>
                                <li><a href="#">Seja um parceiro</a></li>
                                <li><a href="#">Beneficios da lume</a></li>
                                <li><a href="#">Suporte para marcas</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
            </div>
                <p className={styles.copyright}>Todos os direitos reservados &copy; - 2025</p>
        </section>
    )
}

export default Footer;