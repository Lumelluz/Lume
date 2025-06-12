import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutosItemsCompacto from '../ProdutosItemsCompacto/';
import styles from './ContainerInicial.module.css';
import setaEsquerda from '../../assets/icons/setaEsquerda.svg';
import setaDireita from '../../assets/icons/setaDireita.svg';

const CARD_WIDTH = 170;
const CARD_GAP = 4;
const ITEM_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP;

const ITENS_DESKTOP_LARGE = 4;
const ITENS_DESKTOP_MEDIUM = 3;
const ITENS_TABLET = 2;
const ITENS_MOBILE = 1;

const MIN_SWIPE_DISTANCE = 50;

function CarrosselProdutos({ produtos }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [itensPorVez, setItensPorVez] = useState(ITENS_DESKTOP_LARGE);
  const [carrosselInteragido, setCarrosselInteragido] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getItensPorVezAtual = () => {
      if (window.innerWidth <= 500) return ITENS_MOBILE;
      if (window.innerWidth <= 700) return ITENS_TABLET;
      if (window.innerWidth <= 900) return ITENS_DESKTOP_MEDIUM;
      return ITENS_DESKTOP_LARGE;
    };
    const handleResize = () => setItensPorVez(getItensPorVezAtual());
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!produtos || produtos.length === 0) return;
    const maxIndicePossivel = Math.max(0, produtos.length - itensPorVez);
    if (indiceAtual > maxIndicePossivel) {
      setIndiceAtual(maxIndicePossivel);
    }
  }, [itensPorVez, produtos, indiceAtual]);


  if (!produtos || produtos.length === 0) {
    return <p>Sem produtos para exibir.</p>;
  }

  const totalProdutos = produtos.length;

  const proximoSlide = () => {
    if (!carrosselInteragido) setCarrosselInteragido(true);
    setIndiceAtual(prevIndice => (prevIndice + 1 > totalProdutos - itensPorVez) ? 0 : prevIndice + 1);
  };

  const slideAnterior = () => {
    if (!carrosselInteragido) setCarrosselInteragido(true);
    setIndiceAtual(prevIndice => (prevIndice - 1 < 0) ? Math.max(0, totalProdutos - itensPorVez) : prevIndice - 1);
  };

  const handleVerMais = () => navigate('/produtos');
  const mostrarBotaoVerMais = carrosselInteragido && totalProdutos > itensPorVez;

  const [touchStartX, setTouchStartX] = useState(0);
  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => {
    if (touchStartX === 0) return;
    const distance = touchStartX - e.targetTouches[0].clientX;
    if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
      if (distance > 0) proximoSlide();
      else slideAnterior();
      setTouchStartX(0);
    }
  };
  
  const carrosselInnerStyle = {
    display: 'flex',
    gap: `${CARD_GAP}px`,
    transform: `translateX(-${indiceAtual * ITEM_TOTAL_WIDTH}px)`,
    transition: 'transform 0.4s ease-in-out',
  };

  return (
    <div className={styles.carrosselWrapperCompleto}>
      <div className={styles.containerDireitaSetasCarrousel}>
        <button onClick={slideAnterior} className={styles.btnSetaCarrossel} aria-label="Produto anterior" disabled={totalProdutos <= itensPorVez}>
          <img src={setaEsquerda} alt="Anterior" />
        </button>
        <div 
          className={styles.containerDireitaProdutosCarroselOuter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className={styles.containerDireitaProdutosCarroselInner} style={carrosselInnerStyle}>
            {produtos.map((produto) => (
              <div key={produto.id} className={styles.produtoCarrosselItem}>
                <ProdutosItemsCompacto product={produto} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={proximoSlide} className={styles.btnSetaCarrossel} aria-label="Próximo produto" disabled={totalProdutos <= itensPorVez}>
          <img src={setaDireita} alt="Próximo" />
        </button>
      </div>
      {mostrarBotaoVerMais && (
        <button onClick={handleVerMais} className={styles.btnVerMaisProdutos}>Ver mais Produtos</button>
      )}
    </div>
  );
}

export default CarrosselProdutos;
