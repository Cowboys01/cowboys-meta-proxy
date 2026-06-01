export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint, ...body } = req.body || {};

  if (!endpoint) {
    return res.status(200).json({ status: 'ok' });
  }

  try {
    const url = new URL(`https://graph.facebook.com/v19.0/${endpoint}`);
    
    const metaRes = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await metaRes.json();
    return res.status(200).json(data);
  } catch(e) {
    return res.status(200).json({ error: e.message });
  }
}
