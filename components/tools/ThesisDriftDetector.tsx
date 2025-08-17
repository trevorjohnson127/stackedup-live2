// components/tools/ThesisDriftDetector.tsx
import React from 'react';

export type ThesisDriftDetectorProps = {
  ticker: string;
  gainLossPercent: number;
  checkListResponse: string;
  confidenceLevel: 'High' | 'Medium' | 'Low';
};

const ThesisDriftDetector: React.FC<ThesisDriftDetectorProps> = ({
  ticker,
  gainLossPercent,
  checkListResponse,
  confidenceLevel,
}) => {
  const driftDetected =
    (gainLossPercent < -15 && confidenceLevel !== 'High') ||
    checkListResponse.toLowerCase().includes('drift');

  const message = driftDetected
    ? `⚠️ Thesis drift detected for ${ticker} — based on performance (${gainLossPercent}%) and confidence (${confidenceLevel}).`
    : `✅ ${ticker} is aligned with its original thesis.`;

  return (
    <div className={`p-4 rounded shadow ${driftDetected ? 'bg-red-100' : 'bg-green-100'}`}>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

export default ThesisDriftDetector;
