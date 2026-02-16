import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Google login failed");
            }

            // Save JWT + user via context
            login(data.token, data.user);

            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Google authentication failed");
        }
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                    alert("Google login failed");
                }}
            />
        </div>
    );
};

export default GoogleAuthButton;
