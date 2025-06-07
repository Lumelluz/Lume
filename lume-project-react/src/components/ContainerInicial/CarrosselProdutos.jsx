// Arquivo: CarrosselProdutos.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutosItemsCompacto from '../ProdutosItemsCompacto/';
import styles from './ContainerInicial.module.css';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';

const ITENS_DESKTOP_LARGE_DEFAULT = 4;
const ITENS_DESKTOP_MEDIUM_DEFAULT = 3;
const ITENS_TABLET_DEFAULT = 2;
const ITENS_MOBILE_DEFAULT = 1;

// const LIMITE_EXIBICAO_BOTAO = 6; // Não precisamos mais desta constante para esta lógica
const MIN_SWIPE_DISTANCE = 50;

function CarrosselProdutos({ produtos }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  // const [produtosExibidosNoTotal, setProdutosExibidosNoTotal] = useState(0); // Removido, usaremos carrosselInteragido
  const navigate = useNavigate();
  const carrosselInnerRef = useRef(null);

  const [itensPorVez, setItensPorVez] = useState(ITENS_DESKTOP_LARGE_DEFAULT);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // --- NOVO ESTADO PARA O BOTÃO "VER MAIS" ---
  const [carrosselInteragido, setCarrosselInteragido] = useState(false);

  useEffect(() => {
    const getItensPorVezAtual = () => {
      if (window.innerWidth <= 486) return ITENS_MOBILE_DEFAULT;
      if (window.innerWidth <= 670) return ITENS_TABLET_DEFAULT;
      if (window.innerWidth <= 845) return ITENS_DESKTOP_MEDIUM_DEFAULT;
      return ITENS_DESKTOP_LARGE_DEFAULT;
    };
    const handleResize = () => {
      setItensPorVez(getItensPorVezAtual());
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // setProdutosExibidosNoTotal(Math.min(itensPorVez, produtos ? produtos.length : 0)); // Removido
    if (!produtos || produtos.length === 0) {
        setIndiceAtual(0);
        setCarrosselInteragido(false); // Reseta interação se os produtos mudarem e ficarem vazios
        return;
    }
    setIndiceAtual(prevIndice => {
      const maxIndicePossivel = Math.max(0, produtos.length - itensPorVez);
      return Math.min(prevIndice, maxIndicePossivel);
    });
  }, [produtos, itensPorVez]);

  if (!produtos || produtos.length === 0) {
    return <p>Sem produtos para exibir.</p>;
  }

  const totalProdutos = produtos.length;

  const proximoSlide = () => {
    if (totalProdutos <= itensPorVez) return; // Não faz nada se todos os itens já estão visíveis
    setCarrosselInteragido(true); // <<< MARCA INTERAÇÃO
    setIndiceAtual(prevIndice => {
      let proximo = prevIndice + 1;
      if (proximo > totalProdutos - itensPorVez) {
        proximo = 0;
      }
      return proximo;
    });
  };

  const slideAnterior = () => {
    if (totalProdutos <= itensPorVez) return; // Não faz nada se todos os itens já estão visíveis
    setCarrosselInteragido(true); // <<< MARCA INTERAÇÃO
    setIndiceAtual(prevIndice => {
      let anterior = prevIndice - 1;
      if (anterior < 0) {
        anterior = totalProdutos - itensPorVez;
        if(anterior < 0) anterior = 0;
      }
      return anterior;
    });
  };

  const handleVerMais = () => navigate('/produtos');
  // --- CONDIÇÃO ATUALIZADA PARA MOSTRAR O BOTÃO ---
  const mostrarBotaoVerMais = carrosselInteragido && totalProdutos > itensPorVez;

  const handleTouchStart = (e) => {
    setTouchEndX(0);
    setTouchStartX(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === 0) return;
    const currentTouchX = e.targetTouches[0].clientX;
    setTouchEndX(currentTouchX);
    if (Math.abs(currentTouchX - touchStartX) > 10) {
        setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping || touchStartX === 0 || touchEndX === 0 ) {
        setTouchStartX(0); setTouchEndX(0); setIsSwiping(false);
        return;
    }
    const distance = touchStartX - touchEndX;
    if (totalProdutos > itensPorVez) { // Só permite swipe se houver para onde ir
        if (distance > MIN_SWIPE_DISTANCE) {
            proximoSlide(); // Também vai setar carrosselInteragido
        } else if (distance < -MIN_SWIPE_DISTANCE) {
            slideAnterior(); // Também vai setar carrosselInteragido
        }
    }
    setTouchStartX(0); setTouchEndX(0); setIsSwiping(false);
  };

  const carrosselInnerStyle = {
    display: 'flex',
    width: `${(totalProdutos / itensPorVez) * 100}%`,
    transform: `translateX(-${(indiceAtual / totalProdutos) * ( (totalProdutos / itensPorVez) * 100 ) / (totalProdutos / itensPorVez)  }%)`,
    transition: 'transform 0.4s ease-in-out',
  };

  return (
    <div className={styles.carrosselWrapperCompleto}>
      <div className={styles.containerDireitaSetasCarrousel}>
        <button 
          onClick={slideAnterior} 
          className={styles.btnSetaCarrossel} 
          aria-label="Produto anterior"
          disabled={totalProdutos <= itensPorVez}
        >
          <img src={setaEsquerda} alt="Anterior" />
        </button>
        
        <div 
          className={styles.containerDireitaProdutosCarroselOuter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.containerDireitaProdutosCarroselInner} 
            style={carrosselInnerStyle}
            ref={carrosselInnerRef} // Ainda pode ser útil para medições ou animações mais complexas no futuro
          >
            {produtos.map((produto) => (
              <div 
                key={produto.id} 
                className={styles.produtoCarrosselItem}
                style={{ width: `${100 / totalProdutos}%` }} 
              >
                <ProdutosItemsCompacto product={produto} />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={proximoSlide} 
          className={styles.btnSetaCarrossel} 
          aria-label="Próximo produto"
          disabled={totalProdutos <= itensPorVez}
        >
          <img src={setaDireita} alt="Próximo" />
        </button>
      </div>
      {mostrarBotaoVerMais && (
        <button onClick={handleVerMais} className={styles.btnVerMaisProdutos}>
          Ver mais Produtos
        </button>
      )}
    </div>
  );
}

export default CarrosselProdutos;