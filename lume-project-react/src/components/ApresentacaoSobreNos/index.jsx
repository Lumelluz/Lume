import styles from '../ApresentacaoSobreNos/ApresentacaoSobreNos.module.css'

function ApresentacaoSobreNos() {
    return (
        <section className={styles.sectionQueAgrupaContainer}>
            <h2>Sobre Nós</h2>
            <div className={styles.containerTopicos}>
                <p>• Somos uma equipe formada por sete jovens talentos em tecnologia, unidos pelo Instituto PROA  com o propósito de criar soluções que gerem impacto positivo na sociedade.</p>
                <p>• Nosso time é diverso e completo.</p>
                <p>• Juntos, acreditamos que tecnologia e propósito devem andar lado a lado. Por isso, cada projeto que desenvolvemos carrega um compromisso com a ética, a sustentabilidade e o impacto social.</p>
            </div>
        </section>
    )
}

export default ApresentacaoSobreNos;