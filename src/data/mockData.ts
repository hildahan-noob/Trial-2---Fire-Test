import { Hotspot, ComplianceRecord, MaterialOption, ScreenOption } from '../types';

export const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    title: 'Sticky Jump-Links',
    category: 'Navigation',
    rationale: "Navigation: Sticky jump-links provide instant access to deep technical data, solving the high drop-off rate seen in heatmaps.",
    targetId: 'target-1',
    position: { top: '3.5rem', left: '35%' },
    accentColor: 'primary'
  },
  {
    id: 2,
    title: 'Did You Know Callout',
    category: 'Engagement',
    rationale: "Engagement: The 'Did You Know?' callout is moved above the fold to capture engineers' interest before they bounce.",
    targetId: 'target-2',
    position: { top: '15.5rem', right: '4.5rem' },
    accentColor: 'secondary'
  },
  {
    id: 3,
    title: 'Interactive Graph',
    category: 'Interaction',
    rationale: "Interaction: Static data is transformed into interactive charts, addressing the 'dead clicks' where users expected interactivity.",
    targetId: 'target-3',
    position: { top: '32rem', left: '22%' },
    accentColor: 'primary'
  },
  {
    id: 4,
    title: 'APAC Compliance Matrix',
    category: 'Authority',
    rationale: "Authority: The APAC Compliance table is elevated and reformatted for clarity, establishing regional technical authority.",
    targetId: 'target-4',
    position: { bottom: '15rem', left: '48%' },
    accentColor: 'secondary'
  },
  {
    id: 5,
    title: 'Dual CTAs',
    category: 'Conversion',
    rationale: "Conversion: Dual CTAs offer both high-intent 'Contact' and low-friction 'Download' paths to improve lead generation.",
    targetId: 'target-5',
    position: { bottom: '5rem', left: '38%' },
    accentColor: 'primary'
  }
];

export const COMPLIANCE_RECORDS: ComplianceRecord[] = [
  {
    region: 'Singapore',
    code: 'SCDF CP 13',
    standard: 'EN 13501-1 (B-s1, d0)',
    status: 'COMPLIANT',
    smokeRating: 's1 (Low)',
    flameRating: 'B (Very Limited Contribution)'
  },
  {
    region: 'Australia',
    code: 'NCC Part C',
    standard: 'AS 1530.3',
    status: 'COMPLIANT',
    smokeRating: 'Index 0-3',
    flameRating: 'Spread Index 0'
  },
  {
    region: 'Japan',
    code: 'Building Standard Law',
    standard: 'JIS A 1321 Non-combustible',
    status: 'COMPLIANT',
    smokeRating: 'Grade 1',
    flameRating: 'Grade 1'
  },
  {
    region: 'South Korea',
    code: 'KFI Standard 109',
    standard: 'KS F 2271 Fire Proof',
    status: 'CERTIFIED',
    smokeRating: 'Low Smoke Emission',
    flameRating: 'Self-Extinguishing'
  },
  {
    region: 'Malaysia',
    code: 'UBBL 1984 Sec 134',
    standard: 'BS 476 Part 6 & 7 Class 0',
    status: 'COMPLIANT',
    smokeRating: 'Index < 12',
    flameRating: 'Class 1 Surface'
  },
  {
    region: 'Thailand',
    code: 'EIA Industrial Code',
    standard: 'TISI 2165 Standard',
    status: 'COMPLIANT',
    smokeRating: 'Pass',
    flameRating: 'Pass'
  },
  {
    region: 'UAE / Middle East',
    code: 'Civil Defence Code',
    standard: 'ASTM E84 (25/50)',
    status: 'COMPLIANT',
    smokeRating: '50 Smoke Developed',
    flameRating: '25 Flame Spread'
  }
];

export const MATERIALS: MaterialOption[] = [
  {
    id: 'armaflex-ultra',
    name: 'ArmaFlex Ultra',
    smokeValue: 25,
    flameValue: 15,
    maxSmoke: 50,
    maxFlame: 25,
    classRating: 'Class A / B-s1,d0',
    color: '#4e6700'
  },
  {
    id: 'competitor-hightemp',
    name: 'Competitor High-Temp',
    smokeValue: 120,
    flameValue: 45,
    maxSmoke: 150,
    maxFlame: 75,
    classRating: 'Class B / C-s2,d1',
    color: '#006591'
  },
  {
    id: 'armaflex-class0',
    name: 'ArmaFlex Class 0',
    smokeValue: 35,
    flameValue: 20,
    maxSmoke: 50,
    maxFlame: 25,
    classRating: 'Class A / B-s2,d0',
    color: '#96c115'
  },
  {
    id: 'mineral-wool',
    name: 'Standard Mineral Wool',
    smokeValue: 10,
    flameValue: 5,
    maxSmoke: 50,
    maxFlame: 25,
    classRating: 'Class A1 / Non-Combustible',
    color: '#5c5e67'
  }
];

export const SCREENS: ScreenOption[] = [
  {
    id: 'screen_41',
    code: 'SCREEN_41',
    title: 'Navigating Fire Standards: ASTM E84 & EN 13501-1',
    subtitle: 'Understanding the technical differentiation between US and European fire safety benchmarks for mission-critical industrial insulation.',
    category: 'Fire Safety & Compliance'
  },
  {
    id: 'screen_42',
    code: 'SCREEN_42',
    title: 'Thermal Conductivity & K-Value Benchmarking',
    subtitle: 'Evaluating long-term thermal resistance, energy savings, and condensation prevention under extreme temperature gradients.',
    category: 'Thermal Efficiency'
  },
  {
    id: 'screen_43',
    code: 'SCREEN_43',
    title: 'Acoustic Damping & Noise Attenuation Index',
    subtitle: 'Optimizing decibel reduction and sound transmission class (STC) across heavy industrial piping and HVAC installations.',
    category: 'Acoustic Insulation'
  }
];
