const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchAgreement() {
  const res = await fetch(`${API_BASE}/api/agreement`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch agreement (${res.status})`);
  }

  return res.json();
}
