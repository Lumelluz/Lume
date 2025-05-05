import styles from './SobreNos.module.css';
import mulherAndando from '../SobreNos/img/mulherAndando.png';
import linhaInicio from '../SobreNos/img/linhaInicio.svg';
import linhaMeio from '../SobreNos/img/linhaMeio.svg';
import linhaFim from '../SobreNos/img/linhaFim.svg';

function SobreNos() {
    return (
        <section className={styles.sobreNos}>
            <div className={styles.sobreNosTexto}>
                <h1>O QUE FAZEMOS ?</h1>
                <p>A Lume é um marketplace que<br /> conecta você às empresas<br />  dedicadas à reduzir o máximo<br />  dos danos causados ao meio<br />  ambiente, durante a fabricação,<br />  uso e o pós uso dos seus<br />  produtos. </p>
            </div>
            <div className={styles.sobreNosImagemELinhas}>
                <img src={mulherAndando} alt="" className={styles.sobreNosImagemMulher} />
                <div className={styles.sobreNosLinhas}>
                    <img src={linhaInicio} alt="" />
                    <img src={linhaMeio} alt="" />
                    <img src={linhaFim} alt="" />
                </div>
            </div>
        </section>
    )
}

export default SobreNos;