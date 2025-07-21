"use client";
import Link from "next/link";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#D6C7B0]">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-[#B44A2F]">
                    🎯 Siege Spotter
                </h1>
                
                <p className="text-lg text-[#3C3C3C]">
                    Find hidden characters in a medieval siege scene!
                </p>

                <div className="p-6 rounded-lg shadow-md max-w-md bg-[#F5F5F5] border-2 border-[#C89F45]">
                    <h2 className="text-xl font-semibold mb-3 text-[#1F4D7A]">How to Play:</h2>
                    <ul className="text-left space-y-1 text-[#3C3C3C]">
                        <li>• Click on the image to find characters</li>
                        <li>• Find all 5 hidden characters</li>
                        <li>• Beat your best time!</li>
                    </ul>
                </div>

                {/* Primary Action */}
                <div className="pt-4">
                    <Link 
                        href="/game"
                        className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#3F7B5C] hover:bg-[#3F7B5C] shadow-lg transform hover:scale-105"
                    >
                        🎯 Start Game
                    </Link>
                </div>

                {/* Secondary Actions */}
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
        </div>
    );
}

export default Home;