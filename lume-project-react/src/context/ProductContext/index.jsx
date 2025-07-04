import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);
    const { token, user } = useAuth();

    const fetchApprovedProducts = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                 console.error("Falha ao buscar produtos aprovados:", response.statusText);
            }
        } catch (error) {
            console.error("Erro de rede ao buscar produtos aprovados:", error);
        }
    }, []);

    const fetchPendingProducts = useCallback(async () => {
        if (user?.role === 'ROLE_ADMIN' && token) {
            try {
                const response = await fetch('http://localhost:8080/api/admin/products/pending', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPendingProducts(data);
                } else {
                    console.error("Falha ao buscar produtos pendentes:", response.statusText);
                }
            } catch (error) {
                console.error("Erro de rede ao buscar produtos pendentes:", error);
            }
        } else {
            setPendingProducts([]);
        }
    }, [user, token]);

    useEffect(() => {
        fetchApprovedProducts();
        fetchPendingProducts();
    }, [fetchApprovedProducts, fetchPendingProducts]);

    const addProductToVerification = async (productData) => {
        if (!token) throw new Error("Apenas empresas logadas podem cadastrar produtos.");

        const response = await fetch('http://localhost:8080/api/products/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao cadastrar produto.');
        }
        
        fetchPendingProducts();
    };

    const updateProductByBusiness = async (productId, productData) => {
        if (!token) throw new Error("Apenas empresas logadas podem editar produtos.");

        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao atualizar o produto.');
        }

        fetchApprovedProducts();
        fetchPendingProducts();
    };

    const updatePendingProduct = async (productId, updatedData) => {
        if (!token || user?.role !== 'ROLE_ADMIN') throw new Error("Não autorizado.");

        const response = await fetch(`http://localhost:8080/api/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao atualizar dados do produto.');
        }
        
        fetchPendingProducts();
    };

    const approveProduct = async (productId, finalData) => {
        if (!token || user?.role !== 'ROLE_ADMIN') throw new Error("Não autorizado.");
        
        await updatePendingProduct(productId, finalData);

        const response = await fetch(`http://localhost:8080/api/admin/products/${productId}/approve`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao aprovar produto.');
        }

        fetchPendingProducts();
        fetchApprovedProducts();
    };

    const rejectProduct = async (productId) => {
        if (!token || user?.role !== 'ROLE_ADMIN') throw new Error("Não autorizado.");

        const response = await fetch(`http://localhost:8080/api/admin/products/${productId}/reject`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao remover produto.');
        }
        
        fetchPendingProducts();
    };

    const value = { 
        products, 
        pendingProducts, 
        addProductToVerification, 
        approveProduct, 
        rejectProduct, 
        updatePendingProduct,
        updateProductByBusiness
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
