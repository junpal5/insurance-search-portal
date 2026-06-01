'use client';

import { Coverage, Insurance } from '../data/types';
import { CoverageCard } from './CoverageCard';

interface SearchResult {
  insurance: Insurance;
  coverage: Coverage;
  memberName: string;
}

interface Props {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: Props) {
  if (!query.trim()) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          &ldquo;{query}&rdquo; 검색결과
        </h2>
        <span className="text-sm text-gray-500">{results.length}건</span>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 text-sm">검색 결과가 없습니다</p>
          <p className="text-gray-400 text-xs mt-1">다른 키워드로 검색해 보세요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((r) => (
            <div key={`${r.insurance.id}-${r.coverage.id}`}>
              <div className="text-xs text-gray-400 mb-1 px-1">{r.memberName}</div>
              <CoverageCard
                coverage={r.coverage}
                companyColor={r.insurance.color}
                companyName={r.insurance.companyShort}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
