import { useState } from 'react';
import styles from './Header.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import UserActions from './UserActions';
import MobileActions from './MobileActions';
import NavModal from '../../features/NavModal';
import UserActionsModal from '../../features/UserActionsModal';

function Header({ onSettingsClick }) {
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const toggleNavModal = () => setIsNavModalOpen(prev => !prev);
    const toggleUserModal = () => setIsUserModalOpen(prev => !prev);

    return (
        <>
            <header className={styles.header}>
                <ul className={styles.headerList}>
                    <li><Logo onMenuClick={toggleNavModal} /></li>
                    <li className={styles.navComSearch}>
                        <SearchBar />
                        <Navigation onSettingsClick={onSettingsClick} />
                    </li>
                    <li><UserActions onProfileClick={toggleUserModal} /></li>
                    <li><MobileActions onProfileClick={toggleUserModal} /></li>
                </ul>
            </header>
            
            <NavModal 
                isOpen={isNavModalOpen} 
                onClose={toggleNavModal} 
                onSettingsClick={onSettingsClick} 
            />
            <UserActionsModal 
                isOpen={isUserModalOpen} 
                onClose={toggleUserModal} 
            />
        </>
    );
}

export default Header;