import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TelaLogin.module.css';
import ContainerLogin from '../../pages/ContainerLogin';
import ContainerLoginSenha from '../../pages/ContainerLoginSenha';

function TelaLogin() {
  const [etapa, setEtapa] = useState('email');
  const [animando, setAnimando] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erroApi, setErroApi] = useState('');
  const navigate = useNavigate();

  const handleAvancarParaSenha = () => {
    setAnimando(true);
    setTimeout(() => { setEtapa('senha'); setAnimando(false); }, 300);
  };

  const handleVoltarParaEmail = () => {
    setAnimando(true);
    setTimeout(() => { setEtapa('email'); setAnimando(false); }, 300);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErroApi('');

    try {
      const response = await fetch('http://localhost:8080/api/clientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      
      const textResponse = await response.text();
      if (!textResponse) {
        throw new Error('A resposta do servidor está vazia.');
      }
      const data = JSON.parse(textResponse);
      
      if (!response.ok) { throw new Error(data.message || 'Email ou senha inválidos.'); }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('usuarioNome', data.nomeUsuario);
      navigate('/'); 

    } catch (error) {
      setErroApi(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.fadeContainer} ${animando ? styles.fadeOut : styles.fadeIn}`}>
      {erroApi && <p className={styles.erroApiGeral}>{erroApi}</p>}

      {etapa === 'email' ? (
        <ContainerLogin 
          email={email} 
          setEmail={setEmail} 
          onAvancar={handleAvancarParaSenha} 
        />
      ) : (
        <ContainerLoginSenha 
            email={email} 
            senha={senha}
            setSenha={setSenha}
            onVoltar={handleVoltarParaEmail} 
            onLogin={handleLogin} 
        />
      )}
      {isLoading && <div className={styles.loadingOverlay}>Entrando...</div>}
    </div>
  );
}

export default TelaLogin;