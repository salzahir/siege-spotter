"use client";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import NavigationButtons from "../components/NavigationButtons";

interface User {
    id: number;
    name: string;
    bestTime: string;
    currentTime: string;
    lastPlayed: string;
}

function Leaderboard() {
    const {fetchData, loading, error} = useApi("GET");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => { 
        async function fetchLeaderboard() {
            try {
                const data = await fetchData("/users");
                setUsers(data);
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
            }
        }
        fetchLeaderboard();
    }, [fetchData]);

    const formatTime = (timeString: string) => {
        const time = parseFloat(timeString);
        return `${(time / 1000).toFixed(1)}s`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Never";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getRankEmoji = (index: number) => {
        switch (index) {
            case 0: return "🥇";
            case 1: return "🥈";
            case 2: return "🥉";
            default: return "🏅";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">🏆 Leaderboard</h1>
                    <p className="text-amber-700 text-lg md:text-xl">Top siege spotters and their fastest times</p>
                </div>

                {/* Content */}
                <div className="mb-12">
                    {/* Loading State */}
                    {loading && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-amber-200 text-center max-w-2xl mx-auto">
                            <div className="text-amber-600 text-lg">⏳ Loading leaderboard...</div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl text-center mb-6 max-w-2xl mx-auto">
                            <div className="font-semibold">❌ Error fetching leaderboard data</div>
                            <div className="text-sm mt-1">Please try refreshing the page</div>
                        </div>
                    )}

                    {/* Leaderboard Table */}
                    {!loading && !error && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 overflow-hidden max-w-5xl mx-auto">
                            {users.length === 0 ? (
                                <div className="p-12 text-center text-amber-700">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <div className="text-xl font-semibold mb-2">No players yet!</div>
                                    <div className="text-base">Be the first to complete the siege challenge</div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-amber-100 border-b border-amber-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">Rank</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">Player</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">Best Time</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">Last Played</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-amber-100">
                                            {users.map((user, index) => (
                                                <tr key={user.id} className={`hover:bg-amber-50 transition-colors ${index < 3 ? 'bg-gradient-to-r from-amber-50 to-orange-50' : ''}`}>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="text-xl mr-3">{getRankEmoji(index)}</span>
                                                            <span className="text-sm font-bold text-amber-900">#{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="text-base font-semibold text-amber-900">{user.name}</div>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="text-base font-bold text-green-700">{formatTime(user.bestTime)}</div>
                                                        <div className="text-sm text-amber-600">Current: {formatTime(user.currentTime)}</div>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="text-base text-amber-700">{formatDate(user.lastPlayed)}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons - Centered */}
                <div className="flex justify-center">
                    <NavigationButtons excludeItems={["/leaderboard"]} className="w-full max-w-md" />
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;