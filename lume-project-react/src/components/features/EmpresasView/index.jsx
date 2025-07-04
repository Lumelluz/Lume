import styles from './EmpresasView.module.css';

function EmpresasView({ businesses, onEditBusiness }) {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}>
                <h2>Empresas Cadastradas</h2>
            </div>
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nome Fantasia</th>
                                <th>CNPJ</th>
                                <th>Responsável (Email)</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {businesses.length > 0 ? (
                                businesses.map(business => (
                                    <tr key={business.id} onClick={() => onEditBusiness(business)} className={styles.clickableRow}>
                                        <td className="font-semibold">{business.nomeFantasia}</td>
                                        <td>{business.cnpj}</td>
                                        <td>{business.responsavelEmail}</td>
                                        <td className="text-center">
                                            <span className={styles.analisarButton}>Editar</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-gray-500">
                                        Nenhuma empresa cadastrada.
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

export default EmpresasView;
