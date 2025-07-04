import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PaginaVendedor.module.css';
import { useProducts } from '../../context/ProductContext';
import ProdutosItemsCompletos2 from '../../components/features/ProdutosItemsCompletos2';

function PaginaVendedor() {
    const { companyId } = useParams();
    const { products } = useProducts();
    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/business/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompanyData(data);
                } else {
                    console.error("Empresa não encontrada");
                    setCompanyData(null);
                }
            } catch (error) {
                console.error("Erro ao buscar dados da empresa:", error);
                setCompanyData(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (companyId) {
            fetchCompanyData();
        }
    }, [companyId]);

    const companyProducts = useMemo(() => {
        if (!companyId) return [];
        return products.filter(p => String(p.businessId) === String(companyId));
    }, [products, companyId]);

    if (isLoading) {
        return <div className={styles.loading}>A carregar...</div>;
    }

    if (!companyData) {
        return <div className={styles.notFound}>Vendedor não encontrado.</div>;
    }

    return (
        <main className={styles.pageWrapper}>
            <header className={styles.headerVendedor}>
                <div className={styles.headerContent}>
                    <img src={`https://placehold.co/150x150/e0e0e0/000000?text=${companyData.nomeFantasia.charAt(0)}`} alt={`Logo da ${companyData.nomeFantasia}`} className={styles.logoEmpresa} />
                    <div className={styles.infoEmpresa}>
                        <h1>{companyData.nomeFantasia}</h1>
                        {companyData.siteRedes && (
                            <a href={companyData.siteRedes} target="_blank" rel="noopener noreferrer" className={styles.linkRedeSocial}>
                                Visitar Website
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className={styles.mainContent}>
                <aside className={styles.sidebar}>
                    <h2>Nosso Compromisso</h2>
                    <div className={styles.infoBlock}>
                        <h3>Sustentabilidade</h3>
                        <p>{companyData.compromissoSustentabilidade || 'Não informado.'}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Origem dos Materiais</h3>
                        <p>{companyData.origemDosMateriais || 'Não informado.'}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Certificações</h3>
                        <p>{companyData.certificacoesAmbientais || 'Nenhuma certificação informada.'}</p>
                        {console.log(companyData.certificacoesAmbientais)}
                    </div>
                </aside>

                <section className={styles.productGridContainer}>
                    <h2>Nossos Produtos</h2>
                    <div className={styles.productGrid}>
                        {companyProducts.length > 0 ? (
                            companyProducts.map(product => (
                                <ProdutosItemsCompletos2 key={product.id} product={product} />
                            ))
                        ) : (
                            <p className={styles.noProducts}>Esta empresa ainda não possui produtos cadastrados na plataforma.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default PaginaVendedor;
