import { useState, useCallback } from "react";
import { getApiUrl } from "../services/api";

type RequestBody = Record<string, unknown>;

function useApi(method: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isApiDown, setIsApiDown] = useState(false);

    const fetchData = useCallback(async (endpoint: string, body?: RequestBody) => {
        setLoading(true);
        setError(null);
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            console.log("🔗 Full URL to fetch:", getApiUrl(endpoint));
            const response = await fetch(getApiUrl(endpoint), {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                credentials: 'include' 
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
    }, [method]);

    return { fetchData, loading, error, isApiDown };
}

export default useApi;