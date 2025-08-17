import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
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

  const { user_id, access_token } = req.body as { user_id?: string; access_token?: string };
  if (!user_id || !access_token) {
    return res.status(400).json({
      ok: false,
      error: 'Body must include user_id and access_token',
      example: {
        user_id: '<YOUR_SUPABASE_AUTH_UID>',
        access_token: '<PLAID_ACCESS_TOKEN_FOR_FIDELITY>'
      }
    });
  }

  const env = (process.env.PLAID_ENV || 'sandbox') as 'sandbox' | 'development' | 'production';
  const config = new Configuration({
    basePath: PlaidEnvironments[env],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
        'PLAID-SECRET': process.env.PLAID_SECRET!
      }
    }
  });
  const plaid = new PlaidApi(config);

  // Accounts
  const accs = await plaid.accountsGet({ access_token });
  for (const a of accs.data.accounts) {
    await supa.from('accounts').upsert({
      id: a.account_id,
      user_id,
      name: a.name,
      mask: a.mask || null,
      type: a.type,
      subtype: a.subtype || null,
      institution_name: 'Fidelity'
    });
  }

  // Holdings / positions
  const inv = await plaid.investmentsHoldingsGet({ access_token });
  for (const h of inv.data.holdings) {
    const sec = inv.data.securities.find(s => s.security_id === h.security_id);
    const symbol = sec?.ticker_symbol || sec?.iso_currency_code || 'UNKNOWN';
    const market_price = Number(sec?.close_price ?? sec?.current_price ?? 0);
    const market_value = Number(h.quantity) * market_price;

    await supa.from('positions').insert({
      user_id,
      account_id: h.account_id,
      symbol,
      quantity: h.quantity,
      cost_basis: h.cost_basis ?? null,
      market_price,
      market_value
    });
  }

  res.json({
    ok: true,
    accounts: accs.data.accounts.length,
    positions: inv.data.holdings.length
  });
}
