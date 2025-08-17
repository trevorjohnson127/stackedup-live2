
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Auth() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ Magic link sent! Check your email.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4 text-mint-700">Sign in to StackedUp</h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-mint-600 text-white px-4 py-2 rounded shadow hover:bg-mint-700"
      >
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}

