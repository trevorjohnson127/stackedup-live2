
'use client';

import React, { useEffect, useState } from 'react';
import { getPortfolioPerformance } from '../lib/data';

export default function RealTimeTracker() {
  const [performance, setPerformance] = useState<{ totalChange: string, topStock: string, worstStock: string } | null>(null);

  useEffect(() => {
    getPortfolioPerformance().then(setPerformance);
  }, []);

  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-2">📊 Real-Time Performance</h2>
      {performance ? (
        <>
          <p>Total Portfolio Change: <strong>{performance.totalChange}</strong></p>
          <p>Top Performer: {performance.topStock}</p>
          <p>Weakest Link: {performance.worstStock}</p>
        </>
      ) : (
        <p>Loading performance...</p>
      )}
    </div>
  );
}
