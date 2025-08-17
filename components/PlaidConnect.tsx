'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidConnect({ userId }: { userId: string }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('/api/create-link-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setToken(data.link_token);
    };
    fetchToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: token || '',
    onSuccess: async (public_token) => {
      await fetch('/api/exchange-public-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token, userId }),
      });
      alert('✅ Connected! Fidelity or AdelFi linked successfully.');
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready || !token}
      className="bg-mint text-black px-4 py-2 rounded shadow-lg hover:scale-105 transition"
    >
      Connect Fidelity / AdelFi
    </button>
  );
}
