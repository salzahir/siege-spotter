import { useState } from "react";
import useApi from "../hooks/useApi";

function Login() {
    const { fetchData, error } = useApi("POST", false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const credentials = { email, password };
        const res = await fetchData("/login", credentials);
        if (!res) {
            console.error("Login failed:", error);
            return;
        }

    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" required />
                </div>
                {error && <p className="error">{error}</p>}


            </form>
        </div>
    );
}