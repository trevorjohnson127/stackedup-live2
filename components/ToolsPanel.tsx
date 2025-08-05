// components/ToolsPanel.tsx
import React from 'react';
import SmartRotationTrigger from '@tools/SmartRotationTrigger';
import ThesisDriftDetector from '@tools/ThesisDriftDetector';
import SpringboardRules from '@tools/SpringboardRules';

const ToolsPanel = () => {
  const sharedProps = {
    ticker: 'TSLA',
    currentGainLoss: -12,
    conviction: 'Medium' as 'High' | 'Medium' | 'Low',
    checklistResponse: 'Maybe I was chasing green a bit.',
  };

  return (
    <div className="p-6 space-y-8 bg-white shadow rounded">
      <div>
        <h3 className="text-lg font-semibold text-black">🔁 Smart Rotation Trigger</h3>
        <p className="text-sm text-gray-600 mb-2">
          Automatically detects mismatches between your conviction level and current performance.
        </p>
        <SmartRotationTrigger {...sharedProps} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black">📉 Thesis Drift Detector</h3>
        <p className="text-sm text-gray-600 mb-2">
          Alerts when your holding drifts from your original thesis or role.
        </p>
        <ThesisDriftDetector
          confidenceLevel={sharedProps.conviction}
          currentGainLoss={sharedProps.currentGainLoss}
          checklistResponse={sharedProps.checklistResponse}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black">🚀 Springboard Rules</h3>
        <p className="text-sm text-gray-600 mb-2">
          Applies springboard logic and emotion-based rules.
        </p>
        <SpringboardRules
          ticker={sharedProps.ticker}
          currentGainLoss={sharedProps.currentGainLoss}
          checklistResponse={sharedProps.checklistResponse}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
