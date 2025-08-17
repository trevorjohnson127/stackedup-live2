// components/RotationTriggers.tsx

'use client';

export function RotationTriggers() {
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-mint mb-4">Rotation Triggers</h2>
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-700">
          No active rotation triggers right now. Monitor conviction mismatches and set
          alerts to auto-suggest future trims or reallocations.
        </p>
      </div>
    </div>
  );
}
