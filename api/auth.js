const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export const verifyToken = async (token) => {
  const response = await fetch(`${API_BASE}/api/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Verification failed");
  }

  return response.json();
};
