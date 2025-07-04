import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ChatButton.module.css';
import { useChat } from '../../../context/ChatContext';

const ChatButton = () => {
  const { toggleChat } = useChat();

  const [position, setPosition] = useState({ right: 25, bottom: 25 });
  const [isDragging, setIsDragging] = useState(false);
  
  const buttonRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;

    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

    dragStartRef.current = { x: clientX, y: clientY };
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging || !buttonRef.current) return;
    hasDraggedRef.current = true;

    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    setPosition(prevPos => {
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;
      const padding = 25;

      let newRight = prevPos.right - dx;
      let newBottom = prevPos.bottom - dy;

      if (newRight < padding) newRight = padding;
      if (newBottom < padding) newBottom = padding;
      if (newRight > window.innerWidth - buttonWidth - padding) newRight = window.innerWidth - buttonWidth - padding;
      if (newBottom > window.innerHeight - buttonHeight - padding) newBottom = window.innerHeight - buttonHeight - padding;
      
      return { right: newRight, bottom: newBottom };
    });

    dragStartRef.current = { x: clientX, y: clientY };
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
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

  const handleClick = () => {
    if (!hasDraggedRef.current) {
      toggleChat();
    }
  };
  
  return (
    <button
      ref={buttonRef}
      className={`${styles.chatButton} ${isDragging ? styles.dragging : ''}`}
      style={{ 
        right: `${position.right}px`, 
        bottom: `${position.bottom}px`,
        left: 'auto',
        top: 'auto'
      }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      aria-label="Abrir ou arrastar chat"
    >
      💬
    </button>
  );
};

export default ChatButton;