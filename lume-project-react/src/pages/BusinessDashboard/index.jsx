import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BusinessDashboard.module.css';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { Chart, registerables } from 'chart.js';
import menuHamburguerBranco from '../../../src/assets/icons/menuHamburguerBranco.svg';

Chart.register(...registerables);

const categoryOptions = {
    'Casa Sustentável': ['Casa e decoração', 'Festas', 'Produtos de limpeza ecológicos', 'Itens de cozinha', 'Composteiras domésticas', 'Purificadores e filtros de água'],
    'Moda Sustentável': ['Roupas ecológicas', 'Calçados veganos', 'Acessórios recicláveis ou biodegradáveis', 'Bolsas e mochilas sustentáveis'],
    'Comidas': ['Vegano', 'Vegetariano', 'Bebidas', 'Lanche', 'Almoço/Janta'],
};

const MetricCard = ({ title, value }) => (
    <div className={styles.metricCard}>
        <h3 className={styles.metricTitle}>{title}</h3>
        <p className={styles.metricValue}>{value}</p>
    </div>
);

const VisaoGeralView = ({ userProducts }) => {
    const salesChartRef = useRef(null);
    const produtosAtivos = userProducts.filter(p => p.isVerified).length;
    const produtosPendentes = userProducts.filter(p => !p.isVerified).length;

    useEffect(() => {
        if (!salesChartRef.current) return;
        const salesChartInstance = new Chart(salesChartRef.current, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [120, 190, 150, 210, 180, 240],
                    backgroundColor: 'rgba(55, 113, 200, 0.6)',
                    borderColor: 'rgba(55, 113, 200, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, ticks: { color: '#8b949e' } }, x: { ticks: { color: '#8b949e' } } },
                plugins: { legend: { labels: { color: '#8b949e' } } }
            }
        });
        return () => salesChartInstance.destroy();
    }, []);

    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}><h2>Visão Geral da Loja</h2></div>
            <div className={styles.metricsGrid}>
                <MetricCard title="Produtos Ativos" value={produtosAtivos} />
                <MetricCard title="Produtos Pendentes" value={produtosPendentes} />
                <MetricCard title="Avaliação Média" value="..." />
            </div>
            <div className={styles.chartCard}>
                <h3>Performance de Vendas (Exemplo Fictício)</h3>
                <div className={styles.chartWrapper}><canvas ref={salesChartRef}></canvas></div>
            </div>
        </div>
    );
};

const MeusProdutosView = ({ userProducts, onEditProduct }) => {
    const getStatusClass = (product) => product.isVerified ? styles.statusAprovado : styles.statusPendente;
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}><h2>Meus Produtos</h2></div>
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Status</th><th className="text-center">Ação</th></tr></thead>
                        <tbody>
                            {userProducts.length > 0 ? userProducts.map(product => (
                                <tr key={product.id}>
                                    <td className="font-semibold">{product.productName}</td>
                                    <td>{product.categoria}</td>
                                    <td>R$ {product.currentPrice.toFixed(2)}</td>
                                    <td><span className={`${styles.statusBadge} ${getStatusClass(product)}`}>{product.isVerified ? 'Aprovado' : 'Pendente'}</span></td>
                                    <td className="text-center"><button onClick={() => onEditProduct(product)} className={styles.editButton}>Editar</button></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center p-8 text-gray-500">Você ainda não cadastrou nenhum produto.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ConfiguracoesView = ({ businessData, onUpdate }) => {
    const [formData, setFormData] = useState(businessData);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(businessData);
    }, [businessData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onUpdate(formData);
            alert("Informações da empresa atualizadas com sucesso!");
        } catch (error) {
            alert(`Erro ao atualizar: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (!formData) {
        return <p>A carregar dados da empresa...</p>;
    }

    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}><h2>Configurações da Empresa</h2></div>
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
                <div className={styles.settingsGrid}>
                    <div className={styles.formColumn}>
                        <h3 className={styles.topicTitle}>Dados Cadastrais</h3>
                        <div className={styles.formGroup}><label htmlFor="razaoSocial">Razão Social</label><input type="text" id="razaoSocial" name="razaoSocial" value={formData.razaoSocial || ''} onChange={handleChange} /></div>
                        <div className={styles.formGroup}><label htmlFor="nomeFantasia">Nome Fantasia</label><input type="text" id="nomeFantasia" name="nomeFantasia" value={formData.nomeFantasia || ''} onChange={handleChange} /></div>
                        <div className={styles.formGroup}><label htmlFor="cnpj">CNPJ</label><input type="text" id="cnpj" name="cnpj" value={formData.cnpj || ''} onChange={handleChange} /></div>
                        <div className={styles.formGroup}><label htmlFor="enderecoComercial">Endereço Comercial</label><input type="text" id="enderecoComercial" name="enderecoComercial" value={formData.enderecoComercial || ''} onChange={handleChange} /></div>
                        <div className={styles.formGroup}><label htmlFor="siteRedes">Site ou Redes Sociais</label><input type="text" id="siteRedes" name="siteRedes" value={formData.siteRedes || ''} onChange={handleChange} /></div>
                    </div>
                    <div className={styles.formColumn}>
                        <h3 className={styles.topicTitle}>Compromisso Ambiental</h3>
                        <div className={styles.formGroup}><label htmlFor="certificacoesAmbientais">Certificações Ambientais</label><textarea id="certificacoesAmbientais" name="certificacoesAmbientais" value={formData.certificacoesAmbientais || ''} onChange={handleChange} rows="3"></textarea></div>
                        <div className={styles.formGroup}><label htmlFor="origemDosMateriais">Origem dos Materiais</label><textarea id="origemDosMateriais" name="origemDosMateriais" value={formData.origemDosMateriais || ''} onChange={handleChange} rows="3"></textarea></div>
                        <div className={styles.formGroup}><label htmlFor="compromissoSustentabilidade">Compromissos com Sustentabilidade</label><textarea id="compromissoSustentabilidade" name="compromissoSustentabilidade" value={formData.compromissoSustentabilidade || ''} onChange={handleChange} rows="3"></textarea></div>
                        <div className={styles.formGroup}><label htmlFor="informacoesAdicionais">Informações Adicionais</label><textarea id="informacoesAdicionais" name="informacoesAdicionais" value={formData.informacoesAdicionais || ''} onChange={handleChange} rows="3"></textarea></div>
                    </div>
                </div>
                <button type="submit" className={styles.saveButton} disabled={isSaving}>
                    {isSaving ? 'A salvar...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
};

const PedidosRecebidosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Pedidos Recebidos</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);

const BusinessProductEditModal = ({ product, isOpen, onClose, onSave }) => {
    if (!isOpen || !product) return null;

    const [editableData, setEditableData] = useState(product);
    const [activeImage, setActiveImage] = useState(product.imageUrl);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    const findMainCategory = (subcategory) => {
        for (const mainCategory in categoryOptions) {
            if (categoryOptions[mainCategory].includes(subcategory)) {
                return mainCategory;
            }
        }
        return '';
    };

    useEffect(() => {
        const mainCat = findMainCategory(product.categoria);
        setSelectedMainCategory(mainCat);
        setSubcategories(categoryOptions[mainCat] || []);
        setEditableData(product);
        setActiveImage(product.imageUrl);
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData(prev => ({ ...prev, [name]: value }));
    };

    const handleMainCategoryChange = (e) => {
        const mainCategory = e.target.value;
        setSelectedMainCategory(mainCategory);
        setSubcategories(categoryOptions[mainCategory] || []);
        setEditableData(prev => ({ ...prev, categoria: '' }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...editableData,
            benefits: Array.isArray(editableData.benefits) ? editableData.benefits : String(editableData.benefits).split(',').map(item => item.trim()).filter(item => item),
            features: Array.isArray(editableData.features) ? editableData.features : String(editableData.features).split(',').map(item => item.trim()).filter(item => item),
        };
        onSave(dataToSend);
    };

    const allImages = [editableData.imageUrl, ...(editableData.galleryImages || [])].filter(Boolean);

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent}`} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>Editar Produto</h2>
                <form onSubmit={handleSave} className={styles.modalBody}>
                    <div className={styles.productDetailsGrid}>
                        <div className={styles.productImageColumn}>
                            <h3 className={styles.topicTitle}>Imagens do Produto</h3>
                            <div className={styles.productImagePreview}><img src={activeImage} alt={editableData.imageAlt} /></div>
                            {allImages.length > 1 && (
                                <div className={styles.galleryThumbnails}>
                                    {allImages.map((img, index) => (
                                        <button key={index} type="button" className={`${styles.thumbnailButton} ${activeImage === img ? styles.thumbnailActive : ''}`} onClick={() => setActiveImage(img)}>
                                            <img src={img} alt={`Galeria ${index + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.productInfoColumn}>
                            <h3 className={styles.topicTitle}>Informações Editáveis</h3>
                            <label>Nome do Produto:</label><input type="text" name="productName" value={editableData.productName || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Categoria Principal:</label>
                            <select value={selectedMainCategory} onChange={handleMainCategoryChange} className={styles.modalInput}>
                                <option value="" disabled>Selecione...</option>
                                {Object.keys(categoryOptions).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <label>Subcategoria:</label>
                            <select name="categoria" value={editableData.categoria || ''} onChange={handleChange} className={styles.modalInput} disabled={!selectedMainCategory}>
                                <option value="" disabled>Selecione...</option>
                                {subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <label>Descrição:</label><textarea name="description" value={editableData.description || ''} onChange={handleChange} rows="5" className={styles.modalTextarea}></textarea>
                            <h3 className={styles.topicTitle}>Preços e Venda</h3>
                            <label>Preço Original (R$):</label><input type="number" step="0.01" name="originalPrice" value={editableData.originalPrice || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Preço Atual (R$):</label><input type="number" step="0.01" name="currentPrice" value={editableData.currentPrice || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Desconto (%):</label><input type="number" name="discountPercentage" value={editableData.discountPercentage || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Parcelamento:</label><input type="text" name="installments" value={editableData.installments || ''} onChange={handleChange} className={styles.modalInput} />
                            <h3 className={styles.topicTitle}>Detalhes Adicionais</h3>
                            <label>Frete:</label><input type="text" name="shippingInfo" value={editableData.shippingInfo || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Desconto Especial:</label><input type="text" name="specialDiscount" value={editableData.specialDiscount || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Benefícios (separados por vírgula):</label><input type="text" name="benefits" value={Array.isArray(editableData.benefits) ? editableData.benefits.join(', ') : (editableData.benefits || '')} onChange={handleChange} className={styles.modalInput} />
                            <label>Características (separadas por vírgula):</label><input type="text" name="features" value={Array.isArray(editableData.features) ? editableData.features.join(', ') : (editableData.features || '')} onChange={handleChange} className={styles.modalInput} />
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.rejectButton}>Cancelar</button>
                        <button type="submit" className={styles.approveButton}>Salvar e Enviar para Análise</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BusinessNavModal = ({ isOpen, onClose, onNavigate }) => {
    const navigate = useNavigate();

    const handleNavigation = (view) => {
        onNavigate(view);
        onClose();
    };

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.navModalContent}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Menu da Empresa</h3>
                    <button onClick={onClose} className={styles.modalCloseButton}>&times;</button>
                </div>
                <nav className={styles.modalNav}>
                    <ul>
                        <li><button onClick={() => handleNavigation('visaoGeral')}>Visão Geral</button></li>
                        <li><button onClick={() => handleNavigation('meusProdutos')}>Meus Produtos</button></li>
                        <li><button onClick={() => handleNavigation('pedidos')}>Pedidos Recebidos</button></li>
                        <li><button onClick={() => handleNavigation('configuracoes')}>Configurações</button></li>
                        <li><button onClick={() => navigate('/cadastrar-produto')} className={styles.ctaButton}>Cadastrar Novo Produto</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

function BusinessDashboard() {
    const [activeView, setActiveView] = useState('visaoGeral');
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const { user, logout, updateBusinessDetails } = useAuth();
    const { products, pendingProducts, updateProductByBusiness } = useProducts();
    const navigate = useNavigate();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const userProducts = useMemo(() => {
        if (!user) return [];
        const allProducts = [...products, ...pendingProducts];
        return allProducts.filter(p => p.ownerId === user.id);
    }, [products, pendingProducts, user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdateBusiness = async (updatedData) => {
        try {
            await updateBusinessDetails(updatedData);
            alert("Informações da empresa atualizadas com sucesso!");
        } catch (error) {
            alert(`Erro ao atualizar: ${error.message}`);
        }
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const handleSaveProduct = async (updatedData) => {
        try {
            await updateProductByBusiness(updatedData.id, updatedData);
            alert("Produto atualizado e enviado para nova verificação!");
            setIsEditModalOpen(false);
        } catch (error) {
            alert(`Erro ao atualizar: ${error.message}`);
        }
    };

    if (user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_USER') {
        return (
            <div className={styles.adminMessageContainer}>
                <h1>Acesso Restrito</h1>
                <p>Apenas contas de empresa podem acessar este painel.</p>
                <button onClick={() => navigate('/')}>Voltar para a Home</button>
            </div>
        );
    }

    const renderView = () => {
        switch (activeView) {
            case 'visaoGeral': return <VisaoGeralView userProducts={userProducts} />;
            case 'meusProdutos': return <MeusProdutosView userProducts={userProducts} onEditProduct={handleEditProduct} />;
            case 'pedidos': return <PedidosRecebidosView />;
            case 'configuracoes': return <ConfiguracoesView businessData={user?.business || {}} onUpdate={handleUpdateBusiness} />;
            default: return <VisaoGeralView userProducts={userProducts} />;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}><div className={styles.logo}>L</div><h1>Painel da Empresa</h1></div>
                <nav className={styles.sidebarNav}>
                    <ul>
                        <li><button onClick={() => setActiveView('visaoGeral')} className={activeView === 'visaoGeral' ? styles.activeLink : ''}>Visão Geral</button></li>
                        <li><button onClick={() => setActiveView('meusProdutos')} className={activeView === 'meusProdutos' ? styles.activeLink : ''}>Meus Produtos</button></li>
                        <li><button onClick={() => setActiveView('pedidos')} className={activeView === 'pedidos' ? styles.activeLink : ''}>Pedidos Recebidos</button></li>
                        <li><button onClick={() => navigate('/cadastrar-produto')} className={styles.ctaButton}>Cadastrar Novo Produto</button></li>
                        <li><button onClick={() => setActiveView('configuracoes')} className={activeView === 'configuracoes' ? styles.activeLink : ''}>Configurações</button></li>
                    </ul>
                </nav>
                <div className={styles.sidebarFooter}><button onClick={handleLogout}>Sair</button></div>
            </aside>

            <header className={styles.mobileHeader}>
                <button onClick={() => setIsNavModalOpen(true)} className={styles.mobileMenuButton}>
                    <img src={menuHamburguerBranco} alt="Abrir menu" />
                </button>
                <div className={styles.mobileLogo}>Painel da Empresa</div>
            </header>

            <main className={styles.mainContent}>
                {renderView()}
            </main>
            <BusinessProductEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={productToEdit}
                onSave={handleSaveProduct}
            />
            <BusinessNavModal
                isOpen={isNavModalOpen}
                onClose={() => setIsNavModalOpen(false)}
                onNavigate={setActiveView}
            />
        </div>
    );
}

export default BusinessDashboard;
