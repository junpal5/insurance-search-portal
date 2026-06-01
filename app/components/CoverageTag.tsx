'use client';

import { CoverageType } from '../data/types';
import { coverageTypeColors } from '../data/insuranceData';

export function CoverageTag({ type }: { type: CoverageType }) {
  const colorClass = coverageTypeColors[type] ?? 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {type}
    </span>
  );
}
