"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import useTimer from "../hooks/useTimer";
import useForm from "../hooks/useForm";
import NavigationButtons from "../components/NavigationButtons";
import useGame from "../hooks/useGame";
import useApi from "../hooks/useApi";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Game() {
  const [cords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const { fetchData } = useApi("GET");
  const [user, setUser] = useState<User | null>(null);
  const siegeImage = useRef<HTMLImageElement>(null);
  const charactersToFind = useMemo(() => [
    "White Turban Guy",
    "Orange Shirt Guy",
    "Orange Flag",
    "White Horse",
    "Red Dress Woman"
  ], []);

  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const { timer, handleStart, handleStop, resetTimer, startTime } = useTimer();
  const { name, email, password, setName, setEmail, setPassword, handleSubmit, formMessage, resetForm } = useForm(timer);
  const { gameOver, foundCharacters, setGameOver, setFoundCharacters, checkWaldo, error } = useGame(setGameMessage);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetchData("/users/me")
        setUser(res)
        console.log(res)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, [fetchData]);

  useEffect(() => {
    const allFound = charactersToFind.every(char => foundCharacters.includes(char));
    if (allFound && !gameOver) {
      setGameOver(true);
      setGameMessage("Game Over You have already found all characters! Please refresh the page to play again.");
      handleStop();
    }
  }, [foundCharacters, charactersToFind, gameOver, handleStop, setGameOver]);

  async function handleClick(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    if (!startTime && !gameOver) {
      handleStart();
      setGameMessage("Game Started! Click on the image to find Waldo.");
    }

    if (!siegeImage.current) return;
    const rect = siegeImage.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const normalizedX = (x / rect.width).toFixed(4);
    const normalizedY = (y / rect.height).toFixed(4);

    console.log('Pixel Coordinates:', x, y);
    console.log('Normalized (0–1) Coordinates:', normalizedX, normalizedY);
    const newCoords = { x: parseFloat(normalizedX), y: parseFloat(normalizedY) };
    setCoords(newCoords);
    checkWaldo(newCoords);
  };

  function resetGame() {
    // Close modal and reset game state
    setGameOver(false);
    setGameMessage(null);
    setFoundCharacters([]);
    setCoords(null);

    resetForm();
    resetTimer();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">🎯 Siege Spotter</h1>
          <p className="text-amber-700 text-lg md:text-xl">Find all characters in the medieval siege scene</p>

          <div className="text-center mb-8">
            <p className="text-amber-700 text-lg md:text-xl">
              {user ? `Welcome back, ${user.name}!` : "Welcome Guest!"}
            </p>
          </div>
        </div>

        {/* Game Status Bar */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Timer */}
              <div className="text-xl font-semibold text-amber-900">
                ⏱️ {(timer / 1000).toFixed(1)}s
              </div>

              {/* Characters Progress */}
              <div className="flex flex-wrap gap-2 justify-center flex-1">
                {charactersToFind.map((char) => (
                  <span
                    key={char}
                    className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${foundCharacters.includes(char)
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                  >
                    {foundCharacters.includes(char) ? '✓' : '•'} {char}
                  </span>
                ))}
              </div>

              {/* Progress Counter */}
              <div className="text-lg font-medium text-amber-800">
                {foundCharacters.length}/{charactersToFind.length} found
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="mb-6">
          {gameMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl text-center mb-4 max-w-3xl mx-auto">
              {gameMessage}
            </div>
          )}
          {formMessage && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl text-center mb-4 max-w-3xl mx-auto">
              {formMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl text-center mb-4 max-w-3xl mx-auto">
              Error: {error}
            </div>
          )}
        </div>

        {/* Game Image */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              ref={siegeImage}
              src="/siege.png"
              alt="Medieval Siege Scene - Find the hidden characters"
              className="cursor-crosshair max-w-full max-h-[70vh] object-contain rounded-xl shadow-xl border-2 border-amber-200"
              onClick={handleClick}
            />
            {cords && (
              <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                {cords.x.toFixed(3)}, {cords.y.toFixed(3)}
              </div>
            )}
          </div>
        </div>

        {/* Game Complete Modal */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-2xl mx-4">
              <button
                onClick={resetGame}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Congratulations!</h2>
                <p className="text-amber-700 text-lg">You found all characters in {(timer / 1000).toFixed(1)} seconds!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password (Optional)</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Save to Leaderboard
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Navigation Buttons - Centered */}
        <div className="flex justify-center mt-12">
          <NavigationButtons excludeItems={["/game"]} showPrimaryAction={false} className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}
