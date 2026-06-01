'use client';

import { useState, useCallback } from 'react';
import { familyData } from './data/insuranceData';
import { FamilyTab } from './components/FamilyTab';
import { InsuranceDetail } from './components/InsuranceDetail';
import { SearchResults } from './components/SearchResults';
import { Coverage, Insurance } from './data/types';

interface SearchResult {
  insurance: Insurance;
  coverage: Coverage;
  memberName: string;
}

const SUGGESTED_KEYWORDS = [
  '암', '골절', '뇌졸중', '심근경색', '입원', '수술', '폴립', '방사선', '유방암', '갑상선암',
];

function searchInsurances(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const member of familyData) {
    for (const insurance of member.insurances) {
      for (const coverage of insurance.coverages) {
        const searchable = [
          coverage.name,
          coverage.description,
          ...coverage.keywords,
          coverage.amountNote ?? '',
          coverage.notes ?? '',
        ]
          .join(' ')
          .toLowerCase();

        if (searchable.includes(q)) {
          results.push({ insurance, coverage, memberName: member.name });
        }
      }
    }
  }

  return results;
}

export default function Home() {
  const [activeMemberId, setActiveMemberId] = useState('mom');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const activeMember = familyData.find((m) => m.id === activeMemberId)!;

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      setIsSearchMode(true);
      setSearchResults(searchInsurances(q));
    } else {
      setIsSearchMode(false);
      setSearchResults([]);
    }
  }, []);

  const handleKeyword = (kw: string) => {
    handleSearch(kw);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-4 pt-10 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold">우리 가족 보험 포털</h1>
            <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded-full">β</span>
          </div>
          <p className="text-indigo-200 text-xs mb-5">보장 내용을 한눈에 확인하세요</p>

          {/* Search bar */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="질병명, 치료명 검색 (예: 골절, 암, 입원)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Suggested keywords */}
          {!isSearchMode && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5">
              {SUGGESTED_KEYWORDS.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKeyword(kw)}
                  className="flex-shrink-0 text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 rounded-full transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {isSearchMode ? (
          <SearchResults results={searchResults} query={searchQuery} />
        ) : (
          <>
            {/* Family tabs */}
            <FamilyTab
              members={familyData}
              activeId={activeMemberId}
              onChange={setActiveMemberId}
            />

            {/* Insurance list */}
            <div className="space-y-3">
              {activeMember.insurances.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <div className="text-5xl mb-3">📋</div>
                  <p className="text-gray-500 text-sm font-medium">{activeMember.name} 보험 미등록</p>
                  <p className="text-gray-400 text-xs mt-1">보험 증권 파일을 전달해 주시면 추가해드립니다</p>
                </div>
              ) : (
                activeMember.insurances.map((ins) => (
                  <InsuranceDetail key={ins.id} insurance={ins} />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer note */}
      <footer className="max-w-lg mx-auto px-4 pb-8 text-center">
        <p className="text-xs text-gray-400">
          이 포털은 보험약관을 기반으로 작성되었습니다.<br />
          정확한 보장금액은 실제 보험증권을 반드시 확인하세요.
        </p>
      </footer>
    </div>
  );
}
