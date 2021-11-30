import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from '../services/api'
import Router from 'next/router'

type SignInData = {
    email: string;
    password: string;
}

type CreateUserFormData = {
    name: string;
    email: string;
    country: string;
    city: string;
    zipcode: string;
    state: string;
    street: string;
    number: string;
    complement: string;
    cpf: string;
    pis: string;
    password: string;
    password_confirmation: string;
}

type User = {
    id: string;
    name: string;
    email: string;
    country: string;
    state: string;
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

    async function signIn({ email, password }: SignInData) {
        await api.post("/auth/token", { email, password })
            .then((response) => {
                const { data } = response;

                const { 'userapp.token': token } = parseCookies();

                localStorage.setItem("userapp.data", JSON.stringify(data));

                const dataStorage = localStorage.getItem("userapp.data");
                const dataStore = JSON.parse(`${dataStorage}`);

                const res = api.get(`/users/${dataStore.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                res.then(res => setUser(res.data))


                setCookie(undefined, 'userapp.token', data.access_token, {
                    maxAge: 60 * 60 * 12, //12 hour 
                })
                Router.push('/dashboard')
            }).catch((err) => {
                toast(`${err.response.data['detail']}`), {
                    position: "top-right"
                }
            })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
