import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const AUTH_STORAGE_KEY = 'lumeUserAuth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthSessionManager = () => {
    const { authData, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!authData) {
            return;
        }

        const now = new Date().getTime();
        const expirationTime = authData.expiresIn;

        console.log(`[Auth Check] Navegando para ${location.pathname}. Verificando token...`);
        console.log(`[Auth Check] Tempo Atual: ${new Date(now).toLocaleTimeString()}`);
        console.log(`[Auth Check] Token Expira em: ${new Date(expirationTime).toLocaleTimeString()}`);

        if (now >= expirationTime) {
            console.error(`[Auth Check] SESSÃO EXPIRADA! A fazer logout na navegação.`);
            logout();
        } else {
            console.log("[Auth Check] Token ainda é válido.");
        }
    }, [location.pathname, authData, logout]);

    return null;
};


export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        setAuthData(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        console.log("Sessão terminada e dados limpos do localStorage.");
    }, []);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (new Date().getTime() < parsedData.expiresIn) {
                    console.log("Token válido encontrado no localStorage. A iniciar sessão.");
                    setAuthData(parsedData);
                } else {
                    console.log("Token expirado encontrado no localStorage. A limpar.");
                    localStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } else {
                console.log("Nenhum dado de autenticação encontrado no localStorage.");
            }
        } catch (error) {
            console.error("Falha ao ler dados de autenticação.", error);
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        setIsLoading(false);
    }, [logout]);

    const login = async (email, password) => {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha na autenticação');
        }

        const data = await response.json();

        const newAuthData = {
            token: data.jwt,
            user: data.user,
            expiresIn: data.expiresIn
        };

        setAuthData(newAuthData);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuthData));
    };

    const updateUserProfile = async (profileData) => {
        if (!authData?.token) {
            throw new Error("Utilizador não autenticado.");
        }

        const response = await fetch('http://localhost:8080/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData.token}`,
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao atualizar perfil.');
        }

        setAuthData(prevAuthData => {
            const newAuthData = {
                ...prevAuthData,
                user: { ...prevAuthData.user, ...profileData }
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuthData));
            return newAuthData;
        });
    };

    const value = {
        user: authData?.user,
        token: authData?.token,
        isLoggedIn: !!authData?.token,
        isLoading,
        login,
        logout,
        updateUserProfile,
        authData
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
