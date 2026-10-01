import { AduModel } from '../types';

export const ADU_MODELS: AduModel[] = [
  {
    id: 'studio-400',
    name: 'The California Studio 400',
    series: 'Urban Infill Series',
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 400,
    dimensions: '20ft × 20ft',
    turnkeyCost: 135000,
    estimatedCondoSale: 295000,
    projectedRent: 2200,
    buildTimeWeeks: 8,
    description: 'Ultra-compact detached studio designed for tight backyard lots. Features full galley kitchen, in-unit laundry closet, and separate deeded outdoor patio.',
    features: [
      'Engineered pre-approved California HCD plans',
      'High-efficiency mini-split heat pump (22 SEER)',
      'Sub-metered 100A electrical service panel',
      'Tankless continuous electric water heater',
      'Private 80 sq ft deeded entry porch'
    ],
    specs: {
      ceilingHeight: '9ft Vaulted',
      hvac: 'Mitsubishi Electric Ductless Mini-Split',
      solarKw: 3.2,
      insulation: 'R-21 Walls / R-38 Ceiling (Title 24 Compliant)',
      foundation: 'Engineered Stem Wall & Monolithic Slab'
    }
  },
  {
    id: 'pacifica-750',
    name: 'The Pacifica Suite 750',
    series: 'Coastal Residence Series',
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 750,
    dimensions: '25ft × 30ft',
    turnkeyCost: 185000,
    estimatedCondoSale: 410000,
    projectedRent: 3100,
    buildTimeWeeks: 10,
    description: 'Premier two-bedroom layout engineered for high rental yield and premium standalone condominium resale in high-density suburban markets.',
    features: [
      'Dual master bedroom layout with shared designer bath',
      'Full quartz island with stainless appliance package',
      'Separate deeded utility connection with sewer backflow preventer',
      'Soundproof double-drywall common boundary buffer (STC 58)',
      'Private rear garden enclosure'
    ],
    specs: {
      ceilingHeight: '9.5ft Flat with Clerestory Windows',
      hvac: 'Multi-Zone Variable Speed Inverter',
      solarKw: 4.8,
      insulation: 'Rockwool Comfortbatt Sound & Thermal Barrier',
      foundation: 'Seismic Zone 4 Post-Tensioned Slab'
    }
  },
  {
    id: 'villa-1000',
    name: 'The California Villa 1000',
    series: 'Executive Master Series',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1000,
    dimensions: '28ft × 36ft',
    turnkeyCost: 245000,
    estimatedCondoSale: 520000,
    projectedRent: 3800,
    buildTimeWeeks: 12,
    description: 'Spacious three-bedroom detached villa matching maximum allowable single-family ADU guidelines under California Gov. Code § 65852.2.',
    features: [
      'Primary master suite with ensuite double-vanity bathroom',
      'Covered outdoor California Room loggia (140 sq ft)',
      'Integrated solar PV array with Tesla Powerwall pre-wiring',
      'Dedicated private parking pad & Level 2 EV charging circuit',
      'AB 1033 compliant independent property demarcation survey'
    ],
    specs: {
      ceilingHeight: '10ft Architectural Trusses',
      hvac: 'Concealed Ducted High-Efficiency Heat Pump',
      solarKw: 6.4,
      insulation: 'Closed-Cell Spray Foam + Continuous Exterior Foam',
      foundation: 'Full Perimeter Grade Beam & Mat Foundation'
    }
  },
  {
    id: 'casita-1200',
    name: 'The Estate Casita 1200',
    series: 'Luxury Subdivision Series',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1200,
    dimensions: '30ft × 40ft',
    turnkeyCost: 295000,
    estimatedCondoSale: 625000,
    projectedRent: 4400,
    buildTimeWeeks: 14,
    description: 'The ultimate standalone accessory home. Matches standard starter-home footprints across Southern California, delivering maximum condominium liquidity upon sale.',
    features: [
      'Executive 3-bedroom, 2.5-bathroom two-story architectural footprint',
      'Open-concept great room with 12ft bi-fold glass patio doors',
      'Separate legal parcel APN assignment & independent water meter',
      'Comprehensive HOA CC&R drafting package included',
      'Architectural review board pre-clearance guarantee'
    ],
    specs: {
      ceilingHeight: '10ft Lower / 9ft Upper',
      hvac: 'Dual-Zone Smart Heat Pump with HEPA Filtration',
      solarKw: 8.0,
      insulation: 'Net-Zero Ready Continuous Envelope',
      foundation: 'Deep Drilled Caisson & Grade Beam System'
    }
  }
];
