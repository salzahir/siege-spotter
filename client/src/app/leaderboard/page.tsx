"use client";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

interface User {
    id: number;
    name: string;
    bestTime: string;
    currentTime: string;
    lastPlayed: string;
}

function Leaderboard() {
        
    const {fetchData, loading, error} = useApi("GET", false);
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


    return (

        <div>
            <h1>Leaderboard</h1>
            {error && <p>Error fetching leaderboard data</p>}
            {loading && <p>Loading...</p>}  
            <ul>
                {users && users.map(user => (
                    <li key={user.id}>Name: {user.name}, Best Time: {user.bestTime}, Current Time: {user.currentTime}, Last Played: {user.lastPlayed}</li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;