const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchCurrentPets() {
  const res = await fetch(`${API_BASE}/api/current_pets/`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch current pet data (${res.status})`);
  }

  return res.json();
}

export async function deleteCurrentPets(id) {
  const res = await fetch(`${API_BASE}/api/current_pets/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete current pet");
}
