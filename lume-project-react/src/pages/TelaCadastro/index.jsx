import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TelaCadastro.module.css';

const formatCPF = (value) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 11);

    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3)}`;
    if (onlyNums.length <= 9) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6)}`;
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}-${onlyNums.slice(9, 11)}`;
};

const formatTelefone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
};

const validateCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
};

const validateTelefone = (telefone) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
};

const isOfAge = (dateString) => {
    if (!dateString) return false;

    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
};


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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let formattedValue = value;
        if (name === 'cpf') {
            formattedValue = formatCPF(value);
        } else if (name === 'telefone') {
            formattedValue = formatTelefone(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : formattedValue
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isOfAge(formData.dataNascimento)) {
            setError("Você deve ter pelo menos 18 anos para se cadastrar.");
            return;
        }
        if (!validateCPF(formData.cpf)) {
            setError("CPF inválido. Por favor, verifique os dados.");
            return;
        }
        if (!validateTelefone(formData.telefone)) {
            setError("Telefone inválido. Inclua o DDD.");
            return;
        }
        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem!");
            return;
        }
        if (!formData.aceitaTermos) {
            setError("Você precisa aceitar os Termos e Condições para continuar.");
            return;
        }

        setIsLoading(true);

        const dataToSend = {
            ...formData,
            cpf: formData.cpf.replace(/\D/g, ''),
            telefone: formData.telefone.replace(/\D/g, ''),
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert(`Bem-vindo(a), ${formData.nomeCompleto}! A sua conta foi criada com sucesso.`);
                navigate('/login');
            } else {
                const errorText = await response.text();
                setError(errorText || 'Ocorreu um erro ao registar. Tente novamente.');
            }
        } catch (err) {
            console.error("Erro de rede:", err);
            setError('Não foi possível conectar ao servidor. Tente mais tarde.');
        } finally {
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

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'A criar conta...' : 'Criar minha conta'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default TelaCadastro;
