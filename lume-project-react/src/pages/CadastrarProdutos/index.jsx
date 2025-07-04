import { useState } from 'react';
import styles from './CadastrarProdutos.module.css';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

const categoryOptions = {
    'Casa Sustentável': ['Casa e decoração', 'Festas', 'Produtos de limpeza ecológicos', 'Itens de cozinha', 'Composteiras domésticas', 'Purificadores e filtros de água'],
    'Moda Sustentável': ['Roupas ecológicas', 'Calçados veganos', 'Acessórios recicláveis ou biodegradáveis', 'Bolsas e mochilas sustentáveis'],
    'Comidas': ['Vegano', 'Vegetariano', 'Bebidas', 'Lanche', 'Almoço/Janta'],
};

function CadastrarProdutos() {
    const { addProductToVerification } = useProducts();
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        productName: '',
        companyName: '',
        categoria: '',
        description: '',
        imageUrl: null,
        galleryImages: [],
        imageAlt: '',
        originalPrice: '',
        currentPrice: '',
        discountPercentage: '',
        installments: '',
        shippingInfo: '',
        benefits: '',
        specialDiscount: '',
        isVerified: false,
        features: '',
        reviews: [],
        ratingSummary: {},
        relatedProducts: []
    });

    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleMainCategoryChange = (e) => {
        const mainCategory = e.target.value;
        setSelectedMainCategory(mainCategory);
        const newSubcategories = categoryOptions[mainCategory] || [];
        setSubcategories(newSubcategories);
        setFormData(prev => ({ ...prev, categoria: '' }));
    };

    const handleImageChange = (e, isGallery = false) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (isGallery) {
            const totalSelected = files.length;
            const currentImages = formData.galleryImages.length;

            if (currentImages >= 4) {
                alert("Você já adicionou o máximo de 4 imagens.");
                return;
            }

            if (currentImages + totalSelected > 4) {
                alert(`Você pode adicionar no máximo ${4 - currentImages} imagem(ns).`);
                return;
            }
        }

        const filePromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises).then(base64Images => {
            if (isGallery) {
                setFormData(prev => ({
                    ...prev,
                    galleryImages: [...prev.galleryImages, ...base64Images]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: base64Images[0]
                }));
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.imageUrl || !formData.categoria) {
            alert('Por favor, preencha todos os campos obrigatórios, incluindo imagem principal e categoria.');
            return;
        }

        const productDataToSend = {
            ...formData,
            originalPrice: parseFloat(formData.originalPrice) || 0,
            currentPrice: parseFloat(formData.currentPrice) || 0,
            benefits: formData.benefits.split(',').map(item => item.trim()).filter(item => item),
            features: formData.features.split(',').map(item => item.trim()).filter(item => item),
        };

        setIsLoading(true);
        try {
            await addProductToVerification(productDataToSend, token);
            alert('Produto enviado para verificação da Lume!');

            setFormData({
                productName: '', companyName: '', categoria: '', description: '',
                imageUrl: null, galleryImages: [], imageAlt: '', originalPrice: '',
                currentPrice: '', discountPercentage: '', installments: '',
                shippingInfo: '', benefits: '', specialDiscount: '', isVerified: false,
                features: '', reviews: [], ratingSummary: {}, relatedProducts: []
            });
            setSelectedMainCategory('');
            setSubcategories([]);

        } catch (err) {
            setError(err.message || 'Ocorreu um erro ao cadastrar o produto.');
            console.error("Erro ao cadastrar produto:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <h1 className={styles.mainTitle}>Cadastre seu produto</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}><h3>Informações Básicas</h3></div>
                        <div className={styles.formGroup}><label htmlFor="productName">Nome do Produto*</label><input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} placeholder="Ex: Camiseta Orgânica" required /></div>
                        <div className={styles.formGroup}><label htmlFor="companyName">Nome da Sua Empresa*</label><input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Ex: Lume Sustentável" required /></div>

                        <div className={styles.formGroup}>
                            <label htmlFor="mainCategory">Categoria Principal*</label>
                            <select id="mainCategory" value={selectedMainCategory} onChange={handleMainCategoryChange} required>
                                <option value="" disabled>Selecione...</option>
                                {Object.keys(categoryOptions).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        {subcategories.length > 0 && (
                            <div className={styles.formGroup}>
                                <label htmlFor="categoria">Subcategoria*</label>
                                <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required>
                                    <option value="" disabled>Selecione...</option>
                                    {subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            </div>
                        )}
                        <div className={`${styles.formGroup} ${styles.spanFull}`}><label htmlFor="description">Descrição do Produto*</label><textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Descreva os detalhes e benefícios do seu produto" required rows="4"></textarea></div>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}><label htmlFor="imageAlt">Texto Alternativo da Imagem*</label><input type="text" id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} placeholder="Descreva a imagem (acessibilidade)" required /></div>

                        <div className={`${styles.formGroup} ${styles.spanFull}`}><h3>Preços e Venda</h3></div>
                        <div className={styles.formGroup}><label htmlFor="originalPrice">Preço Original (R$)</label><input type="number" step="0.01" id="originalPrice" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Ex: 99.90" /></div>
                        <div className={styles.formGroup}><label htmlFor="currentPrice">Preço Atual (R$)*</label><input type="number" step="0.01" id="currentPrice" name="currentPrice" value={formData.currentPrice} onChange={handleChange} placeholder="Ex: 89.90" required /></div>
                        <div className={styles.formGroup}><label htmlFor="discountPercentage">Desconto (%)</label><input type="number" id="discountPercentage" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Ex: 10" /></div>
                        <div className={styles.formGroup}><label htmlFor="installments">Informação de Parcelamento</label><input type="text" id="installments" name="installments" value={formData.installments} onChange={handleChange} placeholder="Ex: em até 3x de R$ 29,97" /></div>

                        <div className={`${styles.formGroup} ${styles.spanFull}`}><h3>Detalhes Adicionais</h3></div>
                        <div className={styles.formGroup}><label htmlFor="shippingInfo">Informação de Frete</label><input type="text" id="shippingInfo" name="shippingInfo" value={formData.shippingInfo} onChange={handleChange} placeholder="Ex: Frete grátis" /></div>
                        <div className={styles.formGroup}><label htmlFor="specialDiscount">Desconto Especial</label><input type="text" id="specialDiscount" name="specialDiscount" value={formData.specialDiscount} onChange={handleChange} placeholder="Ex: 10% OFF na primeira compra" /></div>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}><label htmlFor="benefits">Benefícios (separados por vírgula)</label><input type="text" id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Ex: Vegano, Livre de Plástico, Artesanal" /></div>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}><label htmlFor="features">Características (separadas por vírgula)</label><input type="text" id="features" name="features" value={formData.features} onChange={handleChange} placeholder="Ex: 100% Algodão, Feito à mão" /></div>
                    </div>

                    <div className={styles.imageUploadGrid}>
                        <div className={styles.imageUploadSection}>
                            <h3>Imagem Principal*</h3>
                            <label htmlFor="imageUpload" className={styles.imageUploadBox}>{formData.imageUrl ? (<img src={formData.imageUrl} alt="Pré-visualização" className={styles.imagePreview} />) : (<div className={styles.uploadPlaceholder}><span>+ Carregar Imagem</span></div>)}</label>
                            <input id="imageUpload" type="file" accept="image/*" onChange={(e) => handleImageChange(e, false)} className={styles.hiddenFileInput} />
                        </div>
                        <div className={styles.imageUploadSection}>
                            <h3>Galeria de Imagens (Máximo 4)</h3>
                            <label htmlFor="galleryUpload" className={styles.imageUploadBox}>{formData.galleryImages.length > 0 ? (<div className={styles.galleryPreview}>{formData.galleryImages.map((img, i) => <img key={i} src={img} alt={`Preview ${i}`} />)}</div>) : (<div className={styles.uploadPlaceholder}><span>+ Carregar Galeria</span></div>)}</label>
                            <input id="galleryUpload" type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e, true)} className={styles.hiddenFileInput} />
                        </div>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'A Enviar...' : 'Enviar para Verificação'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default CadastrarProdutos;
