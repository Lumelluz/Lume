import { Link } from 'react-router-dom';
import styles from './ProdutosItemsCompletos2.module.css';
import { useCart } from '../../context/CartContext';

const StarRating = ({ rating }) => {
  // Lógica para estrelas (pode ser melhorada no futuro)
  return <div className={styles.stars}>★★★★★</div>;
};

const ProdutosItemsCompletos2 = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const {
    id,
    imageUrl,
    imageAlt,
    companyName,
    productName,
    isVerified,
    rating,
    originalPrice,
    currentPrice = 0,
    discountPercentage,
    installments,
    specialDiscount,
    shippingInfo,
    benefits = [],
  } = product;

  const showOriginalPrice = originalPrice && originalPrice > currentPrice;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/produto-especifico/${id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
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
            {installments && <p className={styles.installments}>{installments}</p>}
          </div>

          {specialDiscount && (
            <p className={styles.specialDiscount}>{specialDiscount}</p>
          )}

          {(shippingInfo || benefits.length > 0) && (
            <div className={styles.extraInfo}>
              {shippingInfo && <p>Frete: <span className={styles.shipping}>{shippingInfo}</span></p>}
              {benefits.length > 0 && <p>Benefícios: <span className={styles.benefits}>{benefits.join(', ')}...</span></p>}
            </div>
          )}

          <div className={styles.buttonContainer}>
            <button onClick={handleAddToCart} className={styles.addToCartButton}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProdutosItemsCompletos2;