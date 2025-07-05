import styles from './ProdutosItems.module.css';

function ProdutosItems({ imagemProduto, nomeProduto, deDescontoPor, preco, off, parcelas }) {
  return (
    <figure className={styles.produtosItems}>
      <div className={styles.containerImagem}>
        <img src={imagemProduto} alt={nomeProduto} />
      </div>
      <figcaption>
        <h2>{nomeProduto}</h2>
        <p>de <del>R$ {deDescontoPor}</del> por</p>
        <div className={styles.porcentagemOff}>
          <p>R$ {preco}</p>
          <p>{off}</p>
        </div>
        <p>{parcelas}</p>
      </figcaption>
    </figure>
  );
}

export default ProdutosItems;
