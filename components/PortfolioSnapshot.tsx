'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

type Holding = {
  id: string;
  user_id: string;
  ticker: string;
  shares: number;
  value: number;
  gain_loss_pct: number;
  gain_loss_total: number;
};

export default function PortfolioSnapshot() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selected, setSelected] = useState<Holding | null>(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      const { data, error } = await supabase
        .from('user_holdings')
        .select('*')
        .order('value', { ascending: false });

      if (error) {
        console.error('Error fetching holdings:', error.message);
      } else {
        setHoldings(data as Holding[]);
      }
    };

    fetchHoldings();
  }, []);

  const getGainLossColor = (pct: number) => {
    if (pct > 0) return 'text-green-600';
    if (pct < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main Table */}
      <div className="p-4 bg-white rounded-xl shadow-md w-full md:w-2/3">
        <h2 className="text-xl font-bold text-mint mb-4">📈 Portfolio Snapshot</h2>
        <table className="min-w-full border text-sm">
          <thead className="bg-mint text-white">
            <tr>
              <th className="border p-2">Ticker</th>
              <th className="border p-2">Shares</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Gain/Loss %</th>
              <th className="border p-2">Gain/Loss $</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.id}
                onClick={() => setSelected(h)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="border p-2 font-bold">{h.ticker}</td>
                <td className="border p-2">{h.shares}</td>
                <td className="border p-2">${h.value.toFixed(2)}</td>
                <td className={`border p-2 ${getGainLossColor(h.gain_loss_pct)}`}>
                  {h.gain_loss_pct.toFixed(2)}%
                </td>
                <td className={`border p-2 ${getGainLossColor(h.gain_loss_total)}`}>
                  ${h.gain_loss_total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Panel */}
      {selected && (
        <div className="p-4 bg-white rounded-xl shadow-md w-full md:w-1/3">
          <h3 className="text-lg font-bold text-mint mb-2">🔍 {selected.ticker} Details</h3>
          <ul className="text-sm space-y-2">
            <li><strong>Shares:</strong> {selected.shares}</li>
            <li><strong>Value:</strong> ${selected.value.toFixed(2)}</li>
            <li><strong>Gain/Loss %:</strong> <span className={getGainLossColor(selected.gain_loss_pct)}>{selected.gain_loss_pct.toFixed(2)}%</span></li>
            <li><strong>Gain/Loss $:</strong> <span className={getGainLossColor(selected.gain_loss_total)}>${selected.gain_loss_total.toFixed(2)}</span></li>
          </ul>

          <div className="mt-4 space-y-2">
            <button className="w-full bg-mint text-white rounded px-3 py-2 text-sm hover:bg-mint/90">
              📌 Smart Rotation Trigger
            </button>
            <button className="w-full bg-gray-100 text-sm rounded px-3 py-2 hover:bg-gray-200">
              🚀 Springboard Rules
            </button>
            <button className="w-full bg-gray-100 text-sm rounded px-3 py-2 hover:bg-gray-200">
              🧠 Checklist Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
