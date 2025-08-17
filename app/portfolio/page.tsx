'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import PortfolioSnapshot from '@/components/PortfolioSnapshot';
import WatchlistModule from '@/components/WatchlistModule'; // Add this or comment it if not ready
import Link from 'next/link';

export default function PortfolioPage() {
  const supabase = createClientComponentClient<Database>();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
const [activeTab, setActiveTab] = useState<'Home' | 'Watchlist'>('Home');
  const userId = '13bbc8d8-df04-4a3b-88ae-88a218eccdd1'; // Your locked UUID

  // ✅ Fetch link token from your API
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/create-link-token', {
          method: 'POST',
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (err) {
        console.error('Token fetch error:', err);
      }
    };
    fetchToken();
  }, []);

  // ✅ Handle Plaid link
  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess: async (public_token, metadata) => {
      try {
        await axios.post('/api/exchange-public-token', { public_token });
        const res = await axios.post('/api/fetch-accounts');
        const plaidAccounts = res.data.accounts;

        for (const acct of plaidAccounts) {
          await supabase.from('user_accounts').insert({
            user_id: userId,
            account_id: acct.account_id,
            name: acct.name,
            mask: acct.mask,
            type: acct.type,
            subtype: acct.subtype,
            institution_name: acct.institution_name,
            balance: acct.balances.available,
          });
        }
        setAccounts(plaidAccounts);
      } catch (err) {
        console.error('Plaid sync error:', err);
      }
    },
  });

  // ✅ Render active tab content
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <PortfolioSnapshot />;
      case 'Watchlist':
          return <WatchlistModule user={{}} />;
      default:
        return null;
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-mint">📊 Your Portfolio</h1>
        <div className="flex gap-4">
          <button
            onClick={() => open()}
            disabled={!ready}
            className="bg-mint text-white px-4 py-2 rounded hover:bg-mint/90"
          >
            Link Account
          </button>
          <Link href="/" className="text-sm text-mint underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* 🔁 Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('Home')}
          className={`px-3 py-1 rounded ${
            activeTab === 'Home' ? 'bg-mint text-white' : 'bg-gray-200'
          }`}
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab('Watchlist')}
          className={`px-3 py-1 rounded ${
            activeTab === 'Watchlist' ? 'bg-mint text-white' : 'bg-gray-200'
          }`}
        >
          Watchlist
        </button>
      </div>

      {/* ✅ Dynamic Page Content */}
      {renderContent()}
    </main>
  );
}
