"use client";
import { useRef } from "react";
import { useState } from "react";
import useApi from "./hooks/useApi";

export default function Home() {
  const [cords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const siegeImage = useRef<HTMLImageElement>(null);
  const { fetchData, error} = useApi("POST", false);
  const [message, setMessage] = useState<string | null>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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

async function checkWaldo(cords: { x: number, y: number }) {
    if (!cords) return;

    try {
      setMessage("");
      const res = await fetchData("/check", {
        postX: cords.x,
        postY: cords.y,
      });
      if (res) {
        setMessage(res.message);
      }
    } catch (err) {
      console.error("Error checking Waldo:", err);
      alert("An error occurred while checking for Waldo.");
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
