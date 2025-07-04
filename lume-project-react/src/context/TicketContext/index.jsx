import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const { token, user } = useAuth();

    const fetchTickets = useCallback(async () => {
        if (user?.role === 'ROLE_ADMIN' && token) {
            try {
                const response = await fetch('http://localhost:8080/api/admin/tickets', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTickets(data);
                } else {
                    console.error("Falha ao buscar tickets:", response.statusText);
                }
            } catch (error) {
                console.error("Erro de rede ao buscar tickets:", error);
            }
        } else {
            setTickets([]);
        }
    }, [user, token]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const value = {
        tickets,
        refreshTickets: fetchTickets
    };

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    );
};
