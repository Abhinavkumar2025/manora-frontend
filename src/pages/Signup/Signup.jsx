import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/manora/auth/signup`, form);
            login(res.data.token, res.data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-900 via-black to-blue-900 text-white relative overflow-hidden">
            {/* Background Animations */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[128px]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: 1 }}
                className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[128px]"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2 tracking-wide">
                        Create Account
                    </h1>
                    <p className="text-gray-400">Join us and start your journey</p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                    <div className="relative group">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative group">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative group">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                Sign Up <FiArrowRight />
                            </>
                        )}
                    </button>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-[1px] w-full bg-white/10"></div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">Or continue with</span>
                    <div className="h-[1px] w-full bg-white/10"></div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/manora/auth/google`}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <FcGoogle className="text-red-500" /> Google
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/manora/auth/github`}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <FaGithub className="text-white" /> GitHub
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
