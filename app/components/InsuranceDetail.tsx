'use client';

import { useState } from 'react';
import { Insurance } from '../data/types';
import { CoverageCard } from './CoverageCard';

interface Props {
  insurance: Insurance;
  onBack: () => void;
}

const typeFilters = ['전체', '질병', '암', '재해', '상해', '입원', '수술', '통원'] as const;

export function InsuranceDetail({ insurance, onBack }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('전체');

  const filtered =
    activeFilter === '전체'
      ? insurance.coverages
      : insurance.coverages.filter((c) => c.types.includes(activeFilter as never));

  return (
    <div className="min-h-full bg-gray-50">
      {/* Colored header */}
      <div style={{ backgroundColor: insurance.color }} className="pb-5">
        <div className="max-w-lg mx-auto px-4 pt-12">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white opacity-90 mb-5 -ml-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">목록으로</span>
          </button>
          <div className="text-xs text-white opacity-75 font-normal mb-0.5">{insurance.company}</div>
          <h1 className="text-xl font-bold text-white leading-tight">{insurance.productName}</h1>
          <div className="text-xs text-white opacity-65 font-normal mt-1">{insurance.productType}</div>
          <div className="mt-3 inline-flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
            <span className="text-xs text-white font-semibold">총 {insurance.coverages.length}개 보장</span>
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
          {typeFilters.map((f) => {
            const count =
              f === '전체'
                ? insurance.coverages.length
                : insurance.coverages.filter((c) => c.types.includes(f as never)).length;
            if (f !== '전체' && count === 0) return null;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${
                  activeFilter === f ? 'text-white' : 'bg-gray-100 text-gray-600'
                }`}
                style={activeFilter === f ? { backgroundColor: insurance.color } : {}}
              >
                {f}
                <span className={`ml-1 ${activeFilter === f ? 'opacity-80' : 'opacity-50'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Coverage cards */}
      <div className="max-w-lg mx-auto px-4 py-4 space-y-2 pb-10">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">해당 유형의 보장내역이 없습니다</p>
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
  );
}
