"use client";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import Link from "next/link";

interface User {
    id: number;
    name: string;
    bestTime: number;
    currentTime: number;
    lastPlayed: string;
}

export default function User() {
    const {fetchData, loading, error} = useApi("GET");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => { 
        async function fetchUsers() {
            try {
                const data = await fetchData("/users/me");
                console.log("Fetched user data:", data);
                setUser(data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }
        fetchUsers();
    }, [fetchData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-amber-900 mb-2">User Profiles</h1>
                <p className="text-amber-700 text-lg">View and manage your user profile</p>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error loading users: {error}</p>}

            <div className="max-w-4xl mx-auto">
                {user ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200 text-black">
                        <h2 className="text-2xl font-semibold text-amber-900 mb-4">Profile Details</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Best Time:</strong> {user.bestTime / 1000} seconds</p>
                        <p><strong>Current Time:</strong> {user.currentTime / 1000} seconds</p>
                        <p><strong>Last Played:</strong> {new Date(user.lastPlayed).toLocaleDateString()}</p>
                        <p><strong>User ID:</strong> {user.id}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No user data available.</p>
                )}

                {/* Primary Action */}
                <div className="pt-4">
                    <Link 
                        href="/game"
                        className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#3F7B5C] hover:bg-[#3F7B5C] shadow-lg transform hover:scale-105"
                    >
                        🎯 Start Game
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                    <Link
                        href="/leaderboard"
                        className="px-6 py-3 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#C89F45] hover:bg-[#C89F45] text-center"
                    >
                        🏆 Leaderboard
                    </Link>
                    <Link
                        href="/context"
                        className="px-6 py-3 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#B44A2F] hover:bg-[#B44A2F] text-center"
                    >
                        🏰 Context
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-3 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#6B7280] hover:bg-[#6B7280] text-center"
                    >
                        🔐 Login
                    </Link>


            </div>
        </div>
    ;
    </div>
    );
}