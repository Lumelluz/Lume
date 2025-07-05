import { Link } from 'react-router-dom';
import styles from './MissaoBeneficios.module.css';

const BeneficioCard = ({ icon, title, text }) => (
    <div className={styles.beneficioCard}>
        <div className={styles.iconWrapper}>
            {icon}
        </div>
        <h3 className={styles.beneficioTitle}>{title}</h3>
        <p className={styles.beneficioText}>{text}</p>
    </div>
);

function MissaoBeneficios() {
    return (
        <main className={styles.mainContent}>

            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <span className={styles.lumeGradientText}>Nosso Propósito</span>
                    <h1 className={styles.mainTitle}>
                        Iluminando o Caminho para um Consumo Consciente
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Acreditamos que cada escolha de compra é um voto no mundo que queremos construir. Nossa missão é tornar o consumo sustentável acessível, desejável e transparente para todos.
                    </p>
                    <Link to="/produtos" className={styles.heroButton}>
                        Explore Nossos Produtos
                    </Link>
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <div className={styles.missionText}>
                            <h2 className={styles.sectionTitle}>Nossa Missão</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae felis scelerisque, egestas justo et, venenatis metus. Nunc sed sodales justo. Ut in ex diam. Praesent scelerisque, sapien vel mattis pulvinar, eros sem feugiat turpis, non congue mi enim in purus.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div className={styles.missionImage}>
                            <img src="https://placehold.co/600x600/1a1a2e/e0e0e0?text=Nossa+Missão" alt="Imagem representando a missão da Lume" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.benefitsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Os Benefícios de Escolher Lume</h2>
                        <p className={styles.sectionSubtitle}>Cada produto em nossa plataforma é uma promessa de qualidade, ética e impacto positivo.</p>
                    </div>
                    <div className={styles.benefitsGrid}>
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>}
                            title="Curadoria Criteriosa"
                            text="Apenas produtos que atendem aos nossos rigorosos padrões de sustentabilidade e ética."
                        />
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
                            title="Transparência Total"
                            text="Conheça a origem dos materiais, o processo de produção e o impacto de cada compra."
                        />
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>}
                            title="Recompensas por Escolhas"
                            text="Nosso clube de assinatura Lume+ recompensa suas compras com pontos e benefícios exclusivos."
                        />
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A12.052 12.052 0 0112 20.055a12.052 12.052 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6l-9-5m18 0l-9 5v-6"></path></svg>}
                            title="Comunidade Engajada"
                            text="Junte-se a uma comunidade de pessoas e marcas que compartilham os mesmos valores que você."
                        />
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Faça Parte da Mudança</h2>
                    <p className={styles.sectionSubtitle}>
                        Cada pequena ação cria uma grande onda de impacto. Comece sua jornada conosco hoje e veja como suas escolhas podem iluminar o mundo.
                    </p>
                    <Link to="/registro" className={styles.ctaButton}>
                        Crie sua Conta
                    </Link>
                </div>
            </section>

        </main>
    );
}

export default MissaoBeneficios;
