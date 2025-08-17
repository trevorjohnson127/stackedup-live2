'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/client'; // centralized import
import type { Database } from '@/types/supabase';

type UserAccount = Database['public']['Tables']['user_accounts']['Row'];

export default function LinkedAccounts({ user }: { user: any }) {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('user_accounts')
        .select('id, plaid_item_id, institution_name, access_token')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching accounts:', error.message);
        setAccounts([]);
      } else {
        setAccounts(
          (data || []).map((item) => ({
            id: item.id || (self.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2)),
            user_id: user.id || '',
            plaid_item_id: item.plaid_item_id || '',
            institution_name: item.institution_name || '',
            access_token: item.access_token || '',
            created_at: new Date().toISOString(),
          }))
        );
      }

      setLoading(false);
    };

    fetchAccounts();
  }, [user]);

  return (
    <div className="linked-accounts">
      {loading ? (
        <p>Loading linked accounts...</p>
      ) : accounts.length === 0 ? (
        <p>No linked accounts found.</p>
      ) : (
        <ul>
          {accounts.map((acc) => (
            <li key={acc.id}>
              <strong>{acc.institution_name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
