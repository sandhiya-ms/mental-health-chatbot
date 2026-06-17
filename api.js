const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function sendMessage(message) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getTips(mood) {
  const res = await fetch(`${BASE_URL}/api/tips/${mood}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
