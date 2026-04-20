export async function generatePitch({ product, intro, bullets, style }) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, intro, bullets, style })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  return { subject: data.subject, body: data.body };
}
