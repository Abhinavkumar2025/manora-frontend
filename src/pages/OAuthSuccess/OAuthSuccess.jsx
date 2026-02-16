import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;

        const token = searchParams.get("token");

        if (token) {
            processed.current = true;
            // Save token & update auth state
            localStorage.setItem("token", token);
            login(token, null);
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [searchParams, login, navigate]);

    return <p>Logging you in...</p>;
};

export default OAuthSuccess;
