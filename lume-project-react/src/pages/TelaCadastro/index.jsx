import { useState } from 'react';
import styles from './TelaCadastro.module.css';
import { Link } from 'react-router-dom';

function TelaCadastro() {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        aceitaTermos: false,
        querNovidades: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos ok Liuti
        if (cep.length !== 8) {
            return;
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                }));
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        if (!formData.aceitaTermos) {
            alert("Você precisa aceitar os Termos e Condições para continuar.");
            return;
        }

        // No futuro, aqui enviaria os dados para a API Java Lucas Liuti blz

        console.log("Dados do novo cliente:", formData);
        alert(`Bem-vindo(a), ${formData.nomeCompleto}! A sua conta foi criada com sucesso.`);
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <h1 className={styles.mainTitle}>Crie a sua conta na Lume</h1>
                <p className={styles.subtitle}>Junte-se à nossa comunidade e comece a sua jornada de consumo consciente.</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <label htmlFor="nomeCompleto">Nome Completo*</label>
                            <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cpf">CPF*</label>
                            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="dataNascimento">Data de Nascimento*</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="telefone">Telefone / Celular*</label>
                            <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(00) 90000-0000" required />
                        </div>
                    </div>
                    
                    <h2 className={styles.sectionTitle}>Dados da Conta</h2>
                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <label htmlFor="email">E-mail*</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="senha">Senha*</label>
                            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} minLength="6" required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="confirmarSenha">Confirmar Senha*</label>
                            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>Endereço Principal</h2>
                    <div className={styles.formGrid}>
                         <div className={styles.formGroup}>
                            <label htmlFor="cep">CEP*</label>
                            <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="00000-000" required />
                        </div>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                             <label htmlFor="logradouro">Morada*</label>
                            <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="numero">Número*</label>
                            <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="bairro">Bairro*</label>
                            <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="cidade">Cidade*</label>
                            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
                        </div>
                         <div className={styles.formGroup}>
                            <label htmlFor="estado">Estado*</label>
                            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.consentSection}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="querNovidades" name="querNovidades" checked={formData.querNovidades} onChange={handleChange} />
                            <label htmlFor="querNovidades">Quero receber novidades e promoções da Lume por e-mail.</label>
                        </div>
                         <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="aceitaTermos" name="aceitaTermos" checked={formData.aceitaTermos} onChange={handleChange} required />
                            <label htmlFor="aceitaTermos">Li e concordo com os <Link to="/termos-de-uso" target="_blank">Termos de Uso</Link> e a <Link to="/politica-privacidade" target="_blank">Política de Privacidade</Link>.*</label>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>Criar minha conta</button>
                </form>
            </div>
        </main>
    );
}

export default TelaCadastro;
