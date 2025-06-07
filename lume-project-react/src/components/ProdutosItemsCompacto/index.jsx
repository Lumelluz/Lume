import styles from './ProdutosItemsCompacto.module.css';

const ProdutosItemsCompacto = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    imageUrl,
    imageAlt = 'Imagem do Produto', // fallback 'Imagem do Produto'
    productName,
    originalPrice,
    currentPrice = 0,
    discountPercentage,
    installments,
  } = product;

  const showOriginalPrice = originalPrice && originalPrice > currentPrice;

  return (
    <article className={styles.cardCompacto}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} className={styles.productImage} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Img</span>
          </div>
        )}
      </div>
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