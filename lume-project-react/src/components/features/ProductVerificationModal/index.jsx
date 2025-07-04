import { useState, useEffect } from 'react';
import styles from './ProductVerificationModal.module.css';

const categoryOptions = {
  'Casa Sustentável': ['Casa e decoração', 'Festas', 'Produtos de limpeza ecológicos', 'Itens de cozinha', 'Composteiras domésticas', 'Purificadores e filtros de água'],
  'Moda Sustentável': ['Roupas ecológicas', 'Calçados veganos', 'Acessórios recicláveis ou biodegradáveis', 'Bolsas e mochilas sustentáveis'],
  'Comidas': ['Vegano', 'Vegetariano', 'Bebidas', 'Lanche', 'Almoço/Janta'],
};

function ProductVerificationModal({ product, isOpen, onClose, onApprove, onReject, onUpdate }) {
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
        const { name, value, type, checked } = e.target;
        setEditableData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleMainCategoryChange = (e) => {
        const mainCategory = e.target.value;
        setSelectedMainCategory(mainCategory);
        const newSubcategories = categoryOptions[mainCategory] || [];
        setSubcategories(newSubcategories);
        setEditableData(prev => ({ ...prev, categoria: newSubcategories[0] || '' }));
    };
    
    const prepareDataToSend = () => {
        return {
            ...editableData,
            originalPrice: parseFloat(editableData.originalPrice) || 0,
            currentPrice: parseFloat(editableData.currentPrice) || 0,
            benefits: Array.isArray(editableData.benefits) ? editableData.benefits : String(editableData.benefits).split(',').map(item => item.trim()).filter(item => item),
            features: Array.isArray(editableData.features) ? editableData.features : String(editableData.features).split(',').map(item => item.trim()).filter(item => item),
        };
    };

    const handleSaveChanges = () => {
        const dataToSend = prepareDataToSend();
        onUpdate(product.id, dataToSend);
        alert('Alterações salvas!');
    };

    const handleApproveClick = () => {
        const dataToSend = prepareDataToSend();
        onApprove(product.id, dataToSend);
    };

    const allImages = [editableData.imageUrl, ...(editableData.galleryImages || [])].filter(Boolean);

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modalContent} ${styles.verificationModalContent}`} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>Analisar e Editar Produto</h2>
                <form onSubmit={(e) => e.preventDefault()} className={styles.modalBody}>
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
                            <label>Empresa:</label><input type="text" name="companyName" value={editableData.companyName || ''} onChange={handleChange} className={styles.modalInput} />
                            <label>Categoria Principal:</label>
                            <select value={selectedMainCategory} onChange={handleMainCategoryChange} className={styles.modalInput}>
                                <option value="" disabled>Selecione a categoria principal</option>
                                {Object.keys(categoryOptions).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <label>Subcategoria:</label>
                            <select name="categoria" value={editableData.categoria || ''} onChange={handleChange} className={styles.modalInput} disabled={!selectedMainCategory}>
                                <option value="" disabled>Selecione a subcategoria</option>
                                {subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <label>Texto Alternativo (SEO):</label><input type="text" name="imageAlt" value={editableData.imageAlt || ''} onChange={handleChange} className={styles.modalInput} />
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
                            <label>Descrição:</label><textarea name="description" value={editableData.description || ''} onChange={handleChange} rows="5" className={styles.modalTextarea}></textarea>
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => onReject(product.id)} className={styles.rejectButton}>Rejeitar</button>
                        <button type="button" onClick={handleSaveChanges} className={styles.saveButton}>Salvar Alterações</button>
                        <button type="button" onClick={handleApproveClick} className={styles.approveButton}>Salvar e Aprovar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductVerificationModal;
