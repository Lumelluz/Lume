import styles from './Footer.module.css';

function Footer() {
    return (
        <section className={styles.container}>
            <div className={styles.conteudo}>
                <h1>Footer</h1>
                <p>Aqui ficará o footer da página</p>
            </div>
        </section>
    )
}

export default Footer;