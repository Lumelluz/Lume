import React, { useState } from 'react';
import styles from './CadastrarProdutos.module.css';
import { usePendingProducts } from '../../context/PendingProductContext';

function CadastrarProdutos() {
    const { addProductToVerification } = usePendingProducts();

    const [formData, setFormData] = useState({
        productName: '',
        companyName: '',
        categoria: '',
        description: '',
        imageUrl: null, // URL em Base64
        imageFile: null,
        imageAlt: '',
        originalPrice: '',
        currentPrice: '',
        discountPercentage: '',
        installments: '',
        shippingInfo: '',
        benefits: '',
        specialDiscount: '',
        isVerified: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageFile: file,
                    imageUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.imageUrl) {
            alert('Por favor, selecione uma imagem para o produto.');
            return;
        }

        const productDataToSend = {
            ...formData,
            benefits: formData.benefits.split(',').map(item => item.trim()).filter(item => item)
        };

        addProductToVerification(productDataToSend);

        alert('Produto enviado para verificação da Lume!');

        setFormData({
            productName: '', companyName: '', categoria: '', description: '',
            imageUrl: null, imageFile: null, imageAlt: '', originalPrice: '',
            currentPrice: '', discountPercentage: '', installments: '',
            shippingInfo: '', benefits: '', specialDiscount: '', isVerified: false,
        });
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <h1 className={styles.mainTitle}>Cadastre seu produto</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <h3>Informações Básicas</h3>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="productName">Nome do Produto*</label>
                            <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} placeholder="Ex: Camiseta Orgânica" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="companyName">Nome da Sua Empresa*</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Ex: Lume Sustentável" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="imageAlt">Texto Alternativo da Imagem*</label>
                            <input type="text" id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} placeholder="Descreva a imagem (acessibilidade)" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="categoria">Categoria*</label>
                            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Ex: Roupas Ecológicas" required />
                        </div>

                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <h3>Preços e Venda</h3>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="originalPrice">Preço Original (R$)</label>
                            <input type="number" step="0.01" id="originalPrice" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Ex: 99.90 (sem desconto)" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="currentPrice">Preço Atual (R$)*</label>
                            <input type="number" step="0.01" id="currentPrice" name="currentPrice" value={formData.currentPrice} onChange={handleChange} placeholder="Ex: 89.90" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="discountPercentage">Desconto (%)</label>
                            <input type="number" id="discountPercentage" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Ex: 10" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="installments">Informação de Parcelamento</label>
                            <input type="text" id="installments" name="installments" value={formData.installments} onChange={handleChange} placeholder="Ex: em até 3x de R$ 29,97" />
                        </div>

                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <h3>Detalhes Adicionais</h3>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="shippingInfo">Informação de Frete</label>
                            <input type="text" id="shippingInfo" name="shippingInfo" value={formData.shippingInfo} onChange={handleChange} placeholder="Ex: Frete grátis" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="specialDiscount">Desconto Especial</label>
                            <input type="text" id="specialDiscount" name="specialDiscount" value={formData.specialDiscount} onChange={handleChange} placeholder="Ex: 10% OFF na primeira compra" />
                        </div>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <label htmlFor="benefits">Benefícios (separados por vírgula)</label>
                            <input type="text" id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Ex: Vegano, Livre de Plástico, Artesanal" />
                        </div>
                        <div className={`${styles.formGroup} ${styles.spanFull} ${styles.checkboxWrapper}`}>
                            <input type="checkbox" id="isVerified" name="isVerified" checked={formData.isVerified} onChange={handleChange} />
                            <label htmlFor="isVerified">Produto Verificado pela Lume</label>
                        </div>
                    </div>

                    <div className={styles.imageUploadSection}>
                        <h3>Imagem Principal do Produto*</h3>
                        <label htmlFor="imageUpload" className={styles.imageUploadBox}>
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Pré-visualização" className={styles.imagePreview} />
                            ) : (
                                <div className={styles.uploadPlaceholder}>
                                    <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                    <span>Clique para carregar</span>
                                </div>
                            )}
                        </label>
                        <input id="imageUpload" name="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenFileInput} />
                    </div>

                    <button type="submit" className={styles.submitButton}>Enviar para Verificação</button>
                </form>
            </div>
        </main>
    );
}

export default CadastrarProdutos;
