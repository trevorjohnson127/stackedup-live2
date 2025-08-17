// components/RedFlagMode.tsx
import React from 'react';

const RedFlagMode = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4 border-l-4 border-red-600">
      <h2 className="text-xl font-bold mb-2 text-red-700">🚨 Red Flag Mode</h2>
      <p className="text-sm mb-2">
        Red Flag Mode is triggered when emotional or erratic trading behavior is detected.
        During this time, actions are limited and reminders are enforced:
      </p>
      <ul className="list-disc list-inside text-sm text-red-800">
        <li>Slow down — review your binder (Disaster Protocol page).</li>
        <li>Re-evaluate conviction and thesis health.</li>
        <li>Restrict new trades unless logic is fully documented.</li>
        <li>Set a timer — do not trade impulsively.</li>
      </ul>
    </div>
  );
};

export default RedFlagMode;
