import styles from '../ApresentacaoSobreNos/ApresentacaoSobreNos.module.css';

function ApresentacaoSobreNos() {
    return (
        <section className={styles.sectionQueAgrupaContainer} aria-label="Sobre Nós">
            <h2>Sobre Nós</h2>
            <ul className={styles.containerTopicos}>
                <li>Somos uma equipe formada por sete jovens talentos em tecnologia, unidos pelo Instituto PROA com o propósito de criar soluções que gerem impacto positivo na sociedade.</li>
                <li>Nosso time é diverso e completo.</li>
                <li>Juntos, acreditamos que tecnologia e propósito devem andar lado a lado. Por isso, cada projeto que desenvolvemos carrega um compromisso com a ética, a sustentabilidade e o impacto social.</li>
            </ul>
        </section>
    )
}

export default ApresentacaoSobreNos;
