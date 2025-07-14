"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import useApi from "../hooks/useApi";

export default function Game() {
  const [cords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const siegeImage = useRef<HTMLImageElement>(null);
  const { fetchData, error } = useApi("POST", false);
  const { fetchData: postUser } = useApi("POST", true);
  const [message, setMessage] = useState<string | null>(null);
  const charactersToFind = useMemo(() => [
    "White Turban Guy",
    "Orange Shirt Guy",
    "Orange Flag",
    "White Horse",
    "Red Dress Woman"
  ], []);
  const [gameOver, setGameOver] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 45);
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;

  }

  const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!startTime && !gameOver) {
      handleStart();
      setMessage("Game Started! Click on the image to find Waldo.");
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

  }

  useEffect(() => {
    const allFound = charactersToFind.every(char => foundCharacters.includes(char));
    if (allFound && !gameOver) {
      setGameOver(true);
      setMessage("Game Over You have already found all characters! Please refresh the page to play again.");
      handleStop();
    }
  }, [foundCharacters, charactersToFind, gameOver]);

  async function checkWaldo(cords: { x: number, y: number }) {
    if (!cords) return;

    try {
      setMessage("");
      const res = await fetchData("/check", {
        postX: cords.x,
        postY: cords.y,
      });
      if (res) {
        if (res.character && !foundCharacters.includes(res.character)) {
          setFoundCharacters(prev => [...prev, res.character]);
        }
        setMessage(res.message);
      }
    } catch (err) {
      console.error("Error checking Waldo:", err);
      alert("An error occurred while checking for Waldo.");
    }
  }

  let timer = 0;
  if (startTime && now) {
    timer = (now - startTime);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const json = { name, email, password, timer };
    try {
      const response = await postUser("/users", json);
      if (response) {
        console.log("User data submitted successfully:", response);
        setMessage("User data submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting user data:", err);
      setMessage("An error occurred while submitting user data.");
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold">Welcome to Next.js</h1>
        {cords && (
          <div className="flex items-center justify-center p-4 bg-gray-800 text-white gap-2">
            <p>Pixel Coordinates: {cords.x}, {cords.y}</p>
            <p>Normalized Coordinates: {cords.x.toFixed(4)}, {cords.y.toFixed(4)}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {charactersToFind.map((char) => (
            <span
              key={char}
              className={`inline-block px-2 py-1 rounded ${foundCharacters.includes(char)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-black'
                }`}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="text-lg font-semibold mt-4">
          Time: {(timer / 1000).toFixed(3)} seconds
        </div>

        {
          message && (
            <div className="text-green-500 mt-4">
              <p>{message}</p>
            </div>
          )
        }

        {
          error && (
            <div className="text-red-500 mt-4">
              <p>Error: {error}</p>
            </div>
          )
        }

        {
          gameOver && (
            <div className="text-blue-500 mt-4 flex flex-col gap-4">
              <p>Congratulations! You have found all characters!</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="password">Password (Optional):</label>
                <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Submit
                </button>
              </form>
            </div>
          )
        }

      </div>
      <div className="flex items-center justify-center mb-8 w-full">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          ref={siegeImage}
          src="/siege.png"
          alt="Siege Image"
          className="cursor-crosshair max-w-[90%] max-h-[80vh] object-contain border border-gray-300 rounded"
          onClick={handleClick}
        />
      </div>
    </>
  );
}
