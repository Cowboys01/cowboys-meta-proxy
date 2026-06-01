export const config = { runtime: 'edge' };

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS' || req.method === 'GET') {
    return new Response(JSON.stringify({ status: 'ok' }), { status: 200, headers });
  }

  try {
    const { endpoint, ...body } = await req.json();
    if (!endpoint) return new Response(JSON.stringify({ status: 'ok' }), { status: 200, headers });

    const r = await fetch(`https://graph.facebook.com/v19.0/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await r.json();
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 200, headers });
  }
}
