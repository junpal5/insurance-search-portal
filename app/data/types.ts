export type CoverageType = '질병' | '재해' | '상해' | '암' | '입원' | '수술' | '통원';

export interface Coverage {
  id: string;
  name: string;
  description: string;
  amount: string;
  amountNote?: string;
  types: CoverageType[];
  keywords: string[];
  documents: string[];
  limit?: string;
  exemptionPeriod?: string;
  reducedPeriod?: string;
  notes?: string;
}

export interface Insurance {
  id: string;
  company: string;
  companyShort: string;
  productName: string;
  productType: string;
  policyNumber?: string;
  contractDate?: string;
  expiryDate?: string;
  color: string;
  coverages: Coverage[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthYear?: number;
  insurances: Insurance[];
}
