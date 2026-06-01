'use client';

import { useState } from 'react';
import { Coverage } from '../data/types';
import { CoverageTag } from './CoverageTag';

interface Props {
  coverage: Coverage;
  companyColor: string;
  companyName: string;
}

export function CoverageCard({ coverage, companyColor, companyName }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full text-left p-4 flex items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: companyColor }}
            >
              {companyName}
            </span>
            {coverage.types.map((t) => (
              <CoverageTag key={t} type={t} />
            ))}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">{coverage.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{coverage.description}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-sm font-bold text-gray-900 whitespace-pre-line leading-snug">
            {coverage.amount}
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 mt-1 ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3 bg-gray-50">
          {coverage.amountNote && (
            <div>
              <span className="text-xs font-medium text-gray-500">상품명</span>
              <p className="text-xs text-gray-700 mt-0.5">{coverage.amountNote}</p>
            </div>
          )}

          {coverage.limit && (
            <div>
              <span className="text-xs font-medium text-gray-500">보장한도</span>
              <p className="text-xs text-gray-700 mt-0.5">{coverage.limit}</p>
            </div>
          )}

          {coverage.exemptionPeriod && (
            <div>
              <span className="text-xs font-medium text-orange-600">⏳ 면책기간</span>
              <p className="text-xs text-gray-700 mt-0.5">{coverage.exemptionPeriod}</p>
            </div>
          )}

          {coverage.reducedPeriod && (
            <div>
              <span className="text-xs font-medium text-yellow-600">📉 감액기간</span>
              <p className="text-xs text-gray-700 mt-0.5">{coverage.reducedPeriod}</p>
            </div>
          )}

          {coverage.notes && (
            <div>
              <span className="text-xs font-medium text-blue-600">ℹ️ 참고사항</span>
              <p className="text-xs text-gray-700 mt-0.5">{coverage.notes}</p>
            </div>
          )}

          <div>
            <span className="text-xs font-medium text-gray-500">📋 필요 서류</span>
            <ul className="mt-1 space-y-0.5">
              {coverage.documents.map((doc, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
