'use client';

import { useState } from 'react';
import { Insurance } from '../data/types';
import { CoverageCard } from './CoverageCard';

interface Props {
  insurance: Insurance;
}

const typeFilters = ['전체', '질병', '암', '재해', '상해', '입원', '수술', '통원'] as const;

export function InsuranceDetail({ insurance }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [isOpen, setIsOpen] = useState(true);

  const filtered = activeFilter === '전체'
    ? insurance.coverages
    : insurance.coverages.filter((c) => c.types.includes(activeFilter as never));

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <button
        className="w-full text-left flex items-center justify-between p-5 text-white font-bold"
        style={{ backgroundColor: insurance.color }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <div className="text-xs opacity-80 font-normal mb-0.5">{insurance.company}</div>
          <div className="text-base">{insurance.productName}</div>
          <div className="text-xs opacity-70 font-normal mt-0.5">{insurance.productType}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-0.5 rounded-full">
            {insurance.coverages.length}개 보장
          </span>
          <svg
            className={`w-5 h-5 text-white opacity-80 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 bg-white">
          <div className="flex gap-2 flex-wrap">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  activeFilter === f
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeFilter === f ? { backgroundColor: insurance.color } : {}}
              >
                {f}
                {f !== '전체' && (
                  <span className="ml-1 opacity-70">
                    ({insurance.coverages.filter((c) => c.types.includes(f as never)).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">해당 유형의 보장내역이 없습니다</p>
            ) : (
              filtered.map((coverage) => (
                <CoverageCard
                  key={coverage.id}
                  coverage={coverage}
                  companyColor={insurance.color}
                  companyName={insurance.companyShort}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
