import { createContext, useState, useContext, useEffect } from 'react';
import { listaDeProdutos as initialProducts } from '../../data/products';

const PRODUCTS_STORAGE_KEY = 'lumeProductList_approved';
const PENDING_PRODUCTS_STORAGE_KEY = 'lumeProductList_pending';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const localData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        return localData ? JSON.parse(localData) : initialProducts;
    });

    const [pendingProducts, setPendingProducts] = useState(() => {
        const localData = localStorage.getItem(PENDING_PRODUCTS_STORAGE_KEY);
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem(PENDING_PRODUCTS_STORAGE_KEY, JSON.stringify(pendingProducts));
    }, [pendingProducts]);

    const addProductToVerification = (productData) => {
        const newProduct = { ...productData, id: `pending_${new Date().getTime()}`, status: 'Pendente' };
        setPendingProducts(prev => [...prev, newProduct]);
    };

    // --- NOVA FUNÇÃO PARA ATUALIZAR UM PRODUTO PENDENTE ---
    const updatePendingProduct = (productId, updatedData) => {
        setPendingProducts(prev => 
            prev.map(p => (p.id === productId ? { ...p, ...updatedData } : p))
        );
    };

    const approveProduct = (productId, finalData) => {
        const productToApprove = finalData || pendingProducts.find(p => p.id === productId);
        if (productToApprove) {
            const approvedProduct = { ...productToApprove, id: new Date().getTime(), date: new Date().toISOString(), isVerified: true, status: 'Aprovado' };
            setProducts(prev => [...prev, approvedProduct]);
            setPendingProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

    const rejectProduct = (productId) => {
        setPendingProducts(prev => prev.filter(p => p.id !== productId));
    };

    const value = {
        products,
        pendingProducts,
        addProductToVerification,
        updatePendingProduct, // <-- Exporta a nova função
        approveProduct,
        rejectProduct,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
