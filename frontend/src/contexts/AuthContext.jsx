import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        try {
            const res = await fetch("https://localhost:7181/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) return false; 

            const data = await res.json();
            if (!data.token) return false; 
            localStorage.setItem("token", data.token);
            return true; 
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    );
}
