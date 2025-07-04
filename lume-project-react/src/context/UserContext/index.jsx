import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../AuthContext';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { token, user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchAllUsers = async () => {
            if (user?.role === 'ROLE_ADMIN' && token) {
                try {
                    console.log("Admin logado, a buscar lista de utilizadores...");
                    const response = await fetch('http://localhost:8080/api/admin/users', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUsers(data);
                    } else {
                        console.error("Falha ao buscar utilizadores:", response.statusText);
                        setUsers([]);
                    }
                } catch (error) {
                    console.error("Erro de rede ao buscar utilizadores:", error);
                    setUsers([]);
                }
            } else if (!isLoggedIn) {
                setUsers([]);
            }
        };

        fetchAllUsers();
    }, [user, token, isLoggedIn]);

    const updateBusinessByAdmin = async (businessId, updatedData) => {
        if (!token) throw new Error("Não autorizado");

        const response = await fetch(`http://localhost:8080/api/admin/businesses/${businessId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao atualizar dados.');
        }
        
        setUsers(prevUsers => 
            prevUsers.map(u => {
                if (u.business && u.business.id === businessId) {
                    return { ...u, business: { ...u.business, ...updatedData } };
                }
                return u;
            })
        );
    };

    const removeBusinessByAdmin = async (businessId) => {
        if (!token) throw new Error("Não autorizado");

        const response = await fetch(`http://localhost:8080/api/admin/businesses/${businessId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao remover empresa.');
        }
        
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.business && u.business.id === businessId) {
                    return { ...u, business: null, role: 'ROLE_USER' };
                }
                return u;
            })
        );
    };

    const value = {
        users,
        updateBusinessByAdmin,
        removeBusinessByAdmin,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;