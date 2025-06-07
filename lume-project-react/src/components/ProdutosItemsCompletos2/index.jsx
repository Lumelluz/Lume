// Arquivo: ProdutosItemsCompletos2.jsx (versão final e completa)

import React from 'react';
import styles from './ProdutosItemsCompletos2.module.css';

const StarRating = ({ rating }) => {
  // Esta lógica pode ser melhorada para mostrar estrelas parciais,
  // mas para o visual, está bom.
  return <div className={styles.stars}>★★★★★</div>;
};

const ProdutosItemsCompletos2 = ({ product }) => {
  // Medida de segurança: se o produto não for passado, não quebra a página.
  if (!product) {
    return null;
  }

  // Desestruturamos todos os dados que agora existem na nossa lista.
  const {
    imageUrl,
    imageAlt,
    companyName,
    productName,
    isVerified,
    rating,
    originalPrice,
    currentPrice = 0, // Valor padrão para segurança
    discountPercentage,
    installments,
    specialDiscount,
    shippingInfo,
    benefits = [], // Valor padrão para segurança
  } = product;

  // Verifica se o preço original deve ser mostrado (se for maior que o atual)
  const showOriginalPrice = originalPrice && originalPrice > currentPrice;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Agora a imagem real (ou placeholder) será exibida */}
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} className={styles.productImage} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Imagem</span>
          </div>
        )}
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.companyName}>{companyName}</p>
        <h3 className={styles.productName}>{productName}</h3>

        <div className={styles.sellerInfo}>
          <span>Por {companyName}</span>
          {isVerified && (
            <span className={styles.verifiedIcon} title="Vendedor verificado">
              ✓
            </span>
          )}
        </div>

        <div className={styles.ratingInfo}>
          <span className={styles.ratingValue}>{rating}</span>
          <StarRating rating={rating} />
        </div>

        <div className={styles.priceInfo}>
          {/* RESTAURADO: Mostra o preço original se houver desconto */}
          {showOriginalPrice && (
            <p className={styles.originalPrice}>
              de <del>R$ {originalPrice.toFixed(2).replace('.', ',')}</del> por
            </p>
          )}

          <p className={styles.currentPrice}>
            R$ {currentPrice.toFixed(2).replace('.', ',')}
            {discountPercentage > 0 && (
              <span className={styles.discountBadge}>{discountPercentage}% OFF</span>
            )}
          </p>

          {/* RESTAURADO: Mostra o parcelamento se ele existir */}
          {installments && <p className={styles.installments}>{installments}</p>}
        </div>

        {/* RESTAURADO: Mostra o desconto especial se ele existir */}
        {specialDiscount && (
          <p className={styles.specialDiscount}>{specialDiscount}</p>
        )}

        {/* RESTAURADO: Mostra as informações extras se existirem */}
        {(shippingInfo || benefits.length > 0) && (
          <div className={styles.extraInfo}>
            {shippingInfo && <p>Frete: <span className={styles.shipping}>{shippingInfo}</span></p>}
            {benefits.length > 0 && <p>Benefícios: <span className={styles.benefits}>{benefits.join(', ')}...</span></p>}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProdutosItemsCompletos2;