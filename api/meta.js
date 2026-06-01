export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') { res.status(200).json({ status: 'ok', message: 'Cowboys Meta Proxy actief' }); return; }
  const { endpoint, ...body } = req.body || {};
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' });
  try {
    const r = await fetch(`https://graph.facebook.com/v19.0/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
