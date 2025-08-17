import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '../../../lib/plaid';
import type { Products, CountryCode } from 'plaid';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const response = await plaidClient.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: 'StackedUp',
    products: ['auth'] as Products[],
    country_codes: ['US'] as CountryCode[],
    language: 'en',
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI ?? '',
  });

  return NextResponse.json(response.data);
}

