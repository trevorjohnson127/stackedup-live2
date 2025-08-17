'use client';

import React, { useEffect, useState } from 'react';

export default function RedFlagTriggers() {
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    // Placeholder logic — replace with real checks later
    const detectedFlags: string[] = [];

    const priceDrop = true; // Simulated condition
    const emotionalTrade = false; // Simulated condition
    const thesisBroken = true; // Simulated condition

    if (priceDrop) detectedFlags.push('⚠️ Price dropped over -10% on TSLA');
    if (emotionalTrade) detectedFlags.push('🚨 Emotional trade pattern detected');
    if (thesisBroken) detectedFlags.push('❗ Thesis drift in ELV');

    setFlags(detectedFlags);
  }, []);

  if (flags.length === 0) return null;

  return (
    <div className="rounded-lg border bg-red-100 border-red-400 text-red-800 p-4 shadow">
      <h2 className="text-xl font-bold mb-2">🛑 Red Flag Triggers</h2>
      <ul className="list-disc pl-5">
        {flags.map((flag, idx) => (
          <li key={idx}>{flag}</li>
        ))}
      </ul>
    </div>
  );
}
