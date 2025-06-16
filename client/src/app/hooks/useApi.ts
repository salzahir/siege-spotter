import { useState, useCallback } from "react";
import { getApiUrl } from "../services/api";

type RequestBody = Record<string, unknown>;

function useApi(method: string, requiresAuth: boolean) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isApiDown, setIsApiDown] = useState(false);

    const fetchData = useCallback(async (endpoint: string, body?: RequestBody) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            
            if (requiresAuth && token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(getApiUrl(endpoint), { 
                method, 
                headers,
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                let errorMessage = "Request failed";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = response.statusText || errorMessage;
                }
                setError(errorMessage);
                setIsApiDown(false);
                return null;
            }
            setIsApiDown(false);
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                setError("Unable to connect to the server. Please check if the API is running.");
                setIsApiDown(true);
                return null;
            } else {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setError(errorMessage);
                setIsApiDown(false);
                return null;
            }
        } finally {
            setLoading(false);
        }
    }, [method, requiresAuth]);

    return { fetchData, loading, error, isApiDown };
}

export default useApi;