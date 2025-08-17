'use client';

import { useState } from 'react';
import  { useDailyChecksheetSync } from '../hooks/useDailyChecksheetSync';

interface DailyChecksheetSystemProps {
  userId: string;
  period: string;
}

const questionsMap: Record<string, string[]> = {
  'Pre-Market Setup': [
    'Did you review your portfolio allocation before open?',
    'Did you check news or earnings for your holdings?',
    'Did you set dry powder or gameplan?'
  ],
  'Midday Discipline': [
    'Are you relaxed during green today?',
    'Are you green following your rules?',
    'Have you given into fear or broke order rules?'
  ],
  'Final 15': [
    'Did you trim your plan percentage on each stock?',
    'Are you watching updates instead of emotions or greed?',
    'Was any progress pure best buy/exit math?'
  ],
  'Post-Market Reflection': [
    'Did you follow your checklist note today?',
    'Have you written down emotions or strategy?',
    'What was the system takeaway?'
  ]
};

export default function DailyChecksheetSystem({ userId, period }: DailyChecksheetSystemProps) {
  const questions = questionsMap[period] || [];
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const { submitResponse, responses, loading } = useDailyChecksheetSync(userId, period);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[i].trim();
      if (answer) {
        await submitResponse(question, answer, 1); // Score of 1 default for now
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold tracking-tight text-center text-mint-500 drop-shadow">
        {period} Checksheet
      </h2>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-2xl shadow-md p-5 transition-transform hover:scale-[1.01]"
          >
            <p className="text-lg font-medium text-zinc-100 mb-2">{q}</p>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-zinc-700 bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
              value={answers[i]}
              onChange={(e) => handleInputChange(i, e.target.value)}
              placeholder="Your answer..."
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || submitted}
        className="w-full py-3 mt-6 rounded-xl text-center bg-mint-500 hover:bg-mint-600 text-black font-bold transition-all shadow-lg disabled:opacity-50"
      >
        {loading ? 'Submitting...' : submitted ? 'Submitted ✔️' : 'Submit Answers'}
      </button>

      {submitted && (
        <p className="text-center text-green-400 mt-4 font-medium text-sm">
          ✅ Answers saved! These will be factored into your Investor Grade.
        </p>
      )}
    </div>
  );
}

