"use client";
import { useState } from "react";
import useApi from "../hooks/useApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const { fetchData, error } = useApi("POST");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const credentials = { email, password };
        const res = await fetchData("/users/login", credentials);
        if (!res) {
            console.error("Login failed:", error);
            return;
        }
        setMessage("Login successful");
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900 mb-2">🏰 Welcome Back</h1>
                    <p className="text-amber-700">Sign in to continue your siege adventure</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200">
                    <h2 className="text-xl font-semibold text-amber-900 mb-6 text-center">Login</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
                                📧 Email Address
                            </label>
                            <input 
                                id="email"
                                type="email" 
                                name="email" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email address"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-amber-900 mb-2">
                                🔒 Password
                            </label>
                            <input 
                                id="password"
                                type="password" 
                                name="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-sm">
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
                        >
                            🔐 Sign In
                        </button>
                    </form>
                </div>

                {/* Register Link */}
                <div className="text-center mt-6">
                    <p className="text-amber-800 font-medium">
                        Don&apos;t have an account?{" "}
                        <Link 
                            href="/register" 
                            className="text-amber-700 hover:text-amber-900 font-semibold underline decoration-2"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-center mt-8">
                    <Link 
                        href="/" 
                        className="px-6 py-3 rounded-lg font-semibold transition-colors bg-amber-800 hover:bg-amber-900 text-white shadow-sm"
                    >
                        🏠 Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}