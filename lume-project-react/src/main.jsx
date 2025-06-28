import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { PendingProductProvider } from './context/PendingProductContext';
import { ProductProvider } from './context/ProductContext/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatProvider>
      <CartProvider>
        <PendingProductProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </PendingProductProvider>
      </CartProvider>
    </ChatProvider>
  </StrictMode>
)