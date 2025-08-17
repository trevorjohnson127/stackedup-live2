
'use client';

import React, { useState } from 'react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white text-black shadow-sm p-4">
      {children}
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}

const prompts = [
  { id: 1, question: '📘 Which binder section fits this situation?', answer: 'Go to Page 12 – Rotation Strategy.' },
  { id: 2, question: '🧠 What if a core stock underperforms?', answer: 'Review the Profit Anchor Rule (Page 17).' },
  { id: 3, question: '🔄 When to rebalance?', answer: 'Trigger on gain/loss thresholds or binder Page 20.' }
];

export default function BinderAssistant() {
  const [index, setIndex] = useState(0);
  const prompt = prompts[index];

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">📚 Binder Assistant</h2>
        <p className="font-medium mb-1">{prompt.question}</p>
        <p className="text-gray-700 mb-2">{prompt.answer}</p>
        <button
          onClick={() => setIndex((index + 1) % prompts.length)}
          className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Next Tip
        </button>
      </CardContent>
    </Card>
  );
}
