export interface ParcelLead {
  id: string;
  leadNumber: number;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  county: string;
  zip: string;
  lotAreaSqFt: number;
  existingHomeSqFt: number;
  zoningCode: string;
  ab1033Status: 'OPTED_IN' | 'PENDING_MUNICIPAL_VOTE' | 'QUALIFIED_BY_RIGHT';
  maxAduSqFt: number;
  recommendedModelId: string;
  estimatedAduValue: number;
  projectedMonthlyRent: number;
  estimatedCondoSalePrice: number;
  netEquityGain: number;
  setbackVerified: boolean;
  sewerCapacity: 'AVAILABLE' | 'UPGRADE_REQUIRED' | 'SEPTIC_REVIEW';
  status: 'AUDIT_READY' | 'OUTREACH_PENDING' | 'CONSULT_BOOKED';
  assessorParcelNumber: string;
}

export interface AduModel {
  id: string;
  name: string;
  series: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  dimensions: string;
  turnkeyCost: number;
  estimatedCondoSale: number;
  projectedRent: number;
  buildTimeWeeks: number;
  description: string;
  features: string[];
  specs: {
    ceilingHeight: string;
    hvac: string;
    solarKw: number;
    insulation: string;
    foundation: string;
  };
}
