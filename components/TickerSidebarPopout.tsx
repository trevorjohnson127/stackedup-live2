'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TickerSidebarPopoutProps {
  ticker: string;
  isOpen: boolean;
  onClose: () => void;
}

const mockData = [
  { day: 'Mon', value: 100 },
  { day: 'Tue', value: 102 },
  { day: 'Wed', value: 101 },
  { day: 'Thu', value: 104 },
  { day: 'Fri', value: 106 },
];

export default function TickerSidebarPopout({ ticker, isOpen, onClose }: TickerSidebarPopoutProps) {
  const [mockDetails, setMockDetails] = useState({
    decisionDelta: '+14 Hold',
    nextMove: 'Trim at +15%',
    role: 'Wildcard',
    conviction: 'Medium',
    binderPage: 'Pg. 6 – Springboard Rules',
    emotionFlag: 'None',
    gain: '+12.28%',
    chartData: mockData,
  });

  useEffect(() => {
    if (isOpen) {
      // In a live system, you'd fetch this ticker’s real data here
      setMockDetails({ ...mockDetails });
    }
  }, [isOpen, ticker]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white border-l shadow-xl z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-mint-700">{ticker} Overview</h2>
        <button onClick={onClose}>
          <FiX className="text-xl text-gray-600 hover:text-black" />
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div><strong>Decision Delta:</strong> {mockDetails.decisionDelta}</div>
        <div><strong>Next Trigger:</strong> {mockDetails.nextMove}</div>
        <div><strong>Conviction:</strong> {mockDetails.conviction}</div>
        <div><strong>Role:</strong> {mockDetails.role}</div>
        <div><strong>Binder Ref:</strong> {mockDetails.binderPage}</div>
        <div><strong>Emotion Flag:</strong> {mockDetails.emotionFlag}</div>
        <div><strong>Total Gain:</strong> {mockDetails.gain}</div>

        <div className="mt-4">
          <strong>Recent Performance:</strong>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={mockDetails.chartData}>
              <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-mint-600 text-white py-1.5 rounded shadow hover:bg-mint-700 transition">Trim 10%</button>
          <button className="bg-blue-500 text-white py-1.5 rounded shadow hover:bg-blue-600 transition">Rotate</button>
          <button className="bg-gray-200 text-black py-1.5 rounded shadow hover:bg-gray-300 transition">Log Move</button>
        </div>
      </div>
    </div>
  );
}
