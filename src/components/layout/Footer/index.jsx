import ScrollToTopLink from '../../ui/ScrollToTopLink'; 
import styles from './Footer.module.css';
import logoLumeNova from '../../../assets/img/logoLumeNova.svg';
import logoInstagram from '../../../assets/img/logoInstagram.png';
import logoGitHub from '../../../assets/img/logoGitHub.png';
import logoLinkdln from '../../../assets/img/logoLinkdln.png';

function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.conteudo}>
                <div className={styles.columOne}>
                    <div className={styles.columOneLogo}>
                        <ScrollToTopLink to="/"><img src={logoLumeNova} alt="Logo Lume Luz" /></ScrollToTopLink>
                        <p className={styles.suaLuz}>Sua luz faz a diferença</p>
                    </div>
                    <p className={styles.sigaNos}>Siga-nos</p>
                    <div className={styles.redesSociais}>
                        <a href="https://www.instagram.com/lumelluz/" target="_blank" rel="noopener noreferrer">
                            <img src={logoInstagram} alt="Instagram Lume Luz" className={styles.imgInstagram} />
                        </a>
                        <a href="https://www.linkedin.com/company/lumelluz/" target="_blank" rel="noopener noreferrer">
                            <img src={logoLinkdln} alt="ScrollToTopLinkedIn Lume Luz" className={styles.imgLinkdln} />
                        </a>
                        <a href="https://github.com/Lumelluz" target="_blank" rel="noopener noreferrer">
                            <img src={logoGitHub} alt="GitHub Lume Luz" className={styles.imgGitHub} />
                        </a>
                    </div>
                    <div className={styles.contornoIcons}></div>
                </div>
                <div className={styles.conjuntoColum}>
                    <div className={styles.columTwo}>
                        <h3>Sobre nós</h3>
                        <nav>
                            <ul>
                                <li><ScrollToTopLink to="/sobre-nos">Quem somos</ScrollToTopLink></li>
                                <li><a onClick={() => alert('Página indisponível no momento, estamos trabalhando nisso!')}>Nossa missão</a></li>
                                <li><a onClick={() => alert("Página indisponível no momento, estamos trabalhando nisso!")}>Parcerias</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.columThree}>
                        <h3>Suporte</h3>
                        <nav>
                            <ul>
                                <li><ScrollToTopLink to="/perguntas-frequentes">Perguntas frequentes</ScrollToTopLink></li>
                                <li><ScrollToTopLink to="/fale-conosco">Fale conosco</ScrollToTopLink></li>
                                <li><ScrollToTopLink to="/politicas-privacidade">Políticas de privacidade</ScrollToTopLink></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.columFour}>
                        <h3>Para empresa</h3>
                        <nav>
                            <ul>
                                <li><ScrollToTopLink to="/seja-parceiro">Seja um parceiro</ScrollToTopLink></li>
                                <li><a onClick={() => alert('Página indisponível no momento, estamos trabalhando nisso!')}>Benefícios da Lume</a></li>
                                <li><a onClick={() => alert('Página indisponível no momento, estamos trabalhando nisso!')}>Suporte para marcas</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <p className={styles.copyright}>Todos os direitos reservados &copy; - 2025</p>
        </footer>
    )
}

export default Footer;
