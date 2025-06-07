import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaisInformacoes from '../../components/MaisInformacoes';
import styles from './PageBase.module.css';
import BotoesNavegacao from '../../components/BotoesNavegacao';
import { useState, useEffect } from 'react';

function PageBase() {

  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const showHeaderRoutes = ['/', '/sobre-nos', '/produtos', '/produto-especifico'];
  const showFooterRoutes = ['/', '/sobre-nos', '/login', '/produtos', '/produto-especifico'];

  const shouldShowHeader = showHeaderRoutes.includes(currentPath);
  const shouldShowFooter = showFooterRoutes.includes(currentPath);

  const shouldShowMaisInformacoes = currentPath === '/';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1030px)');

    const handleScreenChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleScreenChange);

    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);


  return (
    <>
      <div className={styles.backgroundImage}>
        {shouldShowHeader && <Header />}
        <main>
          <Outlet />
          {isMobile && <BotoesNavegacao />}
        </main>
      </div>

      {shouldShowMaisInformacoes && <MaisInformacoes />}
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default PageBase;
