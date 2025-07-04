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

const sanitizeCartItem = (item) => ({
    ...item,
    currentPrice: item.currentPrice ?? 0,
    quantity: item.quantity || 1,
});

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
          const sanitizedCart = JSON.parse(storedCart).map(sanitizeCartItem);
          setCartItems(sanitizedCart);
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

  const saveCartToLocalStorage = (items, currentUser) => {
    if (currentUser) {
      const userCartKey = `lumeCart_${currentUser.id}`;
      localStorage.setItem(userCartKey, JSON.stringify(items));
    }
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (productToAdd, quantity = 1) => {
    if (!user) {
        alert("Por favor, faça login para adicionar itens ao carrinho.");
        return;
    }
    const sanitizedProduct = sanitizeCartItem(productToAdd);
    
    let updatedItems = [];
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === sanitizedProduct.id);
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === sanitizedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prevItems, { ...sanitizedProduct, quantity }];
      }
      saveCartToLocalStorage(updatedItems, user);
      return updatedItems;
    });
    setIsCartOpen(true); 
  };
  
  const removeFromCart = (productId) => {
     setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== productId);
        saveCartToLocalStorage(updatedItems, user);
        return updatedItems;
     });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
            saveCartToLocalStorage(updatedItems, user);
            return updatedItems;
        });
    }
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
    updateQuantity,
    itemCount,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
