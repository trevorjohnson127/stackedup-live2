'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import WatchlistModule from '@/components/WatchlistModule';
import ToolsModule from '@/components/ToolsModule';
import SettingsPanel from '@/components/SettingsPanel';
import DigitalBinder from '@/components/DigitalBinder';

const quotes = [
  '🧠 Your binder is your brain when emotions rise.',
  '📈 Built not bought. Every move earns you freedom.',
  '🔥 Discipline beats emotion. Every time.',
  '🎯 Strategy first, then action.',
  '🚀 Think long. Act smart. Earn forever.',
  '🧰 Emotional control is your greatest edge.',
  '🪜 You’re not just investing – you’re leveling up.',
];

export default function Page() {
  const [activePanel, setActivePanel] = useState('home');
  const [activeBottomTab, setActiveBottomTab] = useState<string | null>(null);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  // NEW: centralizes sidebar behavior
  const handleSidebarSelect = (tab: string) => {
    // Bottom-tab items should open the inline panel on Home (no page change)
    if (tab === 'portfolio' || tab === 'checksheet' || tab === 'alerts') {
      setActivePanel('home');
      setActiveBottomTab(tab);
      return;
    }
    // All other tabs swap the main content area and close any bottom panel
    setActivePanel(tab);
    setActiveBottomTab(null);
  };

  const renderMainPanel = () => {
    switch (activePanel) {
      case 'watchlist':
        return <WatchlistModule />;
      case 'tools':
        return <ToolsModule />;
      case 'settings':
        return <SettingsPanel />;
      case 'binder':
        return <DigitalBinder />;
      default:
        return (
          <div className="text-center mt-16">
            <h1 className="text-5xl font-bold text-[#2dd4bf] mb-2">Welcome Back, Investor</h1>
            <p className="text-gray-700 mb-6">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div className="bg-green-100 text-green-700 border border-green-200 rounded-md px-6 py-3 w-fit mx-auto shadow text-lg font-medium">
              {quote}
            </div>
          </div>
        );
    }
  };

  const renderBottomTab = () => {
    if (!activeBottomTab) return null;

    switch (activeBottomTab) {
      case 'portfolio':
        return (
          <div className="bg-white p-6 rounded-xl shadow-xl mt-6 w-3/4 mx-auto text-center">
            <h2 className="text-lg font-bold text-yellow-600">📊 Portfolio Overview</h2>
            <p className="text-sm mt-2 text-gray-700">
              This will show your active investments, gain/loss, and performance summary.
            </p>
          </div>
        );
      case 'checksheet':
        return (
          <div className="bg-white p-6 rounded-xl shadow-xl mt-6 w-3/4 mx-auto text-center">
            <h2 className="text-lg font-bold text-green-700">✅ Daily Checksheet</h2>
            <p className="text-sm mt-2 text-gray-700">
              This will show the checklist interaction panel. Pull dynamic questions soon.
            </p>
          </div>
        );
      case 'alerts':
        return (
          <div className="bg-white p-6 rounded-xl shadow-xl mt-6 w-3/4 mx-auto text-center">
            <h2 className="text-lg font-bold text-yellow-600">⚠️ Alerts</h2>
            <p className="text-sm mt-2 text-gray-700">
              This will display system alerts, triggers, and notices based on your portfolio.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#fffef9] to-[#a7f3d0]">
      {/* Sidebar */}
      <Sidebar onSelect={handleSidebarSelect} />

      {/* Main Content Area */}
      <div className="flex-1 ml-20 p-10 overflow-y-auto">
        {renderMainPanel()}

        {/* Bottom Floating Tabs */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
          <button
            onClick={() => setActiveBottomTab('portfolio')}
            className="bg-[#fffdef] text-[#2dd4bf] rounded-full px-6 py-3 shadow-md hover:shadow-xl transition font-semibold"
          >
            📊 Portfolio
          </button>
          <button
            onClick={() => setActiveBottomTab('checksheet')}
            className="bg-[#fffdef] text-[#2dd4bf] rounded-full px-6 py-3 shadow-md hover:shadow-xl transition font-semibold"
          >
            ✅ Checksheet
          </button>
          <button
            onClick={() => setActiveBottomTab('alerts')}
            className="bg-[#fffdef] text-[#2dd4bf] rounded-full px-6 py-3 shadow-md hover:shadow-xl transition font-semibold"
          >
            ⚠️ Alerts
          </button>
        </div>

        {/* Bottom Panel (below floating buttons) */}
        <div className="mt-28">{renderBottomTab()}</div>
      </div>
    </div>
  );
}


 