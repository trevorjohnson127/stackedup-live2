
'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Core', value: 40 },
  { name: 'Growth', value: 35 },
  { name: 'Wildcard', value: 25 }
];

const COLORS = ['#34D399', '#60A5FA', '#FBBF24'];

export default function PortfolioPieChart() {
  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-semibold mb-3">📊 Allocation Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={75} dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
