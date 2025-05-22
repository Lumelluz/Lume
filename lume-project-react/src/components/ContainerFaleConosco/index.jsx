import styles from './ContainerFaleConosco.module.css';
import { useState } from 'react';
import logoLumeNova from '../../assets/img/logoLumeNova.svg';

function ContainerFaleConosco() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
    assunto: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Dados enviados:\nNome: ${formData.nome}\nEmail: ${formData.email}\nAssunto: ${formData.assunto}\nMensagem: ${formData.mensagem}`);
    // lógica para enviar dados para API aqui
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
            name="nome"
            value={formData.nome}
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
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="duvida">Dúvida sobre o produto</option>
            <option value="problema">Problema com pedido</option>
            <option value="vender">Quero vender</option>
            <option value="sugestao">Sugestão</option>
          </select>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="mensagem">Escreva sua mensagem:</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui..."
            required
          />
        </div>

        <button type="submit" className={styles.submit_button} aria-label="Enviar mensagem">
          Enviar
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
