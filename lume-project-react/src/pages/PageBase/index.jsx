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

    return (
        <>
        <div className={styles.backgroundImage}>
            {shouldShowHeaderAndFooterOnHome && <Header />}
            <main>
                <Outlet />
            </main>
            {shouldShowMaisInformacoes && <MaisInformacoes/>}
            {shouldShowHeaderAndFooterOnHome && <Footer/>}
        </div>
        </>
    )
}

export default PageBase;