import { useState } from 'react';
import styles from './FotosIntegrantes.module.css';
import ModalIntegrante from '../../ui/ModalIntegrante';
import Nicolas from '../../../assets/img/Nicolas.png';
import Guilherme from '../../../assets/img/Guilherme.png';
import Lorena from '../../../assets/img/Lorena.png';
import Yuri from '../../../assets/img/Yuri.png';
import Murilo from '../../../assets/img/Murilo.png';
import Gustavo from '../../../assets/img/Gustavo.png';
import Lucas from '../../../assets/img/Lucas.png';

const integrantes = [
    { src: Nicolas, nome: "Nicolas Euflauzino", funcao: "Desenvolvedor Full-Stack | Product Owner", descricao: "Nicolas é responsável pelo produto e desenvolvimento full-stack." },
    { src: Murilo, nome: "Murilo Macedo", funcao: "Desenvolvedor Full-Stack | Scrum Master", descricao: "Murilo lidera a equipe como Scrum Master e desenvolve full-stack." },
    { src: Guilherme, nome: "Guilherme Marcilio", funcao: "Desenvolvedor Full-Stack | UI/UX Designer", descricao: "Guilherme atua em design e desenvolvimento full-stack." },
    { src: Gustavo, nome: "Gustavo Mandu", funcao: "Desenvolvedor Full-Stack | UI/UX Designer", descricao: "Gustavo contribui com design de interfaces e desenvolvimento." },
    { src: Lorena, nome: "Lorena Rosa", funcao: "Desenvolvedor Front-End | Marketing", descricao: "Lorena cuida do front-end e marketing do projeto." },
    { src: Lucas, nome: "Lucas Liuti", funcao: "Desenvolvedor Back-End | Financeiro", descricao: "Lucas trabalha no back-end e também na parte financeira." },
    { src: Yuri, nome: "Yuri Tito", funcao: "Desenvolvedor Full-Stack | Banco de Dados", descricao: "Yuri cuida do banco de dados e desenvolvimento." }
];

function FotosIntegrantes() {
    const [modalIntegrante, setModalIntegrante] = useState(null);

    const handleImageClick = (integrante) => {
        setModalIntegrante(integrante);
    }

    const closeModal = () => {
        setModalIntegrante(null);
    }

    return (
        <>
            <section className={styles.secaoAgrupaFotos}>
                {integrantes.map((integrante, index) => (
                    <div
                        key={index}
                        className={`${styles.cardIntegrantes} ${index % 2 === 0 ? styles.layoutNormal : styles.layoutInvertido}`}
                    >
                        <img
                            src={integrante.src}
                            alt={`Foto de ${integrante.nome}`}
                            onClick={() => handleImageClick(integrante)}
                            style={{ cursor: 'pointer' }}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleImageClick(integrante);
                                }
                            }}
                            aria-label={`Abrir modal com informações sobre ${integrante.nome}`}
                        />
                        <div className={styles.textoIntegrantes}>
                            <h2>{integrante.nome}</h2>
                            <p>{integrante.funcao}</p>
                        </div>
                    </div>
                ))}
            </section>

            {modalIntegrante && (
                <ModalIntegrante
                    open={Boolean(modalIntegrante)}
                    onClose={closeModal}
                    nome={modalIntegrante.nome}
                    descricao={modalIntegrante.descricao}
                />
            )}
        </>
    );
}

export default FotosIntegrantes;
