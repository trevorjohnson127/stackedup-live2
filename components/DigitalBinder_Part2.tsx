'use client';
import { useState } from 'react';

type BinderPartProps = {
  searchQuery: string;
};

export default function DigitalBinder_Part2({ searchQuery }: BinderPartProps) {
  const binderPages = [
    {
      section: '// LEVEL 2: STRATEGY CORE',
      pages: [
        {
          title: 'Rotation Strategy — Pg 5',
          content: `🔍 What it is:
Strategic reallocation of capital from lower-conviction or underperforming positions into stronger, more aligned opportunities.

🧠 Why it matters:
Every dollar sitting in a “dead” position is missing a better job elsewhere. Rotating correctly is how you scale without adding more cash.

🛠 How to apply:
- Identify underperformers or low-conviction stocks (check Red Flag Mode, Confidence Curve)
- Look for better opportunities in your binder (watchlist, high conviction, core assets)
- Use upgrade logic: rotate INTO strategy, not just OUT of pain
- Use springboards carefully to gain faster access to core assets

📌 Strategy tie-in:
Part of your system’s efficiency loop. Keep your portfolio sharp by rotating based on role, conviction, and momentum — not emotion.`,
        },
        {
          title: 'Exit Strategy — Pg 6',
          content: `🔍 What it is:
Pre-planned sell logic. Designed to eliminate emotion and protect profits, while exiting losers at controlled thresholds.

🧠 Why it matters:
Most investors don't know when to sell. They chase gains too long or hold losers too deep. This protects both ends.

🛠 How to apply:
- Gains: Trim or rotate around +20% (depending on role and conviction)
- Losses: Consider partial trim at -10%, full exit at -15% or if thesis breaks
- Always ask: "Is this still fulfilling its role in my strategy?"

📌 Strategy tie-in:
This system isn’t just about what to buy — it's about what to exit and when. Use binder conviction levels + rotation targets.`,
        },
        {
          title: 'Tax Optimization — Pg 7',
          content: `🔍 What it is:
Using account types and timing rules to legally reduce or defer taxes while building long-term wealth.

🧠 Why it matters:
More gain = more taxes if unmanaged. But your Roth, ETFs, and hold timing can turn those taxes into $0.

🛠 How to apply:
- Roth IRA: Use for long-term growth and never pay tax again
- ETFs: Favor them in taxable accounts (like SCHD, SPYG) — fewer taxable events
- Avoid short-term trades in brokerage unless it's part of a high-conviction move
- Don’t obsess over taxes if it conflicts with strategy — priority is strong positioning

📌 Strategy tie-in:
Your binder includes Roth-focused guidance and allocation logic. Use each account like a role in the team — tax-wise.`,
        },
        {
          title: 'Allocation Framework — Pg 8',
          content: `🔍 What it is:
System for organizing your portfolio by role. Ensures balance between growth, stability, and opportunity.

🧠 Why it matters:
Without clear roles, your portfolio becomes scattered. This framework gives every dollar a job.

🛠 How to apply:
- Core: ETFs like SPYG or VTI
- Growth: Conviction stocks like AAPL, ELV
- Springboards: Tactical stocks (TSLA, ROKU) with strict rules
- Defensive: SCHD or ROL
- Optional: Wildcard growth, watchlist trackers

📌 Strategy tie-in:
This layout appears across your system: on the homepage, in rotation rules, and during allocation planning. It's your portfolio map.`,
        },
        {
          title: 'Buy the Dip Blueprint — Pg 9',
          content: `🔍 What it is:
Strategic timing guide for entering red days or pullbacks — especially for high-conviction positions.

🧠 Why it matters:
Most people rush dips too early or freeze. This gives you edge, patience, and logic.

🛠 How to apply:
- Ideal buy window: 1:00–3:50pm ET
- Enter only when conviction is high and price action confirms
- Never buy early on panic — use intraday patience
- Watch for sector flushes or multi-day drops
- Use the timer tool (if live) for alerts during dip hours

📌 Strategy tie-in:
This strategy lives in your Dip Timer, Roth entry plan, and watchlist alerts. It prevents emotion-driven entries.`,
        },
      ],
    },
    {
      section: '// LEVEL 3: TACTICAL LAYERS',
      pages: [
        {
          title: 'Smart Rotation Engine — Pg 10',
          content: `Detects underperformers, role mismatches, or opportunity gaps. Suggests strategic reallocations to improve efficiency.`,
        },
        {
          title: 'Springboard Logic — Pg 11',
          content: `Use volatile positions (e.g. TSLA) to spring into core assets. Strict rules: +20% = trim gains, -10% = trim half, -15% = exit fully.`,
        },
        {
          title: 'Confidence Curve Tracker — Pg 12',
          content: `Tracks emotional confidence vs real performance. Helps you identify if your confidence is valid or reactive.`,
        },
        {
          title: 'Investor Grade System — Pg 13',
          content: `Weekly grading of execution, discipline, emotional control, and strategy alignment. Score yourself honestly.`,
        },
      ],
    },
    {
      section: '// LEVEL 4 TOOLS & SYSTEMS',
      pages: [
        {
          title: 'Decision Delta — Pg 14',
          content: `Used when stuck between two choices. Compares conviction, momentum, role fit, capital efficiency, and alignment.`,
        },
        {
          title: 'Disaster Protocol — Pg 15',
          content: `System override during panic. Freeze trades. Review binder. No action until checklist completed.`,
        },
        {
          title: 'Conviction Memory Sheet — Pg 16',
          content: `Reminds you why you bought. Prevents emotional exits or rotations. Review this before selling.`,
        },
        {
          title: 'Mental Capital Tracker — Pg 17',
          content: `Protect your mental energy. Track fatigue and decision fatigue. Use binder tools to preserve focus.`,
        },
        {
          title: 'Dividend Strategy Blueprint — Pg 18',
          content: `Use SCHD or dividend ETFs for defensive income layer. Reinvest automatically unless using dividends for reallocation. Best used when portfolio exceeds $500+.`
        },
      ],
    },
    {
      section: '// BRIDGE TOOLS & STRATEGY UPGRADES',
      pages: [
        {
          title: 'Red Flag Mode — Pg 19',
          content: `Locks trading access when emotions spike. Forces review of binder. Reset before re-entry.`,
        },
        {
          title: 'Buy the Dip Timer — Pg 20',
          content: `Triggers ideal dip windows during market hours. Based on timing logic from Pg 9. Used only on high-conviction entries.`,
        },
        {
          title: 'Thesis Drift Detector — Pg 21',
          content: `Warns when a position no longer fits its original role or thesis. Prevents passive drift or overattachment.`,
        },
        {
          title: 'Rotation Simulation Lab — Pg 22',
          content: `Lets you test what-if replacements. Use to compare capital movement outcomes and risk/reward scenarios.`,
        },
        {
          title: 'Watchlist Role Assignment — Pg 23',
          content: `Categorize stocks into Core, Medium, or Wildcard Watchlists. Set alert triggers for each role.`,
        },
        {
          title: 'Pre-Trade Filter System — Pg 24',
          content: `Checklist to confirm readiness before buying, trimming, or rotating. Must align with strategy, conviction, and logic.`,
        },
      ],
    },
  ];

  const [openSection, setOpenSection] = useState<number | null>(null);
  const [openPage, setOpenPage] = useState<{ section: number; page: number } | null>(null);

  return (
    <div className="p-6 text-black bg-gradient-to-b from-white to-mint-200">
      {binderPages.map((section, i) => {
        const filteredPages = section.pages.filter(
          (page) =>
            page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (searchQuery && filteredPages.length === 0) return null;

        return (
          <div
            key={i}
            className={`mb-8 rounded-xl p-4 shadow-lg border-l-8 ${
              openSection === i ? 'border-mint-500 bg-white' : 'border-gray-300 bg-white'
            }`}
          >
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => setOpenSection(openSection === i ? null : i)}
            >
              <h2 className="text-2xl font-semibold text-mint-600">{section.section}</h2>
              <span className="text-mint-500 text-xl">{openSection === i ? '−' : '+'}</span>
            </div>

            {(openSection === i || searchQuery) && (
              <div className="mt-4 space-y-4">
                {filteredPages.map((page, j) => (
                  <div
                    key={j}
                    className="bg-white border border-mint-200 rounded-lg p-3 shadow hover:shadow-xl transition-all"
                  >
                    <div
                      className="cursor-pointer font-medium text-lg text-mint-700 flex justify-between"
                      onClick={() =>
                        setOpenPage(
                          openPage?.section === i && openPage?.page === j
                            ? null
                            : { section: i, page: j }
                        )
                      }
                    >
                      <span>{page.title}</span>
                      <span>
                        {openPage?.section === i && openPage?.page === j ? '−' : '+'}
                      </span>
                    </div>
                    {openPage?.section === i && openPage?.page === j && (
                      <div className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
                        {page.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-10 text-center text-mint-600 italic text-sm animate-pulse">
        “Strategy protects you from yourself. Re-read before you react.”
      </div>
    </div>
  );
}

