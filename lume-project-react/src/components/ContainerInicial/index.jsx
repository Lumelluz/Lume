import styles from './ContainerInicial.module.css';
import ContainerEsquerda from './ContainerEsquerda';
import ContainerDireita from './ContainerDireita';
import { useState, useEffect } from 'react';
import imagemProduto1 from '../../assets/img/imagemProduto1.png';
import imagemProduto2 from '../../assets/img/imagemProduto2.png';
import imagemProduto3 from '../../assets/img/imagemProduto3.png';
import imagemProduto4 from '../../assets/img/imagemProduto4.png';

function ContainerInicial() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verificarTela = () => setIsMobile(window.innerWidth <= 1220);
    verificarTela();
    window.addEventListener('resize', verificarTela);
    return () => window.removeEventListener('resize', verificarTela);
  }, []);

  const produtos = [imagemProduto1, imagemProduto2, imagemProduto3, imagemProduto4].map(img => ({
    imagemProduto: img,
    nomeProduto: 'Toalha de banho macia de algodão',
    deDescontoPor: '79.90',
    preco: 'R$ 44.90',
    off: '37.50% OFF',
    parcelas: 'em 5x R$ 8.98'
  }));

  return (
    <section className={styles.sectionQueAgrupaTodosOsElementos}>
      <ContainerEsquerda isMobile={isMobile} />
      <ContainerDireita produtos={produtos} />
    </section>
  );
}

export default ContainerInicial;
