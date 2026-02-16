import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);      // user info
    const [loading, setLoading] = useState(true);

    const fetchUser = (token) => {
        setLoading(true);
        axios
            .get("http://localhost:5000/manora/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    };

    // Check user when app starts
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetchUser(token);
    }, []);

    // Login function
    const login = (token, userData) => {
        localStorage.setItem("token", token);
        if (userData) {
            setUser(userData);
        } else {
            fetchUser(token);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ easy hook
export const useAuth = () => useContext(AuthContext);
