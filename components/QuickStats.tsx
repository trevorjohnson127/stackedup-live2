// components/QuickStats.tsx

'use client';

export function QuickStats() {
  const stats = {
    totalGain: '+3.5%',
    positionsUp: 4,
    positionsDown: 2,
    netChangeToday: '+1.2%',
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-mint mb-4">Quick Portfolio Stats</h2>
      <div className="bg-white p-4 rounded-xl shadow space-y-2 text-sm text-black">
        <p><strong>Total Gain/Loss:</strong> {stats.totalGain}</p>
        <p><strong>Green Positions:</strong> {stats.positionsUp}</p>
        <p><strong>Red Positions:</strong> {stats.positionsDown}</p>
        <p><strong>Today’s Change:</strong> {stats.netChangeToday}</p>
      </div>
    </div>
  );
}
