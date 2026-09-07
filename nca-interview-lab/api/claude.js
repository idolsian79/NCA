// Vercel serverless function (Node.js runtime).
// Keeps ANTHROPIC_API_KEY on the server — never exposed to the browser.
// The frontend calls POST /api/claude with { system, prompt, maxTokens }.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set on the server. Add it in Vercel → Project Settings → Environment Variables, then redeploy.'
    });
  }

  const { system, prompt, maxTokens } = req.body || {};
  if (!system || !prompt) {
    return res.status(400).json({ error: 'Request must include both "system" and "prompt".' });
  }

  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: typeof maxTokens === 'number' ? maxTokens : 600,
        system,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await anthropicResponse.json();

    if (!anthropicResponse.ok) {
      return res.status(anthropicResponse.status).json({
        error: data?.error?.message || 'Anthropic API returned an error.'
      });
    }

    const text = data?.content?.find(block => block.type === 'text')?.text || '';
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unexpected server error calling Anthropic API.' });
  }
}
