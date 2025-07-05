import { useEffect, useState } from 'react';
import styles from './ContainerInicial.module.css';

import carrosselAmbiente1 from '../../../assets/img/carrosselAmbiente1.png';
import carrosselAmbiente2 from '../../../assets/img/carrosselAmbiente2.png';
import carrosselAmbiente3 from '../../../assets/img/carrosselAmbiente3.png';
import carrosselAmbiente4 from '../../../assets/img/carrosselAmbiente4.png';

const imagens = [
  carrosselAmbiente1,
  carrosselAmbiente2,
  carrosselAmbiente3,
  carrosselAmbiente4,
];

function BannerCampanha() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className={styles.containerDireitaBannersCarrosel}>
      <img
        key={currentIndex}
        src={imagens[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className={styles.imagemCarrossel}
      />
    </div>
  );
}

export default BannerCampanha;
