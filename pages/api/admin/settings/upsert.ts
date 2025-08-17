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

  const { user_id, key, value } = req.body as { user_id?: string; key?: string; value?: any };
  if (!user_id || !key) {
    return res.status(400).json({
      ok: false,
      error: 'Body must include user_id and key',
      example: {
        user_id: '<YOUR_SUPABASE_AUTH_UID>',
        key: 'watchlist_layout',
        value: { columns: ['ticker', 'description'] }
      }
    });
  }

  const { error } = await supa
    .from('site_settings')
    .upsert({ user_id, key, value }, { onConflict: 'user_id,key' });

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true });
}
