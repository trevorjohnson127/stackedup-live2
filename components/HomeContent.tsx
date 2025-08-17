'use client';

import { useEffect, useState } from 'react';
import BottomTabs from './BottomTabs';

const strategyQuotes = [
  'Built not bought. Every move earns your freedom.',
  'Conviction beats noise. Stay aligned.',
  'Trim gains, protect capital, repeat.',
  'Red means slow down, not reverse.',
  'Your binder is your brain when emotions rise.',
];

export default function HomeContent() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const random = strategyQuotes[Math.floor(Math.random() * strategyQuotes.length)];
    setQuote(random);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* Welcome Banner */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-bold text-mint-dark drop-shadow-glow animate-fade-in">
          Welcome Back, Investor
        </h1>
        <p className="text-sm text-gray-600 mt-1">{today}</p>
      </div>

      {/* Bottom Tabs Interactive Section */}
      <BottomTabs />

      {/* Strategic Reminder Quote */}
      <div className="text-center text-lg mt-8 italic text-mint-dark bg-mint-100 p-4 rounded-lg border border-mint-300 shadow-md">
        {quote}
      </div>
    </div>
  );
}
