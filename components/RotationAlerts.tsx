'use client';

import React, { useEffect, useState } from 'react';
import { getRotationSignals } from '../lib/data'; // adjust if needed
import useSoundAlert from '../lib/useSoundAlert';

export default function RotationAlerts() {
  const [alerts, setAlerts] = useState<{ message: string }[]>([]);

  useEffect(() => {
    getRotationSignals().then(setAlerts);
  }, []);

  useSoundAlert(alerts.length > 0); // ✅ Now it's inside the component

  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-2">🔁 Rotation Alerts</h2>
      <ul className="list-disc pl-5">
        {alerts.map((alert, idx) => (
          <li key={idx}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
}
