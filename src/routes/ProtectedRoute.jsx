import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // still checking auth (important on refresh)
    if (loading) {
        return <p>Loading...</p>;
    }

    // not logged in → go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // logged in → allow page
    return children;
};

export default ProtectedRoute;
