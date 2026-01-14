const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchHouseholds() {
  const res = await fetch(`${API_BASE}/api/households`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch household data (${res.status})`);
  }

  return res.json();
}

export async function deleteHouseholds(id) {
  const res = await fetch(`${API_BASE}/api/households/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete household member");
}
