const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchReferences() {
  const res = await fetch(`${API_BASE}/api/references`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch references (${res.status})`);
  }

  return res.json();
}
