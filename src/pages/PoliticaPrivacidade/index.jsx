import styles from './PoliticaPrivacidade.module.css';

function PoliticaPrivacidade() {
    return (
        <main className={styles.mainContent}>

            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>
                        Política de Privacidade da Lume
                    </h1>
                    <p className={styles.heroSubtitle}>
                        O seu compromisso com a privacidade é a nossa prioridade. Entenda como coletamos, usamos e protegemos as suas informações.
                    </p>
                    <p className={styles.lastUpdated}>Última atualização: 03 de Julho de 2025</p>
                </div>
            </section>

            <section className={styles.policySection}>
                <div className={`${styles.container} ${styles.policyContent}`}>
                    <p><strong>Bem-vindo à Política de Privacidade da Lume.A Lume valoriza a transparência, a segurança e o respeito à privacidade de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos, compartilhamos e protegemos os dados pessoais fornecidos por você ao utilizar nossa plataforma.</strong> </p>

                    <h2>1. Coleta de Informações</h2>

                    <h3>Ao acessar e utilizar o marketplace da Lume, podemos coletar as seguintes informações:</h3>
                    <ul>
                        <li><strong>Nome completo;</strong></li>
                        <li><strong>Endereço de e-mail;</strong></li>
                        <li><strong>Endereço residencial e/ou de entrega;</strong></li>
                        <li><strong>CPF ou CNPJ (quando aplicável);</strong></li>
                        <li><strong>Dados de pagamento (processados por terceiros de forma segura);</strong></li>
                        <li><strong>Histórico de compras e navegação;</strong></li>
                        <li><strong>Preferências e interações com a plataforma;</strong></li>
                        <li><strong>Informações de dispositivo, navegador e IP.</strong></li>
                    </ul>
                    <h2>2. Finalidade do Uso de Dados</h2>

                    <h3>Utilizamos os dados coletados para:</h3>
                    <ul>
                        <li><strong>Processar pedidos e pagamentos;</strong></li>
                        <li><strong>Garantir a entrega dos produtos adquiridos;
                        </strong></li>
                        <li><strong>Personalizar a experiência de navegação;</strong></li>
                        <li><strong>Comunicar promoções, novidades e informações relevantes (com consentimento);
                        </strong></li>
                        <li><strong>Melhorar nossos serviços e funcionalidades;</strong></li>
                        <li><strong>Prevenir fraudes e garantir a segurança da plataforma;</strong></li>
                        <li><strong>Cumprir obrigações legais e regulatórias.</strong></li>
                    </ul>

                    <h2>3. Compartilhamento de Dados</h2>
                    <h3>Podemos compartilhar seus dados com:</h3>
                    <ul>
                        <li>Fornecedores e parceiros comerciais envolvidos na entrega dos produtos;</li>
                        <li>Prestadores de serviço de pagamento e logística;</li>
                        <li>Autoridades públicas, mediante requisição legal ou judicial;</li>
                        <li>Plataformas de análise de dados e marketing, sempre com base na LGPD e mediante consentimento.</li>
                    </ul>

                    <h2>4. Armazenamento e Segurança</h2>
                    <p><strong>Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda, divulgação ou alteração indevida.</strong></p>
                    <p><strong>Os dados são armazenados em servidores seguros e podem ser mantidos enquanto durar a relação entre usuário e Lume, ou conforme exigido por lei.</strong></p>

                    <h2>5. Direitos do Titular dos Dados</h2>
                    <h3>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/18 - LGPD), você tem direito a:</h3>
                    <ul>
                        <li>Confirmar a existência de tratamento dos seus dados;</li>
                        <li>Acessar seus dados pessoais;</li>
                        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                        <li>Solicitar a exclusão dos seus dados (quando legalmente possível);
                        </li>
                        <li>Revogar consentimentos previamente concedidos;</li>
                        <li>Solicitar a portabilidade dos dados para outro fornecedor.</li>
                    </ul>

                    <h2>6. Cookies e Tecnologias de Rastreamento</h2>
                    <p><strong>Cookies Utilizamos cookies e tecnologias semelhantes para melhorar a navegação, personalizar conteúdo e coletar dados de uso da plataforma. Você pode gerenciar as preferências de cookies diretamente no seu navegador.</strong></p>

                    <h2>7. Alterações nesta Política</h2>
                    <p><strong>A Lume poderá atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise este documento regularmente. Notificaremos alterações significativas pelos canais disponíveis.</strong></p>

                    <h2>8. Contato</h2>
                    <h3>Se você tiver dúvidas, solicitações ou quiser exercer seus direitos, entre em contato conosco:</h3>
                    <ul>
                        <li>E-mail: contatolume2025@gmail.com
                        </li>
                        <li>Instagram: @lumelluz</li>
                    </ul>

                    <h2>9. Disposições Finais
                    </h2>

                    <p><strong>Ao utilizar a plataforma da Lume, o usuário reconhece que leu e compreendeu esta Política de Privacidade e concorda com o tratamento de seus dados conforme descrito neste documento.</strong></p>
                    <p><strong>Caso haja conflito entre esta política e contratos específicos firmados com usuários ou empresas parceiras, as cláusulas contratuais prevalecerão</strong></p>
                </div>
            </section>

        </main>
    );
}

export default PoliticaPrivacidade;
