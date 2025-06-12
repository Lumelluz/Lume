import styles from './Header.module.css';
import lupaIcon from '../../assets/icons/lupaIcon.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/produtos?q=${encodeURIComponent(pesquisa)}`);
    };

    return (
        <form onSubmit={handleSubmit} className={`${styles.headerListItens} ${styles.headerListItens2}`}>
            <label htmlFor="searchInput" className="sr-only">Pesquisar</label>
            <input
                id="searchInput"
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar produtos, categorias, marcas..."
                aria-label="Pesquisar"
            />
            <button type="submit" aria-label="Buscar">
                <img src={lupaIcon} alt="Ícone de lupa" />
            </button>
        </form>
    );
}

export default SearchBar;
