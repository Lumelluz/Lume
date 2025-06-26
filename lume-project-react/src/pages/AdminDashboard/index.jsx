import { useEffect, useRef, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { Chart, registerables } from 'chart.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePendingProducts } from '../../context/PendingProductContext';
import { listaDeProdutos } from '../../data/products';

Chart.register(...registerables);

const MetricCard = ({ id, title, value, trend, trendColor }) => (
    <div id={id} className={styles.metricCard}>
        <h3 className={styles.metricTitle}>{title}</h3>
        <p className={styles.metricValue}>{value}</p>
        <p className={`${styles.metricTrend} ${styles[trendColor]}`} data-trend={trend}>{trend}</p>
    </div>
);

const DashboardHome = ({ onAnalisarPedido, onGerarRelatorio }) => {
    const salesChartRef = useRef(null);
    const trafficChartRef = useRef(null);

    const [metricsData, setMetricsData] = useState(null);
    const [trafficData, setTrafficData] = useState('');
    const [recentOrders, setRecentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = () => {
            // API Java aqui, no futuro, substituindo os dados mockados
            // fetch('http://localhost:8080/api/dashboard-data').then(...)

            setMetricsData({
                vendas: { value: "R$ 45.897,00", trend: "+2.5% vs. mês passado" },
                usuarios: { value: "1.250", trend: "+12% vs. mês passado" },
                pedidos: { value: "32", trend: "Aguardando envio" },
                conversao: { value: "3.18%", trend: "-0.2% vs. semana passada" }
            });
            setTrafficData("Orgânico (45%), Social (25%), Direto (20%), Referência (10%)");

            const sortedProducts = [...listaDeProdutos].sort((a, b) => new Date(b.date) - new Date(a.date));
            const formattedOrders = sortedProducts.slice(0, 5).map((product, index) => ({
                id: `#${3065 - index}`,
                cliente: product.companyName,
                data: new Date(product.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Novo',
                valor: product.currentPrice.toFixed(2).replace('.', ',')
            }));
            setRecentOrders(formattedOrders);

            setIsLoading(false);
        };

        setTimeout(fetchDashboardData, 500);
    }, []);


    useEffect(() => {
        if (isLoading || !salesChartRef.current || !trafficChartRef.current) return;

        const salesChartInstance = new Chart(salesChartRef.current, {
            type: 'line',
            data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ label: 'Vendas (R$)', data: [12000, 19000, 15000, 21000, 18000, 24000], backgroundColor: 'rgba(35, 134, 54, 0.2)', borderColor: 'rgba(35, 134, 54, 1)', borderWidth: 2, pointBackgroundColor: '#fff', pointBorderColor: 'rgba(35, 134, 54, 1)', tension: 0.3 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#8b949e' }, grid: { color: 'rgba(255,255,255,0.1)' } }, x: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(255,255,255,0.1)' } } }, plugins: { legend: { labels: { color: '#8b949e' } } } }
        });
        const trafficChartInstance = new Chart(trafficChartRef.current, {
            type: 'doughnut',
            data: { labels: ['Orgânico', 'Social', 'Direto', 'Referência'], datasets: [{ data: [45, 25, 20, 10], backgroundColor: ['#238636', '#58a6ff', '#8250df', '#db61a2'], borderColor: '#161b22', borderWidth: 3 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#8b949e' } } } }
        });
        return () => { salesChartInstance.destroy(); trafficChartInstance.destroy(); };
    }, [isLoading]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'entregue': return styles.statusEntregue;
            case 'pendente': return styles.statusPendente;
            case 'enviado': return styles.statusEnviado;
            case 'cancelado': return styles.statusCancelado;
            default: return styles.statusNovo;
        }
    };

    if (isLoading) {
        return <div className={styles.loadingContainer}>Carregando dados do dashboard...</div>;
    }

    return (
        <>
            <div className={styles.contentHeader}>
                <h2>Dashboard</h2>
                <button onClick={() => onGerarRelatorio(metricsData, trafficData)} className={styles.geminiButton}>Gerar Relatório ✨</button>
            </div>
            <div className={styles.metricsGrid}>
                <MetricCard id="card-vendas" title="Vendas Totais" value={metricsData.vendas.value} trend={metricsData.vendas.trend} trendColor="green" />
                <MetricCard id="card-usuarios" title="Novos Usuários" value={metricsData.usuarios.value} trend={metricsData.usuarios.trend} trendColor="green" />
                <MetricCard id="card-pedidos" title="Pedidos Pendentes" value={metricsData.pedidos.value} trend={metricsData.pedidos.trend} trendColor="yellow" />
                <MetricCard id="card-conversao" title="Taxa de Conversão" value={metricsData.conversao.value} trend={metricsData.conversao.trend} trendColor="red" />
            </div>
            <div className={styles.chartsGrid}>
                <div className={styles.chartCardLarge}><h3>Visão Geral das Vendas</h3><div className={styles.chartWrapper}><canvas ref={salesChartRef}></canvas></div></div>
                <div className={styles.chartCardSmall}><h3>Fontes de Tráfego</h3><div className={styles.chartWrapper}><canvas ref={trafficChartRef}></canvas></div></div>
            </div>
            <div className={styles.tableCard}>
                <h3 className={styles.tableTitle}>Pedidos Recentes</h3>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead><tr><th>Pedido ID</th><th>Cliente</th><th>Data</th><th>Status</th><th className="text-right">Total</th><th className="text-center">Ações</th></tr></thead>
                        <tbody>{recentOrders.map(order => (<tr key={order.id}><td className={styles.orderId}>{order.id}</td><td>{order.cliente}</td><td>{order.data}</td><td><span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>{order.status}</span></td><td className="text-right font-semibold">R$ {order.valor}</td><td className="text-center"><button onClick={() => onAnalisarPedido(order)} className={styles.analisarButton}>Analisar ✨</button></td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const VerificacaoProdutosView = ({ pendingProducts, onVerifyProduct }) => {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}>
                <h2>Verificação de Produtos Pendentes</h2>
            </div>
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead><tr><th>Nome do Produto</th><th>Empresa</th><th>Categoria</th><th className="text-center">Ação</th></tr></thead>
                        <tbody>
                            {pendingProducts.length > 0 ? pendingProducts.map(product => (
                                <tr key={product.id} onClick={() => onVerifyProduct(product)} className={styles.clickableRow}>
                                    <td className="font-semibold">{product.productName}</td>
                                    <td>{product.companyName}</td>
                                    <td>{product.categoria}</td>
                                    <td className="text-center"><span className={styles.analisarButton}>Ver Detalhes</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="text-center p-8 text-gray-500">Nenhum produto pendente de verificação.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ProductVerificationModal = ({ product, isOpen, onClose, onApprove, onReject }) => {
    if (!isOpen || !product) return null;
    const DetailItem = ({ label, value, isArray = false }) => {
        const displayValue = isArray ? (Array.isArray(value) ? value.join(', ') : value) : value;
        if (!displayValue && displayValue !== 0) return null;
        return <p><strong>{label}:</strong> {displayValue}</p>;
    };
    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent} ${styles.verificationModalContent}`} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>Analisar Produto: {product.productName}</h2>
                <div className={styles.modalBody}><div className={styles.productDetailsGrid}><div className={styles.productImageColumn}><h3 className={styles.topicTitle}>Imagem Principal</h3><div className={styles.productImagePreview}><img src={product.imageUrl} alt={product.imageAlt || product.productName} /></div><DetailItem label="Texto Alternativo" value={product.imageAlt} /></div><div className={styles.productInfoColumn}><h3 className={styles.topicTitle}>Informações Principais</h3><DetailItem label="Nome do Produto" value={product.productName} /><DetailItem label="Empresa" value={product.companyName} /><DetailItem label="Categoria" value={product.categoria} /><h3 className={styles.topicTitle}>Detalhes de Preço e Venda</h3><DetailItem label="Preço Original" value={`R$ ${product.originalPrice}`} /><DetailItem label="Preço Atual" value={`R$ ${product.currentPrice}`} /><DetailItem label="Desconto" value={`${product.discountPercentage || 0}%`} /><DetailItem label="Parcelamento" value={product.installments} /><h3 className={styles.topicTitle}>Logística e Marketing</h3><DetailItem label="Informação de Frete" value={product.shippingInfo} /><DetailItem label="Desconto Especial" value={product.specialDiscount} /><h3 className={styles.topicTitle}>Atributos e Descrição</h3><DetailItem label="Benefícios" value={product.benefits} isArray={true} /><p><strong>Descrição Completa:</strong></p><p>{product.description || 'Nenhuma descrição fornecida.'}</p></div></div></div>
                <div className={styles.modalActions}><button onClick={() => onReject(product.id)} className={styles.rejectButton}>Rejeitar</button><button onClick={() => onApprove(product.id)} className={styles.approveButton}>Aprovar Produto</button></div>
            </div>
        </div>
    );
};

// Placeholders
const PedidosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Pedidos</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const ProdutosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Produtos</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const UsuariosView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Gerenciamento de Usuários</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);
const SuporteView = () => (<div className={styles.viewContainer}><div className={styles.contentHeader}><h2>Tickets de Suporte</h2><p className={styles.placeholderText}>Área em construção...</p></div></div>);


function AdminDashboard() {
    const [activeView, setActiveView] = useState('dashboard');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [productToVerify, setProductToVerify] = useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiModalTitle, setAiModalTitle] = useState('');
    const [aiModalContent, setAiModalContent] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const { pendingProducts, approveProduct, rejectProduct } = usePendingProducts();

    const handleVerifyProductClick = (product) => {
        setProductToVerify(product);
        setIsVerificationModalOpen(true);
    };

    const handleApproveProduct = (productId) => {
        approveProduct(productId);
        setIsVerificationModalOpen(false);
    };

    const handleRejectProduct = (productId) => {
        rejectProduct(productId);
        setIsVerificationModalOpen(false);
    };

    const callGeminiAPI = async (prompt) => {
        const apiKey = "AIzaSyBSp24cHyAOSXIAVX_Xd2ewKxmC4_NZ4e8";
        if (!apiKey) {
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
            return `Desculpe, ocorreu um erro ao contatar a IA: ${error.message}`;
        }
    };

    const handleGerarRelatorio = async (metrics, traffic) => {
        setIsAiModalOpen(true);
        setIsAiLoading(true);
        setAiModalTitle('Relatório de Performance ✨');
        setAiModalContent('');
        const nomeMesAtual = new Date().toLocaleString('pt-BR', { month: 'long' });
        const primeiroLetraMaiuscula = nomeMesAtual.charAt(0).toUpperCase() + nomeMesAtual.slice(1);
        const prompt = `Você é um analista de dados sênior para um e-commerce de produtos sustentáveis chamado Lume. Com base nos seguintes KPIs do mês de ${primeiroLetraMaiuscula}, escreva um relatório conciso em 3 parágrafos, formatado com Markdown. O primeiro parágrafo deve resumir a performance geral. O segundo deve destacar pontos positivos e áreas de preocupação. O terceiro deve oferecer duas sugestões de ações claras e práticas para melhorar os resultados no próximo mês. Dados:\n- Vendas Totais: ${metrics.vendas.value} (${metrics.vendas.trend})\n- Novos Usuários: ${metrics.usuarios.value} (${metrics.usuarios.trend})\n- Pedidos Pendentes: ${metrics.pedidos.value}\n- Taxa de Conversão: ${metrics.conversao.value} (${metrics.conversao.trend})\n- Fontes de Tráfego: ${traffic}`;
        const report = await callGeminiAPI(prompt);
        setAiModalContent(report);
        setIsAiLoading(false);
    };

    const handleAnalisarPedido = async (pedido) => {
        setIsAiModalOpen(true);
        setIsAiLoading(true);
        setAiModalTitle(`Análise do Pedido ${pedido.id}`);
        setAiModalContent('');
        let prompt = `Você é um especialista em e-commerce da Lume. Analise o seguinte pedido e sugira uma ação clara e profissional, formatada em Markdown.\n- Pedido ID: ${pedido.id}\n- Cliente: ${pedido.cliente}\n- Valor: R$ ${pedido.valor}\n- Status: ${pedido.status}`;
        if (pedido.status === 'Pendente') {
            prompt += "\nO pedido está pendente. Sugira um rascunho de e-mail curto e amigável para enviar ao cliente, informando sobre o status e dando uma previsão de envio. Adicionalmente, liste em tópicos duas possíveis causas internas para o atraso.";
        } else if (pedido.status === 'Cancelado') {
            prompt += "\nO pedido foi cancelado. Sugira um rascunho de e-mail curto e amigável para enviar ao cliente, lamentando o ocorrido e oferecendo um cupom de 10% de desconto para uma futura compra como gesto de boa vontade.";
        } else {
            prompt += "\nResuma a situação do pedido e sugira se alguma ação de acompanhamento (como um e-mail de agradecimento ou pedido de avaliação) é necessária.";
        }
        const analysis = await callGeminiAPI(prompt);
        setAiModalContent(analysis);
        setIsAiLoading(false);
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardHome onAnalisarPedido={handleAnalisarPedido} onGerarRelatorio={handleGerarRelatorio} />;
            case 'pedidos': return <PedidosView />;
            case 'produtos': return <ProdutosView />;
            case 'verificacao': return <VerificacaoProdutosView pendingProducts={pendingProducts} onVerifyProduct={handleVerifyProductClick} />;
            case 'usuarios': return <UsuariosView />;
            case 'suporte': return <SuporteView />;
            default: return <DashboardHome onAnalisarPedido={handleAnalisarPedido} onGerarRelatorio={handleGerarRelatorio} />;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>L</div><h1>Lume Admin</h1>
                </div>
                <nav className={styles.sidebarNav}>
                    <ul>
                        <li><button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? styles.activeLink : ''}><span>Dashboard</span></button></li>
                        <li><button onClick={() => setActiveView('pedidos')} className={activeView === 'pedidos' ? styles.activeLink : ''}><span>Pedidos</span></button></li>
                        <li><button onClick={() => setActiveView('produtos')} className={activeView === 'produtos' ? styles.activeLink : ''}><span>Produtos</span></button></li>
                        <li>
                            <button onClick={() => setActiveView('verificacao')} className={`${activeView === 'verificacao' ? styles.activeLink : ''} ${styles.verificationLink}`}>
                                <span>Verificação</span>
                                {pendingProducts.length > 0 && <span className={styles.notificationBadge}>{pendingProducts.length}</span>}
                            </button>
                        </li>
                        <li><button onClick={() => setActiveView('usuarios')} className={activeView === 'usuarios' ? styles.activeLink : ''}><span>Usuários</span></button></li>
                        <li><button onClick={() => setActiveView('suporte')} className={activeView === 'suporte' ? styles.activeLink : ''}><span>Suporte</span></button></li>
                    </ul>
                </nav>
                <div className={styles.sidebarFooter}><a href="#"><span>Sair</span></a></div>
            </aside>

            <main className={styles.mainContent}>
                {renderView()}
            </main>

            <ProductVerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                product={productToVerify}
                onApprove={handleApproveProduct}
                onReject={handleRejectProduct}
            />

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
