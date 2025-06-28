import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaisInformacoes from '../../components/MaisInformacoes';
import styles from './PageBase.module.css';
import BotoesNavegacao from '../../components/BotoesNavegacao';
import { useState, useEffect } from 'react';
import ChatButton from '../../components/ChatButton';
import ChatModal from '../../components/ChatModal';
import VLibras from '../../components/VLibras';
import SettingsModal from '../../components/SettingsModal';
import CartModal from '../../components/CartModal';
import AccessibilityMenu from '../../components/AccessibilityMenu';

const initialFilters = {
  saturation: 100,
  contrast: 100,
  brightness: 100,
  sepia: 0,
  hueRotate: 0,
};

function PageBase() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const showHeaderRoutes = ['/', '/sobre-nos', '/produtos', '/produto-especifico:productId', '/fale-conosco'];
  const showFooterRoutes = ['/', '/sobre-nos', '/login', '/produtos', '/produto-especifico:productId', '/fale-conosco'];

  const shouldShowHeader = showHeaderRoutes.includes(currentPath) || currentPath.startsWith('/produto-especifico/');
  const shouldShowFooter = showFooterRoutes.includes(currentPath) || currentPath.startsWith('/produto-especifico/');
  const shouldShowMaisInformacoes = currentPath === '/';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [backgroundFilters, setBackgroundFilters] = useState(() => {
    try {
      const savedFilters = localStorage.getItem('lumeBackgroundSettings');
      console.log("Configurações salvas no localStorage:", savedFilters);

      return savedFilters ? JSON.parse(savedFilters) : initialFilters;
    } catch (error) {
      console.error("Erro ao ler as configurações do localStorage:", error);
      return initialFilters;
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1030px)');
    const handleScreenChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleScreenChange);
    setIsMobile(mediaQuery.matches);
    return () => mediaQuery.removeEventListener('change', handleScreenChange);
  }, []);

  const openSettingsModal = () => setIsSettingsOpen(true);
  const closeSettingsModal = () => setIsSettingsOpen(false);
  
  const handleSettingsChange = (newFilters) => {
    setBackgroundFilters(newFilters);
    try {
      localStorage.setItem('lumeBackgroundSettings', JSON.stringify(newFilters));
    } catch (error) {
      console.error("Erro ao salvar as configurações no localStorage:", error);
    }
  };

  const backgroundStyle = {
    filter: `
      saturate(${backgroundFilters.saturation}%) 
      contrast(${backgroundFilters.contrast}%) 
      brightness(${backgroundFilters.brightness}%)
      sepia(${backgroundFilters.sepia}%)
      hue-rotate(${backgroundFilters.hueRotate}deg)
    `,
  };

  return (
    <>
      <div className={styles.backgroundLayer} style={backgroundStyle} />
      
      <div className={styles.contentLayer}>
        {shouldShowHeader && <Header isLoggedIn={true} onSettingsClick={openSettingsModal} />}
        <main>
          <Outlet />
          {isMobile && <BotoesNavegacao />}
        </main>
        {shouldShowMaisInformacoes && <MaisInformacoes />}
        {shouldShowFooter && <Footer />}
      </div>
      
      <ChatButton />
      <ChatModal />
      <CartModal />
      <VLibras />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={closeSettingsModal}
        onSettingsChange={handleSettingsChange}
        currentFilters={backgroundFilters}
      />
      <AccessibilityMenu />
    </>
  );
}

export default PageBase;
