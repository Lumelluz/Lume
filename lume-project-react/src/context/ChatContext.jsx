import { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const value = {
    isChatOpen,
    toggleChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};