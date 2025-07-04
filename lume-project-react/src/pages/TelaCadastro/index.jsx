// Em src/pages/TelaCadastro/TelaCadastro.js (VERSÃO DE DEPURAÇÃO)

import { useState } from 'react';
import styles from './TelaCadastro.module.css';
import { Link, useNavigate } from 'react-router-dom';

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
    const [erros, setErros] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length !== 8) return;
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

    // --- FUNÇÃO DE SUBMISSÃO COM CHECKPOINTS DE DEBUG ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("--- DEBUG: PASSO 1 - Início do handleSubmit ---");

        setErros({}); 
        if (formData.senha !== formData.confirmarSenha) {
            setErros({ confirmarSenha: "As senhas não coincidem!" });
            return;
        }
        if (!formData.aceitaTermos) {
            setErros({ aceitaTermos: "Você precisa aceitar os Termos." });
            return;
        }
        
        console.log("--- DEBUG: PASSO 2 - Validações do frontend passaram ---");
        setIsLoading(true);

        const dadosParaApi = {
            nome: formData.nomeCompleto,
            email: formData.email,
            senha: formData.senha,
            cpf: formData.cpf.replace(/\D/g, ''),
            celular: formData.telefone.replace(/\D/g, ''),
            dataCadastro: new Date().toISOString()
        };

        console.log("--- DEBUG: PASSO 3 - Dados preparados para a API:", dadosParaApi);

        try {
            console.log("--- DEBUG: PASSO 4 - Prestes a enviar a requisição (fetch)... ---");

            const response = await fetch('http://localhost:8080/api/clientes/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaApi),
            });

            console.log("--- DEBUG: PASSO 5 - Resposta da rede recebida! Status:", response.status);

            const data = await response.json();
            console.log("--- DEBUG: PASSO 6 - Resposta JSON processada:", data);

            if (!response.ok) {
                throw new Error(data.message || 'Erro do servidor.');
            }

            console.log("--- DEBUG: PASSO 7 - Sucesso! Navegando...");
            alert(`Bem-vindo(a), ${data.nome}! Conta criada com sucesso.`);
            navigate('/login');

        } catch (error) {
            console.error("--- DEBUG: ERRO CAPTURADO NO CATCH! ---", error);
            setErros({ api: error.message });
        } finally {
            console.log("--- DEBUG: PASSO FINAL - Executando o bloco finally ---");
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <h1 className={styles.mainTitle}>Crie a sua conta na Lume</h1>
                <p className={styles.subtitle}>Junte-se à nossa comunidade e comece a sua jornada de consumo consciente.</p>
                
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                            {erros.confirmarSenha && <span className={styles.erro}>{erros.confirmarSenha}</span>}
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>Endereço Principal</h2>
                    <div className={styles.formGrid}>
                         <div className={styles.formGroup}>
                            <label htmlFor="cep">CEP*</label>
                            <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="00000-000" required />
                        </div>
                       <div className={`${styles.formGroup} ${styles.spanFull}`}>
                           <label htmlFor="logradouro">Logradouro*</label>
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
                            {erros.aceitaTermos && <div className={styles.erro}>{erros.aceitaTermos}</div>}
                        </div>
                    </div>

                    {erros.api && <p className={styles.erroApiGeral}>{erros.api}</p>}

                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Criando conta...' : 'Criar minha conta'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default TelaCadastro;
