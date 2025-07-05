import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MaisInformacoes from '../../components/features/MaisInformacoes';
import styles from './PageBase.module.css';
import BotoesNavegacao from '../../components/layout/BotoesNavegacao';
import { useState, useEffect } from 'react';
import ChatButton from '../../components/features/ChatButton';
import ChatModal from '../../components/features/ChatModal';
import VLibras from '../../components/features/VLibras';
import SettingsModal from '../../components/features/SettingsModal';
import CartModal from '../../components/features/CartModal';
import AccessibilityMenu from '../../components/features/AccessibilityMenu';
import { AuthSessionManager } from '../../context/AuthContext';


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

  const showHeaderRoutes = ['/', '/login', '/sobre-nos', '/fale-conosco', '/perguntas-frequentes', '/produtos', '/parcerias', '/missoes-beneficios', '/politica-privacidade', '/cadastrar-produto', '/cadastro', '/cadastrar-empresa', '/admin-dashboard', '/perfil-empresa', '/assinatura-lume-clientes', '/politicas-privacidade', '/seja-parceiro', '/perfil'];

  const showFooterRoutes = ['/', '/login', '/sobre-nos', '/fale-conosco', '/perguntas-frequentes', '/produtos', '/parcerias', '/missoes-beneficios', '/politica-privacidade', '/cadastrar-produto', '/cadastro', '/cadastrar-empresa', '/admin-dashboard', '/perfil-empresa', '/assinatura-lume-clientes', '/politicas-privacidade', '/seja-parceiro', '/perfil'];

  const shouldShowHeader = showHeaderRoutes.includes(currentPath) || currentPath.startsWith('/produto-especifico/') || currentPath.startsWith('/pagina-vendedor/');
  const shouldShowFooter = showFooterRoutes.includes(currentPath) || currentPath.startsWith('/produto-especifico/') || currentPath.startsWith('/pagina-vendedor/');;
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
     <AuthSessionManager /> 
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
