const API_BASE = 'http://localhost:5000/api';

export async function fetchAvailabilities() {
  const res = await fetch(`${API_BASE}/availabilities`);
  if (!res.ok) throw new Error('Failed to fetch availabilities');
  return res.json();
}

export async function createAvailability(data: any) {
  const res = await fetch(`${API_BASE}/availabilities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create availability');
  return res.json();
}

export async function updateAvailability(id: number, data: any) {
  const res = await fetch(`${API_BASE}/availabilities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update availability');
  return res;
}

export async function deleteAvailability(id: number) {
  const res = await fetch(`${API_BASE}/availabilities/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete availability');
  return res;
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
}

export async function createAppointment(data: any) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create appointment');
  return res.json();
}
