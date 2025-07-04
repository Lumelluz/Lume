import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AccessibilityMenu.module.css';

const HIGH_CONTRAST_KEY = 'lume_high_contrast';
const GRAYSCALE_KEY = 'lume_grayscale';

const AccessibilityMenu = () => {
  const [isHighContrast, setIsHighContrast] = useState(() => localStorage.getItem(HIGH_CONTRAST_KEY) === 'true');
  const [isGrayscale, setIsGrayscale] = useState(() => localStorage.getItem(GRAYSCALE_KEY) === 'true');
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState({ right: 25, bottom: 95 });
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const didMove = useRef(false)

  useEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;

    if (isHighContrast) {
      bodyElement.classList.add('high-contrast');
      localStorage.setItem(HIGH_CONTRAST_KEY, 'true');
    } else {
      bodyElement.classList.remove('high-contrast');
      localStorage.setItem(HIGH_CONTRAST_KEY, 'false');
    }

    if (isGrayscale) {
      rootElement.classList.add('grayscale');
      localStorage.setItem(GRAYSCALE_KEY, 'true');
    } else {
      rootElement.classList.remove('grayscale');
      localStorage.setItem(GRAYSCALE_KEY, 'false');
    }
  }, [isHighContrast, isGrayscale]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    didMove.current = false;

    const startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    
    dragStartPos.current = { x: startX, y: startY };

    document.body.classList.add(styles.dragging);
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    didMove.current = true;

    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const dx = currentX - dragStartPos.current.x;
    const dy = currentY - dragStartPos.current.y;

    setPosition(prevPos => ({
      right: prevPos.right - dx,
      bottom: prevPos.bottom - dy,
    }));

    dragStartPos.current = { x: currentX, y: currentY };
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.classList.remove(styles.dragging);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleToggleMenu = () => {
    if (!didMove.current) {
      setIsOpen(prev => !prev);
    }
  };

  return (
    <div 
      className={`${styles.accessibilityMenu} ${isOpen ? styles.open : ''}`} 
      ref={menuRef}
      style={{ right: `${position.right}px`, bottom: `${position.bottom}px` }}
    >
      <button
        className={styles.toggleButton}
        onClick={handleToggleMenu}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        aria-label="Abrir ou arrastar menu de acessibilidade"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-5v12c0 .55-.45 1-1 1s-1-.45-1-1v-5h-4v5c0 .55-.45 1-1 1s-1-.45-1-1V9H3c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
      </button>

      <div className={styles.options}>
        <button onClick={() => setIsHighContrast(!isHighContrast)} className={isHighContrast ? styles.active : ''}>
          Alto Contraste
        </button>
        <button onClick={() => setIsGrayscale(!isGrayscale)} className={isGrayscale ? styles.active : ''}>
          Escala de Cinza
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;

