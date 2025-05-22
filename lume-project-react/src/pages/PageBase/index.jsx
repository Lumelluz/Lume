// src/pages/PageBase/PageBase.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaisInformacoes from '../../components/MaisInformacoes';
import styles from './PageBase.module.css';

function PageBase() {

  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const showHeaderRoutes = ['/', '/sobre-nos'];
  const showFooterRoutes = ['/', '/sobre-nos', '/login'];

  const shouldShowHeader = showHeaderRoutes.includes(currentPath);
  const shouldShowFooter = showFooterRoutes.includes(currentPath);

  const shouldShowMaisInformacoes = currentPath === '/';


  return (
    <>
      <div className={styles.backgroundImage}>
        {shouldShowHeader && <Header />}
        <main>
          <Outlet />
        </main>
      </div>

      {shouldShowMaisInformacoes && <MaisInformacoes />}
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default PageBase;
