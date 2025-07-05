import styles from './VerificacaoProdutosView.module.css';

function VerificacaoProdutosView({ pendingProducts, onVerifyProduct }) {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}>
                <h2>Verificação de Produtos Pendentes</h2>
            </div>
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nome do Produto</th>
                                <th>Empresa</th>
                                <th>Categoria</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingProducts.length > 0 ? (
                                pendingProducts.map(product => (
                                    <tr key={product.id} onClick={() => onVerifyProduct(product)} className={styles.clickableRow}>
                                        <td className="font-semibold">{product.productName}</td>
                                        <td>{product.companyName}</td>
                                        <td>{product.categoria}</td>
                                        <td className="text-center">
                                            <span className={styles.analisarButton}>Ver Detalhes</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-gray-500">
                                        Nenhum produto pendente de verificação.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VerificacaoProdutosView;
