'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

type Alert = {
  id: string;
  type: string;
  urgency: string;
  message: string;
  resolved: boolean;
  timestamp: string;
};

export default function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchLiveAlerts = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('id, type, urgency, message, resolved, timestamp')
        .eq('resolved', false)
        .in('urgency', ['high', 'medium']) // Only show important alerts
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching live alerts:', error.message);
      } else {
        setAlerts(data as Alert[]);
      }
    };

    fetchLiveAlerts();
  }, []);

  const getUrgencyStyle = (urgency: string) => {
    if (urgency === 'high') return 'text-red-600 font-bold';
    if (urgency === 'medium') return 'text-yellow-500';
    return 'text-gray-400';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'rotation': return '🔁';
      case 'emotional': return '💥';
      case 'springboard': return '🚀';
      case 'checklist': return '📋';
      default: return '⚠️';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-mint mb-2">⚡ Live Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-sm text-gray-500">No active alerts right now.</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="border p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl mr-2">{getIcon(alert.type)}</span>
                  <span className={`text-sm ${getUrgencyStyle(alert.urgency)}`}>
                    [{alert.urgency.toUpperCase()}]
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm mt-1">{alert.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

