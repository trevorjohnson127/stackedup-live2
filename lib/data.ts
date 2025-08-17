
// lib/data.ts

export function getPortfolioPerformance() {
  return Promise.resolve({
    totalChange: '+3.2%',
    topStock: 'AAPL',
    worstStock: 'TSLA'
  });
}

export function getRotationSignals() {
  return Promise.resolve([
    { message: '🔄 Rotate: TSLA → AAPL (springboard rule)' },
    { message: '⚠️ PLTR dragging returns — review wildcard logic' },
    { message: '✅ SPYG stable — no action required' }
  ]);
}

export function getSuggestions() {
  return Promise.resolve([
    '🧠 Use Decision Delta Tool for TSLA exit',
    '📈 AAPL showing compounding trend (Page 11)',
    '⚖️ Consider rebalancing SPYG to 25% cap',
    '🛡️ ROL defensive strength — review on Page 14'
  ]);
}
