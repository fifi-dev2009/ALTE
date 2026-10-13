const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options ={}) {
 
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options, 
        credentials : "include",
        headers : {
            "Content-Type" : "application/json",
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("Backend Error:", data);
        const errorMessage = 
        typeof data.detail === "string" ? data.detail : "Request Failed. Please check your input.";
        throw new Error (errorMessage);
        
    }

    return data;
    
}

