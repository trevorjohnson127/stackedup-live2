'use client';

import React, { useEffect, useState } from 'react';

export default function MentalCapitalScoreboard() {
  const [score, setScore] = useState(76); // Placeholder score; hook this to real logic later

  useEffect(() => {
    // Optional logic to dynamically adjust score can go here
  }, []);

  const getColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="rounded-xl border bg-background p-6 shadow-md space-y-4">
      <h2 className="text-2xl font-bold">🧠 Mental Capital Scoreboard</h2>
      <p className="text-sm text-muted-foreground">
        Tracks your emotional readiness, discipline, and focus for the trading day.
      </p>

      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className={`h-6 rounded-full ${getColor()}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="text-right text-sm text-muted-foreground">
        Current Readiness Score: <span className="font-semibold">{score}%</span>
      </div>
    </div>
  );
}
