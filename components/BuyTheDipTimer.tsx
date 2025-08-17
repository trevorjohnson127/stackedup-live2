
'use client';

import React, { useEffect, useState } from 'react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white shadow p-4">
      {children}
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}

// Simulate ideal dip-buying windows
function getDipWindowMessage() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (hour >= 13 && hour < 15) {
    return '⏳ Prime Buy-the-Dip Window (1:00–3:50pm ET)';
  } else if (hour === 15 && minutes <= 50) {
    return '✅ FINAL Buy Opportunity (until 3:50pm ET)';
  } else {
    return '🕐 Waiting for next optimal dip-buy time...';
  }
}

export default function BuyTheDipTimer() {
  const [message, setMessage] = useState(getDipWindowMessage());

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(getDipWindowMessage());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">💸 Buy the Dip Timer</h2>
        <p className="text-gray-700 mb-2">{message}</p>
        <p className="text-xs text-gray-500">Based on eastern time logic. Window resets daily.</p>
      </CardContent>
    </Card>
  );
}
