import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatModal.module.css';
import { useChat } from '../../../context/ChatContext';

const ChatModal = () => {
  const { isChatOpen, toggleChat } = useChat();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Sou a Aurora, assistente virtual da Lume. Como posso ajudar?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) throw new Error('Falha ao comunicar com o servidor.');

      const data = await response.json();

      if (data.message) {
        setMessages(prev => [...prev, { from: 'bot', text: data.message }]);
      }

      setTimeout(() => {
        switch (data.action) {
          case 'REDIRECT':
            navigate(data.value);
            toggleChat();
            break;

          case 'SEARCH':
            navigate(`/produtos?q=${encodeURIComponent(data.value)}`);
            toggleChat();
            break;

          case 'RECOMMEND':
            navigate(`/produtos?sort=${data.value}`);
            toggleChat();
            break;

          default:
            break;
        }
      }, 1200);

    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages(prev => [...prev, { from: 'bot', text: 'Desculpe, estou com um problema no momento. Tente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={toggleChat}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={toggleChat}>&times;</button>
        <div className={styles.chatHeader}>Assistente Aurora</div>
        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.from]}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className={`${styles.message} ${styles.bot} ${styles.loading}`}><span></span><span></span><span></span></div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.chatForm}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className={styles.chatInput}
            autoFocus
          />
          <button type="submit" disabled={isLoading} className={styles.sendButton}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;