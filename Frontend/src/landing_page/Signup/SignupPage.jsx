import React, { useState } from "react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (<div className="flex items-center justify-center min-h-screen bg-gray-100"> <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        {/* Logo */} <div className="flex justify-center mb-6"> <div className="w-16 h-16 bg-green-800 rounded-md flex items-center justify-center text-white font-semibold text-sm">
            Logo </div> </div>

        ```
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
            Join us and start your climate action journey
        </p>

        {/* Name Input */}
        <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                👤
            </span>
            <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                📧
            </span>
            <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>

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

        {/* Sign Up Button */}
        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-medium hover:underline">
                Log In
            </a>
        </p>
    </div>
    </div>
    );
}
