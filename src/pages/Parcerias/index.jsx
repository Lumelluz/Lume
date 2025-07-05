import { Link } from 'react-router-dom';
import styles from './Parcerias.module.css';

const BeneficioCard = ({ icon, title, children }) => (
    <div className={styles.beneficioCard}>
        <div className={styles.iconWrapper}>
            {icon}
        </div>
        <h3 className={styles.beneficioTitle}>{title}</h3>
        <p className={styles.beneficioText}>{children}</p>
    </div>
);

const ModeloParceriaCard = ({ image, title, children }) => (
    <div className={styles.modeloCard}>
        <img src={image} alt={title} className={styles.modeloCardImage} />
        <div className={styles.modeloCardContent}>
            <h3 className={styles.modeloCardTitle}>{title}</h3>
            <p className={styles.modeloCardText}>{children}</p>
            <a href="#" className={styles.modeloCardLink}>Saiba Mais &rarr;</a>
        </div>
    </div>
);


function Parcerias() {
    return (
        <main className={styles.mainContent}>

            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <span className={styles.lumeGradientText}>Junte-se à Nossa Missão</span>
                    <h1 className={styles.mainTitle}>
                        Construa um Futuro Mais Sustentável Conosco
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae felis scelerisque, egestas justo et, venenatis metus. Nunc sed sodales justo.
                    </p>
                    <Link to="/contato" className={styles.heroButton}>
                        Seja um Parceiro
                    </Link>
                </div>
            </section>

            <section className={styles.benefitsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Por que ser um Parceiro Lume?</h2>
                        <p className={styles.sectionSubtitle}>Crescemos juntos, impulsionando o consumo consciente e valorizando marcas que fazem a diferença.</p>
                    </div>
                    <div className={styles.benefitsGrid}>
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                            title="Amplie seu Alcance"
                        >
                            Conecte-se com um público engajado e apaixonado por sustentabilidade e consumo consciente, expandindo a visibilidade da sua marca.
                        </BeneficioCard>
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>}
                            title="Alinhamento de Propósito"
                        >
                            Associe sua marca a um movimento que valoriza a ética, a transparência e o impacto positivo no planeta.
                        </BeneficioCard>
                        <BeneficioCard
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>}
                            title="Crescimento Conjunto"
                        >
                            Faça parte de um ecossistema colaborativo, com acesso a ferramentas, insights e oportunidades para impulsionar seu negócio.
                        </BeneficioCard>
                    </div>
                </div>
            </section>

            <section className={styles.partnershipTypesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Modelos de Parceria</h2>
                        <p className={styles.sectionSubtitle}>Encontre o modelo que mais se alinha com seus objetivos. Estamos abertos a novas ideias!</p>
                    </div>
                    <div className={styles.partnershipGrid}>
                        <ModeloParceriaCard
                            image="https://placehold.co/600x400/1a1a2e/e0e0e0?text=Fornecedores"
                            title="Fornecedores de Produtos"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque, sapien vel mattis pulvinar.
                        </ModeloParceriaCard>
                        <ModeloParceriaCard
                            image="https://placehold.co/600x400/1a1a2e/e0e0e0?text=Afiliados"
                            title="Criadores de Conteúdo"
                        >
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </ModeloParceriaCard>
                        <ModeloParceriaCard
                            image="https://placehold.co/600x400/1a1a2e/e0e0e0?text=ONGS"
                            title="Organizações e ONGs"
                        >
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModeloParceriaCard>
                    </div>
                </div>
            </section>

            <section className={styles.testimonialsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>O que Nossos Parceiros Dizem</h2>
                    </div>
                    <div className={styles.testimonialsGrid}>
                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialQuote}>"Fazer parte do ecossistema Lume transformou nosso alcance. Conectamos com um público que realmente valoriza nosso trabalho e nossa missão."</p>
                            <div className={styles.testimonialAuthor}>
                                <img src="https://placehold.co/100x100/e0e0e0/000000?text=Logo" alt="Logo do parceiro" />
                                <div>
                                    <p className={styles.authorName}>Ana Silva</p>
                                    <p className={styles.authorRole}>Fundadora, EcoVest</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialQuote}>"A Lume não é apenas um marketplace, é uma comunidade. O suporte e a colaboração que encontramos aqui são incomparáveis."</p>
                            <div className={styles.testimonialAuthor}>
                                <img src="https://placehold.co/100x100/e0e0e0/000000?text=Logo" alt="Logo do parceiro" />
                                <div>
                                    <p className={styles.authorName}>Carlos Mendes</p>
                                    <p className={styles.authorRole}>Diretor, Aroma Natural</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Pronto para Iluminar o Mundo Conosco?</h2>
                    <p className={styles.sectionSubtitle}>
                        Se você compartilha da nossa paixão por um futuro mais verde e ético, queremos ouvir de você. Vamos juntos fazer a diferença.
                    </p>
                    <Link to="/contato" className={styles.ctaButton}>
                        Entre em Contato
                    </Link>
                </div>
            </section>

        </main>
    );
}

export default Parcerias;
