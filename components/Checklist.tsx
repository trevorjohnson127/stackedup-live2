
'use client';

import React from 'react';

export default function Checklist() {
  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-semibold mb-3">📋 Daily Checklist</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>🕒 Pre-Market Setup</li>
        <li>📈 Midday Discipline</li>
        <li>🧠 Final 15 Review</li>
        <li>📝 Post-Market Reflection</li>
      </ul>
    </div>
  );
}
