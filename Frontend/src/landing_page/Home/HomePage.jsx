import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            {/* Card Container */}
            <div className="bg-green-50 rounded-3xl shadow-2xl p-10 sm:p-16 text-center max-w-xl">
                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl font-extrabold text-green-700 mb-6">
                    Welcome to TrashTap
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-gray-700 mb-10">
                    One tap towards a cleaner and safer society 🌱
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-10 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-md"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-10 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 shadow-md"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
