// components/SmartRotationTrigger.tsx
import React from 'react';

export type RotationTriggerProps = {
  ticker: string;
  conviction: 'High' | 'Medium' | 'Low';
  gainLossPercent: number;
  checkListResponse: string;
  currentGainLoss: number; // ✅ required
};

const SmartRotationTrigger: React.FC<RotationTriggerProps> = ({
  ticker,
  gainLossPercent,
  conviction,
  checkListResponse,
  currentGainLoss, // ✅ added
}) => {
  const shouldRotate =
    (gainLossPercent <= -10 && conviction !== 'High') ||
    (gainLossPercent >= 20 && conviction === 'Medium') ||
    checkListResponse.toLowerCase().includes('rotate');

  const message = shouldRotate
    ? `⚠️ Consider rotating ${ticker} — based on gain/loss (${gainLossPercent}%), current gain/loss (${currentGainLoss}), conviction (${conviction}), or checklist response.`
    : `✅ No rotation needed for ${ticker} right now.`;

  return (
    <div className={`p-4 rounded shadow ${shouldRotate ? 'bg-yellow-100' : 'bg-green-100'}`}>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

export default SmartRotationTrigger;
