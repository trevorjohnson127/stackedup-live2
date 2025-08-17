'use client';

import { useState } from 'react';

export default function BottomTabs() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'checksheet' | 'alerts' | null>(null);

  const toggleTab = (tab: 'portfolio' | 'checksheet' | 'alerts') => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl">
      {/* Tabs Row */}
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => toggleTab('portfolio')}
          className={`rounded-full px-5 py-2 shadow-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === 'portfolio'
              ? 'bg-mint-700 text-white scale-105'
              : 'bg-white text-mint-700 hover:bg-mint-100'
          }`}
        >
          📊 Portfolio
        </button>
        <button
          onClick={() => toggleTab('checksheet')}
          className={`rounded-full px-5 py-2 shadow-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === 'checksheet'
              ? 'bg-mint-700 text-white scale-105'
              : 'bg-white text-mint-700 hover:bg-mint-100'
          }`}
        >
          ✅ Checksheet
        </button>
        <button
          onClick={() => toggleTab('alerts')}
          className={`rounded-full px-5 py-2 shadow-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === 'alerts'
              ? 'bg-mint-700 text-white scale-105'
              : 'bg-white text-mint-700 hover:bg-mint-100'
          }`}
        >
          🔔 Alerts
        </button>
      </div>

      {/* Panel Window */}
      <div className="mt-4">
        {activeTab && (
          <div className="bg-white/80 backdrop-blur-md border border-mint-300 rounded-lg shadow-2xl p-6 text-mint-dark animate-fade-in">
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-xl font-bold mb-2">📊 Portfolio Snapshot</h2>
                <p>This will display your real-time portfolio overview here. Hook to live data later.</p>
              </div>
            )}
            {activeTab === 'checksheet' && (
              <div>
                <h2 className="text-xl font-bold mb-2">✅ Daily Checksheet</h2>
                <p>This will show the checklist interaction panel. Pull dynamic questions soon.</p>
              </div>
            )}
            {activeTab === 'alerts' && (
              <div>
                <h2 className="text-xl font-bold mb-2">🔔 Real-Time Alerts</h2>
                <p>This space will show current system alerts, triggers, and warnings.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
