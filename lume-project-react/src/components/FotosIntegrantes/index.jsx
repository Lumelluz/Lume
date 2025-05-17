import styles from '../FotosIntegrantes/FotosIntegrantes.module.css'
import Nicolas from '../../assets/img/Nicolas.png'

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
            </div>

            <div>

            </div>
        </section>
    )
}

export default FotosIntegrantes;