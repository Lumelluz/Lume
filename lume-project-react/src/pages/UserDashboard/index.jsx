import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './UserDashboard.module.css';
import { useAuth } from '../../context/AuthContext';

const formatCPF = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
};

const formatTelefone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
};

const MeusPedidosView = () => (
    <div className={styles.viewContainer}>
        <div className={styles.contentHeader}><h2>Meus Pedidos</h2></div>
        <p className={styles.placeholderText}>O histórico dos seus pedidos aparecerá aqui.</p>
    </div>
);

const MeusDadosView = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nomeCompleto: user.nomeCompleto || '',
                cpf: user.cpf ? formatCPF(user.cpf) : '',
                dataNascimento: user.dataNascimento || '',
                telefone: user.telefone ? formatTelefone(user.telefone) : '',
                email: user.email || '',
                cep: user.cep || '',
                logradouro: user.logradouro || '',
                numero: user.numero || '',
                complemento: user.complemento || '',
                bairro: user.bairro || '',
                cidade: user.cidade || '',
                estado: user.estado || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'cpf') formattedValue = formatCPF(value);
        if (name === 'telefone') formattedValue = formatTelefone(value);
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
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
        setIsLoading(true);
        try {
            const dataToSend = {
                ...formData,
                cpf: formData.cpf.replace(/\D/g, ''),
                telefone: formData.telefone.replace(/\D/g, ''),
            };
            await onUpdate(dataToSend);
            alert("Dados atualizados com sucesso!");
        } catch (error) {
            alert(`Erro ao atualizar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentHeader}><h2>Meus Dados</h2></div>
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
                <div className={styles.settingsGrid}>
                    <div className={styles.formColumn}>
                        <h3 className={styles.topicTitle}>Informações Pessoais</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="nomeCompleto">Nome Completo</label>
                            <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail (não pode ser alterado)</label>
                            <input type="email" id="email" name="email" value={formData.email} disabled />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cpf">CPF (não pode ser alterado)</label>
                            <input type="text" id="cpf" name="cpf" value={formData.cpf} disabled />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.formColumn}>
                        <h3 className={styles.topicTitle}>Endereço Principal</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="cep">CEP</label>
                            <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="logradouro">Morada</label>
                            <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="numero">Número</label>
                            <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="bairro">Bairro</label>
                            <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cidade">Cidade</label>
                            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="estado">Estado</label>
                            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className={styles.saveButton} disabled={isLoading}>
                    {isLoading ? 'A salvar...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
};

function UserDashboard() {
    const [activeView, setActiveView] = useState('pedidos');
    const { user, logout, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdateProfile = async (updatedData) => {
        await updateUserProfile(updatedData);
    };

    const renderView = () => {
        switch (activeView) {
            case 'pedidos': return <MeusPedidosView />;
            case 'dados': return <MeusDadosView user={user} onUpdate={handleUpdateProfile} />;
            default: return <MeusPedidosView />;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>{user?.nomeCompleto?.charAt(0)}</div>
                    <h1>Minha Conta</h1>
                    <p>Olá, {user?.nomeCompleto?.split(' ')[0]}!</p>
                </div>
                <nav className={styles.sidebarNav}>
                    <ul>
                        <li><button onClick={() => setActiveView('pedidos')} className={activeView === 'pedidos' ? styles.activeLink : ''}>Meus Pedidos</button></li>
                        <li><button onClick={() => setActiveView('dados')} className={activeView === 'dados' ? styles.activeLink : ''}>Meus Dados</button></li>
                        {user?.role === 'ROLE_USER' && (
                            <li><Link to="/cadastrar-empresa" className={styles.ctaButton}>Quero Vender</Link></li>
                        )}
                    </ul>
                </nav>
                <div className={styles.sidebarFooter}><button onClick={handleLogout}>Sair</button></div>
            </aside>
            <main className={styles.mainContent}>
                {renderView()}
            </main>
        </div>
    );
}

export default UserDashboard;
