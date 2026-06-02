'use client';

import { Insurance } from '../data/types';

interface Props {
  insurance: Insurance;
  onClick: () => void;
}

export function InsuranceCard({ insurance, onClick }: Props) {
  return (
    <button
      className="w-full text-left rounded-2xl overflow-hidden shadow-sm active:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="p-5 text-white" style={{ backgroundColor: insurance.color }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs opacity-75 font-normal mb-0.5 truncate">{insurance.company}</div>
            <div className="text-base font-bold leading-tight">{insurance.productName}</div>
            <div className="text-xs opacity-65 font-normal mt-1">{insurance.productType}</div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-xs font-semibold text-white opacity-90 whitespace-nowrap">
              {insurance.coverages.length}개 보장
            </span>
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
