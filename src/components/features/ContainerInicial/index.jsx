import { useState, useEffect, useMemo } from 'react';
import styles from './ContainerInicial.module.css';
import ContainerEsquerda from './ContainerEsquerda';
import ContainerDireita from './ContainerDireita';
import { useProducts } from '../../../context/ProductContext';

function ContainerInicial() {
  const [isMobile, setIsMobile] = useState(false);

  const { products } = useProducts();

  useEffect(() => {
    const verificarTela = () => setIsMobile(window.innerWidth <= 1220);
    verificarTela();
    window.addEventListener('resize', verificarTela);
    return () => window.removeEventListener('resize', verificarTela);
  }, []);

  const produtosParaCarrossel = useMemo(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  }, [products]);

  return (
    <section className={styles.sectionQueAgrupaTodosOsElementos}>
      <ContainerEsquerda isMobile={isMobile} />
      <ContainerDireita produtos={produtosParaCarrossel} />
    </section>
  );
}

export default ContainerInicial;