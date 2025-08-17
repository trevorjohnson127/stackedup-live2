'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Alert = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  checklist_trigger: string;
  springboard_alert: string;
  rotation_suggestion: string;
  emotional_flag: string;
  daily_reminder: string;
  timestamp: string;
  created_at: string;
  status: string;
  type: string;
  trigger_source: string;
  urgency: string;
  resolved: boolean;
};

export default function AlertsTable() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data, error } = await supabase.from('alerts').select('*');
      if (error) {
        console.error('Error fetching alerts:', error.message);
      } else {
        setAlerts(data as Alert[]);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md overflow-auto">
      <h2 className="text-xl font-bold text-mint mb-4">📊 Full Alerts Table</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-mint text-white">
          <tr>
            <th className="border p-2">Type</th>
            <th className="border p-2">Trigger Source</th>
            <th className="border p-2">Urgency</th>
            <th className="border p-2">Resolved</th>
            <th className="border p-2">Checklist</th>
            <th className="border p-2">Springboard</th>
            <th className="border p-2">Rotation</th>
            <th className="border p-2">Emotion</th>
            <th className="border p-2">Reminder</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="hover:bg-gray-100">
              <td className="border p-2">{alert.type}</td>
              <td className="border p-2">{alert.trigger_source}</td>
              <td className="border p-2">{alert.urgency}</td>
              <td className="border p-2">{alert.resolved ? '✅' : '❌'}</td>
              <td className="border p-2">{alert.checklist_trigger}</td>
              <td className="border p-2">{alert.springboard_alert}</td>
              <td className="border p-2">{alert.rotation_suggestion}</td>
              <td className="border p-2">{alert.emotional_flag}</td>
              <td className="border p-2">{alert.daily_reminder}</td>
              <td className="border p-2">{new Date(alert.timestamp).toLocaleString()}</td>
              <td className="border p-2">{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
