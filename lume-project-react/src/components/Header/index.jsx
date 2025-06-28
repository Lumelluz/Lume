import styles from './Header.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import UserActions from './UserActions';
import MobileActions from './MobileActions';

function Header({ isLoggedIn, onSettingsClick }) {
    return (
        <header className={styles.header}>
            <ul className={styles.headerList}>
                <li><Logo /></li>
                <li className={styles.navComSearch}>
                    <SearchBar />
                    <Navigation onSettingsClick={onSettingsClick} />
                </li>
                <li><UserActions isLoggedIn={isLoggedIn} /></li>
                <li><MobileActions /></li>
            </ul>
        </header>
    );
}

export default Header;
