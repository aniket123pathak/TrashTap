import React, { useState } from "react";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <> 
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
            {/* Heading */} <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2> <p className="text-sm text-gray-500 text-center mb-6">
                Login to continue your climate action </p>

            ```
            {/* Phone Input */}
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    📞
                </span>
                <input
                    type="text"
                    placeholder="+91"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
            </div>

            {/* Password Input */}
            <div className="relative mb-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    🔒
                </span>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm mb-4">
                <a href="#" className="text-green-600 hover:underline">
                    Forgot Password?
                </a>
            </div>

            {/* Login Button */}
            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                Login
            </button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <a href="http://localhost:5173/signup" className="text-green-600 font-medium hover:underline">
                    Sign Up
                </a>
            </p>
        </div>
        </div>
        </>
    );
}

export default LoginPage;
