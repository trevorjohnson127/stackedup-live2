// components/DisasterProtocol.tsx
import React from 'react';

export default function DisasterProtocol() {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">🚨 Disaster Protocol</h2>
      <p className="mb-4">
        This protocol is activated during extreme emotional or market stress. Use it when you're feeling
        panic, confusion, fear of missing out (FOMO), or emotional pressure to act quickly.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Step 1:</strong> STOP. Do not take any action immediately. Breathe and pause for at least 15 minutes.</li>
        <li><strong>Step 2:</strong> Re-read your strategy binder (pg. 4-7, Mental Systems section).</li>
        <li><strong>Step 3:</strong> Check if the situation truly violates your thesis — or just your emotions.</li>
        <li><strong>Step 4:</strong> Use Decision Delta if you’re stuck between two choices.</li>
        <li><strong>Step 5:</strong> If unsure, LOCK the account (Red Flag Mode) or set a timer to revisit in 1 hour.</li>
      </ul>
      <p className="mt-4 text-sm text-gray-600 italic">
        Reminder: Most bad trades happen during panic or greed. This tool exists to break that pattern.
      </p>
    </div>
  );
}
