'use client';

import { useState } from 'react';
import {
  FaHome,
  FaChartBar,
  FaClipboardList,
  FaBookOpen,
  FaCog,
  FaFlask,
  FaNewspaper,
} from 'react-icons/fa';
import Image from 'next/image';
import logo from '/stackedup-logo.png';

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  const icons = [
    { id: 'Home', icon: <FaHome size={20} />, label: 'Home' },
    { id: 'Portfolio', icon: <FaChartBar size={20} />, label: 'Portfolio' },
    { id: 'Watchlist', icon: <FaClipboardList size={20} />, label: 'Watchlist' },
    { id: 'News', icon: <FaNewspaper size={20} />, label: 'News' }, // ✅ NEW
    { id: 'Binder', icon: <FaBookOpen size={20} />, label: 'Digital Binder' },
    { id: 'Settings', icon: <FaCog size={20} />, label: 'Settings' },
    { id: 'Tools', icon: <FaFlask size={20} />, label: 'Components/Tools' },
  ];

  return (
    <div className="w-24 bg-[#2EDFA3] flex flex-col items-center py-6 shadow-xl relative">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/stackedup-logo.png"
          alt="logo"
          width={64}
          height={64}
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
                selectedTab === id ? 'border-white border-2' : ''
              } hover:scale-110`}
              style={{
                backgroundColor: '#fdfaf5', // cream white
                color: '#2EDFA3', // mint icon
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

