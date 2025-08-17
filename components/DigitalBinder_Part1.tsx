'use client';
import { useState } from 'react';

type BinderPartProps = {
  searchQuery: string;
};

const levelOnePages = [
  {
    title: 'Long-Term Mindset — Pg 1',
    content: `🔍 What it is:
The long game is the only game. A long-term mindset means building wealth through consistency, not speed. It’s about staying in the market, trusting your system, and compounding discipline—not just dollars.

🧠 Why it matters:
Most people panic, rotate too soon, chase noise, or abandon their plan. This page locks in your true advantage: outlasting weaker investors.

🛠 How to apply:
- Don’t measure success by daily swings — measure by strategic execution over months and years.
- Use your binder to zoom out during emotional moments.
- Treat each trade as part of a 10-year story, not a 10-minute chart.

📌 Strategy tie-in:
Every strategy in your binder is built to work long-term. If you override it emotionally in the short term, it fails by design.`,
  },
  {
    title: 'Compound Growth Math — Pg 2',
    content: `🔍 What it is:
Compound growth is exponential — not linear. Early gains feel slow. Later gains explode. It rewards time, patience, and contributions.

🧠 Why it matters:
Compounding is your true engine. It's quiet at first, then unstoppable — but only if you stay in long enough to see it work.

🛠 How to apply:
- Automate contributions (Roth, savings, brokerage).
- Reinforce your belief using the real math:
  $100/month @ 10% =  
  • $7.7k in 5 years  
  • $68k in 20 years  
  • $556k in 40 years (from $48k invested)
- Stop looking for fast flips. Stick to the compound path.

📌 Strategy tie-in:
Buy-and-hold is only powerful if you actually hold. This page is the reason you protect your core ETFs and Roth instead of panicking early.`,
  },
  {
    title: 'Time in Market vs Timing — Pg 3',
    content: `🔍 What it is:
"Time in market" means staying invested — through red, green, noise, fear. "Timing" means trying to outsmart the market day to day. One builds wealth. The other builds stress.

🧠 Why it matters:
Missing just a few of the best green days destroys long-term performance. Most of those green days come during recoveries when emotions tell you to sell.

🛠 How to apply:
- When unsure, default to staying in — not trading out.
- Use systems like Red Flag Mode and Disaster Protocol when tempted to time exits.
- Train yourself to accept drawdowns as part of the path, not proof of failure.

📌 Strategy tie-in:
Your rotation logic, dip buying rules, and conviction ratings are designed to keep you in the market intelligently — not jump in and out emotionally.`,
  },
  {
    title: 'Power of Simplicity — Pg 4',
    content: `🔍 What it is:
Simple portfolios win long-term. You don’t need 20 stocks or 6 ETFs. You need clarity. Complexity is fragile. Simplicity survives.

🧠 Why it matters:
Over-engineering creates emotional clutter. When the market moves fast, complex portfolios freeze people up. Simple roles = confident decisions.

🛠 How to apply:
- Stick to 3–5 core roles (ETF, growth stock, springboard, etc.)
- Don’t chase more for the sake of it. Add only if strategic.
- Let clarity and conviction guide your allocation — not quantity.

📌 Strategy tie-in:
The entire binder system is built around strategic clarity. You win by using fewer, better tools — and executing them with discipline.`,
  },
];

export default function DigitalBinder_Part1({ searchQuery }: BinderPartProps) {
  const [openPage, setOpenPage] = useState<number | null>(null);

  const filteredPages = levelOnePages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filteredPages.length === 0) return null;

  return (
    <div className="min-h-screen p-6 text-black bg-gradient-to-b from-white to-mint-200 overflow-y-auto">
      <div className="text-sm uppercase text-mint-500 mb-2">// Level 1: Foundation</div>
      <h1 className="text-4xl font-bold text-center text-mint-600 mb-6">
        📗 Level 1: Foundation
      </h1>

      {filteredPages.map((page, i) => (
        <div
          key={i}
          className="mb-6 border-l-4 border-mint-500 bg-white rounded-xl shadow-md transition-all hover:shadow-lg"
        >
          <div
            className="cursor-pointer p-4 flex justify-between items-center"
            onClick={() => setOpenPage(openPage === i ? null : i)}
          >
            <h2 className="text-xl font-semibold text-mint-700">{page.title}</h2>
            <span className="text-mint-500 text-2xl">
              {openPage === i ? '−' : '+'}
            </span>
          </div>

          {openPage === i && (
            <div className="px-6 pb-4 text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
              {page.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
