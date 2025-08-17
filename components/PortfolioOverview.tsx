'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/client';
import type { Database } from '@/types/supabase';
import axios from 'axios';

interface Holding {
  id: string;
  ticker: string;
  shares: number;
  value: number;
}

export default function PortfolioOverview() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('user_holdings')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching holdings:', error.message);
        setHoldings([]);
      } else {
        setHoldings(data || []);
      }

      setLoading(false);
    };

    fetchHoldings();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading holdings...</p>
      ) : (
        <ul>
          {holdings.map((holding) => (
            <li key={holding.id}>
              {holding.ticker}: {holding.shares} shares = ${holding.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
