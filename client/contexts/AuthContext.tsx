'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: 'CLIENT' | 'PROVIDER';
    location?: string;
    providerProfile?: any;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

interface RegisterData {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    role: 'CLIENT' | 'PROVIDER';
    location?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Carregar usuário do localStorage ao iniciar
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    const response = await fetch(`${API_URL}/api/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                        setToken(storedToken);
                    } else {
                        // Token inválido, limpar
                        localStorage.removeItem('token');
                        Cookies.remove('token');
                    }
                } catch (error) {
                    console.error('Erro ao carregar usuário:', error);
                    localStorage.removeItem('token');
                    Cookies.remove('token');
                }
            }

            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login');
            }

            // Salvar token e usuário
            localStorage.setItem('token', data.token);
            Cookies.set('token', data.token, { expires: 7 });
            setToken(data.token);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Erro ao criar conta');
            }

            // Salvar token e usuário
            localStorage.setItem('token', responseData.token);
            Cookies.set('token', responseData.token, { expires: 7 });
            setToken(responseData.token);
            setUser(responseData.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        Cookies.remove('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
