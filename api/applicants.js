const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function fetchApplicants() {
  const res = await fetch(`${API_BASE}/api/dashboard/applicants`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch applicants (${res.status})`);
  }

  return res.json();
}

export async function deleteApplicant(id) {
  const res = await fetch(`${API_BASE}/api/dashboard/applicants/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete applicant");
}
