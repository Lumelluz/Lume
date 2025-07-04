import { useState, useEffect } from 'react';
import styles from './SettingsModal.module.css';

const initialFilters = {
  saturation: 100,
  contrast: 100,
  brightness: 100,
  sepia: 0,
  hueRotate: 0,
};

const SettingsModal = ({ isOpen, onClose, onSettingsChange, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters || initialFilters);

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: parseInt(value, 10),
    }));
  };

  const handleApplyOnly = () => {
    onSettingsChange(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onSettingsChange(initialFilters);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h3 className={styles.modalTitle}>Ajustes da Imagem de Fundo</h3>
        
        <div className={styles.controls}>

          <div className={styles.controlItem}>
            <label htmlFor="saturation">Saturação</label>
            <input
              type="range" id="saturation" name="saturation"
              min="0" max="200" value={filters.saturation}
              onChange={handleFilterChange}
            />
            <span>{filters.saturation}%</span>
          </div>
          
          <div className={styles.controlItem}>
            <label htmlFor="contrast">Contraste</label>
            <input
              type="range" id="contrast" name="contrast"
              min="0" max="200" value={filters.contrast}
              onChange={handleFilterChange}
            />
            <span>{filters.contrast}%</span>
          </div>

          <div className={styles.controlItem}>
            <label htmlFor="brightness">Brilho (Exposição)</label>
            <input
              type="range" id="brightness" name="brightness"
              min="0" max="200" value={filters.brightness}
              onChange={handleFilterChange}
            />
            <span>{filters.brightness}%</span>
          </div>

          <div className={styles.controlItem}>
            <label htmlFor="sepia">Temperatura (Quente)</label>
            <input
              type="range" id="sepia" name="sepia"
              min="0" max="100" value={filters.sepia}
              onChange={handleFilterChange}
            />
            <span>{filters.sepia}%</span>
          </div>
          
          <div className={styles.controlItem}>
            <label htmlFor="hueRotate">Tonalidade (Tint)</label>
            <input
              type="range" id="hueRotate" name="hueRotate"
              min="0" max="360" value={filters.hueRotate}
              onChange={handleFilterChange}
            />
            <span>{filters.hueRotate}°</span>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button onClick={handleReset} className={`${styles.actionButton} ${styles.resetButton}`}>Resetar</button>
          <button onClick={handleApplyOnly} className={`${styles.actionButton} ${styles.applyOnlyButton}`}>Aplicar</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;