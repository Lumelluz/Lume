import ContainerLogin from '../../components/ContainerLogin'
import ContainerLoginSenha from '../../components/ContainerLoginSenha'
import { useState } from 'react'
import styles from '../TelaLogin/TelaLogin.module.css'

function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false) // controla qual componente mostrar
  const [animando, setAnimando] = useState(false)         // controla animação de fade
  const [email, setEmail] = useState('')                  // guarda o email digitado

  // Função para alternar entre as telas com animação
  const handleTrocar = () => {
    setAnimando(true) // inicia animação fade out
    setTimeout(() => {
      setMostrarSenha(prev => !prev) // troca o componente mostrado
      setAnimando(false)              // volta para fade in
    }, 300) // tempo igual ao transition do CSS (0.3s)
  }

  return (
    <div className={`${styles.fadeContainer} ${animando ? styles.fadeOut : styles.fadeIn}`}>
      {mostrarSenha ? (
        <ContainerLoginSenha email={email} onVoltar={handleTrocar} />
      ) : (
        <ContainerLogin email={email} setEmail={setEmail} onAvancar={handleTrocar} />
      )}
    </div>
  )
}

export default TelaLogin
