const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { product, intro, bullets, style } = req.body;

  if (!product || !intro || !bullets || !style) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    const subjectMatch = text.match(/^Subject:\s*(.+)$/m);
    const subject = subjectMatch ? subjectMatch[1].trim() : product;
    const body = text.replace(/^Subject:\s*.+$/m, '').trim();

    return res.status(200).json({ subject, body });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
