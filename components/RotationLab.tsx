// components/RotationLab.tsx

'use client';

export function RotationLab() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-mint mb-4">Rotation Simulation Lab</h2>
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-700">
          This lab lets you simulate a rotation between two positions. (Coming soon!)
        </p>
        <ul className="mt-3 list-disc list-inside text-gray-500 text-sm">
          <li>Choose a position to trim</li>
          <li>Choose a target to rotate into</li>
          <li>Compare conviction levels and strategy fit</li>
        </ul>
      </div>
    </div>
  );
}
