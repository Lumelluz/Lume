import styles from './ChatButton.module.css';
import { useChat } from '../../context/ChatContext';

const ChatButton = () => {
  const { toggleChat } = useChat();

  return (
    <button className={styles.chatButton} onClick={toggleChat} aria-label="Abrir chat">
      💬
    </button>
  );
};

export default ChatButton;