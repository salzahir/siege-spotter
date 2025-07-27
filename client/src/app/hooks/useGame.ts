import { useState } from "react";
import useApi from "./useApi";

export default function useGame(setGameMessage: (message: string | null) => void) {
    const [gameOver, setGameOver] = useState(false);
    const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
    const { fetchData, error } = useApi("POST");
    
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

    return {
        gameOver,
        foundCharacters,
        setGameOver,
        setFoundCharacters,
        checkWaldo,
        setGameMessage,
        error,
    };
}

