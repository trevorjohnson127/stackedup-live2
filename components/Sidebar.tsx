'use client';

import { FaHome, FaChartPie, FaClipboardList, FaBook, FaCogs, FaToolbox, FaNewspaper } from 'react-icons/fa';
import Image from 'next/image';

type SidebarProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const icons = [
  { id: 'home', icon: <FaHome size={20} />, label: 'Home' },
  { id: 'portfolio', icon: <FaChartPie size={20} />, label: 'Portfolio' },
  { id: 'watchlist', icon: <FaClipboardList size={20} />, label: 'Watchlist' },
  { id: 'binder', icon: <FaBook size={20} />, label: 'Digital Binder' },
  { id: 'settings', icon: <FaCogs size={20} />, label: 'Settings' },
  { id: 'tools', icon: <FaToolbox size={20} />, label: 'Tools' },
  { id: 'news', icon: <FaNewspaper size={20} />, label: 'News' },
];

export default function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  return (
    <div className="w-24 bg-[#E2DFA5] flex flex-col items-center py-6 shadow-xl relative">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/stackedup-logo.png"
          alt="logo"
          width={84}
          height={84}
          className="rounded-full object-contain"
        />
      </div>

      {/* Sidebar Icons */}
      <div className="flex flex-col space-y-6">
        {icons.map(({ id, icon, label }) => (
          <div key={id} className="relative group">
            <button
              onClick={() => setSelectedTab(id)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg ${
                selectedTab === id ? 'border-4 border-white' : ''
              } hover:scale-110`}
              style={{
                backgroundColor: '#fffdd5', // cream white
                color: '#2EDFA3',           // mint green
              }}
            >
              {icon}
            </button>
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-black px-2 py-1 rounded shadow-md text-sm whitespace-nowrap z-10">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
