import React from 'react';
import SmartRotationTrigger from './tools/SmartRotationTrigger';
import ThesisDriftDetector from './tools/ThesisDriftDetector';
import SpringboardRules from './tools/SpringboardRules';

const ToolsModule: React.FC = () => {
  const sharedProps = {
    ticker: 'AAPL',
    conviction: 'Medium' as 'Medium',
    gainLossPercent: 12,
    currentGainLoss: 12,
    checkListResponse: 'yes',
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Investor Tools</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">
          Automatically detects mismatches between your conviction level and current performance.
        </p>
        <SmartRotationTrigger {...sharedProps} />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">
          Detects when a position has drifted away from its original thesis.
        </p>
        <ThesisDriftDetector
          {...sharedProps}
          confidenceLevel={sharedProps.conviction} // ✅ required prop for ThesisDriftDetector
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">
          Monitors springboard behavior and flags violations of short-term logic.
        </p>
        <SpringboardRules {...sharedProps} />
      </div>
    </div>
  );
};

export default ToolsModule;

