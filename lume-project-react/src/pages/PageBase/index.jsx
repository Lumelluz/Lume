import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './PageBase.module.css';
import { useState } from 'react';
import MaisInformacoes from '../../components/MaisInformacoes';

function PageBase() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Usuário');
    // const [profilePicture, setProfilePicture] = useState(null);

    const headerLogin = () => {
        setIsLoggedIn(true);
        setUserName('Lucas');
    }

    return (
        <>
        <div className={styles.backgroundImage}>
            <Header isLoggedIn={isLoggedIn} userName={userName}/>
            <main>
                <Outlet />
            </main>
        </div>
            { location.pathname === '/' && <MaisInformacoes />}
            <Footer />
        </>
    )
}

export default PageBase;