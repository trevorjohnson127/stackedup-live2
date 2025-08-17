
'use client';

import React, { useEffect, useState } from 'react';
import { getSuggestions } from '../lib/data';

export default function SmartSuggestions() {
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    getSuggestions().then(setTips);
  }, []);

  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-2">🧠 Smart Suggestions</h2>
      <ul className="list-disc pl-5 text-sm">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
