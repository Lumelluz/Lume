import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './PageBase.module.css';
import { useState } from 'react';
import MaisInformacoes from '../../components/MaisInformacoes';

function PageBase() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Usuário');


    // se a const for false não exibira a função (header, footer, mais informações)
    const shouldShowHeaderAndFooterOnHome = location.pathname === '/';
    const shouldShowMaisInformacoes = location.pathname === '/';

    // const [profilePicture, setProfilePicture] = useState(null);

    const headerLogin = () => {
        setIsLoggedIn(true);
        setUserName('Lucas');
    }

    return ( // nao na div backgroundImage
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
    )
}

export default PageBase;