import styles from './Header.module.css';
import lupaIcon from '../../assets/icons/lupaIcon.svg';

function SearchBar() {
    return (
        <div className={`${styles.headerListItens} ${styles.headerListItens2}`}>
            <label htmlFor="searchInput" className="sr-only">Pesquisar</label>
            <input
                id="searchInput"
                type="text"
                placeholder="Pesquisar produtos, categorias, marcas..."
                aria-label="Pesquisar"
            />
            <button type="submit" aria-label="Buscar">
                <img src={lupaIcon} alt="Ícone de lupa" />
            </button>
        </div>
    );
}

export default SearchBar;
