'use client';
import { useState } from 'react';
import DigitalBinder_Part1 from './DigitalBinder_Part1';
import DigitalBinder_Part2 from './DigitalBinder_Part2';

export default function DigitalBinder() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-white to-mint-200 text-black overflow-y-auto">
      <h1 className="text-4xl font-bold text-center text-mint-600 mb-4">📘 Digital Binder</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by topic, keyword, tool, or phrase..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl px-4 py-2 border border-mint-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-300"
        />
      </div>

      {/* Pass search term to both binder parts */}
      <DigitalBinder_Part1 searchQuery={searchQuery} />
      <DigitalBinder_Part2 searchQuery={searchQuery} />
    </div>
  );
}
