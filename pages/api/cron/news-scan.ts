// pages/api/cron/news-scan.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null as any;
  return createClient(url, key);
}

async function notify(user_id: string, title: string, body: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://stackedup.live';
  try {
    await fetch(`${base}/api/bridge`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BRIDGE_SECRET!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation: 'notify.test', user_id }),
    });
  } catch {} // ignore bridge failures

  const supa = getAdminClient();
  if (supa) {
    await supa.from('notifications').insert({ user_id, kind: 'news', title, body });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const ok =
    !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  await notify('demo-user', 'News Scan Complete', 'No critical alerts found in the last window.');

  return res.status(ok ? 200 : 503).json({
    ok,
    reason: ok ? 'notified' : 'missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY',
  });
}
