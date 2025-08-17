// components/PreTradeChecklist.tsx
import React from 'react';

const PreTradeChecklist = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2 text-mint-700">Pre-Trade Checklist</h2>
      <ul className="list-disc list-inside text-sm">
        <li>Is this aligned with your current allocation strategy?</li>
        <li>Does the thesis still hold?</li>
        <li>Are you chasing green or rotating with logic?</li>
        <li>Has conviction been confirmed by the binder?</li>
        <li>Is this a foundation, springboard, or wildcard?</li>
        <li>How will this affect your dry powder or flexibility?</li>
      </ul>
    </div>
  );
};

export default PreTradeChecklist;
