export const API_URL = "http://localhost:4000";

export async function request<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error("API error");
    }

    return res.json();
}