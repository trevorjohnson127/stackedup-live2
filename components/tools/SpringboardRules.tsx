// components/tools/SpringboardRules.tsx
import React from 'react';

export type SpringboardRulesProps = {
  ticker: string;
  conviction: 'High' | 'Medium' | 'Low';
  gainLossPercent: number;
  currentGainLoss: number;
  checkListResponse: string;
};

const SpringboardRules: React.FC<SpringboardRulesProps> = ({
  ticker,
  conviction,
  gainLossPercent,
  currentGainLoss,
  checkListResponse,
}) => {
  const violatedSpringboardLogic =
    conviction === 'Medium' &&
    ((gainLossPercent <= -10 && !checkListResponse.includes('hold')) ||
      (gainLossPercent >= 20 && !checkListResponse.includes('trim')) ||
      checkListResponse.toLowerCase().includes('violation'));

  const message = violatedSpringboardLogic
    ? `🚨 Springboard rules violated for ${ticker} — review your checklist and discipline.`
    : `✅ ${ticker} is within springboard logic bounds.`;

  return (
    <div className={`p-4 rounded shadow ${violatedSpringboardLogic ? 'bg-red-100' : 'bg-green-100'}`}>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

export default SpringboardRules;
