'use client';

import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ MOCK DATA
        const mock = [
          {
            id: '1',
            created_at: new Date().toISOString(),
            checklist_type: 'Pre-Market Setup',
            responses: {
              'Did I sleep well?': 'Yes',
              'Is my mindset clear?': 'Mostly',
            },
          },
        ];

        setResponses(mock);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch submissions');
      }
    };

    fetchData(); // ✅ SAFE
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checklist Submissions</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!responses.length ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Date</th>
                <th className="text-left py-2 px-4 border-b">Checklist</th>
                <th className="text-left py-2 px-4 border-b">Answers</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{row.checklist_type}</td>
                  <td className="py-2 px-4 border-b whitespace-pre-wrap text-sm">
                    {Object.entries(row.responses)
                      .map(([q, a]) => `${q}: ${a}`)
                      .join('\n')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
