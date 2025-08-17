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

  const { user_id, filename, contentType = 'image/png', alt, meta = {} } = req.body as any;
  if (!user_id || !filename) {
    return res.status(400).json({
      ok: false,
      error: 'Body must include user_id and filename',
      example: { user_id: '<YOUR_SUPABASE_AUTH_UID>', filename: 'hero.png' }
    });
  }

  const path = `assets/${user_id}/${filename}`;

  const { data: signed, error: signErr } = await supa.storage
    .from('assets')
    .createSignedUploadUrl(path, 60 * 60);

  if (signErr) return res.status(500).json({ ok: false, error: signErr.message });

  await supa.from('media_assets').insert({ user_id, path, alt, meta });

  res.json({ ok: true, uploadUrl: signed.signedUrl, path, contentType });
}
