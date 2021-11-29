import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import api from '../services/api'
import Router from 'next/router'

type SignInData = {
    email: string;
    password: string;
}

type User = {
    id: string;
    name: string;
    email: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    number: string;
    complement: string;
    cpf: string;
    pis: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'userapp.token': token } = parseCookies();

        if (token) {
            api.get('/auth/me').then(response => setUser(response.data.user))
        }

    }, [])

    async function signIn({ email, password }: SignInData) {
        await api.post("/auth/token", { email, password })
            .then((response) => {
                const { data } = response;

                localStorage.setItem("userapp.data", JSON.stringify(data));

                setCookie(undefined, 'userapp.token', data.access_token, {
                    maxAge: 60 * 60 * 12, //12 hour 
                })

                api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;
                setUser(data.user)
                Router.push('/dashboard')
            })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
