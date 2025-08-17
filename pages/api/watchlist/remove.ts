import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

function isAuthorized(req: NextApiRequest) {
  const raw =
    (req.headers.authorization as string | undefined) ??
    (req.headers['x-bridge-secret'] as string | undefined) ??
    '';
  const token = raw.trim();
  return (
    token === process.env.BRIDGE_SECRET ||
    token === `Bearer ${process.env.BRIDGE_SECRET}`
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthorized(req)) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const { user_id, tickers } = req.body as { user_id?: string; tickers?: string[] };

  if (!user_id || !Array.isArray(tickers) || tickers.length === 0) {
    return res.status(400).json({
      ok: false,
      error: 'Body must include user_id and non-empty tickers[]',
      example: { user_id: '<YOUR_SUPABASE_AUTH_UID>', tickers: ['ROL', 'HEI'] }
    });
  }

  const upTickers = tickers.map(t => t.toUpperCase().trim());

  const { error } = await supa
    .from('watchlist_items')
    .delete()
    .eq('user_id', user_id)
    .in('ticker', upTickers);

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, removed: upTickers.length });
}

