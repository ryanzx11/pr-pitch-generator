const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY;
const API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_pro';

export async function generatePitch({ product, intro, bullets, style }) {
  const styleDescriptions = {
    formal: 'Professional, polished, suitable for first-tier tech media like The Verge or TechRadar',
    friendly: 'Warm and conversational, as if writing to a colleague or friend',
    concise: 'Short and direct, maximum efficiency, fewest words possible'
  };

  const bulletText = bullets.map(b => `- ${b}`).join('\n');
  const prompt = `You are a PR professional writing a cold pitch email to a journalist you've never met.
Product: ${product}
Brief: ${intro}
Key selling points:
${bulletText}
Style: ${styleDescriptions[style]}

Write a cold pitch email with:
- Subject line (start with "Subject:")
- Body (2-3 paragraphs, natural, NOT salesy, NOT AI-sounding)

Rules:
- NO emojis
- Keep body under 150 words
- Sound like a real human journalist who actually cares about cool tech
- Do NOT use phrases like "exciting", "innovative", "cutting-edge"
- Subject should be under 50 characters

Format your response exactly as:
Subject: [your subject line here]

[your email body here]`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'MiniMax-Text-01',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';

  // Parse subject and body
  const subjectMatch = text.match(/^Subject:\s*(.+)$/m);
  const subject = subjectMatch ? subjectMatch[1].trim() : product;
  const body = text.replace(/^Subject:\s*.+$/m, '').trim();

  return { subject, body };
}