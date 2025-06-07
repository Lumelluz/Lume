// Arquivo: ProdutoItemCompacto.jsx (Modificado para incluir imagem)

import React from 'react';
import styles from './ProdutosItemsCompacto.module.css';

const ProdutosItemsCompacto = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    imageUrl, // <-- NOVA PROP
    imageAlt = 'Imagem do Produto', // <-- NOVA PROP com fallback
    productName,
    originalPrice,
    currentPrice = 0,
    discountPercentage,
    installments,
  } = product;

  const showOriginalPrice = originalPrice && originalPrice > currentPrice;

  return (
    <article className={styles.cardCompacto}>
      {/* ▼▼▼ NOVA SEÇÃO DA IMAGEM ▼▼▼ */}
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} className={styles.productImage} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Img</span> {/* Texto mais curto para placeholder pequeno */}
          </div>
        )}
      </div>
      {/* ▲▲▲ FIM DA SEÇÃO DA IMAGEM ▲▲▲ */}

      <div className={styles.infoContainer}>
        <h3 className={styles.productName}>{productName}</h3>
        
        <div className={styles.priceInfo}>
          {showOriginalPrice && (
            <p className={styles.originalPrice}>
              de <del>R$ {originalPrice.toFixed(2).replace('.', ',')}</del>
            </p>
          )}
          <p className={styles.currentPrice}>
            R$ {currentPrice.toFixed(2).replace('.', ',')}
            {discountPercentage > 0 && (
              <span className={styles.discountBadge}>{discountPercentage}% OFF</span>
            )}
          </p>
          {installments && <p className={styles.installments}>{installments}</p>}
        </div>
      </div>
    </article>
  );
};

export default ProdutosItemsCompacto;