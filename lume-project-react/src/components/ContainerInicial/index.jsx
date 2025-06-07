import styles from './ContainerInicial.module.css';
import ContainerEsquerda from './ContainerEsquerda';
import ContainerDireita from './ContainerDireita'; // Este componente vai usar o CarrosselProdutos
import { useState, useEffect } from 'react';

// Importe suas imagens de produto
import imagemProduto1 from '../../assets/img/imagemProduto1.png';
import imagemProduto2 from '../../assets/img/imagemProduto2.png';
import imagemProduto3 from '../../assets/img/imagemProduto3.png';
import imagemProduto4 from '../../assets/img/imagemProduto4.png';
import imagemProduto5 from '../../assets/img/imagemProduto4.png'; // Exemplo
import imagemProduto6 from '../../assets/img/imagemProduto4.png'; // Exemplo

function ContainerInicial() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verificarTela = () => setIsMobile(window.innerWidth <= 1220);
    verificarTela();
    window.addEventListener('resize', verificarTela);
    return () => window.removeEventListener('resize', verificarTela);
  }, []);

  // Ajustando a estrutura dos dados para o ProdutoItemCarrossel
  const produtosParaCarrossel = [
    // Adicione imageUrl e imageAlt a todos os seus produtos
    { id: 'carrossel-1', imageUrl: imagemProduto1, imageAlt: 'Toalha de Banho Algodão', productName: 'Toalha de Banho Algodão', originalPrice: 79.90, currentPrice: 44.90, discountPercentage: 37.50, installments: 'em 5x R$ 8.98' },
    { id: 'carrossel-2', imageUrl: imagemProduto2, imageAlt: 'Vela Aromática Soja', productName: 'Vela Aromática Soja', originalPrice: 45.00, currentPrice: 35.00, discountPercentage: 22, installments: 'em 3x R$ 11.67' },
    { id: 'carrossel-3', imageUrl: imagemProduto3, imageAlt: 'Kit Sabonetes Veganos', productName: 'Kit Sabonetes Veganos', currentPrice: 59.90, installments: 'em 2x R$ 29.95' },
    { id: 'carrossel-4', imageUrl: imagemProduto4, imageAlt: 'Copo Reutilizável Bambu', productName: 'Copo Reutilizável Bambu', originalPrice: 29.90, currentPrice: 19.90, discountPercentage: 33, installments: null },
    { id: 'carrossel-5', imageUrl: imagemProduto5, imageAlt: 'Bolsa Ecológica Feira', productName: 'Bolsa Ecológica Feira', currentPrice: 22.00, installments: null },
    { id: 'carrossel-6', imageUrl: imagemProduto6, imageAlt: 'Difusor de Ambientes', productName: 'Difusor de Ambientes', originalPrice: 99.00, currentPrice: 79.00, discountPercentage: 20, installments: 'em 4x R$ 19.75' },
  ];

  return (
    <section className={styles.sectionQueAgrupaTodosOsElementos}>
      <ContainerEsquerda isMobile={isMobile} />
      <ContainerDireita produtos={produtosParaCarrossel} />
    </section>
  );
}

export default ContainerInicial;