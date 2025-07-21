"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import useApi from "../hooks/useApi";
import useTimer from "../hooks/useTimer";
import useForm from "../hooks/useForm";

export default function Game() {
  const [cords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const siegeImage = useRef<HTMLImageElement>(null);
  const { fetchData, error } = useApi("POST");
  const charactersToFind = useMemo(() => [
    "White Turban Guy",
    "Orange Shirt Guy",
    "Orange Flag",
    "White Horse",
    "Red Dress Woman"
  ], []);
  const [gameOver, setGameOver] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const { timer, handleStart, handleStop, resetTimer, startTime } = useTimer();
  const { name, email, password, setName, setEmail, setPassword, handleSubmit, formMessage, resetForm } = useForm(timer);

  useEffect(() => {
    const allFound = charactersToFind.every(char => foundCharacters.includes(char));
    if (allFound && !gameOver) {
      setGameOver(true);
      setGameMessage("Game Over You have already found all characters! Please refresh the page to play again.");
      handleStop();
    }
  }, [foundCharacters, charactersToFind, gameOver, handleStop]);

  async function checkWaldo(cords: { x: number, y: number }) {
    if (!cords) return;

    try {
      setGameMessage("");
      const res = await fetchData("/check", {
        postX: cords.x,
        postY: cords.y,
      });
      if (res) {
        if (res.character && !foundCharacters.includes(res.character)) {
          setFoundCharacters(prev => [...prev, res.character]);
        }
        setGameMessage(res.message);
      }
    } catch (err) {
      console.error("Error checking Waldo:", err);
      alert("An error occurred while checking for Waldo.");
    }
  }

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">🎯 Siege Spotter</h1>
        <p className="text-amber-700 text-sm">Find all characters in the medieval siege scene</p>
      </div>

      {/* Game Status Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Timer */}
            <div className="text-lg font-semibold text-amber-900">
              ⏱️ {(timer / 1000).toFixed(1)}s
            </div>
            
            {/* Characters Progress */}
            <div className="flex flex-wrap gap-2">
              {charactersToFind.map((char) => (
                <span
                  key={char}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    foundCharacters.includes(char)
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {foundCharacters.includes(char) ? '✓' : '•'} {char}
                </span>
              ))}
            </div>

            {/* Progress Counter */}
            <div className="text-sm font-medium text-amber-800">
              {foundCharacters.length}/{charactersToFind.length} found
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-6xl mx-auto mb-4">
        {gameMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-center mb-2">
            {gameMessage}
          </div>
        )}
        {formMessage && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg text-center mb-2">
            {formMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-center mb-2">
            Error: {error}
          </div>
        )}
      </div>

      {/* Game Image */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            ref={siegeImage}
            src="/siege.png"
            alt="Medieval Siege Scene - Find the hidden characters"
            className="cursor-crosshair max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border-2 border-amber-200"
            onClick={handleClick}
          />
          {cords && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {cords.x.toFixed(3)}, {cords.y.toFixed(3)}
            </div>
          )}
        </div>
      </div>

      {/* Game Complete Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <button
              onClick={resetGame}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Congratulations!</h2>
              <p className="text-amber-700">You found all characters in {(timer / 1000).toFixed(1)} seconds!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password (Optional)</label>
                <input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Save to Leaderboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 pt-8">
        <Link 
          href="/" 
          className="px-6 py-3 rounded-lg font-semibold transition-colors bg-amber-800 hover:bg-amber-900 text-white shadow-sm"
        >
          🏠 Home
        </Link>
        <Link 
          href="/context" 
          className="px-6 py-3 rounded-lg font-semibold transition-colors bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
        >
          🏰 Historical Context
        </Link>
        <Link 
          href="/leaderboard" 
          className="px-6 py-3 rounded-lg font-semibold transition-colors bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
        >
          🏆 Leaderboard
        </Link>
      </div>
    </div>
  );
}
