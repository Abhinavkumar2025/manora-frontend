import { X, Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    <X size={22} />
                </button>

                {/* Header */}
                <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

                {/* Form */}
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Email / Username"
                        required
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="w-full rounded-lg border px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-sm text-gray-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-sm text-gray-500">or</span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Social buttons */}
                <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border py-2 hover:bg-gray-100">
                    <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="Google"
                    />
                    Login with Google
                </button>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 hover:bg-gray-100">
                    <Phone size={18} />
                    Login with Phone Number
                </button>

                {/* Signup */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a href="#" className="font-medium text-black hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
