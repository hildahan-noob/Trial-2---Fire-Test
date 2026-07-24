export type ViewMode = 'split' | 'before-only' | 'after-only' | 'slider';

export interface Hotspot {
  id: number;
  title: string;
  category: 'Navigation' | 'Engagement' | 'Interaction' | 'Authority' | 'Conversion';
  rationale: string;
  targetId: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  accentColor: 'primary' | 'secondary';
}

export interface ComplianceRecord {
  region: string;
  code: string;
  standard: string;
  status: 'COMPLIANT' | 'PENDING REVIEW' | 'CERTIFIED';
  smokeRating: string;
  flameRating: string;
  pdfUrl?: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  smokeValue: number;
  flameValue: number;
  maxSmoke: number;
  maxFlame: number;
  classRating: string;
  color: string;
}

export interface ScreenOption {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
}
