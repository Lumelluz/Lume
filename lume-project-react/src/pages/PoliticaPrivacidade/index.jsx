import styles from './PoliticaPrivacidade.module.css';

function PoliticaPrivacidade() {
    return (
        <main className={styles.mainContent}>

            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>
                        Política de Privacidade
                    </h1>
                    <p className={styles.heroSubtitle}>
                        O seu compromisso com a privacidade é a nossa prioridade. Entenda como coletamos, usamos e protegemos as suas informações.
                    </p>
                    <p className={styles.lastUpdated}>Última atualização: 25 de Junho de 2025</p>
                </div>
            </section>

            <section className={styles.policySection}>
                <div className={`${styles.container} ${styles.policyContent}`}>
                    <p><strong>Bem-vindo à Política de Privacidade da Lume.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae felis scelerisque, egestas justo et, venenatis metus. Nunc sed sodales justo. Ut in ex diam. Praesent scelerisque, sapien vel mattis pulvinar, eros sem feugiat turpis, non congue mi enim in purus.</p>

                    <h2>1. Coleta de Informações</h2>
                    <p>Nós coletamos informações para fornecer e melhorar os nossos serviços. Isso inclui informações que você nos fornece diretamente e dados que coletamos automaticamente.</p>
                    <h3>Informações que Você nos Fornece</h3>
                    <ul>
                        <li><strong>Dados de Cadastro:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ex eu magna tempor interdum.</li>
                        <li><strong>Informações de Pagamento:</strong> Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</li>
                        <li><strong>Comunicações:</strong> Nulla quis lorem ut libero malesuada feugiat.</li>
                    </ul>
                    <h3>Informações Coletadas Automaticamente</h3>
                    <ul>
                        <li><strong>Dados de Uso e Log:</strong> Vivamus suscipit tortor eget felis porttitor volutpat.</li>
                        <li><strong>Cookies e Tecnologias Semelhantes:</strong> Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</li>
                    </ul>

                    <h2>2. Uso das Informações</h2>
                    <p>Utilizamos as informações coletadas para diversas finalidades, incluindo:</p>
                    <ul>
                        <li>Fornecer, operar e manter o nosso serviço.</li>
                        <li>Melhorar, personalizar e expandir o nosso serviço.</li>
                        <li>Entender e analisar como você usa o nosso serviço.</li>
                        <li>Desenvolver novos produtos, serviços, recursos e funcionalidades.</li>
                        <li>Comunicar com você, diretamente ou através de um de nossos parceiros.</li>
                    </ul>

                    <h2>3. Partilha de Dados</h2>
                    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Não vendemos as suas informações pessoais. Podemos partilhar informações nas seguintes situações:</p>
                    <ul>
                        <li>Com fornecedores de serviços.</li>
                        <li>Para conformidade legal.</li>
                        <li>Com o seu consentimento.</li>
                    </ul>

                    <h2>4. Segurança dos Seus Dados</h2>
                    <p>A segurança dos seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrónico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger as suas informações pessoais, não podemos garantir a sua segurança absoluta.</p>

                    <h2>5. Contacto</h2>
                    <p>Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contacto conosco através do e-mail: <a href="mailto:privacidade@lume.com">privacidade@lume.com</a>.</p>
                </div>
            </section>

        </main>
    );
}

export default PoliticaPrivacidade;
