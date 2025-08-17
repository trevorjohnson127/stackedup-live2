
'use client';

import { useState } from 'react';
import { useDailyChecksheetSync } from '../hooks/useDailyChecksheetSync';

// Simulated user and period for now
const userId = 'demo-user';
const period = new Date().toISOString().slice(0, 10);

export default function DailyChecksheet() {
  const { submitResponse, loading } = useDailyChecksheetSync(userId, period);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(50);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!question || !answer) return;
    await submitResponse(question, answer, score, notes);
    setQuestion('');
    setAnswer('');
    setScore(50);
    setNotes('');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Submit a Daily Checksheet Entry</h2>
      <input
        className="w-full p-2 border"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        className="w-full p-2 border"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input
        className="w-full p-2 border"
        placeholder="Score"
        type="number"
        value={score}
        onChange={(e) => setScore(parseInt(e.target.value))}
      />
      <textarea
        className="w-full p-2 border"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {loading && <p className="text-gray-500 text-sm">Syncing...</p>}
    </div>
  );
}
