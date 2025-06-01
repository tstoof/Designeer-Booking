const API_BASE = 'http://localhost:5000/api';

export async function fetchAvailabilities() {
  const res = await fetch(`${API_BASE}/availabilities`);
  return res.json();
}

export async function createAvailability(data: any) {
  const res = await fetch(`${API_BASE}/availabilities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/appointments`);
  return res.json();
}

export async function createAppointment(data: any) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}