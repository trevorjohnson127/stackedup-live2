// components/DecisionDelta.tsx
import React from 'react';

const DecisionDelta = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2 text-mint-700">Decision Delta Tool</h2>
      <p className="text-sm mb-2">
        This tool helps break ties between two options. Answer these:
      </p>
      <ul className="list-decimal list-inside text-sm space-y-1">
        <li>Which option is more capital-protective?</li>
        <li>Which aligns better with current strategy?</li>
        <li>Which reduces regret if you're wrong?</li>
        <li>Which one is backed by a stronger thesis?</li>
        <li>Which fits your conviction system better?</li>
      </ul>
    </div>
  );
};

export default DecisionDelta;
