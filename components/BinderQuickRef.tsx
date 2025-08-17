// components/BinderQuickRef.tsx

'use client';

export function BinderQuickRef() {
  const references = [
    { section: 'Buy the Dip Rules', page: 'Binder p. 11' },
    { section: 'Springboard Logic', page: 'Binder p. 13' },
    { section: 'Rotation Checklist', page: 'Binder p. 17' },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-mint mb-4">Quick Binder Reference</h2>
      <ul className="bg-white rounded-xl shadow p-4 space-y-2">
        {references.map((ref, i) => (
          <li key={i} className="flex justify-between text-sm text-gray-800">
            <span>{ref.section}</span>
            <span className="text-mint font-semibold">{ref.page}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
