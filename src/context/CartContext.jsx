import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userCartKey = `lumeCart_${user.id}`;
      try {
        const storedCart = localStorage.getItem(userCartKey);
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho do utilizador:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && cartItems) {
      const userCartKey = `lumeCart_${user.id}`;
      try {
        localStorage.setItem(userCartKey, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Erro ao salvar o carrinho no localStorage:", error);
      }
    }
  }, [cartItems, user]);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (productToAdd, quantity = 1) => {
    if (!user) {
      alert("Por favor, faça login para adicionar itens ao carrinho.");
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.currentPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  const value = {
    isCartOpen,
    toggleCart,
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    itemCount,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
