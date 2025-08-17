
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/client';
import { Database } from '@/types/supabase';

type WatchlistItem = Database['public']['Tables']['watchlist']['Row'];

type Props = {
  user: {
    id: string;
  } | null;
};

export default function WatchlistModule({ user }: Props) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching watchlist:', error.message);
        setWatchlist([]);
      } else {
        setWatchlist(data || []);
      }

      setLoading(false);
    };

    fetchWatchlist();
  }, [user]);

  return (
    <div className="watchlist-module">
      {loading ? (
        <p>Loading watchlist...</p>
      ) : watchlist.length === 0 ? (
        <p>No watchlist items found.</p>
      ) : (
        <ul>
          {watchlist.map((item) => (
            <li key={item.id}>
              <strong>{item.ticker}</strong> — {item.conviction} conviction, {item.role} role
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
