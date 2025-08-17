import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '../../../lib/plaid';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const { public_token, userId } = await req.json();

  const exchange = await plaidClient.itemPublicTokenExchange({ public_token });
  const access_token = exchange.data.access_token;
  const item_id = exchange.data.item_id;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  await supabase.from('user_accounts').upsert({
    id: userId,
    plaid_access_token: access_token,
    plaid_item_id: item_id,
  });

  return NextResponse.json({ success: true });
}
