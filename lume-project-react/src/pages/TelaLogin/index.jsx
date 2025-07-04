import ContainerLogin from '../../components/features/ContainerLogin'
import ContainerLoginSenha from '../../components/features/ContainerLoginSenha'
import { useState } from 'react'
import styles from '../TelaLogin/TelaLogin.module.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// --- Componente Principal da Página de Login ---
function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAvancarParaSenha = () => {
    setAnimando(true);
    setTimeout(() => {
      setMostrarSenha(true);
      setAnimando(false);
    }, 300);
  };

  const handleVoltarParaEmail = () => {
    setAnimando(true);
    setTimeout(() => {
      setMostrarSenha(false);
      setAnimando(false);
    }, 300);
  };

  const handleLogin = async (senha) => {
    setError('');
    setIsLoading(true);
    try {
      await login(email, senha);
      navigate('/produtos'); // Redireciona para o perfil em caso de sucesso
    } catch (err) {
      setError(err.message || 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.fadeContainer} ${animando ? styles.fadeOut : styles.fadeIn}`}>
      {mostrarSenha ? (
        <ContainerLoginSenha email={email} onVoltar={handleVoltarParaEmail} onLogin={handleLogin} />
      ) : (
        <ContainerLogin email={email} setEmail={setEmail} onAvancar={handleAvancarParaSenha} />
      )}
      {/* Exibe a mensagem de erro e o estado de carregamento */}
      {isLoading && <p className={styles.loadingMessage}>A autenticar...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default TelaLogin;
