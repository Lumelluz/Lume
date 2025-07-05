import { useState, useEffect } from 'react';
import styles from './BusinessEditModal.module.css';

function BusinessEditModal({ business, isOpen, onClose, onSave, onRemove }) {
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
                            <label>Razão Social:</label>
                            <input type="text" name="razaoSocial" value={editableData.razaoSocial || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Nome Fantasia:</label>
                            <input type="text" name="nomeFantasia" value={editableData.nomeFantasia || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>CNPJ:</label>
                            <input type="text" name="cnpj" value={editableData.cnpj || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Endereço:</label>
                            <input type="text" name="enderecoComercial" value={editableData.enderecoComercial || ''} onChange={handleChange} className={styles.modalInput} />
                        </div>
                        <div className={styles.productInfoColumn}>
                            <h3 className={styles.topicTitle}>Compromisso Ambiental</h3>
                            <label>Certificações:</label>
                            <textarea name="certificacoesAmbientais" value={editableData.certificacoesAmbientais || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
                            <label>Origem dos Materiais:</label>
                            <textarea name="origemDosMateriais" value={editableData.origemDosMateriais || ''} onChange={handleChange} rows="3" className={styles.modalTextarea}></textarea>
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

export default BusinessEditModal;
