'use client';

import React from 'react';
import WatchlistModule from '@/components/WatchlistModule';

export default function WatchlistPage() {
  // Mock data until real hook is wired
  const mockData = [];

  return (
    <div className="p-6">
   <WatchlistModule user={{ id: 'demo-user-id' }} />
    </div>
  );
}
