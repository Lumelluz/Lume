import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import styles from './AdminDashboard.module.css';
import { Chart, registerables } from 'chart.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProducts } from '../../context/ProductContext';
import { useUsers } from '../../context/UserContext';
import menuHamburguerBranco from '../../../src/assets/icons/menuHamburguerBranco.svg';
import { useTickets } from '../../context/TicketContext';

import DashboardHome from '../../components/features/DashboardHome';
import VerificacaoProdutosView from '../../components/features/VerificacaoProdutosView';
import EmpresasView from '../../components/features/EmpresasView';
import ProductVerificationModal from '../../components/features/ProductVerificationModal';

const AdminNavModal = ({ isOpen, onClose, onNavigate, pendingProductsCount }) => {
    if (!isOpen) return null;

    const handleNavigation = (view) => {
        onNavigate(view);
        onClose();
    };

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.navModalContent}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Navegação</h3>
                    <button onClick={onClose} className={styles.modalCloseButton}>&times;</button>
                </div>
                <nav className={styles.modalNav}>
                    <ul>
                        <li><button onClick={() => handleNavigation('dashboard')}><span>Dashboard</span></button></li>
                        <li>
                            <button onClick={() => handleNavigation('verificacao')}>
                                <span>Verificação</span>
                                {pendingProductsCount > 0 && <span className={styles.notificationBadge}>{pendingProductsCount}</span>}
                            </button>
                        </li>
                        <li><button onClick={() => handleNavigation('empresas')}><span>Empresas</span></button></li>
                        <li><button onClick={() => handleNavigation('pedidos')}><span>Pedidos</span></button></li>
                        <li><button onClick={() => handleNavigation('produtos')}><span>Produtos</span></button></li>
                        <li><button onClick={() => handleNavigation('usuarios')}><span>Usuários</span></button></li>
                        <li><button onClick={() => handleNavigation('suporte')}><span>Suporte</span></button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

Chart.register(...registerables);

const PedidosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Pedidos</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const ProdutosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Produtos</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const UsuariosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Usuários</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const SuporteView = ({ tickets, onViewTicket }) => {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}><h2>Tickets de Suporte</h2></div>
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Assunto</th>
                                <th>Status</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? tickets.map(ticket => (
                                <tr key={ticket.id} onClick={() => onViewTicket(ticket)} className={styles.clickableRow}>
                                    <td>{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td className="font-semibold">{ticket.name}</td>
                                    <td>{ticket.email}</td>
                                    <td>{ticket.subject}</td>
                                    <td><span className={`${styles.statusBadge} ${styles.statusNovo}`}>{ticket.status}</span></td>
                                    <td className="text-center"><span className={styles.analisarButton}>Ver Mensagem</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center p-8 text-gray-500">Nenhum ticket de suporte aberto.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TicketViewModal = ({ ticket, isOpen, onClose }) => {
    if (!isOpen || !ticket) return null;

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent}`} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className={styles.modalCloseButton}>&times;</button>
                <h2 className={styles.modalTitle}>Detalhes do Ticket #{ticket.id}</h2>
                <div className={styles.modalBody}>
                    <div className={styles.ticketInfo}>
                        <p><strong>De:</strong> {ticket.name} ({ticket.email})</p>
                        <p><strong>Data:</strong> {new Date(ticket.createdAt).toLocaleString('pt-BR')}</p>
                        <p><strong>Assunto:</strong> {ticket.subject}</p>
                    </div>
                    <div className={styles.ticketMessage}>
                        <h3>Mensagem:</h3>
                        <p>{ticket.message}</p>
                    </div>
                    <div className={styles.modalActions}>
                        <a href={`mailto:${ticket.email}?subject=RE: ${ticket.subject}`} className={styles.approveButton}>Responder por E-mail</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BusinessEditModal = ({ business, isOpen, onClose, onSave, onRemove }) => {
    if (!isOpen || !business) return null;

    const [editableData, setEditableData] = useState(business);

    useEffect(() => {
        setEditableData(business);
    }, [business]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(editableData);
    };

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent} ${styles.verificationModalContent}`} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>Editar Empresa: {editableData.nomeFantasia}</h2>
                <form onSubmit={handleSave} className={styles.modalBody}>
                    <div className={styles.productDetailsGrid}>
                        <div className={styles.productInfoColumn}>
                            <h3 className={styles.topicTitle}>Dados Cadastrais</h3>
                            <label>Razão Social:</label><input type="text" name="razaoSocial" value={editableData.razaoSocial || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Nome Fantasia:</label><input type="text" name="nomeFantasia" value={editableData.nomeFantasia || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>CNPJ:</label><input type="text" name="cnpj" value={editableData.cnpj || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Endereço:</label><input type="text" name="enderecoComercial" value={editableData.enderecoComercial || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Site ou Redes Sociais:</label><input type="text" name="siteRedes" value={editableData.siteRedes || ''} onChange={handleChange} className={styles.modalInput} />
                        </div>
                        <div className={styles.productInfoColumn}>
                            <h3 className={styles.topicTitle}>Compromisso Ambiental</h3>
                            <label>Certificações:</label><textarea name="certificacoesAmbientais" value={editableData.certificacoesAmbientais || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
                            <label>Origem dos Materiais:</label><textarea name="origemDosMateriais" value={editableData.origemDosMateriais || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
                            <label>Compromissos com Sustentabilidade:</label><textarea name="compromissoSustentabilidade" value={editableData.compromissoSustentabilidade || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
                            <label>Informações Adicionais:</label><textarea name="informacoesAdicionais" value={editableData.informacoesAdicionais || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => onRemove(business.id)} className={styles.rejectButton}>Remover Empresa</button>
                        <button type="submit" className={styles.approveButton}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


function AdminDashboard() {
    const [activeView, setActiveView] = useState('dashboard');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [productToVerify, setProductToVerify] = useState(null);
    const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
    const [businessToEdit, setBusinessToEdit] = useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiModalTitle, setAiModalTitle] = useState('');
    const [aiModalContent, setAiModalContent] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const { tickets } = useTickets();
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketToView, setTicketToView] = useState(null);

    const { pendingProducts, approveProduct, rejectProduct, updatePendingProduct, products } = useProducts();
    const { users, updateBusinessByAdmin, removeBusinessByAdmin } = useUsers();

    const isMountedRef = useRef(true);
    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    const registeredBusinesses = useMemo(() => {
        return users.filter(u => u.role === 'ROLE_BUSINESS' && u.business).map(u => ({ ...u.business, id: u.business.id || u.id, responsavelEmail: u.email }));
    }, [users]);

    const handleVerifyProductClick = useCallback((product) => {
        setProductToVerify(product);
        setIsVerificationModalOpen(true);
    }, []);

    const handleEditBusinessClick = useCallback((business) => {
        setBusinessToEdit(business);
        setIsBusinessModalOpen(true);
    }, []);

    const handleApproveProduct = useCallback((productId, finalData) => {
        approveProduct(productId, finalData);
        setIsVerificationModalOpen(false);
    }, [approveProduct]);

    const handleRejectProduct = useCallback((productId) => {
        rejectProduct(productId);
        setIsVerificationModalOpen(false);
    }, [rejectProduct]);

    const handleViewTicket = useCallback((ticket) => {
        setTicketToView(ticket);
        setIsTicketModalOpen(true);
    }, []);

    const handleUpdateProduct = useCallback((productId, updatedData) => {
        updatePendingProduct(productId, updatedData);
        setProductToVerify(prev => {
            const merged = { ...prev, ...updatedData };
            return JSON.stringify(prev) === JSON.stringify(merged) ? prev : merged;
        });
    }, [updatePendingProduct]);

    const handleSaveBusiness = useCallback(async (updatedData) => {
        try {
            await updateBusinessByAdmin(updatedData.id, updatedData);
            alert("Dados da empresa atualizados com sucesso!");
            setIsBusinessModalOpen(false);
        } catch (error) {
            alert(`Erro ao atualizar: ${error.message}`);
        }
    }, [updateBusinessByAdmin]);

    const handleRemoveBusiness = useCallback(async (businessId) => {
        if (window.confirm("Tem a certeza que quer remover esta empresa? Esta ação não pode ser desfeita.")) {
            try {
                await removeBusinessByAdmin(businessId);
                alert("Empresa removida com sucesso!");
                setIsBusinessModalOpen(false);
            } catch (error) {
                alert(`Falha ao remover: ${error.message}`);
            }
        }
    }, [removeBusinessByAdmin]);

    const callGeminiAPI = async (prompt) => {
        setIsAiLoading(true);
        const apiKey = "SUA_CHAVE_DE_API_DO_GEMINI_AQUI";
        if (!apiKey) {
            setIsAiLoading(false);
            return "Erro: A chave de API do Gemini não está configurada.";
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.5, maxOutputTokens: 500 } };
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro da API: ${errorData.error.message || response.statusText}`);
            }
            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            return `Desculpe, ocorreu um erro: ${error.message}`;
        } finally {
            if (isMountedRef.current) setIsAiLoading(false);
        }
    };

    const handleGerarRelatorio = async (metrics, traffic) => {
        setIsAiModalOpen(true);
        setAiModalTitle('Relatório de Performance ✨');
        setAiModalContent('');
        const nomeMesAtual = new Date().toLocaleString('pt-BR', { month: 'long' });
        const primeiroLetraMaiuscula = nomeMesAtual.charAt(0).toUpperCase() + nomeMesAtual.slice(1);
        const prompt = `Você é um analista de dados sênior para um e-commerce de produtos sustentáveis chamado Lume. Com base nos seguintes KPIs do mês de ${primeiroLetraMaiuscula}, escreva um relatório conciso em 3 parágrafos, formatado com Markdown. Dados:\n- Vendas Totais: ${metrics.vendas.value} (${metrics.vendas.trend})\n- Novos Usuários: ${metrics.usuarios.value} (${metrics.usuarios.trend})\n- Pedidos Pendentes: ${metrics.pedidos.value}\n- Taxa de Conversão: ${metrics.conversao.value} (${metrics.conversao.trend})\n- Fontes de Tráfego: ${traffic}`;
        const report = await callGeminiAPI(prompt);
        setAiModalContent(report);
    };

    const handleAnalisarPedido = async (pedido) => {
        setIsAiModalOpen(true);
        setAiModalTitle(`Análise do Pedido ${pedido.id}`);
        setAiModalContent('');
        let prompt = `Você é um especialista em e-commerce da Lume. Analise o seguinte pedido e sugira uma ação clara e profissional, formatada em Markdown.\n- Pedido ID: ${pedido.id}\n- Cliente: ${pedido.cliente}\n- Valor: R$ ${pedido.valor}\n- Status: ${pedido.status}`;
        if (pedido.status === 'Pendente') prompt += "\nSugira um rascunho de e-mail para o cliente e liste possíveis causas internas para o atraso.";
        else if (pedido.status === 'Cancelado') prompt += "\nSugira um rascunho de e-mail lamentando o ocorrido e oferecendo um cupom de 10% de desconto.";
        else prompt += "\nSugira uma ação de acompanhamento (como um pedido de avaliação).";
        const analysis = await callGeminiAPI(prompt);
        setAiModalContent(analysis);
    };

    const renderView = useCallback(() => {
        switch (activeView) {
            case 'dashboard': return <DashboardHome onAnalisarPedido={handleAnalisarPedido} onGerarRelatorio={handleGerarRelatorio} products={products} />;
            case 'pedidos': return <PedidosView />;
            case 'produtos': return <ProdutosView />;
            case 'verificacao': return <VerificacaoProdutosView pendingProducts={pendingProducts} onVerifyProduct={handleVerifyProductClick} />;
            case 'empresas': return <EmpresasView businesses={registeredBusinesses} onEditBusiness={handleEditBusinessClick} />;
            case 'usuarios': return <UsuariosView />;
            case 'suporte': return <SuporteView tickets={tickets} onViewTicket={handleViewTicket} />;
            default: return <DashboardHome onAnalisarPedido={handleAnalisarPedido} onGerarRelatorio={handleGerarRelatorio} products={products} />;
        }
    }, [activeView, products, pendingProducts, registeredBusinesses, handleVerifyProductClick, handleEditBusinessClick, handleAnalisarPedido, handleGerarRelatorio]);

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}><div className={styles.logo}>L</div><h1>Lume Admin</h1></div>
                <nav className={styles.sidebarNav}>
                    <ul>
                        <li><button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? styles.activeLink : ''}><span>Dashboard</span></button></li>
                        <li>
                            <button onClick={() => setActiveView('verificacao')} className={`${activeView === 'verificacao' ? styles.activeLink : ''} ${styles.verificationLink}`}>
                                <span>Verificação</span>
                                {pendingProducts.length > 0 && <span className={styles.notificationBadge}>{pendingProducts.length}</span>}
                            </button>
                        </li>
                        <li><button onClick={() => setActiveView('empresas')} className={activeView === 'empresas' ? styles.activeLink : ''}><span>Empresas</span></button></li>
                        <li><button onClick={() => setActiveView('suporte')} className={activeView === 'suporte' ? styles.activeLink : ''}><span>Suporte</span></button></li>
                        <li><button onClick={() => setActiveView('pedidos')} className={activeView === 'pedidos' ? styles.activeLink : ''}><span>Pedidos</span></button></li>
                        <li><button onClick={() => setActiveView('produtos')} className={activeView === 'produtos' ? styles.activeLink : ''}><span>Produtos</span></button></li>
                        <li><button onClick={() => setActiveView('usuarios')} className={activeView === 'usuarios' ? styles.activeLink : ''}><span>Usuários</span></button></li>

                    </ul>
                </nav>
                <div className={styles.sidebarFooter}><a href="#"><span>Sair</span></a></div>
            </aside>

            <header className={styles.mobileHeader}>
                <button onClick={() => setIsNavModalOpen(true)} className={styles.mobileMenuButton}>
                    <img src={menuHamburguerBranco} alt="Abrir menu" />
                </button>
                <div className={styles.mobileLogo}>Lume Admin</div>
            </header>

            <main className={styles.mainContent}>
                {renderView()}
            </main>

            <ProductVerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                product={productToVerify}
                onApprove={handleApproveProduct}
                onReject={handleRejectProduct}
                onUpdate={handleUpdateProduct}
            />

            <BusinessEditModal
                isOpen={isBusinessModalOpen}
                onClose={() => setIsBusinessModalOpen(false)}
                business={businessToEdit}
                onSave={handleSaveBusiness}
                onRemove={handleRemoveBusiness}
            />

            <AdminNavModal
                isOpen={isNavModalOpen}
                onClose={() => setIsNavModalOpen(false)}
                onNavigate={setActiveView}
                pendingProductsCount={pendingProducts.length}
            />

            <TicketViewModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} ticket={ticketToView} />


            {isAiModalOpen && (
                <div className={`${styles.modalOverlay} ${isAiModalOpen ? styles.open : ''}`} onClick={() => setIsAiModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalCloseButton} onClick={() => setIsAiModalOpen(false)}>&times;</button>
                        <h2 className={styles.modalTitle}>{aiModalTitle}</h2>
                        <div className={styles.modalBody}>{isAiLoading ? <span className="animate-pulse">Gerando...</span> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiModalContent}</ReactMarkdown>}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
