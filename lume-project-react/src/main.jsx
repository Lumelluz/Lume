import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { PendingProductProvider } from './context/PendingProductContext';
import { ProductProvider } from './context/ProductContext/index.jsx'
import { AuthProvider } from './context/AuthContext/index.jsx'
import UserProvider from './context/UserContext/index.jsx'
import { TicketProvider } from './context/TicketContext/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ChatProvider>
        <PendingProductProvider>
          <ProductProvider>
            <CartProvider>
              <UserProvider>
                <TicketProvider>
                  <App />
                </TicketProvider>
              </UserProvider>
            </CartProvider>
          </ProductProvider>
        </PendingProductProvider>
      </ChatProvider>
    </AuthProvider>
  </StrictMode >
)