import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileMenuModal.module.css';
import { useAuth } from '../../../context/AuthContext';

function ProfileMenuModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const menuOptions = {
    ROLE_ADMIN: [
      { label: 'Painel do Administrador', path: '/admin-dashboard' },
      { label: 'Meu Perfil', path: '/perfil' },
      { label: 'Painel da Empresa', path: '/perfil-empresa' }
    ],
    ROLE_BUSINESS: [
      { label: 'Painel da Empresa', path: '/perfil-empresa' },
      { label: 'Meu Perfil', path: '/perfil' }
    ],
    ROLE_USER: [
      { label: 'Meu Perfil', path: '/perfil' }
    ]
  };

  const optionsToShow = menuOptions[user?.role] || [];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileHeader}>
          <img src="https://placehold.co/80x80/e0e0e0/000000?text=G" alt="Foto de perfil" />
          <div className={styles.profileInfo}>
            <h4>{user?.nomeCompleto}</h4>
            <p>{user?.email}</p>
          </div>
        </div>
        <nav className={styles.navigation}>
          <ul>
            {optionsToShow.map(option => (
              <li key={option.path}>
                <Link to={option.path} onClick={onClose}>{option.label}</Link>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProfileMenuModal