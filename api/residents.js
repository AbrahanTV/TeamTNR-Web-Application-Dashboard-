const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchResidents() {
  const res = await fetch(`${API_BASE}/api/residents/`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch resident data (${res.status})`);
  }

  return res.json();
}

export async function deleteResidents(id) {
  const res = await fetch(`${API_BASE}/api/residents/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete resident");
}
