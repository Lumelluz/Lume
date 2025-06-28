import { useEffect } from 'react';
import styles from './VLibras.module.css';

const VLibras = () => {
  useEffect(() => {
    const script = document.createElement('script');
    
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.id = 'vlibras-script';

    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('vlibras-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className={`${styles.accessButton} active`}></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
};

export default VLibras;