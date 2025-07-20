import { useRef } from "react";
import { useState } from "react";

function useTimer() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    let timer = 0;
    if (startTime && now) {
        timer = (now - startTime);
    }

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

    function resetTimer() {
        handleStop();
        setStartTime(null);
        setNow(null);
    }

    return { timer, handleStart, handleStop, resetTimer, startTime };
}
export default useTimer;