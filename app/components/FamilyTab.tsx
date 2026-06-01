'use client';

import { FamilyMember } from '../data/types';

interface Props {
  members: FamilyMember[];
  activeId: string;
  onChange: (id: string) => void;
}

const avatars: Record<string, string> = {
  mom: '👩',
  dad: '👨',
  me: '🙋',
  sibling: '🧑',
};

export function FamilyTab({ members, activeId, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {members.map((m) => {
        const isActive = m.id === activeId;
        const hasInsurance = m.insurances.length > 0;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-2xl transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{avatars[m.id] ?? '👤'}</span>
            <span className="text-sm font-medium mt-0.5">{m.name}</span>
            {hasInsurance ? (
              <span className={`text-xs mt-0.5 ${isActive ? 'text-indigo-200' : 'text-gray-400'}`}>
                {m.insurances.length}개 보험
              </span>
            ) : (
              <span className={`text-xs mt-0.5 ${isActive ? 'text-indigo-300' : 'text-gray-300'}`}>
                미등록
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
