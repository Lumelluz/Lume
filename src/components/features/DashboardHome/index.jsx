import { useEffect, useRef, useState } from 'react';
import styles from './DashboardHome.module.css';
import { Chart, registerables } from 'chart.js';
import { useProducts } from '../../../context/ProductContext';
import MetricCard from '../../ui/MetricCard';

Chart.register(...registerables);

function DashboardHome({ onAnalisarPedido, onGerarRelatorio }) {
    const salesChartRef = useRef(null);
    const trafficChartRef = useRef(null);
    const { products } = useProducts();

    const [metricsData, setMetricsData] = useState(null);
    const [trafficData, setTrafficData] = useState('');
    const [recentOrders, setRecentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = () => {
            setMetricsData({
                vendas: { value: "R$ 45.897,00", trend: "+2.5% vs. mês passado" },
                usuarios: { value: "1.250", trend: "+12% vs. mês passado" },
                pedidos: { value: "32", trend: "Aguardando envio" },
                conversao: { value: "3.18%", trend: "-0.2% vs. semana passada" }
            });
            setTrafficData("Orgânico (45%), Social (25%), Direto (20%), Referência (10%)");

            const sortedProducts = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
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
    }, [products]);

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
                <p>Em fase experimental, esses dados podem estar errados.</p>
                {/* onClick={() => onGerarRelatorio(metricsData, trafficData)}  */}
                {/* <button onClick={() => alert('Funcionalidade ainda não implementada!')} className={styles.geminiButton}>Gerar Relatório ✨</button> */}
            </div>
            <div className={styles.metricsGrid}>
                <MetricCard id="card-vendas" title="Vendas Totais" value={metricsData.vendas.value} trend={metricsData.vendas.trend} trendColor="green" />
                <MetricCard id="card-usuarios" title="Novos Usuários" value={metricsData.usuarios.value} trend={metricsData.usuarios.trend} trendColor="green" />
                <MetricCard id="card-pedidos" title="Pedidos Pendentes" value={metricsData.pedidos.value} trend={metricsData.pedidos.trend} trendColor="yellow" />
                <MetricCard id="card-conversao" title="Taxa de Conversão" value={metricsData.conversao.value} trend={metricsData.conversao.trend} trendColor="red" />
            </div>

          <div className={styles.tableCard}>
    <h3 className={styles.tableTitle}>Pedidos Recentes</h3>
    <div className={styles.tableWrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Pedido ID</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th className="text-right">Total</th>
                    <th className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {recentOrders.map(order => (
                    <tr key={order.id}>
                        <td data-label="Pedido ID" className={styles.orderId}>{order.id}</td>
                        <td data-label="Cliente">{order.cliente}</td>
                        <td data-label="Data">{order.data}</td>
                        <td data-label="Status">
                            <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>{order.status}</span>
                        </td>
                        <td data-label="Total" className="text-right font-semibold">R$ {order.valor}</td>
                        <td data-label="Ações" className="text-center">
                            <button className={styles.analisarButton} onClick={() => { alert('Funcionalidade ainda não implementada!')} }>Analisar ✨</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
        </>
    );
}

export default DashboardHome;
