// components/Logo.tsx

import React from 'react';

export default function Logo() {
  return (
    <div className="text-center py-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-mint-500 drop-shadow-md">
        Stacked<span className="text-white">Up</span>
      </h1>
      <div className="mt-2 text-sm text-zinc-300 tracking-wide uppercase">
        Built Not Bought
      </div>
    </div>
  );
}
