'use client';

import React, { useEffect, useState } from 'react';

type Stock = {
  ticker: string;
  price: number;
  buyZoneLow: number;
  buyZoneHigh: number;
};

export default function BuyZoneMonitor() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Simulated example – replace with real data sync later
    setStocks([
      { ticker: 'AAPL', price: 172, buyZoneLow: 170, buyZoneHigh: 175 },
      { ticker: 'TSLA', price: 193, buyZoneLow: 160, buyZoneHigh: 190 },
      { ticker: 'SPYG', price: 55, buyZoneLow: 50, buyZoneHigh: 54 },
    ]);
  }, []);

  const inBuyZone = (stock: Stock) =>
    stock.price >= stock.buyZoneLow && stock.price <= stock.buyZoneHigh;

  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-2">📥 Buy Zone Monitor</h2>
      <ul className="space-y-1">
        {stocks.map((stock) => (
          <li key={stock.ticker}>
            <span className="font-semibold">{stock.ticker}:</span>{' '}
            <span className={inBuyZone(stock) ? 'text-green-600' : 'text-gray-500'}>
              {stock.price.toFixed(2)} —{' '}
              {inBuyZone(stock) ? '🟢 In Buy Zone' : 'Outside Range'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
