import React, { createContext, useState, useEffect, useContext } from "react";
import { checkLogin, logout } from '../services/apiService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        async function verify(){
            try{
                const response = await checkLogin();
                console.log("User is authenticated:", response.data);
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        verify();
    }, []);

    async function realizarLogout() {
        try {
            await logout();
            setAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, loading, realizarLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}