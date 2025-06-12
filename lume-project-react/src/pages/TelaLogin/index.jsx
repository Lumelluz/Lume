import ContainerLogin from '../../components/ContainerLogin'
import ContainerLoginSenha from '../../components/ContainerLoginSenha'
import { useState } from 'react'
import styles from '../TelaLogin/TelaLogin.module.css'

function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [animando, setAnimando] = useState(false)
  const [email, setEmail] = useState('')

  const handleTrocar = () => {
    setAnimando(true)
    setTimeout(() => {
      setMostrarSenha(prev => !prev)
      setAnimando(false)
    }, 300) // tempo igual ao transition do CSS
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
