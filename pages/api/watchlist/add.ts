import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// tolerant auth: Authorization: "Bearer <secret>" OR x-bridge-secret: "<secret>"
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

  const { user_id, items } = req.body as {
    user_id?: string;
    items?: Array<{
      ticker: string;
      category?: string;
      conviction?: string;
      description?: string | null;
      growth?: boolean | null;
      volatility?: 'low' | 'med' | 'high' | null;
      notes?: string | null;
    }>;
  };

  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      ok: false,
      error: 'Body must include user_id and non-empty items[]',
      example: {
        user_id: '<YOUR_SUPABASE_AUTH_UID>',
        items: [
          {
            ticker: 'ROL',
            category: 'core',
            conviction: 'high',
            description: 'Rollins pest control leader',
            growth: true,
            volatility: 'low'
          }
        ]
      }
    });
  }

  const rows = items.map(i => ({
    user_id,
    ticker: i.ticker.toUpperCase().trim(),
    category: i.category ?? 'other',
    conviction: i.conviction ?? 'medium',
    description: i.description ?? null,
    growth: i.growth ?? null,
    volatility: i.volatility ?? null,
    notes: i.notes ?? null
  }));

  const { error } = await supa
    .from('watchlist_items')
    .upsert(rows, { onConflict: 'user_id, ticker' });

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, count: rows.length });
}
