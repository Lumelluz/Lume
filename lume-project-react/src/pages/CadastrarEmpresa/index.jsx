import ContainerCadastrarEmpresa from '../../components/ContainerCadastrarEmpresa';
import styles from '../CadastrarEmpresa/CadastrarEmpresa.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const etapas = [
  [
    { placeholder: 'Razão Social*', name: 'razaoSocial' },
    { placeholder: 'Nome Fantasia*', name: 'nomeFantasia' },
    { placeholder: 'CNPJ*', name: 'cnpj' },
    { placeholder: 'Endereço Comercial*', name: 'enderecoComercial' },
    { placeholder: 'Site ou Redes Sociais', name: 'siteRedes' },
  ],
  [
    { placeholder: 'Nome Completo', name: 'nomeCompleto' },
    { placeholder: 'Cargo', name: 'cargo' },
    { placeholder: 'E-mail Corporativo', name: 'emailCorporativo' },
    { placeholder: 'Telefone/WhatsApp', name: 'telefoneWhatsApp' },
  ],
  [
    { placeholder: 'Certificações Ambientais', name: 'certificacoesAmbientais' },
    { placeholder: 'Origem dos Materiais', name: 'origemDosMateriais' },
    { placeholder: 'Compromissos com Sustentabilidade', name: 'compromissoSustentabilidade' },
    { placeholder: 'Informações adicionais', name: 'informacoesAdicionais' },
  ],
];

const titulos = [
  'Dados da Empresa',
  'Dados do Representante',
  'Compromisso Ambiental'
];

function CadastrarEmpresa() {
  const [animando, setAnimando] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [dadosCadastro, setDadosCadastro] = useState({});
  const navigate = useNavigate();

  // Função que controla animação com callback para evitar repetição
  const executarComAnimacao = (callback) => {
    setAnimando(true);
    setTimeout(() => {
      callback();
      setAnimando(false);
    }, 300);
  };

  const handleAvancar = (dadosEtapa) => {
    executarComAnimacao(() => {
      const dadosAtualizados = { ...dadosCadastro, ...dadosEtapa };
      setDadosCadastro(dadosAtualizados);

      if (etapaAtual < etapas.length - 1) {
        setEtapaAtual((prev) => prev + 1);
      } else {
        console.log('Cadastro completo:', dadosAtualizados);
        alert('Cadastro finalizado com sucesso!');
        navigate('/'); // Navegação segura com React Router
      }
    });
  };

  const handleVoltar = () => {
    executarComAnimacao(() => {
      if (etapaAtual > 0) {
        setEtapaAtual((prev) => prev - 1);
      } else {
        navigate(-1); // Navega para trás na história do React Router
      }
    });
  };

  return (
    <div className={`${styles.fadeContainer} ${animando ? styles.fadeOut : styles.fadeIn}`}>
      <ContainerCadastrarEmpresa
        campos={etapas[etapaAtual]}
        dadosIniciais={dadosCadastro}
        onAvancar={handleAvancar}
        onVoltar={handleVoltar}
        titulo={titulos[etapaAtual]}
      />
    </div>
  );
}

export default CadastrarEmpresa;
