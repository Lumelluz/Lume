import styles from '../FotosIntegrantes/FotosIntegrantes.module.css'
import Nicolas from '../../assets/img/Nicolas.png'
import Guilherme from '../../assets/img/Guilherme.png'
import Lorena from '../../assets/img/Lorena.png'
import Yuri from '../../assets/img/Yuri.png'
import Murilo from '../../assets/img/Murilo.png'
import Gustavo from '../../assets/img/Gustavo.png'
import Lucas from '../../assets/img/Lucas.png'

function FotosIntegrantes() {
    return (
        <section className={styles.secaoAgrupaFotos}>
            <div className={styles.coluna}>
                <div className={styles.cardIntegrantes}>
                    <img src={Nicolas} alt="foto do nicolas" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Nicolas Daniel</h2>
                        <p>Dev Full-Stack | Product Owner</p>
                    </div>
                </div>

                <div className={styles.cardIntegrantes}>
                    <img src={Guilherme} alt="Foto do guilherme" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Guilherme Marcilio</h2>
                        <p>Dev Full-Stack | UI/UX Designer</p>
                    </div>
                </div>

                <div className={styles.cardIntegrantes}>
                    <img src={Lorena} alt="Foto da Lorena" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Lorena Rosa</h2>
                        <p>Dev Front-End | Marketing</p>
                    </div>
                </div>

                <div className={styles.cardIntegrantes}>
                    <img src={Yuri} alt="Foto do Yuri" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Yuri Tito</h2>
                        <p>Dev Full-Stack | Banco de Dados</p>
                    </div>
                </div>
            </div>

            <div className={styles.coluna}>
                <div className={styles.cardIntegrantes}>
                    <img src={Murilo} alt="Foto do Murilo" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Murilo Macedo</h2>
                        <p>Dev Full-Stack | Scrum Master</p>
                    </div>
                </div>

                <div className={styles.cardIntegrantes}>
                    <img src={Gustavo} alt="Foto do Gustavo" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Gustavo Mandu</h2>
                        <p>Dev Full-Stack | UI/UX Designer</p>
                    </div>
                </div>

                <div className={styles.cardIntegrantes}>
                    <img src={Lucas} alt="Foto do Lucas" />
                    <div className={styles.textoIntegrantes}>
                        <h2>Lucas Liuti</h2>
                        <p>Dev Back-End | Financeiro</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FotosIntegrantes;