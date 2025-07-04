import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastrarEmpresa.module.css';
import ContainerCadastrarEmpresa from '../../components/features/ContainerCadastrarEmpresa';
import { useAuth } from '../../context/AuthContext';

const formatCNPJ = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').slice(0, 18);
};
const validateCNPJ = (cnpj) => (cnpj || '').replace(/\D/g, '').length === 14;

const etapas = [
    [
        { placeholder: 'Razão Social*', name: 'razaoSocial' },
        { placeholder: 'Nome Fantasia*', name: 'nomeFantasia' },
        { placeholder: 'CNPJ*', name: 'cnpj' },
        { placeholder: 'Endereço Comercial*', name: 'enderecoComercial' },
        { placeholder: 'Site ou Redes Sociais', name: 'siteRedes' },
    ],
    [
        { placeholder: 'Certificações Ambientais (se houver)', name: 'certificacoesAmbientais', type: 'textarea' },
        { placeholder: 'Origem dos Materiais', name: 'origemDosMateriais', type: 'textarea' },
        { placeholder: 'Descreva seus Compromissos com a Sustentabilidade*', name: 'compromissoSustentabilidade', type: 'textarea' },
        { placeholder: 'Informações adicionais que queira compartilhar', name: 'informacoesAdicionais', type: 'textarea' },
    ],
];

const titulos = ['Dados da Empresa', 'Compromisso Ambiental'];

function CadastrarEmpresa() {
    const [etapaAtual, setEtapaAtual] = useState(0);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token, user, isLoading: isAuthLoading, logout } = useAuth();
    const alertShown = useRef(false);

    useEffect(() => {
    if (isAuthLoading || !user || alertShown.current) {
        return;
    }
    const handleRedirect = (message, path) => {
            alert(message);
            alertShown.current = true;
            navigate(path, { replace: true });
        };
    if (user.role === 'ROLE_BUSINESS') {
        handleRedirect('A sua conta já está associada a uma empresa.', '/');
    } else if (user.role === 'ROLE_ADMIN') {
        handleRedirect('Administradores não podem cadastrar empresas.', '/');
    }


}, [user, isAuthLoading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'cnpj') formattedValue = formatCNPJ(value);
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleAvancar = async () => {
        setError('');

        if (etapaAtual === 0 && !validateCNPJ(formData.cnpj)) {
            setError("CNPJ inválido. Deve conter 14 dígitos.");
            return;
        }

        if (etapaAtual < etapas.length - 1) {
            setEtapaAtual(prev => prev + 1);
        } else {
            setIsLoading(true);
            const finalDataToSend = {
                ...formData,
                cnpj: formData.cnpj.replace(/\D/g, ''),
                nomeCompleto: user.nomeCompleto,
                emailCorporativo: user.email,
                cargo: 'Representante Legal',
                telefoneWhatsApp: user.telefone || 'Não informado',
            };

            try {
                const response = await fetch('http://localhost:8080/api/business/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(finalDataToSend),
                });
                if (response.ok) {
                    logout();
                    alert('Cadastro de empresa finalizado com sucesso!');
                    navigate('/login');
                } else {
                    const errorText = await response.text();
                    setError(errorText || 'Ocorreu um erro ao submeter o cadastro.');
                }
            } catch (err) {
                setError('Não foi possível conectar ao servidor.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleVoltar = () => {
        setError('');
        if (etapaAtual > 0) {
            setEtapaAtual(prev => prev - 1);
        } else {
            navigate(-1);
        }
    };

    if (isAuthLoading || (user && user.role !== 'ROLE_USER')) {
        return <div className={styles.loadingMessage}>A verificar permissões...</div>;
    }

    return (
        <div className={styles.fadeContainer}>
            <ContainerCadastrarEmpresa
                campos={etapas[etapaAtual]}
                formData={formData}
                onFormChange={handleChange}
                onAvancar={handleAvancar}
                onVoltar={handleVoltar}
                titulo={titulos[etapaAtual]}
                isLoading={isLoading}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
}

export default CadastrarEmpresa;
