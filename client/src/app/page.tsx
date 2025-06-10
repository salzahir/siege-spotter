"use client";
import { useRef } from "react";

export default function Home() {
    const siegeImage = useRef<HTMLImageElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      if (!siegeImage.current) return;
      const rect = siegeImage.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const normalizedX = (x / rect.width).toFixed(4);
      const normalizedY = (y / rect.height).toFixed(4);

      console.log('Pixel Coordinates:', x, y);
      console.log('Normalized (0–1) Coordinates:', normalizedX, normalizedY);
    }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold">Welcome to Next.js</h1>
      </div>
      <div className="flex items-center justify-center mb-4 width-full h-screen">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          ref={siegeImage}
          src="/siege.png"
          alt="Siege Image"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </>
  );
}
