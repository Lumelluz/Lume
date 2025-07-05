import { createContext, useState, useContext, useEffect } from 'react';

const PENDING_PRODUCTS_KEY = 'lumePendingProducts';
const PendingProductContext = createContext();

export const usePendingProducts = () => useContext(PendingProductContext);

export const PendingProductProvider = ({ children }) => {
    const [pendingProducts, setPendingProducts] = useState(() => {
        try {
            const localData = localStorage.getItem(PENDING_PRODUCTS_KEY);
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Erro ao carregar produtos pendentes:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(PENDING_PRODUCTS_KEY, JSON.stringify(pendingProducts));
        } catch (error) {
            console.error("Erro ao salvar produtos pendentes:", error);
        }
    }, [pendingProducts]);

    const addProductToVerification = (productData) => {
        const newProduct = {
            ...productData,
            id: `pending_${new Date().getTime()}`,
            status: 'Pendente'
        };
        setPendingProducts(prev => [...prev, newProduct]);
    };

    const approveProduct = (productId) => {
        // Lógica futura: Mover este produto para a lista principal de produtos no banco de dados.
        setPendingProducts(prev => prev.filter(p => p.id !== productId));
        console.log(`Produto ${productId} aprovado e movido para a loja.`);
    };

    const rejectProduct = (productId) => {
        setPendingProducts(prev => prev.filter(p => p.id !== productId));
        console.log(`Produto ${productId} rejeitado.`);
    };

    const value = {
        pendingProducts,
        addProductToVerification,
        approveProduct,
        rejectProduct
    };

    return (
        <PendingProductContext.Provider value={value}>
            {children}
        </PendingProductContext.Provider>
    );
};
