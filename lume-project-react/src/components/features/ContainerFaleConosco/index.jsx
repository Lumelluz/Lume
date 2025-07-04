import { useState } from 'react';
import styles from './ContainerFaleConosco.module.css';
import logoLumeNova from '../../../assets/img/logoLumeNova.svg';

function ContainerFaleConosco() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const successText = await response.text();
        setSuccessMessage(successText);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorText = await response.text();
        setError(errorText || 'Ocorreu um erro ao enviar a mensagem.');
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setError('Não foi possível conectar ao servidor. Tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.fale_conosco} aria-label="Formulário de contato">
      <img src={logoLumeNova} alt="Logo Lume Nova" />
      <h2>Fale Conosco</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.form_group}>
          <label htmlFor="nome">Digite seu nome:</label>
          <input
            type="text"
            id="nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email">Digite seu email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="assunto">Assunto:</label>
          <select
            id="assunto"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="duvida">Dúvida sobre o produto</option>
            <option value="problema">Problema com pedido</option>
            <option value="vender">Quero vender</option>
            <option value="sugestao">Sugestão</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="mensagem">Escreva sua mensagem:</label>
          <textarea
            id="mensagem"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui..."
            required
          />
        </div>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submit_button} disabled={isLoading} aria-label="Enviar mensagem">
          {isLoading ? 'A enviar...' : 'Enviar'}
        </button>
      </form>

      <div className={styles.horario} aria-live="polite">
        <h3>Horário de Atendimento</h3>
        <p>Segunda a Sexta-Feira, das 09h às 18h</p>
      </div>
    </section>
  );
}

export default ContainerFaleConosco;
